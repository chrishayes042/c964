import { useEffect, useState } from "react";
import { DemoComponent, UseDecadeData } from "./Components/ChartComponent";
import { PieGraphComponent, GetPieData } from "./Components/PieGraphComponent";
import { MainTable, TableComponent } from "./Components/TableComponent";
import "./App.css";
import { getAllData, getTornadoDecadeData } from "./Api";
import {
  Tornado,
  tornadoReport,
  TornadoDecadeData,
  decadeReports,
} from "./Tornado";
function App() {
  const [tornado, setTornado] = useState<Tornado[]>(Object);
  const [tornadoReport, setTornadoReport] = useState<Tornado[]>();
  const [decadeData, setDecadeData] = useState<TornadoDecadeData[]>([]);
  const [decadeDataList, setDecadeDataList] = useState<TornadoDecadeData[]>();
  const tornadoRep = tornadoReport;
  // const decadeDataList = decadeReports;
  useEffect(() => {
    getData();
    // getDecadeData();
  }, []);
  useEffect(() => {
    if (tornado !== null) {
      console.log("set report");
      // setTornadoReport(tornado);
    }
  }, []);
  async function getData() {
    setTornado(await getAllData());
    setTornado((state) => ({ ...state, tornado: tornado }));
  }
  async function getTableData() {}
  const setTableData = (t: Tornado[]) => {
    t.map((e, index) => {
      if (index == 0) {
        return;
      } else {
        tornadoRep.tornadoReport.push(e);
      }
    });
    TableComponent(tornado);
  };

  async function getDecadeData() {
    setDecadeData(await getTornadoDecadeData());
    setDecadeData((state) => ({ ...state, decadedata: decadeData }));
    setDecadeDataList(decadeData);
    if (decadeDataList !== undefined) {
      UseDecadeData(decadeDataList);
    }
    GetPieData(decadeDataList);
  }

  return (
    <>
      {/* {decadeDataList.decadeReport.length > 0 ? (
        <div>
          {" "}
          <DemoComponent /> <PieGraphComponent />{" "}
        </div>
      ) : null} */}
      <div className="container flex justify-center">
        <div className="flex items-center justify-center w-32 bg-gray-200 rounded-full hover:bg-gray-400">
          <button onClick={() => getData()}>get csv data</button>
        </div>
      </div>
      {tornadoRep.tornadoReport.length > 0 ? <MainTable /> : <p>hi</p>}
      {tornado.length ? <p>{}</p> : <p>nothing</p>}
    </>
  );
}

export default App;
