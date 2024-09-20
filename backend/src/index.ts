import express from "express";
import cors from "cors";
import exp from "constants";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

app.listen(8000);
