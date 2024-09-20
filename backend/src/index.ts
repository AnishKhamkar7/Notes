import app from "./app";
import dotenv from "dotenv";
import connectDB from "./db/db";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`SERVER RUNNING ON ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("ERROR DURING CONNECTION !!!", err);
  });
