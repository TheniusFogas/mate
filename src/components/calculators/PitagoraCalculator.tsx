import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import InputField from "../InputField";
import ResultDisplay from "../ResultDisplay";

const PitagoraCalculator = () => {
  const [mode, setMode] = useState<"hyp" | "cat">("hyp");
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [c, setC] = useState(5);

  let result: number;
  let label: string;

  if (mode === "hyp") {
    result = Math.sqrt(a * a + b * b);
    label = "Ipotenuza (c)";
  } else {
    result = Math.sqrt(Math.max(0, c * c - a * a));
    label = "Cateta (b)";
  }

  // SVG triangle
  const svgW = 220, svgH = 180;
  const catA = mode === "hyp" ? a : a;
  const catB = mode === "hyp" ? b : result;
  const hyp = mode === "hyp" ? result : c;
  const maxDim = Math.max(catA, catB, 1);
  const scale = 130 / maxDim;
  const pA = { x: 30, y: svgH - 20 };
  const pB = { x: 30 + catA * scale, y: svgH - 20 };
  const pC = { x: 30, y: svgH - 20 - catB * scale };

  // Angle
  const angleA = Math.atan2(catB, catA) * (180 / Math.PI);

  return (
    <CalculatorCard title="Teorema lui Pitagora" description="a² + b² = c² — Calculator interactiv cu triunghi dreptunghic">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-lg bg-primary/5 border border-primary/10 p-3 text-center font-display text-lg">
            a² + b² = c²
          </div>

          <div className="flex gap-2">
            <button onClick={() => setMode("hyp")}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${mode === "hyp" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              Calculează ipotenuza
            </button>
            <button onClick={() => setMode("cat")}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${mode === "cat" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              Calculează cateta
            </button>
          </div>

          {mode === "hyp" ? (
            <>
              <InputField label="Cateta a" value={a} onChange={setA} unit="cm" showSlider min={0.5} max={50} step={0.5} />
              <InputField label="Cateta b" value={b} onChange={setB} unit="cm" showSlider min={0.5} max={50} step={0.5} />
            </>
          ) : (
            <>
              <InputField label="Cateta a" value={a} onChange={setA} unit="cm" showSlider min={0.5} max={50} step={0.5} />
              <InputField label="Ipotenuza c" value={c} onChange={setC} unit="cm" showSlider min={0.5} max={70} step={0.5} />
            </>
          )}

          <ResultDisplay label={label} value={result.toFixed(4)} unit="cm" />

          <div className="grid grid-cols-2 gap-3">
            <ResultDisplay label="Unghi α" value={angleA.toFixed(2)} unit="°" />
            <ResultDisplay label="Unghi β" value={(90 - angleA).toFixed(2)} unit="°" />
            <ResultDisplay label="Arie triunghi" value={(catA * catB / 2).toFixed(2)} unit="cm²" />
            <ResultDisplay label="Perimetru" value={(catA + catB + hyp).toFixed(2)} unit="cm" />
          </div>
        </div>

        <div>
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">Triunghi Dreptunghic</h4>
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
              {/* Right angle marker */}
              <rect x={pA.x} y={pA.y - 12} width={12} height={12} fill="none" stroke="hsl(200,10%,45%)" strokeWidth="1" />

              {/* Triangle */}
              <polygon
                points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y}`}
                fill="hsl(172,60%,30%)" fillOpacity="0.1"
                stroke="hsl(172,60%,30%)" strokeWidth="2"
              />

              {/* Side labels */}
              <text x={(pA.x + pB.x) / 2} y={pA.y + 16} textAnchor="middle" className="text-[11px] font-bold" fill="hsl(220,70%,50%)">
                a = {catA.toFixed(1)}
              </text>
              <text x={pA.x - 14} y={(pA.y + pC.y) / 2} textAnchor="middle" className="text-[11px] font-bold" fill="hsl(0,72%,51%)" transform={`rotate(-90, ${pA.x - 14}, ${(pA.y + pC.y) / 2})`}>
                b = {catB.toFixed(1)}
              </text>
              <text x={(pB.x + pC.x) / 2 + 12} y={(pB.y + pC.y) / 2} className="text-[11px] font-bold" fill="hsl(35,90%,55%)">
                c = {hyp.toFixed(1)}
              </text>

              {/* Angle arcs */}
              <path d={`M ${pB.x - 15} ${pB.y} A 15 15 0 0 0 ${pB.x - 15 * Math.cos(Math.atan2(catB, catA))} ${pB.y - 15 * Math.sin(Math.atan2(catB, catA))}`}
                fill="none" stroke="hsl(35,90%,55%)" strokeWidth="1.5" />
              <text x={pB.x - 25} y={pB.y - 5} className="text-[9px]" fill="hsl(35,80%,45%)">α</text>

              {/* Vertices */}
              <circle cx={pA.x} cy={pA.y} r="3" fill="hsl(172,60%,30%)" />
              <circle cx={pB.x} cy={pB.y} r="3" fill="hsl(172,60%,30%)" />
              <circle cx={pC.x} cy={pC.y} r="3" fill="hsl(172,60%,30%)" />
            </svg>
          </div>

          <div className="mt-4 rounded-lg bg-accent/10 p-3 text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">Verificare: a² + b² = c²</p>
            <p>{catA.toFixed(2)}² + {catB.toFixed(2)}² = {(catA ** 2).toFixed(2)} + {(catB ** 2).toFixed(2)} = {(catA ** 2 + catB ** 2).toFixed(2)}</p>
            <p>{hyp.toFixed(2)}² = {(hyp ** 2).toFixed(2)}</p>
            <p className="text-foreground font-medium">
              {Math.abs(catA ** 2 + catB ** 2 - hyp ** 2) < 0.01 ? "✅ Corect!" : "⚠️ Atenție la valori"}
            </p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default PitagoraCalculator;
