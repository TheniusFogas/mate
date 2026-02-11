import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const TrigonometrieCalculator = () => {
  const [angle, setAngle] = useState(45);
  const [unit, setUnit] = useState<"deg" | "rad">("deg");

  const rad = unit === "deg" ? (angle * Math.PI) / 180 : angle;
  const deg = unit === "rad" ? (angle * 180) / Math.PI : angle;

  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const tan = Math.cos(rad) !== 0 ? Math.tan(rad) : Infinity;
  const cot = Math.sin(rad) !== 0 ? 1 / Math.tan(rad) : Infinity;
  const sec = Math.cos(rad) !== 0 ? 1 / Math.cos(rad) : Infinity;
  const csc = Math.sin(rad) !== 0 ? 1 / Math.sin(rad) : Infinity;

  // Unit circle SVG
  const cx = 140, cy = 140, r = 110;
  const px = cx + r * Math.cos(rad);
  const py = cy - r * Math.sin(rad);
  const cosX = cx + r * cos;
  const sinY = cy - r * sin;

  const formatVal = (v: number) => Math.abs(v) > 1e10 ? "∞" : v.toFixed(6);

  // Common angles
  const commonAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 270, 315, 360];

  return (
    <CalculatorCard title="Calculator Trigonometric" description="Funcții trigonometrice cu vizualizare pe cercul unitar">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex gap-2">
            {(["deg", "rad"] as const).map(u => (
              <button key={u} onClick={() => setUnit(u)}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${unit === u ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                {u === "deg" ? "Grade (°)" : "Radiani"}
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Unghi ({unit === "deg" ? "°" : "rad"})
            </label>
            <input
              type="number"
              value={angle}
              onChange={e => setAngle(parseFloat(e.target.value) || 0)}
              step={unit === "deg" ? 1 : 0.01}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring"
            />
            <input
              type="range"
              value={unit === "deg" ? angle : (angle * 180) / Math.PI}
              onChange={e => {
                const d = parseFloat(e.target.value);
                setAngle(unit === "deg" ? d : (d * Math.PI) / 180);
              }}
              min={0} max={360} step={1}
              className="w-full accent-primary"
            />
          </div>

          {/* Quick angles */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Unghiuri comune</label>
            <div className="flex flex-wrap gap-1.5">
              {commonAngles.map(a => (
                <button key={a} onClick={() => { setUnit("deg"); setAngle(a); }}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                    Math.abs((unit === "deg" ? angle : deg) - a) < 0.5
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}>
                  {a}°
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ResultDisplay label="sin(α)" value={formatVal(sin)} />
            <ResultDisplay label="cos(α)" value={formatVal(cos)} />
            <ResultDisplay label="tan(α)" value={formatVal(tan)} />
            <ResultDisplay label="cot(α)" value={formatVal(cot)} />
            <ResultDisplay label="sec(α)" value={formatVal(sec)} />
            <ResultDisplay label="csc(α)" value={formatVal(csc)} />
          </div>

          <div className="rounded-lg bg-accent/10 p-3 text-xs text-muted-foreground space-y-1">
            <p>α = <strong className="text-foreground">{deg.toFixed(2)}°</strong> = <strong className="text-foreground">{rad.toFixed(4)} rad</strong></p>
            <p>sin²(α) + cos²(α) = <strong className="text-foreground">{(sin * sin + cos * cos).toFixed(6)}</strong></p>
          </div>
        </div>

        <div>
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">Cercul Unitar</h4>
            <svg viewBox="0 0 280 280" className="w-full">
              {/* Grid */}
              <line x1={0} y1={cy} x2={280} y2={cy} stroke="hsl(180,12%,88%)" strokeWidth="1" />
              <line x1={cx} y1={0} x2={cx} y2={280} stroke="hsl(180,12%,88%)" strokeWidth="1" />

              {/* Circle */}
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(200,10%,45%)" strokeWidth="1" strokeDasharray="4,4" />

              {/* Quadrant labels */}
              <text x={cx + r + 8} y={cy + 4} className="text-[10px]" fill="hsl(200,10%,45%)">0°</text>
              <text x={cx - 4} y={cy - r - 5} className="text-[10px]" fill="hsl(200,10%,45%)" textAnchor="middle">90°</text>
              <text x={cx - r - 18} y={cy + 4} className="text-[10px]" fill="hsl(200,10%,45%)">180°</text>
              <text x={cx - 4} y={cy + r + 14} className="text-[10px]" fill="hsl(200,10%,45%)" textAnchor="middle">270°</text>

              {/* Angle arc */}
              {(() => {
                const arcR = 30;
                const endX = cx + arcR * Math.cos(rad);
                const endY = cy - arcR * Math.sin(rad);
                const largeArc = (deg % 360) > 180 ? 1 : 0;
                return (
                  <path
                    d={`M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 ${largeArc} 0 ${endX} ${endY}`}
                    fill="hsl(172,60%,30%)" fillOpacity="0.1"
                    stroke="hsl(172,60%,30%)" strokeWidth="1.5"
                  />
                );
              })()}

              {/* Radius line */}
              <line x1={cx} y1={cy} x2={px} y2={py} stroke="hsl(172,60%,30%)" strokeWidth="2" />

              {/* cos projection */}
              <line x1={px} y1={py} x2={px} y2={cy} stroke="hsl(0,72%,51%)" strokeWidth="1.5" strokeDasharray="4,3" />
              <line x1={cx} y1={cy} x2={cosX} y2={cy} stroke="hsl(220,70%,50%)" strokeWidth="2.5" />

              {/* sin projection */}
              <line x1={cx} y1={cy} x2={cx} y2={sinY} stroke="hsl(0,72%,51%)" strokeWidth="2.5" />

              {/* Point on circle */}
              <circle cx={px} cy={py} r="5" fill="hsl(35,90%,55%)" stroke="hsl(35,80%,45%)" strokeWidth="1" />

              {/* Labels */}
              <text x={cx + (cosX - cx) / 2} y={cy + 14} textAnchor="middle" className="text-[10px] font-bold" fill="hsl(220,70%,50%)">cos</text>
              <text x={cx - 14} y={cy - (cy - sinY) / 2 + 3} textAnchor="middle" className="text-[10px] font-bold" fill="hsl(0,72%,51%)">sin</text>

              {/* Coordinate */}
              <text x={px + 8} y={py - 8} className="text-[9px]" fill="hsl(200,10%,45%)">
                ({cos.toFixed(2)}, {sin.toFixed(2)})
              </text>
            </svg>
            <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="inline-block h-2 w-6 rounded bg-info" /> cos(α)</span>
              <span className="flex items-center gap-1"><span className="inline-block h-2 w-6 rounded bg-destructive" /> sin(α)</span>
              <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-accent" /> Punct</span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default TrigonometrieCalculator;
