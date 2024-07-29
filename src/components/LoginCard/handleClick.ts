import { checkUserInDb, verifyPassword } from "@/app/actions";
import { emailInput, fullNameInput, passwordInput } from "@/lib/zod";
import { SetStateAction } from "react";

interface handleClickParams {
    setShowSpinner: (value: SetStateAction<boolean>) => void
    setEmailWarning: (value: SetStateAction<string>) => void
    setPasswordWarning: (value: SetStateAction<string>) => void
    setFullNameWarning: (value: SetStateAction<string>) => void
    fullName: string
    email: string
    password: string
    buttonText: string

}

export const handleClickFn = async ({ setShowSpinner, setEmailWarning, setPasswordWarning, setFullNameWarning, fullName, email, password, buttonText }: handleClickParams) => {
    setShowSpinner(true);
    setEmailWarning("");
    setPasswordWarning("");
    setFullNameWarning("");
    const parsedFullName = fullNameInput.safeParse(fullName);
    const parsedPassword = passwordInput.safeParse(password);
    const parsedEmail = emailInput.safeParse(email);

    let existingUser;
    if (parsedEmail.success) {
        existingUser = await checkUserInDb(parsedEmail.data);
    }

    //Creating warnings for signup.
    if (buttonText === "Signup") {
        if (parsedFullName.error) {
            setFullNameWarning(parsedFullName.error.errors[0].code);
        }
        if (parsedPassword.error) {
            setPasswordWarning(parsedPassword.error.errors[0].code);
        }
        if (parsedEmail.error) {
            setEmailWarning("not_a_valid_email");
        }
        if (existingUser) {
            setEmailWarning("email_already_exists");
        }

        setShowSpinner(false);
    }

    //Creating warnings for login
    if (buttonText === "Login") {
        if (!existingUser) {
            setEmailWarning("user_doesn't_exist");
        }
        if (existingUser) {
            const isVerifiedPassword = await verifyPassword(
                parsedPassword.data,
                existingUser.hashedPassword!
            );
            if (!isVerifiedPassword) {
                setPasswordWarning("incorrect_password");
            }
        }

        setShowSpinner(false);
    }
}