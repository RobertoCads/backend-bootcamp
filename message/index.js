import bodyParser from "body-parser";
import express from "express";
import redisStart from "./src/utils/redisStart.js";
import { ValidationError, Validator } from "express-json-validator-middleware";

import getMessages from "./src/controllers/getMessages.js";
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

app.post(
  "/message",
  bodyParser.json(),
  validate({ body: messageSchema }),
  checkBalance
);

app.get("/messages", getMessages);

app.get("/message/:messageId/status", getMessageStatus);

app.get("/health", getMessages)

app.use((err, req, res, _next) => {
  console.log(res.body);
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

const MESSAGE_PORT = process.env.MESSAGE_PORT
app.listen(MESSAGE_PORT, () => {
  console.log("App started on PORT: ", MESSAGE_PORT);
});