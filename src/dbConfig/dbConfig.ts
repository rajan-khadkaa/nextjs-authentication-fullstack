import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("database connected sucessfully.");
    });

    connection.on("error", () => {
      console.log("MongoDB connection error.");
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
}
