import mongoose from "mongoose";

import database from "../database.js";
import backupDatabase from "../backupDatabase.js";

const budgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
  },
});

const Budget = database.model("Budget", budgetSchema);
const BackupBudget = backupDatabase.model("BackupBudget", budgetSchema);

export { Budget, BackupBudget };
