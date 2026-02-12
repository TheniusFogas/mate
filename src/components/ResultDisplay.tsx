interface ResultDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
}

const ResultDisplay = ({ label, value, unit }: ResultDisplayProps) => (
  <div className="rounded-md bg-primary/5 border border-primary/10 px-3 py-2">
    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="font-display text-base font-bold text-primary leading-tight">
      {value}
      {unit && <span className="ml-1 text-[10px] font-medium text-muted-foreground">{unit}</span>}
    </p>
  </div>
);

export default ResultDisplay;
