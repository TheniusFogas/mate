import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const primitives = [
  { fn: "xⁿ (n≠-1)", integral: "xⁿ⁺¹/(n+1) + C" },
  { fn: "1/x", integral: "ln|x| + C" },
  { fn: "eˣ", integral: "eˣ + C" },
  { fn: "sin(x)", integral: "-cos(x) + C" },
  { fn: "cos(x)", integral: "sin(x) + C" },
  { fn: "1/cos²(x)", integral: "tan(x) + C" },
  { fn: "1/sin²(x)", integral: "-cot(x) + C" },
  { fn: "1/(1+x²)", integral: "arctan(x) + C" },
  { fn: "1/√(1-x²)", integral: "arcsin(x) + C" },
  { fn: "aˣ", integral: "aˣ/ln(a) + C" },
];

const IntegraleCalculator = () => {
  const [coef, setCoef] = useState(2);
  const [exp, setExp] = useState(3);
  const [a, setA] = useState(0);
  const [b, setB] = useState(5);

  // ∫ coef*x^exp dx from a to b = coef * [x^(exp+1)/(exp+1)] from a to b
  const newExp = exp + 1;
  const definite = newExp !== 0
    ? coef * (Math.pow(b, newExp) / newExp - Math.pow(a, newExp) / newExp)
    : coef * (Math.log(Math.abs(b)) - Math.log(Math.abs(a)));

  return (
    <CalculatorCard
      title="Integrale — Tabel & Calculator"
      description="Primitive, integrala definită, calcul numeric"
      formula="∫xⁿdx = xⁿ⁺¹/(n+1) + C | ∫ₐᵇf(x)dx = F(b) - F(a)"
      explanation="Integrala nedefinită (primitiva) este operația inversă derivării. Integrala definită calculează aria de sub graficul funcției pe un interval [a,b]. Teorema Leibniz-Newton: ∫ₐᵇf(x)dx = F(b)-F(a)."
    >
      <div className="space-y-3">
        <div className="rounded-md bg-primary/5 border border-primary/10 px-3 py-2">
          <p className="text-[10px] text-muted-foreground mb-1">∫ a·xⁿ dx de la a la b</p>
          <div className="grid grid-cols-4 gap-1">
            <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">coef</label>
              <input type="number" value={coef} onChange={e => setCoef(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
            <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">n (exp)</label>
              <input type="number" value={exp} onChange={e => setExp(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
            <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">a (inf)</label>
              <input type="number" value={a} onChange={e => setA(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
            <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">b (sup)</label>
              <input type="number" value={b} onChange={e => setB(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
          </div>
          <div className="mt-2">
            <ResultDisplay label={`∫₍${a}₎₍${b}₎ ${coef}x^${exp} dx`} value={isFinite(definite) ? definite.toFixed(6) : "Nedefinit"} />
          </div>
          <p className="text-[10px] font-mono text-muted-foreground mt-1">
            Primitivă: {coef}/{newExp}·x^{newExp} + C
          </p>
        </div>

        <div className="grid grid-cols-2 gap-1 text-[10px]">
          {primitives.map(p => (
            <div key={p.fn} className="flex justify-between rounded-md bg-secondary px-2 py-1">
              <span className="font-mono text-foreground">∫{p.fn}</span>
              <span className="font-mono text-primary font-medium">{p.integral}</span>
            </div>
          ))}
        </div>
      </div>
    </CalculatorCard>
  );
};

export default IntegraleCalculator;
