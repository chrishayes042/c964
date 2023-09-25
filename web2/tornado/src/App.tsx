import { useEffect, useState } from "react";
import AreaChartData from "./Components/ChartComponent";
import PieChartData, {
  PieGraphComponent,
  GetPieData,
} from "./Components/PieGraphComponent";
import TableData from "./Components/TableComponent";
import "./App.css";
import { getAllData, getTornadoDecadeData } from "./Api";
import {
  Tornado,
  tornadoReport,
  TornadoDecadeData,
  decadeReports,
} from "./Tornado";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ChartData } from "./ChartData";
function App() {
  const [tornado, setTornado] = useState<Tornado[]>(Object);
  const [tornadoReport, setTornadoReport] = useState<Tornado[]>();
  const [decadeData, setDecadeData] = useState<TornadoDecadeData[]>([]);
  const [decadeDataList, setDecadeDataList] = useState<TornadoDecadeData[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tornadoRep = tornadoReport;

  // const decadeDataList = decadeReports;
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {}, []);
  async function getData() {
    try {
      setLoading(true);
      const tornadoData = await getAllData();
      setTornado(tornadoData);
      // setTornado((state) => ({ ...state, tornado: tornado }));
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  // async function getTableData() {}
  // const setTableData = (t: Tornado[]) => {
  //   t.map((e, index) => {
  //     if (index == 0) {
  //       return;
  //     } else {
  //       tornadoRep.tornadoReport.push(e);
  //     }
  //   });
  //   TableComponent(tornado);
  // };

  async function getDecadeData() {
    setDecadeData(await getTornadoDecadeData());
    setDecadeData((state) => ({ ...state, decadedata: decadeData }));
    setDecadeDataList(decadeData);
    // if (decadeDataList !== undefined) {
    // }
    // GetPieData(decadeDataList);
  }
  function checkData() {
    console.log(decadeData);
    console.log(tornado);
    console.log(decadeDataList);
  }

  return (
    <>
      {/* <div>
        {decadeData[0] ? (
          <AreaChart chartProp={decadeDataList} />
        ) : (
          <p>eaouu</p>
        )}
      </div> */}
      {!loading ? (
        <div>
          <TableData /> <PieChartData />{" "}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="container flex justify-center">
        <div className="flex items-center justify-center w-32 bg-gray-200 rounded-full hover:bg-gray-400">
          <button onClick={() => checkData()}>get csv data</button>
        </div>
      </div>
      {/* {tornadoRep.tornadoReport.length > 0 ? <MainTable /> : <p>hi</p>}
      {tornado.length ? <p>{}</p> : <p>nothing</p>} */}
    </>
  );
}
export default App;
