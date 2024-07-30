"use server"
import bcrypt from "bcryptjs";
import { User } from "db";


export const checkUserInDb = async (email: string) => {
    const existingUser = await User.findOne({
        email: email
    });

    return existingUser;    
}

export const verifyPassword = async (password: string | undefined, hashedPassword: string): Promise<boolean> => {
    if (password === undefined) {
        return false;
    }
    const verifiedPassword = await bcrypt.compare(password, hashedPassword)
    return verifiedPassword;
}