import bodyParser from "body-parser";
import express from "express";
import { ValidationError, Validator } from "express-json-validator-middleware";
import creditQueue from "./src/utils/creditQueue.js";
import receivingCreditQueue from "./src/utils/receivingCreditQueue.js";

creditQueue();
receivingCreditQueue();

import sendAmount from "./src/controllers/sendAmount.js";

const app = express();


const validator = new Validator({ allErrors: true });
const { validate } = validator;

const budgetSchema = {
  type: "object",
  required: ["amount"],
  properties: {
    amount: {
      type: "number",
    },
  },
};

app.post(
  "/credit",
  bodyParser.json(),
  validate({ body: budgetSchema }),
  sendAmount
);

app.use((err, req, res, _next) => {
  console.log(res.body);
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

const port = 9017;
app.listen(port, () => {
  console.log("App started on PORT: ", port);
});
