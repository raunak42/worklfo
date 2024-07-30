import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Session, User, UserDoc } from "db";
import { BASE_URL } from "./lib/constants";
import { Google } from "arctic";
import { User as userType, Session as sessionType } from "lucia";
import { cookies } from "next/headers";

const redirectURI = `${BASE_URL}/login/google/callback`;
export const google = new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, redirectURI)


const adapter = new MongodbAdapter(Session, User)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            providerId: attributes.providerId,
            username: attributes.fullName
        };
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: UserDoc;
    }
}

export const validateRequest = async (): Promise<{ user: userType; session: sessionType } | { user: null; session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
        return {
            user: null,
            session: null
        };
    }

    let result: {
        user: userType;
        session: sessionType;
    } | {
        user: null;
        session: null;
    } = {
        user: null,
        session: null
    }
    // next.js throws when you attempt to set cookie when rendering page
    try {
        result = await lucia.validateSession(sessionId);
        if (result.session && result.session.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!result.session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch (error) {
        console.error(error)
    }
    return result;
}

export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return null;
    const { user, session } = await lucia.validateSession(sessionId);
    try {
        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch (error) {
        console.error(error)
        // Next.js throws error when attempting to set cookies when rendering page
    }
    return user;
}
