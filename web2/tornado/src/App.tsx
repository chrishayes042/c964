import { useEffect, useState } from "react";
import TableData from "./Components/TableComponent";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(true);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {}, []);
  const isLoggingIn = () => {
    try {
      console.log("hello");
    } catch (e) {
      return;
    } finally {
      setLogin(false);
    }
  };
  async function getData() {
    try {
      setLoading(true);
      // setTornado((state) => ({ ...state, tornado: tornado }));
    } catch (e) {
      return;
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!loading ? (
        <div className="container w-full">
          <h1 className="pb-10 font-bold text-green-800 text-8xl">
            Tornado Devastation
          </h1>
          <div className="pb-15">
            <TableData />
          </div>
          {/* <PieChartData /> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* <div className="container flex justify-center">
        <div className="flex items-center justify-center w-32 bg-gray-200 rounded-full hover:bg-gray-400">
          <button onClick={() => checkData()}>get csv data</button>
        </div>
      </div> */}
      {/* {tornadoRep.tornadoReport.length > 0 ? <MainTable /> : <p>hi</p>}
      {tornado.length ? <p>{}</p> : <p>nothing</p>} */}
    </>
  );
}
export default App;
