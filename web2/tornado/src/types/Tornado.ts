export interface Tornado {
  id: number;
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
  injuries: number;
  fatalities: number;
  propertyLoss: number;
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
export interface TornadoDecadeData {
  decade: string;
  fatalities: string;
  injuries: string;
  propertyLoss: string;
  avgMagnitude: string;
}
export interface DecadeReport {
  decadeReport: TornadoDecadeData[];
}
export const decadeReports: DecadeReport = {
  decadeReport: [],
};
