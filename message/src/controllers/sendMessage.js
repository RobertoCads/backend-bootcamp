import http from "http";
import saveMessage from "../clients/saveMessage.js";
import saveAmount from "./../../../credit/src/clients/saveAmount.js";
import queue from "../utils/messageQueue.js";
import uniqid from "uniqid";
import "dotenv/config";
import { Message } from "../models/message.js";
import checkBalance from "./checkBalance.js";


const MESSAGE_PRICE = 2;

export default async (body) => {
  if (body.status === "NOT ENOUGH MONEY") {
    await saveMessage({
      destination: body.destination,
      body: body.body,
      statusId: body.statusId,
      status: body.status = "NOT ENOUGH MONEY",
    });
    // return res.status(500).json("Not enough money");
    console.log("Esta llegando------------------")
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
      // res.statusCode = 200;
      // res.end(postRes.body);
    } catch (error) {
      saveAmount(MESSAGE_PRICE);
      console.log(error.message, "Your money was returned");
      // res.statusCode = 500;
      // res.end(`Internal server error: SERVICE ERROR ${error.message}`);
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
        status: "TIMEOUT",
      });
    } finally {
      saveAmount(MESSAGE_PRICE);
      console.log("TIMEOUT");
      // res.statusCode = 500;
      // res.end("Internal server error: TIMEOUT");
    }
  });

  postReq.on("error", (error) => {
    console.log(error, "Server Error");
    // res.statusCode = 500;
    // res.end(error.message);
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

// const statusId = uniqid()

// try {
//   saveMessage({
//     ...req.body,
//     status: "PENDING",
//     statusId
//   })
// } catch(err) {
//   return res.status(500).json("Error saving the message", error)
// }
