import bodyParser from "body-parser";
import express from "express";
import redisStart from "./src/utils/redisStart.js";
import { ValidationError, Validator } from "express-json-validator-middleware";

import getMessages from "./src/controllers/getMessages.js";
import sendMessage from "./src/controllers/sendMessage.js";
// import sendAmount from "./src/controllers/sendAmount.js";
import getMessageStatus from "./src/clients/getMessageStatus.js";
import checkBalance from "./src/controllers/checkBalance.js";



const app = express();
const redis = redisStart();

const validator = new Validator({ allErrors: true });
const { validate } = validator;



const messageSchema = {
  type: "object",
  required: ["destination", "body"],
  properties: {
    destination: {
      type: "string",
    },
    body: {
      type: "string",
    },
  },
};

// const budgetSchema = {
//   type: "object",
//   required: ["amount"],
//   properties: {
//     amount: {
//       type: "number",
//     },
//   },
// };

app.post(
  "/message",
  bodyParser.json(),
  validate({ body: messageSchema }),
  // sendMessage
  checkBalance
);

app.get("/messages", getMessages);

// app.post(
//   "/credit",
//   bodyParser.json(),
//   validate({ body: budgetSchema }),
//   sendAmount
// );

app.get("/message/:messageId/status", getMessageStatus);

app.use((err, req, res, _next) => {
  console.log(res.body);
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

const port = 9003;
app.listen(port, () => {
  console.log("App started on PORT: ", port);
});
