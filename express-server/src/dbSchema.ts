import { Collection, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export interface UserDoc {
    _id: string;
    providerId?: number;
    fullName: string;
    email: string;
    hashedPassword?: string
    avatar: string
}

export interface SessionDoc {
    _id: string;
    expires_at: Date;
    user_id: string;
}

export const client = new MongoClient(process.env.MONGODB_URI!, {
    maxPoolSize: 50,
    minPoolSize: 5,
    ssl: true,
});

export const connectDB = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
};

process.on('SIGINT', async () => {
    await client.close();
    process.exit(0);
});

export const db = client.db(process.env.DB_NAME);
export const User = db.collection("users") as Collection<UserDoc>;
export const Session = db.collection("sessions") as Collection<SessionDoc>;