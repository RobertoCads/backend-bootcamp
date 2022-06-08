import { Budget, BackupBudget } from "../models/budget.js";
import checkBudget from "./checkBudget.js";

export default async (amountNumber) => {
  let actualAmount = await checkBudget();
  let passAmount = actualAmount ? actualAmount.amount : 0;
  try {
    if (actualAmount) {
      actualAmount.amount = actualAmount.amount + amountNumber;
      const response = await actualAmount.save();
      await BackupBudget.findOneAndUpdate({ amount: response.amount });
      return response;
    } else {
      const response = await Budget.create({ amount: amountNumber });
      await BackupBudget.create({ amount: response.amount }).catch((err) => {
        Budget.update({}, { amount: amountNumber });
        console.log(err, "Error, Rolling Back");
      });
      console.log(response);
      return response;
    }
  } catch (err) {
    await Budget.findOneAndUpdate({}, { amount: passAmount });
    console.log(passAmount);
    console.log("Error while saving", err);
  }
};
