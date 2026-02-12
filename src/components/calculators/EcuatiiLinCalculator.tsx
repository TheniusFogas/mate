import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const EcuatiiLinCalculator = () => {
  const [mode, setMode] = useState<"one" | "sys2">("one");
  // ax + b = 0
  const [a, setA] = useState(3);
  const [b, setB] = useState(-9);
  // System: a1x+b1y=c1, a2x+b2y=c2
  const [a1, setA1] = useState(2);
  const [b1, setB1] = useState(3);
  const [c1, setC1] = useState(8);
  const [a2, setA2] = useState(1);
  const [b2, setB2] = useState(-1);
  const [c2, setC2] = useState(1);

  // Single equation
  const xSingle = a !== 0 ? -b / a : NaN;

  // System (Cramer)
  const det = a1 * b2 - a2 * b1;
  const detX = c1 * b2 - c2 * b1;
  const detY = a1 * c2 - a2 * c1;
  const xSys = det !== 0 ? detX / det : NaN;
  const ySys = det !== 0 ? detY / det : NaN;

  return (
    <CalculatorCard
      title="Ecuații Liniare & Sisteme"
      description="Ecuație grad 1, sistem 2 ecuații cu 2 necunoscute (Cramer)"
      formula="ax + b = 0 → x = -b/a | Cramer: x = Δx/Δ, y = Δy/Δ"
      explanation="Ecuația liniară are o singură soluție (dacă a≠0). Sisteme 2×2 se rezolvă cu metoda Cramer (determinanți), substituție sau eliminare. Δ=0 → sistem incompatibil sau nedeterminat."
    >
      <div className="space-y-3">
        <div className="flex gap-1">
          {[{ k: "one" as const, l: "ax + b = 0" }, { k: "sys2" as const, l: "Sistem 2×2" }].map(m => (
            <button key={m.k} onClick={() => setMode(m.k)}
              className={`flex-1 rounded-md px-2 py-1.5 text-[11px] font-medium transition-all ${mode === m.k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {m.l}
            </button>
          ))}
        </div>

        {mode === "one" ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-0.5"><label className="text-[11px] font-medium text-muted-foreground">a</label>
                <input type="number" value={a} onChange={e => setA(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
              <div className="space-y-0.5"><label className="text-[11px] font-medium text-muted-foreground">b</label>
                <input type="number" value={b} onChange={e => setB(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
            </div>
            <div className="rounded-md bg-primary/5 border border-primary/10 px-3 py-2 text-center font-mono text-xs">
              {a}x {b >= 0 ? "+" : ""} {b} = 0
            </div>
            <ResultDisplay label="x" value={!isNaN(xSingle) ? xSingle.toFixed(6) : "Nedefinit (a=0)"} />
          </>
        ) : (
          <>
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground">Ecuația 1: a₁x + b₁y = c₁</p>
              <div className="grid grid-cols-3 gap-1">
                {[{ l: "a₁", v: a1, s: setA1 }, { l: "b₁", v: b1, s: setB1 }, { l: "c₁", v: c1, s: setC1 }].map(f => (
                  <div key={f.l} className="space-y-0.5"><label className="text-[10px] text-muted-foreground">{f.l}</label>
                    <input type="number" value={f.v} onChange={e => f.s(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Ecuația 2: a₂x + b₂y = c₂</p>
              <div className="grid grid-cols-3 gap-1">
                {[{ l: "a₂", v: a2, s: setA2 }, { l: "b₂", v: b2, s: setB2 }, { l: "c₂", v: c2, s: setC2 }].map(f => (
                  <div key={f.l} className="space-y-0.5"><label className="text-[10px] text-muted-foreground">{f.l}</label>
                    <input type="number" value={f.v} onChange={e => f.s(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <ResultDisplay label="Δ (det)" value={det} />
              <ResultDisplay label="x" value={!isNaN(xSys) ? xSys.toFixed(4) : det === 0 ? "Incomp." : "—"} />
              <ResultDisplay label="y" value={!isNaN(ySys) ? ySys.toFixed(4) : det === 0 ? "Incomp." : "—"} />
            </div>
          </>
        )}
      </div>
    </CalculatorCard>
  );
};

export default EcuatiiLinCalculator;
