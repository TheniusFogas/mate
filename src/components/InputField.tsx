interface InputFieldProps {
  label: string;
  value: number | string;
  onChange: (val: number) => void;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  showSlider?: boolean;
}

const InputField = ({ label, value, onChange, unit, min = 0, max = 1000, step = 1, showSlider }: InputFieldProps) => (
  <div className="space-y-0.5">
    <label className="text-[11px] font-medium text-muted-foreground">
      {label} {unit && <span className="opacity-60">({unit})</span>}
    </label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      min={min}
      max={max}
      step={step}
      className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-ring"
    />
    {showSlider && (
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full accent-primary h-1"
      />
    )}
  </div>
);

export default InputField;
