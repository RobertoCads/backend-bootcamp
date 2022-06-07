import Message from "../models/message.js";
import locks from "locks";

const mutex = locks.createMutex();

export default async (messageParams) => {
  const message = new Message(messageParams);

  try {
    const doc = async () => await message.save();

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
