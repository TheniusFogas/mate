import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import InputField from "../InputField";
import ResultDisplay from "../ResultDisplay";

const nivelActivitate = [
  { label: "Sedentar", factor: 1.2 },
  { label: "Ușor activ", factor: 1.375 },
  { label: "Moderat activ", factor: 1.55 },
  { label: "Foarte activ", factor: 1.725 },
  { label: "Extra activ", factor: 1.9 },
];

const CaloriiCalculator = () => {
  const [gen, setGen] = useState<"M" | "F">("M");
  const [varsta, setVarsta] = useState(30);
  const [greutate, setGreutate] = useState(75);
  const [inaltime, setInaltime] = useState(175);
  const [activitate, setActivitate] = useState(2);

  // Mifflin-St Jeor
  const bmr = gen === "M"
    ? 10 * greutate + 6.25 * inaltime - 5 * varsta + 5
    : 10 * greutate + 6.25 * inaltime - 5 * varsta - 161;

  const tdee = bmr * nivelActivitate[activitate].factor;

  return (
    <CalculatorCard title="Calculator Calorii Zilnice" description="Calculează necesarul caloric zilnic (TDEE) pe baza formulei Mifflin-St Jeor">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Gen</label>
            <div className="flex gap-2">
              {(["M", "F"] as const).map(g => (
                <button key={g} onClick={() => setGen(g)}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${gen === g ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {g === "M" ? "👨 Masculin" : "👩 Feminin"}
                </button>
              ))}
            </div>
          </div>

          <InputField label="Vârstă" value={varsta} onChange={setVarsta} unit="ani" showSlider min={15} max={90} />
          <InputField label="Greutate" value={greutate} onChange={setGreutate} unit="kg" showSlider min={30} max={200} />
          <InputField label="Înălțime" value={inaltime} onChange={setInaltime} unit="cm" showSlider min={100} max={220} />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Nivel activitate</label>
            <div className="space-y-1">
              {nivelActivitate.map((n, i) => (
                <button key={n.label} onClick={() => setActivitate(i)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-all ${activitate === i ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ResultDisplay label="Metabolism bazal (BMR)" value={bmr.toFixed(0)} unit="kcal/zi" />
          <ResultDisplay label="Necesar caloric (TDEE)" value={tdee.toFixed(0)} unit="kcal/zi" />

          <div className="space-y-3 rounded-lg bg-primary/5 border border-primary/10 p-4">
            <h4 className="text-sm font-semibold text-foreground">Obiective</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">🔻 Slăbire (−500 kcal)</span>
                <span className="font-medium text-foreground">{(tdee - 500).toFixed(0)} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">⚖️ Menținere</span>
                <span className="font-medium text-foreground">{tdee.toFixed(0)} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">🔺 Masă musculară (+500 kcal)</span>
                <span className="font-medium text-foreground">{(tdee + 500).toFixed(0)} kcal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default CaloriiCalculator;
