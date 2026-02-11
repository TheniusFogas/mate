import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import InputField from "../InputField";

const getCategory = (bmi: number) => {
  if (bmi < 18.5) return { label: "Subponderal", color: "hsl(205,75%,48%)", bg: "bg-info/10 text-info" };
  if (bmi < 25) return { label: "Normal", color: "hsl(152,60%,40%)", bg: "bg-success/10 text-success" };
  if (bmi < 30) return { label: "Supraponderal", color: "hsl(45,90%,50%)", bg: "bg-warning/10 text-warning" };
  return { label: "Obezitate", color: "hsl(0,72%,51%)", bg: "bg-destructive/10 text-destructive" };
};

const BMICalculator = () => {
  const [greutate, setGreutate] = useState(75);
  const [inaltime, setInaltime] = useState(175);

  const bmi = greutate / ((inaltime / 100) ** 2);
  const cat = getCategory(bmi);
  const greutateIdealaMin = 18.5 * (inaltime / 100) ** 2;
  const greutateIdealaMax = 24.9 * (inaltime / 100) ** 2;

  const bmiPosition = Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100));

  return (
    <CalculatorCard title="Calculator IMC (BMI)" description="Calculează indicele de masă corporală">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <InputField label="Greutate" value={greutate} onChange={setGreutate} unit="kg" showSlider min={30} max={200} />
          <InputField label="Înălțime" value={inaltime} onChange={setInaltime} unit="cm" showSlider min={100} max={220} />
        </div>
        <div className="space-y-4">
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">IMC-ul tău</p>
            <p className="mt-2 font-display text-5xl font-bold" style={{ color: cat.color }}>{bmi.toFixed(1)}</p>
            <span className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${cat.bg}`}>{cat.label}</span>
          </div>

          {/* BMI scale bar */}
          <div className="space-y-1">
            <div className="relative h-3 w-full overflow-hidden rounded-full">
              <div className="absolute inset-0 flex">
                <div className="h-full flex-1 bg-info" />
                <div className="h-full flex-1 bg-success" />
                <div className="h-full flex-1 bg-warning" />
                <div className="h-full flex-1 bg-destructive" />
              </div>
              <div
                className="absolute top-0 h-full w-1 rounded-full bg-foreground shadow-md"
                style={{ left: `${bmiPosition}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
            </div>
          </div>

          <div className="rounded-lg bg-accent/10 p-3">
            <p className="text-xs text-muted-foreground">
              Greutate ideală: <strong className="text-foreground">{greutateIdealaMin.toFixed(1)} – {greutateIdealaMax.toFixed(1)} kg</strong>
            </p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default BMICalculator;
