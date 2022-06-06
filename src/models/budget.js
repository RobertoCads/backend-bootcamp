import mongoose from "mongoose";

import database from "../database.js";

const budgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
  },
});

export default database.model("Budget", budgetSchema);
