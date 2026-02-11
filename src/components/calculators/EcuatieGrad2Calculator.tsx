import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import InputField from "../InputField";
import ResultDisplay from "../ResultDisplay";

const EcuatieGrad2Calculator = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-5);
  const [c, setC] = useState(6);

  const delta = b * b - 4 * a * c;
  let x1: string, x2: string, tip: string;

  if (a === 0) {
    tip = "Nu este ecuație de gradul 2";
    x1 = b !== 0 ? (-c / b).toFixed(4) : "Nedefinit";
    x2 = "";
  } else if (delta > 0) {
    tip = "Două rădăcini reale distincte";
    x1 = ((-b + Math.sqrt(delta)) / (2 * a)).toFixed(4);
    x2 = ((-b - Math.sqrt(delta)) / (2 * a)).toFixed(4);
  } else if (delta === 0) {
    tip = "Rădăcină reală dublă";
    x1 = (-b / (2 * a)).toFixed(4);
    x2 = x1;
  } else {
    tip = "Două rădăcini complexe conjugate";
    const real = (-b / (2 * a)).toFixed(4);
    const imag = (Math.sqrt(-delta) / (2 * a)).toFixed(4);
    x1 = `${real} + ${imag}i`;
    x2 = `${real} - ${imag}i`;
  }

  // Vertex for parabola
  const vx = a !== 0 ? -b / (2 * a) : 0;
  const vy = a !== 0 ? a * vx * vx + b * vx + c : 0;

  // Generate points for parabola SVG
  const svgW = 300, svgH = 200;
  const range = 6;
  const toSvgX = (x: number) => ((x - vx + range) / (2 * range)) * svgW;
  const yMin = vy - 10;
  const yMax = vy + 10;
  const toSvgY = (y: number) => svgH - ((y - yMin) / (yMax - yMin)) * svgH;

  const points: string[] = [];
  for (let px = vx - range; px <= vx + range; px += 0.2) {
    const py = a * px * px + b * px + c;
    const sx = toSvgX(px);
    const sy = toSvgY(py);
    if (sy >= -50 && sy <= svgH + 50) {
      points.push(`${sx},${sy}`);
    }
  }

  // Axis positions
  const axisX = toSvgY(0);
  const axisY = toSvgX(0);

  return (
    <CalculatorCard title="Ecuație de Gradul 2" description="ax² + bx + c = 0 — Rezolvare completă cu vizualizare parabolă">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 text-center font-display text-lg">
            <span className="text-primary font-bold">{a}</span>x² {b >= 0 ? "+" : ""}{" "}
            <span className="text-primary font-bold">{b}</span>x {c >= 0 ? "+" : ""}{" "}
            <span className="text-primary font-bold">{c}</span> = 0
          </div>

          <InputField label="Coeficientul a" value={a} onChange={setA} min={-20} max={20} step={0.5} showSlider />
          <InputField label="Coeficientul b" value={b} onChange={setB} min={-20} max={20} step={0.5} showSlider />
          <InputField label="Coeficientul c" value={c} onChange={setC} min={-20} max={20} step={0.5} showSlider />

          <div className="space-y-3">
            <ResultDisplay label="Discriminant (Δ)" value={delta.toFixed(2)} />
            <ResultDisplay label="x₁" value={x1} />
            {x2 && <ResultDisplay label="x₂" value={x2} />}
            <div className="rounded-lg bg-accent/10 p-3">
              <p className="text-sm font-medium text-foreground">{tip}</p>
              {a !== 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Vârf parabolă: ({vx.toFixed(2)}, {vy.toFixed(2)})
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">Grafic f(x) = {a}x² {b >= 0 ? "+" : ""}{b}x {c >= 0 ? "+" : ""}{c}</h4>
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minHeight: 200 }}>
              {/* Grid */}
              {Array.from({ length: 11 }).map((_, i) => (
                <line key={`gx${i}`} x1={i * (svgW / 10)} y1={0} x2={i * (svgW / 10)} y2={svgH} stroke="hsl(180,12%,88%)" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`gy${i}`} x1={0} y1={i * (svgH / 8)} x2={svgW} y2={i * (svgH / 8)} stroke="hsl(180,12%,88%)" strokeWidth="0.5" />
              ))}

              {/* Axes */}
              {axisX >= 0 && axisX <= svgH && (
                <line x1={0} y1={axisX} x2={svgW} y2={axisX} stroke="hsl(200,10%,45%)" strokeWidth="1" />
              )}
              {axisY >= 0 && axisY <= svgW && (
                <line x1={axisY} y1={0} x2={axisY} y2={svgH} stroke="hsl(200,10%,45%)" strokeWidth="1" />
              )}

              {/* Parabola */}
              {points.length > 1 && (
                <polyline
                  points={points.join(" ")}
                  fill="none"
                  stroke="hsl(172,60%,30%)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              )}

              {/* Vertex */}
              <circle cx={toSvgX(vx)} cy={toSvgY(vy)} r="4" fill="hsl(35,90%,55%)" />

              {/* Roots */}
              {a !== 0 && delta >= 0 && (
                <>
                  <circle cx={toSvgX(parseFloat(x1))} cy={toSvgY(0)} r="5" fill="hsl(0,72%,51%)" opacity="0.8" />
                  {delta > 0 && (
                    <circle cx={toSvgX(parseFloat(x2))} cy={toSvgY(0)} r="5" fill="hsl(0,72%,51%)" opacity="0.8" />
                  )}
                </>
              )}
            </svg>
            <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-primary" /> Parabolă</span>
              <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-accent" /> Vârf</span>
              <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-destructive" /> Rădăcini</span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default EcuatieGrad2Calculator;
