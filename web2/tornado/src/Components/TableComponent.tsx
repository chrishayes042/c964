import {
  getAllData,
  getTornadoDecadeData,
  getStateData,
  getStateTotalData,
  getStateDecadeTotalData,
  getStatePredictionData,
} from "../Api";
import { Tornado, TornadoDecadeData } from "../types/Tornado";
import {
  ChartData,
  StateChartData,
  StateTotals,
  StateDecadeTotals,
  TornadoPrediction,
} from "../types/ChartData";
import { useState, useEffect } from "react";
import Slider from "rc-slider";

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
  const [predictionTotals, setPredictionTotals] =
    useState<TornadoPrediction[]>();
  const [isPrediction, setIsPrediction] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [predictValue, setPredictValue] = useState("2050");
  const [inStateValue, setInStateValue] = useState(false);
  const [stateValue, setStateValue] = useState("");

  async function setData() {
    try {
      setLoading(true);
      const allData = await getAllData();
      const decadeDataApi = await getTornadoDecadeData();
      setTableData(allData);
      setTableDecadeData(decadeDataApi);
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
  const selectStatePredictionDate = (e: number) => {
    let val: string;
    val = "";
    switch (e) {
      case 1:
        val = "2030";
        break;
      case 2:
        val = "2040";
        break;
      case 3:
        val = "2050";
        break;
      case 4:
        val = "2060";
        break;
      case 5:
        val = "2070";
        break;
      case 6:
        val = "2080";
        break;
      case 7:
        val = "2090";
        break;
      case 8:
        val = "3000";
        break;
    }
    const value = val;
    try {
      setPredictValue(value);
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
        setIsPrediction(false);
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
  const getPredictData = async () => {
    try {
      setLoading(true);
      if (stateValue == "All") {
        alert("Cannot get prediction for All states");
      } else {
        setInStateValue(true);
        setIsPrediction(true);
        const totals = await getStatePredictionData(stateValue);
        setPredictionTotals(totals);
        dataForPredictionCharts();
      }
    } catch (e) {
      return;
    } finally {
      setLoading(false);
    }
  };
  const dataForPredictionCharts = () => {
    let chartData: TornadoPrediction;
    const data: any[] = [];
    if (!loading) {
      predictionTotals!.map((e) => {
        chartData = {
          decade: e.decade,
          fatalities: e.fatalities,
          avgMag: e.avgMag,
          length: e.length,
          width: e.width,
          propLoss: e.propLoss,
          injuries: e.injuries,
        };
        // data.push(chartData);
        if (e.decade == predictValue || e.decade < predictValue) {
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
      <div className="flex inline-block w-72">
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
      <div className="items-center justify-center pt-10 w-60">
        <Slider
          dots={true}
          defaultValue={3}
          step={10}
          min={1}
          max={8}
          marks={{
            1: "2030",
            2: "2040",
            3: "2050",
            4: "2060",
            5: "2070",
            6: "2080",
            7: "2090",
            8: "3000",
          }}
          onChange={(e) => selectStatePredictionDate(e)}
        />

        <div className="pt-5">
          <p>
            Change dates to predict future devastation{" "}
            <p>
              You'll need to search a state first. Once predicted, you can move
              the slider around to get other dates automatically
            </p>
          </p>
          <button
            id="predictButton"
            className="h-6 px-8 text-sm text-center uppercase bg-blue-700 border-2 border-blue-700 rounded-md text-blue-50 border-opacity-90 bg-opacity-90 hover:border-blue-900 disabled:gray-900"
            onClick={getPredictData}
            disabled={!inStateValue}
          >
            {" "}
            Predict Devastation
          </button>
        </div>
      </div>
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
          {!isPrediction ? (
            <>
              <div className="text-lg font-semibold tracking-tight uppercase">
                All data for {stateValue}
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
                          <td className="px-6 py-3">{e.decade} </td>
                          <td className="px-2 py-1">{} </td>
                          <td className="px-6 py-1"> </td>
                          <td className="px-6 py-1"> {"Totals:"} </td>
                          <td className="px-6 py-1 text-center">
                            {e.injuries}
                          </td>
                          <td className="py-1 px-7"> {e.fatalities} </td>
                          <td className="px-2 py-1">
                            {" "}
                            {"$" + e.propertyLoss}{" "}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
              <div className="flex">
                <div>
                  <p className="text-lg font-bold">
                    Injuries & Fatalies per Decade
                  </p>
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
                  <p className="text-lg font-bold">
                    Length traveled in miles and Width in yards of Tornado for
                    Average Magnitude
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      width={930}
                      height={550}
                      data={dataForStateCharts()}
                      // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray={"3 3"} />
                      <YAxis ticks={[0, 100, 200, 400]} />
                      <XAxis
                        dataKey={"avgMag"}
                        ticks={[
                          0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.5,
                        ]}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type={"monotone"}
                        dataKey={"width"}
                        stroke="#82ca9d"
                      />
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
                  <p className="text-lg font-bold">
                    Property Loss for Average Magnitude
                  </p>
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
          ) : (
            <>
              <div className="text-lg font-semibold tracking-tight uppercase">
                State Prediction Totals Data for {stateValue} up to{" "}
                {predictValue}
              </div>
              <div className="pb-10">
                <div className="w-full overflow-y-auto max-h-96">
                  <table className="w-full mr-12 table-auto max-h-72">
                    <thead className="text-sm text-gray-700 uppercase rounded-lg bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Decade</th>
                        <th className="px-6 py-3">Average Magnitude</th>
                        <th className="px-6 py-3">Injuries</th>
                        <th className="px-6 py-3">Fatalities</th>
                        <th className="px-6 py-3">Property Loss</th>
                      </tr>
                    </thead>
                    {dataForPredictionCharts()!.map((obj) => {
                      return (
                        <tbody className="bg-gray-100 border-t border-gray-500 hover:bg-green-200 hover:text-emerald-700">
                          <tr className="">
                            <td className="px-6 py-3"> {obj.decade} </td>

                            <td> {obj.avgMag} </td>
                            <td> {obj.injuries} </td>
                            <td> {obj.fatalities} </td>
                            <td> {"$" + obj.propLoss} </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
              <div className="flex">
                <div>
                  <p className="text-lg font-bold">
                    Injuries & Fatalies per Decade
                  </p>
                  <BarChart
                    width={930}
                    height={550}
                    data={dataForPredictionCharts()}
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
                  <p className="text-lg font-bold">
                    Length traveled in miles and Width in yards of Tornado for
                    Average Magnitude
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      width={930}
                      height={550}
                      data={dataForPredictionCharts()}
                      // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray={"3 3"} />
                      <YAxis ticks={[0, 100, 200, 400]} />
                      <XAxis dataKey={"avgMag"} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type={"monotone"}
                        dataKey={"width"}
                        stroke="#82ca9d"
                      />
                      <Line
                        type={"monotone"}
                        dataKey={"avgMag"}
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
                  <p className="text-lg font-bold">
                    Property Loss for Average Magnitude
                  </p>
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

                    <YAxis dataKey={"avgMag"} type="number" />
                    {/* <ZAxis dataKey={"propLoss"} type="number" range={[64, 144]} /> */}
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Legend />
                    <Scatter
                      name="Property Loss"
                      data={dataForPredictionCharts()}
                      fill="#8884d8"
                    />
                  </ScatterChart>
                  {/* <AreaChartData {...stateTotals} /> */}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
export default TableData;
