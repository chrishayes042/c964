export interface Tornado {
  id: string;
  year: string;
  month: string;
  day: string;
  date: string;
  time: string;
  timezone: string;
  dateTime: string;
  state: string;
  stateFip: string;
  magnitude: string;
  injuries: string;
  fatalities: string;
  propertyLoss: string;
  slong: string;
  slat: string;
  elong: string;
  elat: string;
  length: string;
  width: string;
  statesAff: string;
  statesNum: string;
  fipsCdCounty1: string;
  fipsCdCounty2: string;
  fipsCdCounty3: string;
  fipsCdCounty4: string;
  manitudeEst: string;
}
export interface TornadoReport {
  tornadoReport: Tornado[];
}
export const tornadoReport: TornadoReport = {
  tornadoReport: [],
};
