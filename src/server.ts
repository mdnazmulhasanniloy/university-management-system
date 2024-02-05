import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";

async function main() {
  try {
    await mongoose.connect(config?.mongoURI);
    console.log(`database connection successful`);
    app.listen(config?.port, () => {
      console.log(`server started on port ${config?.port}`);
    });
  } catch (error) {
    console.log(`failed to connect database`, error);
  }
}

main();
