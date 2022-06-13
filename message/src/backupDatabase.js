import mongoose from "mongoose";
import "dotenv/config"

const server = process.env.REPLICA_MESSAGE;


const database = "replica_message";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});