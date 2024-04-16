import Card from "../UI/Card";
import "./Dashboard.css";

const Dashboard = (props) => {
  let maxBudget = 0;

  if (
    props.selectedCategory !== "All" &&
    props.selectedMobileCategory === "All"
  ) {
    maxBudget = props.budgetDict[props.selectedCategory];
  } else if (
    props.selectedMobileCategory !== "All" &&
    props.selectedCategory === "All"
  ) {
    maxBudget = props.budgetDict[props.selectedMobileCategory];
  } else {
    maxBudget = props.budgetDict["All"];
  }

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function getMonthFromString(mon) {
    return new Date(Date.parse(mon + " 1, " + props.selectedYear)).getMonth();
  }

  let currYear = new Date().getFullYear().toString();
  let currDay = new Date().toLocaleString("en-us", { day: "2-digit" });
  let currMonth = new Date().getMonth();
  let month = getMonthFromString(props.selectedMonth);
  let daysInCurrMonth = new Date(month, props.selectedYear, 0).getDate();
  let daysLeft = daysInCurrMonth - currDay;

  let total = 0;
  for (const expense of props.expenses) {
    total += expense.amount;
  }

  let net = Math.round(maxBudget - total);

  let date1 = new Date();
  let date2 = new Date("Dec 31, " + currYear + ", 23:59:59");

  //calculate total number of seconds between two dates
  let total_seconds = Math.abs(date2 - date1) / 1000;

  //calculate days difference by dividing total seconds in a day
  let daysLeftInYear = Math.floor(total_seconds / (60 * 60 * 24));

  return (
    <Card className="dashboard">
      <Card className={`total ${net > 0 ? "green" : "red"} above-below-budget`}>
        <h1>{net >= 0 ? USDollar.format(net) : USDollar.format(net * -1)}</h1>
        <p>{net > 0 ? "Below Budget" : "Above Budget"}</p>
      </Card>
      <div className="dashboard-container">
        <div className="dashboard-container">
          <Card className="total">
            <h1>{USDollar.format(total)}</h1>
            <p>{props.yearMode ? "Yearly Total" : "Monthly Total"}</p>
          </Card>
          {currMonth === month &&
            !props.yearMode &&
            currYear === props.selectedYearWithMonth && (
              <Card className="total">
                <h1>{daysLeft}</h1>
                <p>Days Left in Month</p>
              </Card>
            )}
          {currYear === props.selectedYear && props.yearMode && (
            <Card className="total">
              <h1>{daysLeftInYear}</h1>
              <p>Days Left in Year</p>
            </Card>
          )}

          <Card className={`total`}>
            <h1>{USDollar.format(maxBudget)}</h1>
            <p>Max Budget</p>
          </Card>
        </div>
      </div>
    </Card>
  );
};
export default Dashboard;
