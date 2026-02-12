import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const functions = [
  { name: "xⁿ", deriv: "n·xⁿ⁻¹", desc: "Putere" },
  { name: "sin(x)", deriv: "cos(x)", desc: "Sinus" },
  { name: "cos(x)", deriv: "-sin(x)", desc: "Cosinus" },
  { name: "tan(x)", deriv: "1/cos²(x)", desc: "Tangentă" },
  { name: "eˣ", deriv: "eˣ", desc: "Exponențială" },
  { name: "ln(x)", deriv: "1/x", desc: "Logaritm natural" },
  { name: "√x", deriv: "1/(2√x)", desc: "Radical" },
  { name: "1/x", deriv: "-1/x²", desc: "Inversă" },
  { name: "aˣ", deriv: "aˣ·ln(a)", desc: "Exponențială gen." },
  { name: "logₐ(x)", deriv: "1/(x·ln(a))", desc: "Logaritm gen." },
];

const rules = [
  { name: "Suma", rule: "(f+g)' = f' + g'" },
  { name: "Produs", rule: "(f·g)' = f'·g + f·g'" },
  { name: "Cât", rule: "(f/g)' = (f'·g - f·g') / g²" },
  { name: "Compunere", rule: "(f∘g)' = f'(g(x))·g'(x)" },
];

const DerivateCalculator = () => {
  const [coef, setCoef] = useState(3);
  const [exp, setExp] = useState(2);
  const [x, setX] = useState(5);

  // f(x) = coef * x^exp => f'(x) = coef * exp * x^(exp-1)
  const fx = coef * Math.pow(x, exp);
  const fpx = coef * exp * Math.pow(x, exp - 1);

  return (
    <CalculatorCard
      title="Derivate — Tabel & Calculator"
      description="Derivate elementare, reguli de derivare, calcul numeric"
      formula="(xⁿ)' = n·xⁿ⁻¹ | (f·g)' = f'g + fg'"
      explanation="Derivata unei funcții f în punctul x₀ este limita raportului incremental: f'(x₀) = lim[h→0] (f(x₀+h)-f(x₀))/h. Reprezintă panta tangentei la grafic. Se folosește în fizică (viteza = derivata poziției), optimizare, analiză."
    >
      <div className="space-y-3">
        {/* Numeric calc */}
        <div className="rounded-md bg-primary/5 border border-primary/10 px-3 py-2">
          <p className="text-[10px] text-muted-foreground mb-1">Calculator numeric: f(x) = a·xⁿ</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">a (coef)</label>
              <input type="number" value={coef} onChange={e => setCoef(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
            <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">n (exp)</label>
              <input type="number" value={exp} onChange={e => setExp(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
            <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">x₀</label>
              <input type="number" value={x} onChange={e => setX(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <ResultDisplay label={`f(${x})`} value={isFinite(fx) ? fx.toFixed(4) : "∞"} />
            <ResultDisplay label={`f'(${x})`} value={isFinite(fpx) ? fpx.toFixed(4) : "∞"} />
          </div>
          <p className="text-[10px] font-mono text-muted-foreground mt-1">f(x) = {coef}x^{exp} → f'(x) = {coef * exp}x^{exp - 1}</p>
        </div>

        {/* Table */}
        <div className="grid grid-cols-2 gap-1 text-[10px]">
          {functions.map(f => (
            <div key={f.name} className="flex justify-between rounded-md bg-secondary px-2 py-1">
              <span className="font-mono text-foreground">{f.name}</span>
              <span className="font-mono text-primary font-medium">{f.deriv}</span>
            </div>
          ))}
        </div>

        {/* Rules */}
        <div className="grid grid-cols-2 gap-1 text-[10px]">
          {rules.map(r => (
            <div key={r.name} className="rounded-md bg-accent/10 px-2 py-1">
              <span className="text-muted-foreground">{r.name}: </span>
              <span className="font-mono text-foreground">{r.rule}</span>
            </div>
          ))}
        </div>
      </div>
    </CalculatorCard>
  );
};

export default DerivateCalculator;
