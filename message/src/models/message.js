import mongoose from "mongoose";

import database from "../database.js";
import backupDatabase from "../backupDatabase.js";

const messageSchema = new mongoose.Schema(
  {
    destination: String,
    body: String,
    status: {
      type: String,
      enum: ["ERROR", "OK", "TIMEOUT", "PENDING", "CHECKING BALANCE", "NOT ENOUGH MONEY"],
    },
    statusId: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const Message = database.model("Message", messageSchema);
const BackupMessage = backupDatabase.model("BackupMessage", messageSchema);

Message.syncIndexes();
BackupMessage.syncIndexes();

export { Message, BackupMessage };
