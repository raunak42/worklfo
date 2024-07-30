import express from "express";
import cors from "cors";
import { User } from "@repo/db";

const app = express();
const port = 3005;

app.use(express.json());
app.use(cors());

const userRouter = express.Router();
app.use("/user", userRouter);

userRouter.get("/check", async (req, res) => {
  console.log("Request received");
  return res.json({ message: "Response from server" });
});

userRouter.get("/getUserInfo", async(req,res)=>{
    const body = req.body
    console.log(body)
    const user = await User.findOne({})
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});