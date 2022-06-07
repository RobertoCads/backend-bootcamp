import { Message, BackupMessage } from "../models/message.js";
import locks from "locks";
import retry from "../utils/retry.js";



const mutex = locks.createMutex();

export default async (messageParams) => {
  const message = new Message(messageParams);
  const backupMessage = new BackupMessage(messageParams);

  try {
    const doc = async () => {
      await message.save();
      try {
        await backupMessage.save();
      } catch(err) {
        retry(backupMessage, 3)
        console.log(err, "Timeout Error")
      }
    };

    mutex.lock(function () {
      console.log("Message saved succesfully:", doc);
      doc();
      mutex.unlock();
    });
    return message;
  } catch (err) {
    console.log("Error while saving", err);
    mutex.unlock();
  }
};
