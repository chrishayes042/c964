import { getAllData, getTornadoDecadeData } from "../Api";
import { Tornado, TornadoDecadeData, tornadoReport } from "../Tornado";
import { ChartData } from "../ChartData";
import { useState, useEffect } from "react";

function TableData() {
  const [tableData, setTableData] = useState<Tornado[]>();
  const [tableDecadeData, setTableDecadeData] = useState<TornadoDecadeData[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function setData() {
    try {
      setLoading(true);
      const allData = await getAllData();
      const decadeData = await getTornadoDecadeData();
      setTableData(allData);
      setTableDecadeData(decadeData);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
      dataForTable();
    }
  }
  useEffect(() => {
    setData();
  }, []);
  function dataForTable() {
    const td = tornadoReport;
    if (!loading) {
      tableData?.map((e, index) => {
        if (index == 0) {
          return;
        } else {
          td.tornadoReport.push(e);
        }
      });
    }
    return td;
  }
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
    <p>Loading...</p>
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
      </div>
    </>
  );
}
export default TableData;
