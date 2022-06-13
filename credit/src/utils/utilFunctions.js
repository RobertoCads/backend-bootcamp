import checkBudget from "../clients/checkBudget.js";
import saveAmount from "../clients/saveAmount.js";

export const hasMoney = async (message, MESSAGE_CREDIT) => {
  const actualMoney = await checkBudget();
  if (actualMoney.amount >= MESSAGE_CREDIT) {
    message.status = "OK";
    saveAmount(-MESSAGE_CREDIT);
    return message;
  } else {
    message.status = "NOT ENOUGH MONEY";
    return message;
  }

};
