import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const ProportiiCalculator = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [c, setC] = useState(6);
  // a/b = c/x => x = b*c/a
  const x = a !== 0 ? (b * c) / a : 0;

  return (
    <CalculatorCard
      title="Calculator Proporții"
      description="Regula de trei simplă — a/b = c/x"
      formula="a/b = c/x → x = (b × c) / a"
      explanation="Proporția este egalitatea a două rapoarte. Se folosește pentru conversii, rețete, hărți, scale. Regula de trei simplă permite găsirea termenului necunoscut."
    >
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2 items-end">
          {[
            { label: "a", val: a, set: setA },
            { label: "b", val: b, set: setB },
            { label: "c", val: c, set: setC },
          ].map(f => (
            <div key={f.label} className="space-y-0.5">
              <label className="text-[11px] font-medium text-muted-foreground">{f.label}</label>
              <input type="number" value={f.val} onChange={e => f.set(parseFloat(e.target.value) || 0)}
                className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
            </div>
          ))}
          <ResultDisplay label="x = ?" value={x.toFixed(4)} />
        </div>
        <div className="rounded-md bg-primary/5 border border-primary/10 px-3 py-2 text-center font-mono text-xs text-foreground">
          {a} / {b} = {c} / <strong className="text-primary">{x.toFixed(4)}</strong>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default ProportiiCalculator;
