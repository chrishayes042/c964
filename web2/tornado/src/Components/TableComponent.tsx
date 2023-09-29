import {
  getAllData,
  getTornadoDecadeData,
  getStateData,
  getStateTotalData,
  getStateDecadeTotalData,
} from "../Api";
import { Tornado, TornadoDecadeData } from "../types/Tornado";
import {
  ChartData,
  StateChartData,
  StateTotals,
  StateDecadeTotals,
} from "../types/ChartData";
import { useState, useEffect } from "react";
import Slider from "rc-slider";
import AreaChartData from "./ChartComponent";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "rc-slider/assets/index.css";
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
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";
function TableData() {
  const [tableData, setTableData] = useState<Tornado[]>();
  const [tableStateData, setTableStateData] = useState<Tornado[]>();
  const [tableDecadeData, setTableDecadeData] = useState<TornadoDecadeData[]>();
  const [decadeData, setDecadeData] = useState<TornadoDecadeData[]>();
  const [stateTotals, setStateTotals] = useState<StateDecadeTotals[]>();
  const [stateTotalsSingle, setStateTotalsSingle] = useState<StateTotals>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [predictValue, setPredictValue] = useState(0);
  const [inStateValue, setInStateValue] = useState(false);
  const [stateValue, setStateValue] = useState("");
  const marks = {
    2030: "2030",
    2040: "2040",
    2050: "2050",
    2060: "2060",
    2070: "2070",
    2080: "2080",
    2090: "2090",
  };
  async function setData() {
    try {
      setLoading(true);
      const allData = await getAllData();
      const decadeDataApi = await getTornadoDecadeData();
      setTableData(allData);
      setTableDecadeData(decadeDataApi);

      setPredictValue(20);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    setData();
  }, []);

  type DropDownType = {
    value: string;
    states: string;
  };
  function dataForStateDropDawn() {
    const statesSet = new Set<string>();
    const stateList = new Array<DropDownType>();
    // const stateMap = new Map<string, string>();
    const list = new Array<string>();
    if (!loading) {
      tableData?.map((e, index) => {
        if (index == 0) {
          return;
        } else {
          statesSet.add(e.state);
        }
      });
    }
    let ddt: DropDownType;
    list.push("All");
    statesSet.forEach((e) => {
      list.push(e);
      ddt = {
        value: e,
        states: e,
      };
      stateList.push(ddt);
    });
    list.sort((n1, n2) => {
      if (n1 == "All" || n2 == "All") {
        return 0;
      }
      if (n1 > n2) {
        return 1;
      }
      if (n1 < n2) {
        return -1;
      }
      return 0;
    });
    return list;
  }
  const selectStateValue = (e: string) => {
    try {
      const val = e;
      setStateValue(val);
    } catch (err) {
      return;
    }
  };

  function dataForDecadeTable() {
    let td: ChartData;
    const data: ChartData[] = [];
    if (!loading) {
      tableDecadeData!.map((e, index) => {
        if (index == 0) {
          return;
        } else {
          td = {
            year: e.decade,
            fatalities: e.fatalities,
            avgmagnitude: e.avgMagnitude,
            propLoss: e.propertyLoss,
            injuries: e.injuries,
          };
          data.push(td);
        }
      });
      return data;
    }
  }
  const dataForStateTable = () => {
    let td: StateChartData;
    const data: StateChartData[] = [];
    if (inStateValue && !loading) {
      tableStateData!.map((e) => {
        td = {
          year: e.year,
          fatalities: e.fatalities,
          magnitude: e.magnitude,
          propLoss: e.propertyLoss,
          injuries: e.injuries,
          length: e.length,
          width: e.width,
          state: e.state,
          date: e.date,
        };

        data.push(td);
      });

      // stList.push(st);
      // setStateTotals(stList);
      return data;
    }
  };

  const getSelectedStateData = async () => {
    try {
      setLoading(true);
      if (stateValue == "All") {
        setInStateValue(false);
        const allData = await getTornadoDecadeData();
        setTableDecadeData(allData);
        const pieData = await getTornadoDecadeData();
        setDecadeData(pieData);
      } else {
        setInStateValue(true);
        const stateData = await getStateData(stateValue);
        const stateTotal = await getStateDecadeTotalData(stateValue);
        const stateSingle = await getStateTotalData(stateValue);
        setStateTotals(stateTotal);
        setStateTotalsSingle(stateSingle);
        setTableStateData(stateData);
        dataForStateCharts();
        dataForStateTable();
        dataForDecadeTable();
      }
    } catch (e) {
      return;
    } finally {
      setLoading(false);
    }
  };
  const dataForStateCharts = () => {
    const data: any[] = [];
    if (inStateValue && !loading) {
      console.log(stateTotals);
      stateTotals?.map((e) => {
        data.push(e);
      });
    }

    return data;
  };
  const DataForStateTable = () => {
    const data: any[] = [];
    if (inStateValue && !loading) {
      data.push(stateTotalsSingle);
    }
    return data;
  };
  const dataForPieChart = () => {
    let chartData: ChartData;
    const data: ChartData[] = [];
    if (!loading) {
      stateTotals!.map((e, index) => {
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
  if (error) return <p>Failed To Load Data.</p>;
  return loading ? (
    <p>Loading... Please wait, data may take a while to show up</p>
  ) : (
    <>
      <div className="flex flex-row w-72">
        <div className="pr-5"> State: </div>
        <Dropdown
          options={dataForStateDropDawn()}
          value={stateValue}
          onChange={(e) => selectStateValue(e.value)}
        />
        <div className="pl-5">
          <button
            className="h-6 px-8 text-sm text-center text-white uppercase bg-blue-700 border-2 border-blue-700 rounded-md text-blue-50 border-opacity-90 bg-opacity-90 hover:border-blue-900"
            onClick={getSelectedStateData}
          >
            Search
          </button>
        </div>
      </div>
      <div className="container pt-10">
        <div className="items-center justify-center w-60">
          <Slider
            trackStyle={{ backgroundColor: "black", height: 10 }}
            railStyle={{ backgroundColor: "lightblue", height: 10 }}
            handleStyle={{
              borderColor: "red",
              height: 20,
              width: 20,
              marginLeft: -10,
              marginTop: -5,
              backgroundColor: "red",
            }}
            marks={marks}
            step={null}
            defaultValue={2060}
            value={predictValue}
            // onChange={(e) => onChangeValueChange(e)}
            min={2030}
            max={2090}
            // value={year}
          />
          <div className="pt-5">
            <button className="h-6 px-8 text-sm text-center uppercase bg-blue-700 border-2 border-blue-700 rounded-md text-blue-50 border-opacity-90 bg-opacity-90 hover:border-blue-900">
              Predict Devastation
            </button>
          </div>
        </div>
      </div>
      <p>Change dates to predict future devastation</p>
      {!inStateValue ? (
        <>
          <div className="text-lg font-semibold tracking-tight uppercase">
            Main Data for each decade
          </div>

          <div className="pb-10">
            <div className="overflow-y-auto ">
              <table className="w-full mr-12 table-auto max-h-72">
                <thead className="text-sm text-gray-700 uppercase rounded-lg bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Decade</th>
                    <th className="px-6 py-3">Injuries</th>
                    <th className="px-6 py-3">Fatalities</th>
                    <th className="px-6 py-3">Property Loss</th>
                    <th className="px-6 py-3">Avg Magnitude</th>
                  </tr>
                </thead>

                {dataForDecadeTable()!.map((obj) => {
                  return (
                    <tbody className="bg-gray-100 border-t border-gray-500 hover:bg-green-200 hover:text-emerald-700">
                      <tr className="">
                        <td className="px-6 py-3"> {obj.year} </td>
                        <td>{obj.injuries} </td>
                        <td> {obj.fatalities} </td>
                        <td>
                          {" "}
                          {"$ " +
                            obj.propLoss.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}{" "}
                        </td>
                        <td> {obj.avgmagnitude} </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-lg font-semibold tracking-tight uppercase">
            State Data for {stateValue}
          </div>
          <div className="pb-10">
            <div className="w-full overflow-y-auto max-h-96">
              <table className="w-full mr-12 table-auto max-h-72">
                <thead className="text-sm text-gray-700 uppercase rounded-lg bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Year</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">State</th>
                    <th className="px-6 py-3">Magnitude</th>
                    <th className="px-6 py-3">Injuries</th>
                    <th className="px-6 py-3">Fatalities</th>
                    <th className="px-6 py-3">Property Loss</th>
                  </tr>
                </thead>
                {dataForStateTable()!.map((obj) => {
                  return (
                    <tbody className="bg-gray-100 border-t border-gray-500 hover:bg-green-200 hover:text-emerald-700">
                      <tr className="">
                        <td className="px-6 py-3"> {obj.year} </td>
                        <td>{obj.date} </td>
                        <td> {obj.state} </td>
                        <td> {obj.magnitude} </td>
                        <td> {obj.injuries} </td>
                        <td> {obj.fatalities} </td>
                        <td> {"$" + obj.propLoss} </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
            <table className="w-full mr-12 table-auto max-h-72">
              <thead className="text-sm text-gray-700 uppercase rounded-lg bg-gray-50">
                <tr>
                  <th className=""></th>
                  <th className=""></th>
                  <th className=""></th>
                  <th className=""></th>
                  <th className="">Injuries</th>
                  <th className="">Fatalities</th>
                  <th className="">Property Loss</th>
                </tr>
              </thead>
              {DataForStateTable()!.map((e) => {
                return (
                  <tbody className="bg-gray-100 border-t border-gray-500 hover:bg-green-200 hover:text-emerald-700">
                    <tr className="">
                      <td className="px-6 py-3"> </td>
                      <td className="px-2 py-1"> </td>
                      <td className="px-6 py-1"> </td>
                      <td className="px-6 py-1"> {"Totals:"} </td>
                      <td className="px-6 py-1 text-center">{e.injuries}</td>
                      <td className="py-1 px-7"> {e.fatalities} </td>
                      <td className="px-2 py-1"> {"$" + e.propertyLoss} </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
          <div className="flex">
            <div>
              <BarChart
                width={930}
                height={550}
                data={dataForStateCharts()}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <XAxis dataKey={"decade"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={"fatalities"} fill="#8884d8" />
                <Bar dataKey={"injuries"} fill="#82ca9d" />
                {/* <Bar dataKey={"propLossTotal"} fill="#ccc" /> */}
              </BarChart>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  width={930}
                  height={550}
                  data={dataForStateCharts()}
                  // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray={"3 3"} />
                  <YAxis ticks={[0, 100, 200, 400]} />
                  <XAxis dataKey={"decade"} />
                  <Tooltip />
                  <Legend />
                  <Line type={"monotone"} dataKey={"width"} stroke="#82ca9d" />
                  <Line
                    type={"monotone"}
                    dataKey={"avgMagnitude"}
                    stroke="#ccc"
                  />
                  <Line
                    type="monotone"
                    dataKey={"length"}
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
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
                <Scatter
                  name="Property Loss"
                  data={dataForStateCharts()}
                  fill="#8884d8"
                />
              </ScatterChart>
              {/* <AreaChartData {...stateTotals} /> */}
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default TableData;
