import mongoose from "mongoose";
import "dotenv/config"

const server = process.env.MONGO_MESSAGE;


const database = "message";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});