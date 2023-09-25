import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { decadeReports } from "../Tornado";
import { ChartData } from "../ChartData";

const decadeData: any[] = [];
export function UseDecadeData(e: (typeof decadeReports)[]) {
  e.map((e) => {
    decadeData.push(e);
  });
  dataForChart();
}
const dataForChart = () => {
  let chartData: ChartData;
  const data: any[] = [];
  decadeData.map((e) => {
    chartData = {
      year: e.decade,
      fatalities: e.fatalities,
      magnitude: e.avgMagnitude,
      propLoss: e.propertyLoss,
      injuries: e.injuries,
    };
    data.push(chartData);
  });
  return data;
};

const renderLineChart = (
  //   <LineChart width={600} height={600} data={dataForChart()}>
  //     <Line type="monotone" dataKey="fatalities" stroke="#fd3d93" />
  //     <Line type="monotone" dataKey="magnitude" stroke="#ccc" />
  //     <CartesianGrid stroke="#5f5dbc" />
  //     <Tooltip />
  //     <XAxis dataKey="year" />
  //     <YAxis />
  <div>
    <AreaChart
      width={730}
      height={550}
      data={dataForChart()}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey={"year"} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="fatalities"
        stroke="8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
      <Area
        type="monotone"
        dataKey="injuries"
        stroke="82ca9d"
        fillOpacity={1}
        fill="url(#colorPv)"
      />
      <Area
        type="monotone"
        dataKey="magnitude"
        stroke="#ccc"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  </div>
);
export const DemoComponent = () => {
  return renderLineChart;
};
