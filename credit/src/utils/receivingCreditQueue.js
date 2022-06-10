import Queue from "bull";
import saveAmount from "../clients/saveAmount.js";

export default () => {
  const receiveCreditFromCredit = new Queue("receiving-queue", {
    redis: { host: process.env.REDISDOKER, port: 6379 },
  });

  receiveCreditFromCredit.process((job, done) => {
    console.log(job.data.amount, "Credit job------------------");
    saveAmount(job.data.amount);
    done();
  });
};
