import { useState } from "react";
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
  const [decadeData, setDecadeData] = useState<TornadoDecadeData[]>([]);
  const tornadoRep = tornadoReport;
  const decadeDataList = decadeReports;

  async function getData() {
    setTornado(await getAllData());
    tornado.map((e, index) => {
      if (index == 0) {
        return;
      } else {
        tornadoRep.tornadoReport.push(e);
      }
    });
    TableComponent(tornadoRep);
    getDecadeData();
  }

  async function getDecadeData() {
    setDecadeData(await getTornadoDecadeData());
    decadeData.map((e, index) => {
      if (index == 0) {
        return;
      } else {
        decadeDataList.decadeReport.push(e);
      }
    });
    UseDecadeData(decadeDataList);
    GetPieData(decadeDataList);
  }

  return (
    <>
      {decadeDataList.decadeReport.length > 0 ? (
        <div>
          {" "}
          <DemoComponent /> <PieGraphComponent />{" "}
        </div>
      ) : null}
      <div className="container flex justify-center">
        <div className="flex items-center justify-center w-32 bg-gray-200 rounded-full hover:bg-gray-400">
          <button onClick={() => getData()}>get csv data</button>
        </div>
      </div>
      {tornadoRep.tornadoReport.length > 0 ? <MainTable /> : <p>hi</p>}
    </>
  );
}

export default App;
