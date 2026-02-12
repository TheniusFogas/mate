import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const factorial = (n: number): number => {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

const perm = (n: number) => factorial(n);
const arr = (n: number, k: number) => factorial(n) / factorial(n - k);
const comb = (n: number, k: number) => factorial(n) / (factorial(k) * factorial(n - k));

const CombinatricaCalculator = () => {
  const [mode, setMode] = useState<"perm" | "arr" | "comb" | "fact">("comb");
  const [n, setN] = useState(10);
  const [k, setK] = useState(3);

  let result = 0;
  if (mode === "fact") result = factorial(Math.min(n, 170));
  else if (mode === "perm") result = perm(Math.min(n, 170));
  else if (mode === "arr") result = k <= n ? arr(n, k) : 0;
  else result = k <= n ? comb(n, k) : 0;

  const labels: Record<string, string> = {
    perm: `P(${n}) = ${n}!`,
    arr: `A(${n},${k}) = ${n}!/(${n}-${k})!`,
    comb: `C(${n},${k}) = ${n}!/[${k}!·(${n}-${k})!]`,
    fact: `${n}!`,
  };

  return (
    <CalculatorCard
      title="Combinatorică"
      description="Permutări, aranjamente, combinări, factorial"
      formula="P(n)=n! | A(n,k)=n!/(n-k)! | C(n,k)=n!/[k!(n-k)!]"
      explanation="Permutări: câte moduri de a aranja n obiecte. Aranjamente: câte submulțimi ordonate de k din n. Combinări: câte submulțimi neordonate de k din n. Binomul lui Newton: (a+b)ⁿ = ΣC(n,k)·aⁿ⁻ᵏ·bᵏ"
    >
      <div className="space-y-3">
        <div className="flex gap-1">
          {[
            { k: "comb" as const, l: "C(n,k)" },
            { k: "arr" as const, l: "A(n,k)" },
            { k: "perm" as const, l: "P(n)" },
            { k: "fact" as const, l: "n!" },
          ].map(m => (
            <button key={m.k} onClick={() => setMode(m.k)}
              className={`flex-1 rounded-md px-2 py-1.5 text-[11px] font-medium transition-all ${mode === m.k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {m.l}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5">
            <label className="text-[11px] font-medium text-muted-foreground">n</label>
            <input type="number" value={n} onChange={e => setN(Math.max(0, Math.min(170, parseInt(e.target.value) || 0)))}
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
          </div>
          {(mode === "arr" || mode === "comb") && (
            <div className="space-y-0.5">
              <label className="text-[11px] font-medium text-muted-foreground">k</label>
              <input type="number" value={k} onChange={e => setK(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
            </div>
          )}
        </div>
        <ResultDisplay label={labels[mode]} value={isFinite(result) ? result.toLocaleString() : "Prea mare"} />
        {mode === "comb" && k <= n && n <= 15 && (
          <div className="rounded-md bg-primary/5 border border-primary/10 px-3 py-2">
            <p className="text-[10px] text-muted-foreground mb-1">Triunghiul lui Pascal (rândul {n}):</p>
            <p className="text-xs font-mono text-foreground">{Array.from({ length: n + 1 }, (_, i) => comb(n, i).toLocaleString()).join("  ")}</p>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
};

export default CombinatricaCalculator;
