import mongoose from "mongoose";
import "dotenv/config"

const server = process.env.BACKUPCREDIT;


const database = "replica_credit";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});