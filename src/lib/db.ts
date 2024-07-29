import { Collection, MongoClient } from "mongodb";

export interface UserDoc {
    _id: string;
    providerId?: number;
    fullName: string;
    email: string;
    hashedPassword?: string
    avatar:string
}

export interface SessionDoc {
    _id: string;
    expires_at: Date;
    user_id: string;
}

const client = new MongoClient(process.env.MONGODB_URI!, {
    maxPoolSize: 50,
    minPoolSize: 5
});

(async () => {
    await client.connect()
})();

process.on('SIGINT', async () => {
    await client.close();
    process.exit(0);
});

export const db = client.db(process.env.DB_NAME)
export const User = db.collection("users") as Collection<UserDoc>;
export const Session = db.collection("sessions") as Collection<SessionDoc>;

