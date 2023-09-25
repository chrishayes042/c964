import { Tornado } from "../Tornado";
const tReport: any[] = [];
export function TableComponent(e: (typeof Tornado)[]) {
  e.map((t) => {
    tReport.push(t);
  });
}

const table = (
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

      {tReport.tornadoReport.map((obj) => {
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
);
export const MainTable = () => {
  return table;
};
