import mongoose from "mongoose";


const server = "localhost:27018"; // en local
// const server = "mongobackup:27018"; // en docker

const database = "cabify_bootcamp_backup";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});