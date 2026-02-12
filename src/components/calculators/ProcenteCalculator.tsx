import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const ProcenteCalculator = () => {
  const [mode, setMode] = useState<"pct" | "din" | "var">("pct");
  const [a, setA] = useState(25);
  const [b, setB] = useState(200);

  const modes = [
    { key: "pct" as const, label: "X% din Y" },
    { key: "din" as const, label: "X este ?% din Y" },
    { key: "var" as const, label: "Variație %" },
  ];

  let result = 0;
  let resultLabel = "";
  if (mode === "pct") {
    result = (a / 100) * b;
    resultLabel = `${a}% din ${b}`;
  } else if (mode === "din") {
    result = b !== 0 ? (a / b) * 100 : 0;
    resultLabel = `${a} este X% din ${b}`;
  } else {
    result = a !== 0 ? ((b - a) / a) * 100 : 0;
    resultLabel = `Variație de la ${a} la ${b}`;
  }

  return (
    <CalculatorCard
      title="Calculator Procente"
      description="Procent din valoare, procentaj, variație procentuală"
      formula="P% din X = (P/100) × X | Variație = ((Nou-Vechi)/Vechi) × 100"
      explanation="Procentul exprimă o parte dintr-un întreg (100). Se folosește în statistică, finanțe, chimie. Variația procentuală arată schimbarea relativă între două valori."
    >
      <div className="space-y-3">
        <div className="flex gap-1">
          {modes.map(m => (
            <button key={m.key} onClick={() => setMode(m.key)}
              className={`flex-1 rounded-md px-2 py-1.5 text-[11px] font-medium transition-all ${mode === m.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5">
            <label className="text-[11px] font-medium text-muted-foreground">
              {mode === "pct" ? "Procent (%)" : mode === "din" ? "Valoare" : "Valoare inițială"}
            </label>
            <input type="number" value={a} onChange={e => setA(parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
          </div>
          <div className="space-y-0.5">
            <label className="text-[11px] font-medium text-muted-foreground">
              {mode === "pct" ? "Valoare" : mode === "din" ? "Total" : "Valoare finală"}
            </label>
            <input type="number" value={b} onChange={e => setB(parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
          </div>
        </div>
        <ResultDisplay label={resultLabel} value={result.toFixed(4)} unit={mode === "pct" ? "" : "%"} />
      </div>
    </CalculatorCard>
  );
};

export default ProcenteCalculator;
