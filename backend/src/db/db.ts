import mongoose from "mongoose";
import envConfig from "../config/env.config";

const connectDB = async () => {
  try {
    await mongoose.connect(`${envConfig.MONGO_URL}`);

    console.log("MONGO DB CONNECTED!!!");
  } catch (error) {
    console.log("MONGO CONNECTION FAILED!!!", error);
    process.exit(1);
  }
};

export default connectDB;
