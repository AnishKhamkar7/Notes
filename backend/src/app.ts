import express from "express";
import cors from "cors";
import errorHandlerMiddleware from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.use(cors());

import userRouter from "./routes/user.routes";
import notesRouter from "./routes/notes.routes";

app.use("/api/users", userRouter);
app.use("/api/notes", notesRouter);

app.use(errorHandlerMiddleware);
app.listen(8000);
export default app;
