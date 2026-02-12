import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const LimiteCalculator = () => {
  const [fn, setFn] = useState<"sinx_x" | "ex_1_x" | "1_x" | "poly">("sinx_x");
  const [x0, setX0] = useState(0);
  const [h, setH] = useState(0.0001);

  const evaluate = (fn: string, x: number): number => {
    switch (fn) {
      case "sinx_x": return x !== 0 ? Math.sin(x) / x : NaN;
      case "ex_1_x": return x !== 0 ? (Math.exp(x) - 1) / x : NaN;
      case "1_x": return x !== 0 ? 1 / x : NaN;
      case "poly": return x * x - 4;
      default: return NaN;
    }
  };

  const fromLeft = evaluate(fn, x0 - Math.abs(h));
  const fromRight = evaluate(fn, x0 + Math.abs(h));
  const atPoint = evaluate(fn, x0);

  const labels: Record<string, string> = {
    sinx_x: "sin(x)/x",
    ex_1_x: "(eˣ-1)/x",
    "1_x": "1/x",
    poly: "x²-4",
  };

  const knownLimits: Record<string, string> = {
    sinx_x: "lim(x→0) sin(x)/x = 1 (limită remarcabilă)",
    ex_1_x: "lim(x→0) (eˣ-1)/x = 1 (limită remarcabilă)",
    "1_x": "lim(x→0⁺) 1/x = +∞, lim(x→0⁻) 1/x = -∞",
    poly: "limită polinomială — se calculează prin substituție directă",
  };

  return (
    <CalculatorCard
      title="Limite de Funcții"
      description="Limite remarcabile, aproximare numerică"
      formula="lim(x→x₀) f(x) — Evaluare numerică din stânga/dreapta"
      explanation="Limita unei funcții f(x) când x→x₀ este valoarea către care tinde f(x). Limite remarcabile: sin(x)/x→1, (eˣ-1)/x→1, (1+1/x)ˣ→e. L'Hôpital: dacă 0/0 sau ∞/∞, lim f/g = lim f'/g'."
    >
      <div className="space-y-3">
        <div className="flex gap-1 flex-wrap">
          {Object.entries(labels).map(([k, l]) => (
            <button key={k} onClick={() => setFn(k as typeof fn)}
              className={`rounded-md px-2 py-1.5 text-[11px] font-medium transition-all ${fn === k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {l}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">x₀ (punct)</label>
            <input type="number" value={x0} onChange={e => setX0(parseFloat(e.target.value) || 0)} step={0.1}
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
          <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">h (precizie)</label>
            <input type="number" value={h} onChange={e => setH(parseFloat(e.target.value) || 0.0001)} step={0.0001}
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <ResultDisplay label={`f(x₀-h)`} value={isFinite(fromLeft) ? fromLeft.toFixed(8) : "±∞"} />
          <ResultDisplay label={`f(x₀)`} value={isFinite(atPoint) ? atPoint.toFixed(8) : isNaN(atPoint) ? "0/0" : "±∞"} />
          <ResultDisplay label={`f(x₀+h)`} value={isFinite(fromRight) ? fromRight.toFixed(8) : "±∞"} />
        </div>
        <div className="rounded-md bg-accent/10 px-3 py-2 text-[10px] text-muted-foreground">
          <p>{knownLimits[fn]}</p>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default LimiteCalculator;
