import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

const FractiiCalculator = () => {
  const [n1, setN1] = useState(3);
  const [d1, setD1] = useState(4);
  const [n2, setN2] = useState(2);
  const [d2, setD2] = useState(5);
  const [op, setOp] = useState<"+" | "-" | "×" | "÷">("+");

  let rn = 0, rd = 1;
  if (op === "+") { rn = n1 * d2 + n2 * d1; rd = d1 * d2; }
  else if (op === "-") { rn = n1 * d2 - n2 * d1; rd = d1 * d2; }
  else if (op === "×") { rn = n1 * n2; rd = d1 * d2; }
  else { rn = n1 * d2; rd = d1 * n2; }

  const g = rd !== 0 ? gcd(Math.abs(rn), Math.abs(rd)) : 1;
  const sn = g > 0 ? rn / g : rn;
  const sd = g > 0 ? rd / g : rd;

  // Simplify input fractions
  const g1 = gcd(Math.abs(n1), Math.abs(d1));
  const g2 = gcd(Math.abs(n2), Math.abs(d2));

  return (
    <CalculatorCard
      title="Calculator Fracții"
      description="Adunare, scădere, înmulțire, împărțire, simplificare"
      formula="a/b + c/d = (ad + bc) / bd"
      explanation="Fracțiile se adună/scad prin aducere la numitor comun. Se înmulțesc numărător×numărător și numitor×numitor. Împărțirea = înmulțire cu inversul. Simplificare prin CMMDC."
    >
      <div className="space-y-3">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
          <div className="grid grid-cols-2 gap-1">
            <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">n₁</label>
              <input type="number" value={n1} onChange={e => setN1(parseInt(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
            <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">d₁</label>
              <input type="number" value={d1} onChange={e => setD1(parseInt(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
          </div>
          <div className="flex gap-0.5 pb-1">
            {(["+", "-", "×", "÷"] as const).map(o => (
              <button key={o} onClick={() => setOp(o)}
                className={`rounded-md px-2 py-1 text-xs font-bold transition-all ${op === o ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{o}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">n₂</label>
              <input type="number" value={n2} onChange={e => setN2(parseInt(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
            <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">d₂</label>
              <input type="number" value={d2} onChange={e => setD2(parseInt(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
          </div>
        </div>
        <div className="rounded-md bg-primary/5 border border-primary/10 px-3 py-2 text-center font-mono text-sm">
          <span className="text-foreground">{n1}/{d1}</span>
          <span className="text-primary mx-2 font-bold">{op}</span>
          <span className="text-foreground">{n2}/{d2}</span>
          <span className="text-muted-foreground mx-2">=</span>
          <span className="text-primary font-bold">{sn}/{sd}</span>
          <span className="text-muted-foreground ml-2">= {sd !== 0 ? (sn / sd).toFixed(6) : "∞"}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="rounded-md bg-secondary px-2 py-1.5 text-center">
            <span className="text-muted-foreground">Simplificat {n1}/{d1}:</span>
            <p className="font-mono font-bold text-foreground">{g1 > 0 ? n1 / g1 : n1}/{g1 > 0 ? d1 / g1 : d1}</p>
          </div>
          <div className="rounded-md bg-secondary px-2 py-1.5 text-center">
            <span className="text-muted-foreground">Simplificat {n2}/{d2}:</span>
            <p className="font-mono font-bold text-foreground">{g2 > 0 ? n2 / g2 : n2}/{g2 > 0 ? d2 / g2 : d2}</p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default FractiiCalculator;
