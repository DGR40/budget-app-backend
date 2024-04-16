import CategoryFilterBubble from "./CategoryFilterBubble";
import "./CategoryFilter.css";
import Card from "../UI/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import authStore from "./../../Store/authStore";

function CategoryFilter(props) {
  const aStore = authStore();

  const categories = [
    "Food and Drink",
    "Shopping",
    "Entertainment",
    "Rent",
    "Other",
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

  const chartCategoryData = {
    "Food and Drink": 0,
    Shopping: 0,
    Entertainment: 0,
    Rent: 0,
    Other: 0,
  };

  for (const expense of props.expenses) {
    const expenseCategory = expense.category;
    chartCategoryData[expenseCategory] += expense.amount;
  }

  const budgetData = aStore.user
    ? {
        "Food and Drink":
          chartCategoryData["Food and Drink"] / aStore.user.foodAndDrink,
        Shopping: chartCategoryData["Shopping"] / aStore.user.shopping,
        Entertainment:
          chartCategoryData["Entertainment"] / aStore.user.entertainment,
        Rent: chartCategoryData["Rent"] / aStore.user.rent,
        Other: chartCategoryData["Other"] / aStore.user.misc,
      }
    : {
        "Food and Drink": 0,
        Shopping: 0,
        Entertainment: 0,
        Rent: 0,
        Other: 0,
      };

  const budgetDataYearly = aStore.user
    ? {
        "Food and Drink":
          chartCategoryData["Food and Drink"] / (aStore.user.foodAndDrink * 12),
        Shopping: chartCategoryData["Shopping"] / (aStore.user.shopping * 12),
        Entertainment:
          chartCategoryData["Entertainment"] / (aStore.user.entertainment * 12),
        Rent: chartCategoryData["Rent"] / (aStore.user.rent * 12),
        Other: chartCategoryData["Other"] / (aStore.user.misc * 12),
      }
    : {
        "Food and Drink": 0,
        Shopping: 0,
        Entertainment: 0,
        Rent: 0,
        Other: 0,
      };

  function getPercent(c) {
    if (props.yearMode) {
      return budgetDataYearly[c] >= 1
        ? 100
        : Math.round(budgetDataYearly[c] * 100, 3);
    } else {
      return budgetData[c] >= 1 ? 100 : Math.round(budgetData[c] * 100, 3);
    }
  }

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
                    value={getPercent(c)}
                    size={"6rem"}
                    sx={{
                      "& .MuiCircularProgress-circle": {
                        stroke: `${budgetData[c] > 1 ? "#ff6962" : "#77dd78"}`,
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
                      fontWeight={"500"}
                    >
                      {`${getPercent(c)}%`}
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
