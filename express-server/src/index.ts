import express from "express";
import cors from "cors";
import { connectDB } from "./lib/dbSchema";
import router from "./routes";

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());

app.use("/", router);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch((error) => {
  console.error("Failed to start server:", error);
});