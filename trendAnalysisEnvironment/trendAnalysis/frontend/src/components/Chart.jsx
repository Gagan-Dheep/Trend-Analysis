import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { faker } from "@faker-js/faker";

function generateOscillatingData() {
  const data = [["X", "Line 1", "Line 2"]];
  let value1 = faker.datatype.number({ min: 1, max: 100 });
  let value2 = faker.datatype.number({ min: 1, max: 100 });

  for (let i = 0; i < 16; i++) {
    value1 = value1 + faker.datatype.number({ min: -10, max: 10 });
    value2 = value2 + faker.datatype.number({ min: -10, max: 10 });

    // Ensure values are within the range
    value1 = Math.max(1, Math.min(100, value1));
    value2 = Math.max(1, Math.min(100, value2));

    data.push([i, value1, value2]);
  }

  return data;
}

export const options = {
  colors: ["#FF5733", "#33FF57"],
  pointSize: 0, // Disable points to focus on lines
  lineWidth: 4, // Control the width of the lines
  animation: {
    duration: 1000,
    easing: "out",
    startup: true,
  },
  backgroundColor: '#1E293B',
  vAxis: {
    viewWindow: {
      max: 100,
      min: 0,
    },
    gridlines: { color: '#374551' },
    textStyle: { color: '#D1D5DB' },
  },
  hAxis: {
    viewWindow: {
      max: 16,
      min: 0,
    },
    gridlines: { color: '#374151' },
    textStyle: { color: '#D1D5DB' },
  },
  legend: { position: "none" },
  enableInteractivity: false,
};

const ChartComponent = () => {
  const [chartData, setChartData] = useState(generateOscillatingData);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setChartData(generateOscillatingData());
    }, 900);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    // <div className="p-5 bg-gray-800 border rounded-3xl">
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    // </div>
  );
};

export default ChartComponent;