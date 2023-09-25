import { decadeReports } from "../Tornado";
import { ChartData } from "../ChartData";
import { PieChart, Tooltip, Pie } from "recharts";

let decadeData = decadeReports;
export function GetPieData(e: typeof decadeReports) {
  decadeData = e;
  dataForChart();
}
const dataForChart = () => {
  let chartData: ChartData;
  let data: any[] = [];
  decadeData.decadeReport.map((e, index) => {
    if (index == 0) {
      return;
    } else {
      chartData = {
        year: e.decade,
        fatalities: e.fatalities,
        magnitude: e.avgMagnitude,
        propLoss: e.propertyLoss,
        injuries: e.injuries,
      };
      data.push(chartData);
    }
  });
  return data;
};
const renderPieChart = (
  <PieChart width={730} height={250}>
    <Pie
      data={dataForChart()}
      dataKey="propLoss"
      nameKey="year"
      cx="50%"
      outerRadius={50}
      fill="8884d8"
    />
    <Tooltip />
  </PieChart>
);
export const PieGraphComponent = () => {
  return renderPieChart;
};
