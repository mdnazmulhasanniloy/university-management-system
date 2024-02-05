import dotenv from "dotenv";
import Path from "path";
dotenv.config({ path: Path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 3000,
  mongoURI: process.env.DB_URL || "mongodb://localhost:27017/test",
};
