import { getAllData, getTornadoDecadeData } from "../Api";
import { Tornado, TornadoDecadeData } from "../Tornado";
import { ChartData } from "../ChartData";
import { useState, useEffect } from "react";
import Slider from "rc-slider";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import "rc-slider/assets/index.css";
function TableData() {
  const [tableData, setTableData] = useState<Tornado[]>();
  const [tableDecadeData, setTableDecadeData] = useState<TornadoDecadeData[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [predictValue, setPredictValue] = useState(0);
  const [stateValue, setStateValue] = useState("OK");
  // const stateMap = new Map<string, Tornado>();
  const marks = {
    2020: "2020",
    2030: "2030",
    2040: "2040",
    2050: "2050",
    2060: "2060",
    2070: "2070",
    2080: "2080",
    2090: "2090",
    3000: "3000",
  };
  async function setData() {
    try {
      setLoading(true);
      const allData = await getAllData();
      const decadeData = await getTornadoDecadeData();
      setTableData(allData);
      setTableDecadeData(decadeData);
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
    statesSet.forEach((e) => {
      list.push(e);
      ddt = {
        value: e,
        states: e,
      };
      stateList.push(ddt);
    });

    return list;
  }
  const selectStateValue = (e: string) => {
    try {
      const val = e;
      setStateValue(val);
    } catch (err) {
      return;
    } finally {
      console.log(stateValue);
    }
  };
  // const onChangeValueChange = (newValue: number[]) => {
  //   setPredictValue(newValue);
  //   console.log(newValue);
  // };
  // function prediction() {
  //   getPredictionData();
  // }
  // const getPredictionData = async () => {
  //   try {
  //     const value = await getPredictData();
  //   } catch (e: any) {
  //     setError(e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
  if (error) return <p>Failed To Load Data.</p>;
  return loading ? (
    <p>Loading... Please wait, data takes a while to show up</p>
  ) : (
    <>
      <div className="text-lg font-semibold tracking-tight uppercase">
        Main Data for each decade
      </div>

      <div className="pb-10">
        <div className="relative overflow-y-auto">
          <table className="w-full mr-12 table-auto ">
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
                <tbody className="overflow-y-scroll bg-gray-100 border-t border-gray-500 hover:bg-green-200 hover:text-emerald-700">
                  <tr className="">
                    <td className="px-6 py-3"> {obj.year} </td>
                    <td>{obj.injuries} </td>
                    <td> {obj.fatalities} </td>
                    <td>
                      {" "}
                      {"$ " +
                        obj.propLoss.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    </td>
                    <td> {obj.avgmagnitude} </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <div className="container pt-10">
          <Dropdown
            options={dataForStateDropDawn()}
            value={stateValue}
            onChange={(e) => selectStateValue(e.value)}
            placeholder={"Select a State"}
          />
          <p>Change dates to predict future devastation</p>
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
              <button className="h-6 px-8 text-sm text-center text-white uppercase bg-blue-700 border-2 border-blue-700 rounded-md text-blue-50 border-opacity-90 bg-opacity-90 hover:border-blue-900">
                Predict Devastation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TableData;
