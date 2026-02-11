interface ResultDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
}

const ResultDisplay = ({ label, value, unit }: ResultDisplayProps) => (
  <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="mt-1 font-display text-2xl font-bold text-primary">
      {value}
      {unit && <span className="ml-1 text-base font-medium text-muted-foreground">{unit}</span>}
    </p>
  </div>
);

export default ResultDisplay;
