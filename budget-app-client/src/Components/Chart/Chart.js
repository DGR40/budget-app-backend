import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
  console.log(props.dataPoints);

  let totalAmount = 0;

  props.dataPoints.forEach((point) => (totalAmount += point.value));

  console.log("selected category", props.selectedCategory === "Food and Drink");

  return (
    <div className="chart">
      {props.dataPoints.map((data) => (
        <ChartBar
          value={data.value}
          maxValue={props.budgetDict[data.label]}
          label={data.label}
          key={data.label}
          selected={props.selectedCategory === data.label}
        />
      ))}
    </div>
  );
};

export default Chart;
