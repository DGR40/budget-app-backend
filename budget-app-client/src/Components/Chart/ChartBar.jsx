import React from "react";
import { useRef } from "react";

import "./ChartBar.css";

const ChartBar = (props) => {
  let barFillHeight = "0%";

  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.value / props.maxValue) * 100);
  }

  let color = barFillHeight > 100 ? "red" : "purple";

  console.log(props.selectedCategory);

  const innerBarRef = useRef();

  const innerBarHeight = innerBarRef.current.offsetY;

  return (
    <div className="chart-bar">
      <div
        className="chart-bar__max_label"
        style={{
          bottom: innerBarHeight,
        }}
      >
        {barFillHeight + "%"}
      </div>
      <div className={`chart-bar__inner`} ref={innerBarRef}>
        <div
          className={(props.className, color)}
          style={{
            height: barFillHeight + "%",
          }}
        ></div>
      </div>
      {/* <div className="chart-bar__label">{props.label}</div> */}
    </div>
  );
};

export default ChartBar;
