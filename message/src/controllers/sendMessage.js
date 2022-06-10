import http from "http";
import saveMessage from "../clients/saveMessage.js";
import "dotenv/config";

import sendCreditQueue from "../utils/sendCreditQueue.js";

const MESSAGE_PRICE = 2;

export default async (body) => {
  if (body.status === "NOT ENOUGH MONEY") {
    await saveMessage({
      destination: body.destination,
      body: body.body,
      statusId: body.statusId,
      status: (body.status = "NOT ENOUGH MONEY"),
    });
    console.log("Esta llegando------------------");
    return "Pleas Refund Credit";
  }

  const postOptions = {
    host: process.env.MESSAGEAPP,
    port: 3000,
    path: "/message",
    method: "post",
    json: true,
    headers: {
      "Content-Type": "application/json",
      // "Content-Length": Buffer.byteLength(body),
    },
  };

  const postReq = http.request(postOptions);

  postReq.on("response", async (postRes) => {
    try {
      await saveMessage({
        destination: body.destination,
        body: body.body,
        statusId: body.statusId,
        status: postRes.statusCode === 200 ? "OK" : "ERROR",
      });
      if (postRes.statusCode !== 200) {
        throw new Error("Error in the messageapp request");
      }
    } catch (error) {
      sendCreditQueue({ amount: MESSAGE_PRICE });
      console.log(error.message, "Your money was returned");
    }
  });

  postReq.on("timeout", async () => {
    console.error("Timeout Exceeded!");
    postReq.abort();

    try {
      await saveMessage({
        destination: body.destination,
        body: body.body,
        statusId: body.statusId,
        status: (body.status = "TIMEOUT"),
      });
    } finally {
      sendCreditQueue({ amount: MESSAGE_PRICE });
      console.log("TIMEOUT");
    }
  });

  postReq.on("error", (error) => {
    console.log(error, "Server Error");
  });

  const bodyString = {
    destination: body.destination,
    body: body.body,
  };

  const payload = JSON.stringify(bodyString);

  console.log(payload, "--------PAYLOAD-----------");
  postReq.write(payload);
  postReq.end();
};
