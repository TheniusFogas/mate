import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const ProgresiiCalculator = () => {
  const [type, setType] = useState<"arit" | "geom">("arit");
  const [a1, setA1] = useState(2);
  const [r, setR] = useState(3);
  const [n, setN] = useState(10);

  let an = 0, sn = 0;
  const terms: number[] = [];

  if (type === "arit") {
    an = a1 + (n - 1) * r;
    sn = (n * (a1 + an)) / 2;
    for (let i = 0; i < Math.min(n, 15); i++) terms.push(a1 + i * r);
  } else {
    an = a1 * Math.pow(r, n - 1);
    sn = r !== 1 ? a1 * (Math.pow(r, n) - 1) / (r - 1) : a1 * n;
    for (let i = 0; i < Math.min(n, 15); i++) terms.push(a1 * Math.pow(r, i));
  }

  return (
    <CalculatorCard
      title="Progresii Aritmetice & Geometrice"
      description="Termen general, suma primilor n termeni"
      formula={type === "arit" ? "aₙ = a₁ + (n-1)·r | Sₙ = n·(a₁+aₙ)/2" : "aₙ = a₁·qⁿ⁻¹ | Sₙ = a₁·(qⁿ-1)/(q-1)"}
      explanation={type === "arit" ? "Progresie aritmetică: fiecare termen se obține adunând rația r la termenul precedent. Ex: 2, 5, 8, 11..." : "Progresie geometrică: fiecare termen se obține înmulțind cu rația q. Ex: 2, 6, 18, 54..."}
    >
      <div className="space-y-3">
        <div className="flex gap-1">
          {[{ k: "arit" as const, l: "Aritmetică" }, { k: "geom" as const, l: "Geometrică" }].map(t => (
            <button key={t.k} onClick={() => setType(t.k)}
              className={`flex-1 rounded-md px-2 py-1.5 text-[11px] font-medium transition-all ${type === t.k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {t.l}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "a₁ (primul termen)", val: a1, set: setA1 },
            { label: type === "arit" ? "r (rația)" : "q (rația)", val: r, set: setR },
            { label: "n (nr. termeni)", val: n, set: setN },
          ].map(f => (
            <div key={f.label} className="space-y-0.5">
              <label className="text-[11px] font-medium text-muted-foreground">{f.label}</label>
              <input type="number" value={f.val} onChange={e => f.set(parseFloat(e.target.value) || 0)}
                className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ResultDisplay label={`a${n} (termen general)`} value={isFinite(an) ? an.toFixed(4) : "∞"} />
          <ResultDisplay label={`S${n} (suma)`} value={isFinite(sn) ? sn.toFixed(4) : "∞"} />
        </div>
        <div className="rounded-md bg-primary/5 border border-primary/10 px-3 py-2">
          <p className="text-[10px] text-muted-foreground mb-1">Primii {Math.min(n, 15)} termeni:</p>
          <p className="text-xs font-mono text-foreground">{terms.map(t => isFinite(t) ? (Number.isInteger(t) ? t : t.toFixed(2)) : "∞").join(", ")}{n > 15 ? ", ..." : ""}</p>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default ProgresiiCalculator;
