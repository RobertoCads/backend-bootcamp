import mongoose from "mongoose";
import "dotenv/config"

const server = process.env.CREDIT;


const database = "credit";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});