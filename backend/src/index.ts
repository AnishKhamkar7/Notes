import app from "./app";
import connectDB from "./db/db";
import envConfig from "./config/env.config";

connectDB()
  .then(() => {
    app.listen(envConfig.PORT, () => {
      console.log(`SERVER RUNNING ON ${envConfig.PORT}`);
    });
  })
  .catch((err) => {
    console.log("ERROR DURING CONNECTION !!!", err);
  });
