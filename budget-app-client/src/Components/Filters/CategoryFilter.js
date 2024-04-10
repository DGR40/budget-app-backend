import CategoryFilterBubble from "./CategoryFilterBubble.js";
import "./CategoryFilter.css";
import Card from "../UI/Card.js";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CategoryFilter(props) {
  const categories = [
    "Food and Drink",
    "Shopping",
    "Entertainment",
    "Rent",
    "Subscriptions",
    "Transportation",
  ];

  function categoryChangeHandler(value) {
    // call up to the filter zone
    props.onCategoryChange(value);
  }

  function getClass(category, c) {
    if (category === c) {
      return "selected bubble";
    } else {
      return "bubble";
    }
  }

  console.log(props.selectedCategory);

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

  for (const c in chartCategoryData) {
    chartCategoryData[c] = chartCategoryData[c] / props.budgetDict[c];
  }
  console.log(props.selectedCategory, "props selected");

  return (
    <Card>
      <div className="categories">
        {categories.map((c) => {
          {
            return (
              <div
                className={`category chart-bar__inner ${
                  props.selectedCategory === c ? "selected" : ""
                } ${props.selectedCategory !== "All" ? "active" : ""}`}
                onClick={() => categoryChangeHandler(c)}
                key={c}
              >
                <CategoryFilterBubble
                  type={c}
                  onCategoryChange={categoryChangeHandler}
                  key={c}
                  className={"bubble"}
                ></CategoryFilterBubble>
                <div className="circle-container">
                  <CircularProgress
                    variant="determinate"
                    value={
                      chartCategoryData[c] >= 1
                        ? 100
                        : Math.round(chartCategoryData[c] * 100, 2)
                    }
                    size={"6rem"}
                    sx={{
                      "& .MuiCircularProgress-circle": {
                        stroke: `${
                          chartCategoryData[c] > 1 ? "#ff6962" : "#77dd78"
                        }`,
                        strokeWidth: "4px",
                        position: "relative",
                        fill: "rgb(255,255,255,0.1)",
                      },
                      "& MuiCircularProgress-circleDeterminate": {
                        color: "white",
                        fill: "white",
                        // margin: "2px",
                      },
                      ".css-1idz92c-MuiCircularProgress-svg": {},
                    }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="white"
                      fontSize={"1rem"}
                      fontWeight={"1000"}
                    >
                      {chartCategoryData[c] > 1
                        ? "100"
                        : Math.round(chartCategoryData[c] * 100, 3)}
                      %
                    </Typography>
                  </Box>
                </div>
              </div>
            );
          }
        })}
      </div>
    </Card>
  );
}

export default CategoryFilter;
