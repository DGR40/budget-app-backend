// @desc     Get all expenses
// @route    GET /api/v1/expenses
// @access   Public

exports.getExpenses = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Get all expenses" });
};

// @desc     Create new expense
// @route    POST /api/v1/expenses/:id
// @access   Private
exports.createExpense = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Create expense` });
};

// @desc     Update expense
// @route    PUT /api/v1/expenses/:id
// @access   Private
exports.updateExpense = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update expense with id ${req.params.id}` });
};

// @desc     Delete expense
// @route    DELETE /api/v1/expenses/:id
// @access   Private
exports.deleteExpense = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete expense with id ${req.params.id}` });
};
