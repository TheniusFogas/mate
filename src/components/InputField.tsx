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
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-foreground">
      {label} {unit && <span className="text-muted-foreground">({unit})</span>}
    </label>
    <div className="flex items-center gap-3">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        min={min}
        max={max}
        step={step}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-ring"
      />
    </div>
    {showSlider && (
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full accent-primary"
      />
    )}
  </div>
);

export default InputField;
