const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Please add a title"],
    unique: false,
    trim: true,
    maxLength: [50, "Name cannot be more than 50 chars"],
    index: true,
  },
  amount: {
    type: Number,
    required: [true, "Please add an amount"],
    unique: false,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: [true, "Please select a category"],
    unique: false,
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
