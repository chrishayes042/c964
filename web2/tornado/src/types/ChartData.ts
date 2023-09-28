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
