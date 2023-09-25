import { Tornado, TornadoDecadeData } from "../Tornado";
class TornadoService {
  public async getAllData() {
    const url = `http://localhost:3333/api/readAllData`;
    const res = await fetch(url);
    const tornado: Tornado[] = await res.json();
    return tornado;
  }

  public async getDecadoData() {
    const res = await fetch("http://localhost:3333/api/getDecadeData");
    const decadeData: TornadoDecadeData[] = await res.json();
    return decadeData;
  }
}

const tornadoService = new TornadoService();
export default tornadoService;
