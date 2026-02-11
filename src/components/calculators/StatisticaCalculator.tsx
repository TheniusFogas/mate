import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const StatisticaCalculator = () => {
  const [input, setInput] = useState("12, 15, 18, 22, 25, 28, 30, 35, 40, 45");

  const numbers = input
    .split(/[,;\s]+/)
    .map(s => parseFloat(s.trim()))
    .filter(n => !isNaN(n));

  const n = numbers.length;
  const sorted = [...numbers].sort((a, b) => a - b);

  const sum = numbers.reduce((s, v) => s + v, 0);
  const mean = n > 0 ? sum / n : 0;

  const median = n > 0
    ? n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)]
    : 0;

  // Mode
  const freq: Record<number, number> = {};
  numbers.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
  const maxFreq = Math.max(...Object.values(freq), 0);
  const modes = Object.entries(freq)
    .filter(([, f]) => f === maxFreq && f > 1)
    .map(([v]) => parseFloat(v));

  const variance = n > 0 ? numbers.reduce((s, v) => s + (v - mean) ** 2, 0) / n : 0;
  const stdDev = Math.sqrt(variance);
  const range = n > 0 ? sorted[n - 1] - sorted[0] : 0;

  // Q1, Q3
  const q1Index = Math.floor(n * 0.25);
  const q3Index = Math.floor(n * 0.75);
  const q1 = sorted[q1Index] ?? 0;
  const q3 = sorted[q3Index] ?? 0;
  const iqr = q3 - q1;

  // Chart bars
  const maxVal = Math.max(...numbers, 1);
  const barW = n > 0 ? Math.min(30, 280 / n - 2) : 20;

  return (
    <CalculatorCard title="Calculator Statistică" description="Medie, mediană, mod, deviație standard, vizualizare date">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Date (separate prin virgulă)</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring font-mono"
              placeholder="Ex: 12, 15, 18, 22, 25"
            />
            <p className="text-xs text-muted-foreground">{n} valori detectate</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ResultDisplay label="Medie aritmetică" value={mean.toFixed(4)} />
            <ResultDisplay label="Mediană" value={median.toFixed(4)} />
            <ResultDisplay label="Mod" value={modes.length > 0 ? modes.join(", ") : "—"} />
            <ResultDisplay label="Amplitudine" value={range.toFixed(4)} />
            <ResultDisplay label="Varianță" value={variance.toFixed(4)} />
            <ResultDisplay label="Deviație standard" value={stdDev.toFixed(4)} />
            <ResultDisplay label="Q1 (25%)" value={q1.toFixed(2)} />
            <ResultDisplay label="Q3 (75%)" value={q3.toFixed(2)} />
          </div>

          <div className="rounded-lg bg-accent/10 p-3 text-xs text-muted-foreground">
            <p>IQR (interval intercuartilic): <strong className="text-foreground">{iqr.toFixed(2)}</strong></p>
            <p>Sumă: <strong className="text-foreground">{sum.toFixed(2)}</strong> | Min: <strong className="text-foreground">{sorted[0]?.toFixed(2)}</strong> | Max: <strong className="text-foreground">{sorted[n - 1]?.toFixed(2)}</strong></p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Bar chart */}
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Distribuție valori</h4>
            <svg viewBox={`0 0 300 160`} className="w-full">
              {/* Mean line */}
              {n > 0 && (
                <>
                  <line x1={10} y1={150 - (mean / maxVal) * 130} x2={290} y2={150 - (mean / maxVal) * 130}
                    stroke="hsl(0,72%,51%)" strokeWidth="1" strokeDasharray="4,3" />
                  <text x={292} y={150 - (mean / maxVal) * 130 + 3} className="text-[8px]" fill="hsl(0,72%,51%)">x̄</text>
                </>
              )}

              {/* Bars */}
              {sorted.map((v, i) => {
                const h = (v / maxVal) * 130;
                const x = 10 + i * (barW + 2);
                return (
                  <g key={i}>
                    <rect x={x} y={150 - h} width={barW} height={h} fill="hsl(172,60%,30%)" opacity="0.6" rx="2" />
                    {barW >= 12 && (
                      <text x={x + barW / 2} y={145 - h} textAnchor="middle" className="text-[7px]" fill="hsl(200,25%,10%)">{v}</text>
                    )}
                  </g>
                );
              })}

              {/* Baseline */}
              <line x1={8} y1={150} x2={295} y2={150} stroke="hsl(200,10%,45%)" strokeWidth="1" />
            </svg>
            <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="inline-block h-2 w-4 rounded bg-primary opacity-60" /> Valori</span>
              <span className="flex items-center gap-1"><span className="inline-block h-0.5 w-4 bg-destructive" style={{ borderTop: "1px dashed" }} /> Medie</span>
            </div>
          </div>

          {/* Box plot simplified */}
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">Box Plot</h4>
            <svg viewBox="0 0 300 60" className="w-full">
              {n > 0 && (() => {
                const scale = (v: number) => 20 + ((v - sorted[0]) / (range || 1)) * 260;
                return (
                  <g>
                    {/* Whiskers */}
                    <line x1={scale(sorted[0])} y1={30} x2={scale(q1)} y2={30} stroke="hsl(200,10%,45%)" strokeWidth="1.5" />
                    <line x1={scale(q3)} y1={30} x2={scale(sorted[n - 1])} y2={30} stroke="hsl(200,10%,45%)" strokeWidth="1.5" />
                    <line x1={scale(sorted[0])} y1={20} x2={scale(sorted[0])} y2={40} stroke="hsl(200,10%,45%)" strokeWidth="1.5" />
                    <line x1={scale(sorted[n - 1])} y1={20} x2={scale(sorted[n - 1])} y2={40} stroke="hsl(200,10%,45%)" strokeWidth="1.5" />

                    {/* Box */}
                    <rect x={scale(q1)} y={15} width={scale(q3) - scale(q1)} height={30} fill="hsl(172,60%,30%)" opacity="0.2" stroke="hsl(172,60%,30%)" strokeWidth="2" rx="3" />

                    {/* Median */}
                    <line x1={scale(median)} y1={15} x2={scale(median)} y2={45} stroke="hsl(35,90%,55%)" strokeWidth="2.5" />

                    {/* Labels */}
                    <text x={scale(sorted[0])} y={55} textAnchor="middle" className="text-[8px]" fill="hsl(200,10%,45%)">{sorted[0]}</text>
                    <text x={scale(sorted[n - 1])} y={55} textAnchor="middle" className="text-[8px]" fill="hsl(200,10%,45%)">{sorted[n - 1]}</text>
                    <text x={scale(median)} y={10} textAnchor="middle" className="text-[8px] font-bold" fill="hsl(35,80%,45%)">Md={median.toFixed(1)}</text>
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default StatisticaCalculator;
