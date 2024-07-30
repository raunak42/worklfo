import express from "express";
import cors from "cors";
import { connectDB, User } from "./dbSchema";

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());

const userRouter = express.Router();
app.use("/user", userRouter);

userRouter.get("/check", async (req, res) => {
  console.log("Request received");
  const wolvie = await User.findOne({
    email:"raunakarunlanjewar@gmail.com"
  })
  console.log(wolvie)
  return res.json({ message: "Response from server" });
});



connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch((error) => {
  console.error("Failed to start server:", error);
});