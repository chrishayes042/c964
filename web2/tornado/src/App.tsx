import { useState } from "react";

import "./App.css";
import { getAllData } from "./Api";
import { Tornado, tornadoReport } from "./Tornado";
function App() {
  const [tornado, setTornado] = useState<Tornado[]>(Object);
  const tornadoRep = tornadoReport;
  async function getData() {
    setTornado(await getAllData());
    tornado.map((e, index) => {
      if (index == 0) {
        return;
      } else {
        tornadoRep.tornadoReport.push(e);
      }
    });
  }

  return (
    <>
      <div className="container flex justify-center">
        <div className="flex items-center justify-center w-32 bg-gray-200 rounded-full hover:bg-gray-400">
          <button onClick={() => getData()}>get csv data</button>
        </div>
      </div>

      {tornadoRep ? (
        <div className="relative overflow-y-auto max-h-96">
          <table className="w-full mr-12 overflow-y-scroll rounded-b-lg table-auto max-h-52">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Injuries</th>
                <th className="px-6 py-3">Fatalities</th>
                <th className="px-6 py-3">Property Loss</th>
                <th className="px-6 py-3">Tornado Lenth in Miles</th>
                <th className="px-6 py-3">Tornado Width</th>
              </tr>
            </thead>

            {tornadoRep.tornadoReport.map((obj) => {
              return (
                <tbody className="overflow-y-scroll bg-gray-100 border-t border-gray-500 hover:bg-green-200 hover:text-emerald-700">
                  <tr className="">
                    <td className="px-6 py-3"> {obj.date} </td>
                    <td>{obj.injuries} </td>
                    <td> {obj.fatalities} </td>
                    <td> {"$ " + obj.propertyLoss} </td>
                    <td> {obj.length} </td>
                    <th> {obj.width} </th>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      ) : (
        <p>hi</p>
      )}
    </>
  );
}

export default App;
