const Expense = require("../models/Expense");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");

// @desc     Get all expenses
// @route    GET /api/v1/expenses
// @access   Public
exports.getExpenses = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc     Create new expense
// @route    POST /api/v1/expenses
// @access   Private
exports.createExpense = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  //

  const expense = await Expense.create(req.body);
  res.status(201).json({ success: true, data: expense });
});

// @desc     Update expense
// @route    PUT /api/v1/expenses/:id
// @access   Private
exports.updateExpense = asyncHandler(async (req, res, next) => {
  let expense = await Expense.findById(req.params.id);

  if (!expense) {
    return next(
      new ErrorResponse(`Expense not found with id of ${req.params.id}`, 404)
    );
  }

  if (expense.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this expense`,
        401
      )
    );
  }

  expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: expense });
});

// @desc     Delete expense
// @route    DELETE /api/v1/expenses/:id
// @access   Private
exports.deleteExpense = asyncHandler(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return next(
      new ErrorResponse(`Expense not found with id of ${req.params.id}`, 404)
    );
  }

  if (expense.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this expense`,
        401
      )
    );
  }

  await Expense.deleteOne({ _id: req.params.id });

  res.status(200).json({ success: true, data: {} });
});

// @desc     Get expenses within a radius
// @route    GET /api/v1/expenses/radius/:zipcode/:distance
// @access   Private
exports.getExpenseInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius: 3,963 mi
  const radius = distance / 3963;

  // Get only expenses of user (unless admin)
  let filter;

  if (req.user.role !== "admin") {
    filter = {
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
      user: req.user.id,
    };
  } else {
    filter = {
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    };
  }

  const expenses = await Expense.find(filter);

  res
    .status(200)
    .json({ success: true, count: expenses.length, data: expenses });
});
