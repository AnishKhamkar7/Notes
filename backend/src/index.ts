import app from "./app";
import dotenv from "dotenv";
import connectDB from "./db/db";
import envConfig from "./config/env.config";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(envConfig.PORT, () => {
      console.log(`SERVER RUNNING ON ${envConfig.PORT}`);
    });
  })
  .catch((err) => {
    console.log("ERROR DURING CONNECTION !!!", err);
  });
