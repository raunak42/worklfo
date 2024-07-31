import express from "express";
import { Task, User } from "./lib/dbSchema";

const router = express.Router();

router.get("/check", async (req, res) => {
    console.log("Request received");
    try {
        const wolvie = await User.findOne({
            email: "raunakarunlanjewar@gmail.com"
        });
        console.log(wolvie);
        return res.json({ message: "Response from server", user: wolvie });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/getUserInfo", async (req, res) => {
    console.log("Request reached")
    const body: { userId: string } = await req.body
    const userId = body.userId;

    const user = await User.findOne({
        _id: userId
    })
    return res.json(user)
});

router.post("/updateUserTask", async (req, res) => {
    console.log("sex")
    const body: { task: Task, userId: string } = await req.body;
    const { task, userId } = body;

    try {
        const result = await User.updateOne(
            { _id: userId, "tasks._id": task._id },
            { $set: { "tasks.$": task } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Task not found or not modified" });
        }

        return res.json({ message: "Task updated successfully" });
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


export default router;