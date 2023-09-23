import { Tornado, TornadoReport } from "./Tornado";

export async function getAllData(): Promise<Tornado[]> {
  const url = `http://localhost:3333/api/readAllData`;
  const res = await fetch(url);
  const tornado: Tornado[] = await res.json();
  return tornado;
}
export async function getTornadoData(): Promise<TornadoReport[]> {
  const res = await fetch(`http://localhost:3333/api/readAllData`);
  const torn: TornadoReport[] = await res.json();
  return torn;
}
