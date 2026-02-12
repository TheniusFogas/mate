import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const GeometrieAnaliticaCalculator = () => {
  const [mode, setMode] = useState<"dist" | "mid" | "line">("dist");
  const [x1, setX1] = useState(1);
  const [y1, setY1] = useState(2);
  const [x2, setX2] = useState(4);
  const [y2, setY2] = useState(6);

  const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const slope = x2 !== x1 ? (y2 - y1) / (x2 - x1) : Infinity;
  const intercept = isFinite(slope) ? y1 - slope * x1 : NaN;

  // SVG
  const svgS = 180;
  const pad = 20;
  const vals = [x1, y1, x2, y2];
  const minV = Math.min(...vals) - 1;
  const maxV = Math.max(...vals) + 1;
  const range = maxV - minV || 1;
  const toSX = (v: number) => pad + ((v - minV) / range) * (svgS - 2 * pad);
  const toSY = (v: number) => svgS - pad - ((v - minV) / range) * (svgS - 2 * pad);

  return (
    <CalculatorCard
      title="Geometrie Analitică"
      description="Distanță, mijlocul segmentului, ecuația dreptei"
      formula="d = √[(x₂-x₁)² + (y₂-y₁)²] | M = ((x₁+x₂)/2, (y₁+y₂)/2)"
      explanation="Geometria analitică studiază figurile geometrice prin coordonate carteziene. Distanța dintre două puncte se calculează cu teorema lui Pitagora. Ecuația dreptei: y = mx + n, unde m = panta."
    >
      <div className="space-y-3">
        <div className="flex gap-1">
          {[
            { k: "dist" as const, l: "Distanță" },
            { k: "mid" as const, l: "Mijloc" },
            { k: "line" as const, l: "Ec. dreptei" },
          ].map(m => (
            <button key={m.k} onClick={() => setMode(m.k)}
              className={`flex-1 rounded-md px-2 py-1.5 text-[11px] font-medium transition-all ${mode === m.k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {m.l}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">x₁</label>
                <input type="number" value={x1} onChange={e => setX1(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
              <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">y₁</label>
                <input type="number" value={y1} onChange={e => setY1(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">x₂</label>
                <input type="number" value={x2} onChange={e => setX2(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
              <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">y₂</label>
                <input type="number" value={y2} onChange={e => setY2(parseFloat(e.target.value) || 0)} className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
            </div>
            {mode === "dist" && <ResultDisplay label="Distanța" value={dist.toFixed(6)} />}
            {mode === "mid" && <ResultDisplay label="Mijloc" value={`(${midX.toFixed(2)}, ${midY.toFixed(2)})`} />}
            {mode === "line" && <ResultDisplay label="Ecuația dreptei" value={isFinite(slope) ? `y = ${slope.toFixed(3)}x ${intercept >= 0 ? "+" : ""}${intercept.toFixed(3)}` : `x = ${x1}`} />}
          </div>
          <div className="rounded-md bg-primary/5 border border-primary/10 p-2">
            <svg viewBox={`0 0 ${svgS} ${svgS}`} className="w-full">
              <line x1={pad} y1={toSY(0)} x2={svgS - pad} y2={toSY(0)} stroke="hsl(180,12%,88%)" strokeWidth="0.5" />
              <line x1={toSX(0)} y1={pad} x2={toSX(0)} y2={svgS - pad} stroke="hsl(180,12%,88%)" strokeWidth="0.5" />
              <line x1={toSX(x1)} y1={toSY(y1)} x2={toSX(x2)} y2={toSY(y2)} stroke="hsl(172,60%,30%)" strokeWidth="2" />
              <circle cx={toSX(x1)} cy={toSY(y1)} r="4" fill="hsl(220,70%,50%)" />
              <circle cx={toSX(x2)} cy={toSY(y2)} r="4" fill="hsl(0,72%,51%)" />
              {mode === "mid" && <circle cx={toSX(midX)} cy={toSY(midY)} r="4" fill="hsl(35,90%,55%)" />}
              <text x={toSX(x1) - 5} y={toSY(y1) - 8} className="text-[8px]" fill="hsl(220,70%,50%)">A</text>
              <text x={toSX(x2) + 3} y={toSY(y2) - 8} className="text-[8px]" fill="hsl(0,72%,51%)">B</text>
            </svg>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default GeometrieAnaliticaCalculator;
