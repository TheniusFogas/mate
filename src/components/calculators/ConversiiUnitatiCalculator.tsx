import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

type Cat = "length" | "mass" | "temp";

const units: Record<Cat, { name: string; toBase: (v: number) => number; fromBase: (v: number) => number }[]> = {
  length: [
    { name: "m", toBase: v => v, fromBase: v => v },
    { name: "km", toBase: v => v * 1000, fromBase: v => v / 1000 },
    { name: "cm", toBase: v => v / 100, fromBase: v => v * 100 },
    { name: "mm", toBase: v => v / 1000, fromBase: v => v * 1000 },
    { name: "inch", toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
    { name: "ft", toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
    { name: "mile", toBase: v => v * 1609.34, fromBase: v => v / 1609.34 },
  ],
  mass: [
    { name: "kg", toBase: v => v, fromBase: v => v },
    { name: "g", toBase: v => v / 1000, fromBase: v => v * 1000 },
    { name: "mg", toBase: v => v / 1e6, fromBase: v => v * 1e6 },
    { name: "t", toBase: v => v * 1000, fromBase: v => v / 1000 },
    { name: "lb", toBase: v => v * 0.4536, fromBase: v => v / 0.4536 },
    { name: "oz", toBase: v => v * 0.02835, fromBase: v => v / 0.02835 },
  ],
  temp: [
    { name: "°C", toBase: v => v, fromBase: v => v },
    { name: "°F", toBase: v => (v - 32) * 5 / 9, fromBase: v => v * 9 / 5 + 32 },
    { name: "K", toBase: v => v - 273.15, fromBase: v => v + 273.15 },
  ],
};

const ConversiiUnitatiCalculator = () => {
  const [cat, setCat] = useState<Cat>("length");
  const [val, setVal] = useState(100);
  const [from, setFrom] = useState(0);

  const u = units[cat];
  const base = u[from].toBase(val);

  return (
    <CalculatorCard
      title="Conversii Unități de Măsură"
      description="Lungime, masă, temperatură"
      formula="Conversie prin unitate de bază intermediară"
      explanation="Conversia se face trecând valoarea prin unitatea de bază a categoriei (m, kg, °C), apoi calculând echivalentul în unitatea țintă."
    >
      <div className="space-y-3">
        <div className="flex gap-1">
          {([["length", "Lungime"], ["mass", "Masă"], ["temp", "Temp."]] as [Cat, string][]).map(([k, l]) => (
            <button key={k} onClick={() => { setCat(k); setFrom(0); }}
              className={`flex-1 rounded-md px-2 py-1.5 text-[11px] font-medium transition-all ${cat === k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {l}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-2 items-end">
          <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">Valoare</label>
            <input type="number" value={val} onChange={e => setVal(parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
          <select value={from} onChange={e => setFrom(parseInt(e.target.value))}
            className="rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary">
            {u.map((unit, i) => <option key={unit.name} value={i}>{unit.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {u.map((unit, i) => i !== from && (
            <ResultDisplay key={unit.name} label={unit.name} value={unit.fromBase(base).toFixed(6)} />
          ))}
        </div>
      </div>
    </CalculatorCard>
  );
};

export default ConversiiUnitatiCalculator;
