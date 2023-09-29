import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ScatterChart,
  Scatter,
  Legend,
} from "recharts";
import { StateDecadeTotals } from "../types/ChartData";
import { useEffect, useState } from "react";

export default function AreaChartData(data: any[]) {
  const [totals, setTotals] = useState<StateDecadeTotals[]>();

  useEffect(() => {
    setTotals(data);
  }, [totals, data]);

  const sortDataForChart = () => {
    const list: any[] = [];

    for (const k in totals) {
      list.push(totals[k]);
    }
    return list;
  };
  {
    return (
      <div>
        <ScatterChart
          width={730}
          height={550}
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis
            dataKey={"propertyLoss"}
            type="number"
            name="property loss"
            unit={"$"}
          />

          <YAxis dataKey={"avgMagnitude"} type="number" />
          {/* <ZAxis dataKey={"propLoss"} type="number" range={[64, 144]} /> */}
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter name="Property Loss" data={data} fill="#8884d8" />
        </ScatterChart>
        <AreaChart
          width={730}
          height={550}
          data={sortDataForChart()}
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
          <XAxis dataKey={"decade"} />
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
}
