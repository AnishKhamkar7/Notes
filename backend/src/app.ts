import express from "express";
import cors from "cors";
import envConfig from "./config/env.config";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.post("/", (req, res) => {
  res.json({ hello: "hello test" });
});

import userRouter from "./routes/user.routes";
import notesRouter from "./routes/notes.routes";

app.use("/api/users", userRouter);
app.use("/api/notes", notesRouter);

app.listen(4000);
export default app;
