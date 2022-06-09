import Queue from "bull";
import "dotenv/config";
import { hasMoney } from "./utilFunctions.js";
const MESSAGE_CREDIT = 2;

const receiveFromMessage = new Queue("credit-queue", {
  redis: { host: process.env.REDISDOKER, port: 6379 },
});

const sendToMessage = new Queue("message-queue", {
  redis: { host: process.env.REDISDOKER, port: 6379 },
});
export default (message) => {
  const main = async () => {
    console.log(message);
    await sendToMessage.add(message);
  };

  receiveFromMessage.process(async (job, done) => {
    sendToMessage.add(await hasMoney(job.data, MESSAGE_CREDIT));
    done();
  });

  main().catch(console.error);
};
