import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const LogaritmiCalculator = () => {
  const [mode, setMode] = useState<"log" | "ln" | "logb">("log");
  const [x, setX] = useState(100);
  const [base, setBase] = useState(2);

  let result = 0;
  if (mode === "log") result = Math.log10(x);
  else if (mode === "ln") result = Math.log(x);
  else result = base > 0 && base !== 1 ? Math.log(x) / Math.log(base) : 0;

  return (
    <CalculatorCard
      title="Calculator Logaritmi"
      description="log₁₀, ln, log cu bază arbitrară"
      formula="logₐ(x) = ln(x) / ln(a) | log₁₀(x) | ln(x) = logₑ(x)"
      explanation="Logaritmul este operația inversă exponenției. logₐ(x)=n înseamnă aⁿ=x. Se folosește în chimie (pH), acustică (dB), informatică (complexitate algoritmi), seismologie."
    >
      <div className="space-y-3">
        <div className="flex gap-1">
          {[
            { k: "log" as const, l: "log₁₀" },
            { k: "ln" as const, l: "ln (natural)" },
            { k: "logb" as const, l: "logₐ" },
          ].map(m => (
            <button key={m.k} onClick={() => setMode(m.k)}
              className={`flex-1 rounded-md px-2 py-1.5 text-[11px] font-medium transition-all ${mode === m.k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {m.l}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5">
            <label className="text-[11px] font-medium text-muted-foreground">x (argument)</label>
            <input type="number" value={x} onChange={e => setX(parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
          </div>
          {mode === "logb" && (
            <div className="space-y-0.5">
              <label className="text-[11px] font-medium text-muted-foreground">Baza (a)</label>
              <input type="number" value={base} onChange={e => setBase(parseFloat(e.target.value) || 0)}
                className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
            </div>
          )}
        </div>
        <ResultDisplay label={mode === "log" ? "log₁₀(x)" : mode === "ln" ? "ln(x)" : `log${base}(x)`} value={x > 0 ? result.toFixed(8) : "Nedefinit"} />
        <div className="grid grid-cols-3 gap-2 text-[10px]">
          <div className="rounded-md bg-secondary px-2 py-1.5 text-center">
            <span className="text-muted-foreground">log₁₀</span>
            <p className="font-mono font-bold text-foreground">{x > 0 ? Math.log10(x).toFixed(4) : "—"}</p>
          </div>
          <div className="rounded-md bg-secondary px-2 py-1.5 text-center">
            <span className="text-muted-foreground">ln</span>
            <p className="font-mono font-bold text-foreground">{x > 0 ? Math.log(x).toFixed(4) : "—"}</p>
          </div>
          <div className="rounded-md bg-secondary px-2 py-1.5 text-center">
            <span className="text-muted-foreground">log₂</span>
            <p className="font-mono font-bold text-foreground">{x > 0 ? Math.log2(x).toFixed(4) : "—"}</p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default LogaritmiCalculator;
