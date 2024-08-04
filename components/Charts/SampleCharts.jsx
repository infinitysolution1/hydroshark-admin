import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    revenue: 4000,
    profit: 2400,
    expenses: 1600,
  },
  {
    name: "Feb",
    revenue: 4000,
    profit: 2400,
    expenses: 1600,
  },
  {
    name: "March",
    revenue: 3000,
    profit: 2400,
    expenses: 600,
  },
  {
    name: "April",
    revenue: 8000,
    profit: 6000,
    expenses: 2000,
  },
  {
    name: "May",
    revenue: 1000,
    profit: 600,
    expenses: 400,
  },
  {
    name: "June",
    revenue: 9000,
    profit: 3000,
    expenses: 6000,
  },
  {
    name: "Jul",
    revenue: 3000,
    profit: 2400,
    expenses: 600,
  },
  {
    name: "Aug",
    revenue: 9000,
    profit: 3000,
    expenses: 6000,
  },
];

export default class BarChartDashboard extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  render() {
    return (
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="flex flex-col items-start justify-end"
      >
        <BarChart
          width={300}
          height={200}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: -15,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize={8} dataKey="name" />
          <YAxis fontSize={8} />
          <Tooltip />

          <Bar
            dataKey="revenue"
            label="Revenue"
            fill="#181818"
            activeBar={
              <Rectangle
                fill="#131313"
                width={14}
                strokeWidth={1}
                stroke="#c7c7c7"
              />
            }
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
