import Queue from "bull";
import http from "http";
// import checkBudget from "../clients/checkBudget.js";
// import saveAmount from "../clients/saveAmount.js";
import sendMessage from "../controllers/sendMessage.js";
import "dotenv/config";

export default (task, statusId) => {
  statusId && console.log("Processing Message", statusId);

  const sendToCredit = new Queue("credit-queue", {
    redis: { host: process.env.REDISDOKER, port: 6379 },
  });

  const receiveFromCredit = new Queue("message-queue", {
    redis: { host: process.env.REDISDOKER, port: 6379 },
  });

  const saveMessage = new Queue("save-message", {
    redis: { host: process.env.REDISDOKER, port: 6379 },
  });

  const main = async () => {
    console.log("Message Processing", statusId);
    await sendToCredit.add(task);
  };

  receiveFromCredit.process(async (job, done) => {
    console.log(job.data, "JOB DATAAAA_------------");
    saveMessage.add(await sendMessage(job.data));
    done();
  });

  saveMessage.process((job, done) => {
    console.log("Save message Queue", job.data);
    done();
  });

  main().catch(console.error);
};
