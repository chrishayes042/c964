export interface ChartData {
  year: string;
  fatalities: string;
  avgmagnitude: string;
  propLoss: string;
  injuries: string;
}
export interface StateChartData {
  year: string;
  fatalities: number;
  magnitude: string;
  propLoss: number;
  injuries: number;
  length: string;
  width: string;
  state: string;
  date: string;
}

export interface StateTotals {
  fatalities: string;
  propertyLoss: string;
  injuries: string;
}
export interface StateDecadeTotals {
  decade: string;
  avgMagnitude: string;
  injuries: string;
  fatalities: string;
  propertyLoss: string;
  length: string;
  width: string;
}
export interface TornadoPrediction {
  decade: string;
  length: number;
  width: number;
  avgMag: number;
  propLoss: number;
  fatalities: number;
  injuries: number;
}
export interface TornadoResidual {
  decade: string;
  lenRes: number;
  widRes: number;
  avgMagRes: number;
  propLossRes: number;
  fatalRes: number;
  injRes: number;
}
