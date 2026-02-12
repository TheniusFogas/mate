import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const InecuatiiCalculator = () => {
  const [a, setA] = useState(2);
  const [b, setB] = useState(-6);
  const [op, setOp] = useState<">" | ">=" | "<" | "<=">(">");

  // ax + b > 0 => x > -b/a (if a>0) or x < -b/a (if a<0)
  const threshold = a !== 0 ? -b / a : NaN;
  let solution = "";
  if (a === 0) {
    solution = (op.includes(">") ? b > 0 : b < 0) ? "ℝ (toate numerele)" : "∅ (fără soluție)";
  } else {
    const flipped = a < 0;
    const actualOp = flipped ? (op === ">" ? "<" : op === ">=" ? "<=" : op === "<" ? ">" : ">=") : op;
    solution = `x ${actualOp} ${threshold.toFixed(4)}`;
  }

  return (
    <CalculatorCard
      title="Inecuații Liniare"
      description="ax + b > 0 — rezolvare cu interval"
      formula="ax + b > 0 → x > -b/a (dacă a>0) | x < -b/a (dacă a<0)"
      explanation="La împărțirea cu un număr negativ, semnul inecuației se schimbă. Soluția este un interval de numere reale. Se reprezintă pe axa numerelor cu punct plin (≥/≤) sau gol (>/&lt;)."
    >
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-1">
          {([">" , ">=" , "<" , "<="] as const).map(o => (
            <button key={o} onClick={() => setOp(o)}
              className={`rounded-md px-2 py-1.5 text-xs font-bold transition-all ${op === o ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {o}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">a</label>
            <input type="number" value={a} onChange={e => setA(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
          <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">b</label>
            <input type="number" value={b} onChange={e => setB(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
        </div>
        <div className="rounded-md bg-primary/5 border border-primary/10 px-3 py-2 text-center font-mono text-xs">
          {a}x {b >= 0 ? "+" : ""} {b} {op} 0
        </div>
        <ResultDisplay label="Soluție" value={solution} />
      </div>
    </CalculatorCard>
  );
};

export default InecuatiiCalculator;
