import { useEffect, useState } from "react";
import { getAllData } from "../Api";
import { Tornado } from "../types/Tornado";
import { DropDownType } from "../types/DropDown";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function StateData() {
  const [stateValue, setStateValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState<Tornado[]>();

  const getData = async () => {
    try {
      setLoading(true);
      const data = await getAllData();
      setAllData(data);
    } catch (e) {
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getDataForDropDown = () => {
    const stateSet = new Set<string>();
    const stateList = new Array<DropDownType>();
    const list = new Array<string>();

    if (!loading) {
      allData?.map((e, index) => {
        if (index == 0) {
          return;
        } else {
          stateSet.add(e.state);
        }
      });
    }
    let ddt: DropDownType;
    stateSet.forEach((e) => {
      list.push(e);
      ddt = {
        value: e,
        states: e,
      };
      stateList.push(ddt);
    });
    return list;
  };

  const selectStateValue = (e: string) => {
    setStateValue(e);
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <Dropdown
      options={getDataForDropDown()}
      value={stateValue}
      onChange={(e) => selectStateValue(e.value)}
      placeholder={"Select a State"}
    />
  );
}
export default StateData;
