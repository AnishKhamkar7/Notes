import express from "express";
import cors from "cors";
import errorHandlerMiddleware from "./middleware/error.middleware";
import userRouter from "./routes/user.routes";
import notesRouter from "./routes/notes.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/notes", notesRouter);

app.use(errorHandlerMiddleware);

export default app;
