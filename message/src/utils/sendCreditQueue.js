import Queue from "bull";

export default (credit) => {
  const sendCreditToCredit = new Queue("receiving-queue", {
    redis: { host: process.env.REDISDOKER, port: 6379 },
  });
  
  const main = async () => {
    await sendCreditToCredit.add(credit);
  };

  main().catch(console.error)
};
