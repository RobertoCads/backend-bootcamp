import mongoose from "mongoose";
import backupDatabase from "../backupDatabase.js";
import database from "../database.js";


const budgetSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Budget = database.model("Budget", budgetSchema);
const BackupBudget = backupDatabase.model("BackupBudget", budgetSchema);

Budget.syncIndexes();
BackupBudget.syncIndexes();

export { Budget, BackupBudget };
