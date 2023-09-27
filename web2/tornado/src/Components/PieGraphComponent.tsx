import { TornadoDecadeData } from "../Tornado";
import { ChartData, StateTotals } from "../ChartData";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  ScatterChart,
  Scatter,
  CartesianGrid,
} from "recharts";
import { useState, useEffect } from "react";
import { getTornadoDecadeData } from "../Api";

function PieChartData() {
  const [decadeData, setDecadeData] = useState<TornadoDecadeData[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function setData() {
    try {
      setLoading(true);
      const pieData = await getTornadoDecadeData();
      setDecadeData(pieData);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
      dataForPieChart();
    }
  }
  const dataForPieChart = () => {
    let chartData: ChartData;
    const data: any[] = [];
    if (!loading) {
      decadeData!.map((e, index) => {
        if (index == 0) {
          return;
        } else {
          chartData = {
            year: e.decade,
            fatalities: e.fatalities,
            avgmagnitude: e.avgMagnitude,
            propLoss: e.propertyLoss,
            injuries: e.injuries,
          };

          data.push(chartData);
        }
      });
    }
    return data;
  };
  useEffect(() => {
    setData();
  }, []);

  if (error) return "Failed to load data for pie chart";
  return loading ? (
    "Loading ...."
  ) : (
    <div className="flex inline-block">
      <BarChart
        width={930}
        height={550}
        data={dataForPieChart()}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <XAxis dataKey={"year"} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={"fatalities"} fill="#8884d8" />
        <Bar dataKey={"injuries"} fill="#82ca9d" />
        <Bar dataKey={"avgmagnitude"} fill="#ccc" />
      </BarChart>

      <ScatterChart
        width={730}
        height={550}
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
      >
        <CartesianGrid strokeDasharray={"3 3"} />
        <XAxis
          dataKey={"propLoss"}
          type="number"
          name="property loss"
          unit={"$"}
        />
        <YAxis dataKey={"year"} type="date" />
        {/* <ZAxis dataKey={"propLoss"} type="number" range={[64, 144]} /> */}
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter name="Property Loss" data={dataForPieChart()} fill="#8884d8" />
      </ScatterChart>
    </div>
  );
}
export default PieChartData;
