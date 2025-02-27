// app/login/google/callback/route.ts
import { google, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { User } from "@/lib/db";
import { tasks } from "../../../../../example-tasks";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const scope = url.searchParams.get("scope");
    const authuser = url.searchParams.get("authuser");
    const prompt = url.searchParams.get("prompt");
    const storedState = cookies().get("google_oauth_state")?.value ?? null;
    const codeVerifier = cookies().get("google_oauth_codeVerifier")?.value ?? null;

    if (!code || !state || !scope || !authuser || !prompt || !storedState || !codeVerifier || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);
        const googleUserResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });

        const googleUser: GoogleUser = await googleUserResponse.json();

        const existingUser = await User.findOne({
            providerId: parseFloat(googleUser.id),
        })

        if (existingUser) {
            const session = await lucia.createSession(existingUser._id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/home"
                }
            });
        }

        const userId = generateIdFromEntropySize(10); // 16 characters long

        await User.insertOne({
            _id: userId,
            fullName: googleUser.name,
            providerId: parseFloat(googleUser.id),
            email: googleUser.email,
            avatar: googleUser.picture,
            tasks: tasks
        })

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/home"
            }
        });
    } catch (e) {
        // the specific error message depends on the provider
        console.error(e)
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400
            });
        }
        return new Response(null, {
            status: 500
        });
    }
}

interface GoogleUser {
    id: string;
    sub: string;
    login: string;
    name: string;
    email: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}


