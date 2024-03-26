import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
  console.log(props.dataPoints);

  let totalAmount = 0;

  props.dataPoints.forEach((point) => (totalAmount += point.value));

  return (
    <div className="chart">
      {props.dataPoints.map((data) => (
        <ChartBar
          value={data.value}
          maxValue={props.budgetDict[data.label]}
          label={data.label}
          key={data.label}
          className={
            props.selectedCategory === data.label
              ? "chart-bar__fill selectedBar"
              : "chart-bar__fill"
          }
        />
      ))}
    </div>
  );
};

export default Chart;
