import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const PuteriRadicaliCalculator = () => {
  const [mode, setMode] = useState<"pow" | "rad" | "sci">("pow");
  const [base, setBase] = useState(2);
  const [exp, setExp] = useState(10);

  let result = 0;
  if (mode === "pow") result = Math.pow(base, exp);
  else if (mode === "rad") result = exp !== 0 ? Math.pow(base, 1 / exp) : 0;
  else result = base;

  const sciNotation = base !== 0 ? base.toExponential(6) : "0";

  return (
    <CalculatorCard
      title="Puteri & Radicali"
      description="xⁿ, ⁿ√x, notație științifică"
      formula="xⁿ | ⁿ√x = x^(1/n) | a × 10ᵏ"
      explanation="Puterea xⁿ înmulțește x cu sine de n ori. Radicalul de ordin n este operația inversă. Notația științifică exprimă numere foarte mari/mici sub forma a×10ᵏ."
    >
      <div className="space-y-3">
        <div className="flex gap-1">
          {[
            { k: "pow" as const, l: "Putere xⁿ" },
            { k: "rad" as const, l: "Radical ⁿ√x" },
            { k: "sci" as const, l: "Notație Șt." },
          ].map(m => (
            <button key={m.k} onClick={() => setMode(m.k)}
              className={`flex-1 rounded-md px-2 py-1.5 text-[11px] font-medium transition-all ${mode === m.k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {m.l}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5">
            <label className="text-[11px] font-medium text-muted-foreground">{mode === "rad" ? "Radicand (x)" : mode === "sci" ? "Număr" : "Baza (x)"}</label>
            <input type="number" value={base} onChange={e => setBase(parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
          </div>
          {mode !== "sci" && (
            <div className="space-y-0.5">
              <label className="text-[11px] font-medium text-muted-foreground">{mode === "pow" ? "Exponent (n)" : "Ordin radical (n)"}</label>
              <input type="number" value={exp} onChange={e => setExp(parseFloat(e.target.value) || 0)}
                className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
            </div>
          )}
        </div>
        {mode === "pow" && <ResultDisplay label={`${base}^${exp}`} value={isFinite(result) ? result.toFixed(6) : "∞"} />}
        {mode === "rad" && <ResultDisplay label={`${exp}√${base}`} value={isFinite(result) ? result.toFixed(8) : "Nedefinit"} />}
        {mode === "sci" && <ResultDisplay label="Notație științifică" value={sciNotation} />}
      </div>
    </CalculatorCard>
  );
};

export default PuteriRadicaliCalculator;
