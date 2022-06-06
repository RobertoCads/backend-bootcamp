import Budget from "../models/budget.js";
import checkBudget from "./checkBudget.js"


export default async (amountNumber) => {
    let actualAmount = await checkBudget()
  try {

      if(actualAmount) {
          actualAmount.amount = actualAmount.amount + amountNumber
          const sum = await actualAmount.save()
          return sum
      } else {
          const sum = Budget.create({ amount: amountNumber})
          return sum
      }
  } catch(err) {
      console.log("Error while saving", err)
  }
};
