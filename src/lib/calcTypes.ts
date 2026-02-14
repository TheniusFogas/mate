export interface CalcInput {
  key: string;
  label: string;
  default: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface CalcResult {
  label: string;
  value: string;
}

export interface CalcConfig {
  id: string;
  name: string;
  description: string;
  formula: string;
  explanation: string;
  inputs: CalcInput[];
  calculate: (inputs: Record<string, number>) => CalcResult[];
}

export interface CalcCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  calculators: CalcConfig[];
}
