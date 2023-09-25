import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  decadeReports,
  TornadoDecadeData,
  Tornado,
  tornadoReport,
} from "../Tornado";
import { ChartData } from "../ChartData";
import { Component, useEffect, useState } from "react";
import { getTornadoDecadeData } from "../Api";

function AreaChartData() {
  const [decadeData, setDecadeData] = useState<TornadoDecadeData[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  async function setData() {
    try {
      setLoading(true);
      const value = await getTornadoDecadeData();
      setDecadeData(value);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
      dataForChart();
    }
  }
  const dataForChart = () => {
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

  if (error) return "Failed to load decade data";
  return loading ? (
    "Loading... "
  ) : (
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
          dataKey="avgmagnitude"
          stroke="#ccc"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
}
export default AreaChartData;
