const express = require("express");

const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseInRadius,
} = require("../controllers/expenses");

const Expense = require("../models/Expense");

const router = express.Router();

// Middleware
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

router.route("/radius/:zipcode/:distance").get(protect, getExpenseInRadius);

router
  .route("/")
  .get(
    protect,
    authorize("user", "admin"),
    advancedResults(Expense),
    getExpenses
  )
  .post(protect, createExpense);
router.route("/:id").put(protect, updateExpense).delete(protect, deleteExpense);

module.exports = router;
