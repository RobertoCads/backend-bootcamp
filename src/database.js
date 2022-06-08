import mongoose from "mongoose";

const server = "localhost:27017"; // en local
// const server = "mongodb:27017"; // en docker

const database = "cabify_bootcamp";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});