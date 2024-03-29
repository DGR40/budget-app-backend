import Chart from "../Chart/Chart";

const CategoryExpenseChart = (props) => {
  const chartCategoryData = {
    "Food and Drink": 0,
    Shopping: 0,
    Entertainment: 0,
    Rent: 0,
    Subscriptions: 0,
    Transportation: 0,
  };

  for (const expense of props.expenses) {
    const expenseCategory = expense.category;
    chartCategoryData[expenseCategory] += expense.amount;
  }

  const adjustedCategoryData = [
    { label: "Food and Drink", value: chartCategoryData["Food and Drink"] },
    { label: "Shopping", value: chartCategoryData["Shopping"] },
    { label: "Entertainment", value: chartCategoryData["Entertainment"] },
    { label: "Rent", value: chartCategoryData["Rent"] },
    { label: "Subscriptions", value: chartCategoryData["Subscriptions"] },
    { label: "Transportation", value: chartCategoryData["Transportation"] },
  ];

  return (
    <Chart
      dataPoints={adjustedCategoryData}
      budgetDict={props.budgetDict}
      selectedCategory={props.selectedCategory}
    />
  );
};

export default CategoryExpenseChart;
