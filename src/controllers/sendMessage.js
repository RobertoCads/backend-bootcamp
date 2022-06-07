import http from "http";
import saveMessage from "../clients/saveMessage.js";
import checkBudget from "../clients/checkBudget.js"
import saveAmount from "../clients/saveAmount.js";

const MESSAGE_PRICE = 2;

export default async (req, res) => {
  const body = JSON.stringify(req.body);

  const actualAmount = await checkBudget()

    console.log(actualAmount.amount);
    if (actualAmount.amount < MESSAGE_PRICE) {
      return res.status(500).json("Not enough money")
    } else {
      saveAmount(-MESSAGE_PRICE)
    }


  const postOptions = {
    host: "localhost", // en local
    // host: "messageapp", // Para imagen docker
    port: 3000,
    path: "/message",
    method: "post",
    json: true,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  };

  const postReq = http.request(postOptions);

  postReq.on("response", async (postRes) => {
     try {
        await saveMessage({
          ...req.body,
          status: postRes.statusCode === 200 ? "OK" : "ERROR",
        });
        if (postRes.statusCode !== 200) {
          throw new Error('Error in the messageapp request');
        }
  
        res.statusCode = 200;
        res.end(postRes.body);
      } catch (error) {
        saveAmount(MESSAGE_PRICE)
        console.log(error.message, "Your money was returned");
        res.statusCode = 500;
        res.end(`Internal server error: SERVICE ERROR ${error.message}`);
      }
  });

  postReq.on("timeout", async () => {
    console.error("Timeout Exceeded!");
    postReq.abort();

    try {
      await saveMessage({
        ...req.body,
        status: "TIMEOUT",
      });

    } finally {
      saveAmount(MESSAGE_PRICE);
      res.statusCode = 500;
      res.end("Internal server error: TIMEOUT");
    }
  });

  postReq.on("error", (error) => {
    res.statusCode = 500;
    res.end(error.message);
  });

  postReq.write(body);
  postReq.end();
}