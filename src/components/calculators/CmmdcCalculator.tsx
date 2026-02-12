import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);

const CmmdcCalculator = () => {
  const [a, setA] = useState(24);
  const [b, setB] = useState(36);

  const absA = Math.abs(Math.round(a));
  const absB = Math.abs(Math.round(b));
  const cmmdc = absA > 0 && absB > 0 ? gcd(absA, absB) : 0;
  const cmmmc = absA > 0 && absB > 0 ? lcm(absA, absB) : 0;

  // Factorizare
  const factorize = (n: number) => {
    const factors: [number, number][] = [];
    let num = n;
    for (let d = 2; d * d <= num; d++) {
      let count = 0;
      while (num % d === 0) { num /= d; count++; }
      if (count > 0) factors.push([d, count]);
    }
    if (num > 1) factors.push([num, 1]);
    return factors;
  };

  const factorsA = absA > 1 ? factorize(absA) : [];
  const factorsB = absB > 1 ? factorize(absB) : [];

  return (
    <CalculatorCard
      title="CMMDC & CMMMC"
      description="Cel mai mare divizor comun, cel mai mic multiplu comun, factorizare"
      formula="CMMDC(a,b) × CMMMC(a,b) = a × b"
      explanation="CMMDC se calculează cu algoritmul lui Euclid (împărțiri succesive). CMMMC se obține din factorizare sau din relația CMMDC×CMMMC=a×b. Folosit la simplificarea fracțiilor, la numitoare comune."
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5">
            <label className="text-[11px] font-medium text-muted-foreground">Număr a</label>
            <input type="number" value={a} onChange={e => setA(parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
          </div>
          <div className="space-y-0.5">
            <label className="text-[11px] font-medium text-muted-foreground">Număr b</label>
            <input type="number" value={b} onChange={e => setB(parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ResultDisplay label="CMMDC" value={cmmdc} />
          <ResultDisplay label="CMMMC" value={cmmmc} />
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="rounded-md bg-secondary px-2 py-1.5">
            <span className="text-muted-foreground">Factorizare {absA}:</span>
            <p className="font-mono text-foreground">{factorsA.length > 0 ? factorsA.map(([p, e]) => e > 1 ? `${p}^${e}` : `${p}`).join(" × ") : absA}</p>
          </div>
          <div className="rounded-md bg-secondary px-2 py-1.5">
            <span className="text-muted-foreground">Factorizare {absB}:</span>
            <p className="font-mono text-foreground">{factorsB.length > 0 ? factorsB.map(([p, e]) => e > 1 ? `${p}^${e}` : `${p}`).join(" × ") : absB}</p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default CmmdcCalculator;
