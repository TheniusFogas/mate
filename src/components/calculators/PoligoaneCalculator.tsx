import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const PoligoaneCalculator = () => {
  const [n, setN] = useState(6);
  const [side, setSide] = useState(5);

  const area = (n * side * side) / (4 * Math.tan(Math.PI / n));
  const perimeter = n * side;
  const apothem = side / (2 * Math.tan(Math.PI / n));
  const circumR = side / (2 * Math.sin(Math.PI / n));
  const intAngle = ((n - 2) * 180) / n;
  const extAngle = 360 / n;
  const diagonals = (n * (n - 3)) / 2;

  // SVG
  const svgS = 140;
  const cx = svgS / 2, cy = svgS / 2, r = 55;
  const pts = Array.from({ length: n }, (_, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");

  return (
    <CalculatorCard
      title="Poligoane Regulate"
      description="Arie, perimetru, apotema, unghi, diagonale"
      formula="A = (n·a²)/(4·tan(π/n)) | P = n·a"
      explanation="Un poligon regulat are toate laturile și unghiurile egale. Apotemul este distanța de la centru la mijlocul unei laturi. Suma unghiurilor interioare = (n-2)·180°. Nr. diagonale = n(n-3)/2."
    >
      <div className="space-y-3">
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">Nr. laturi (n)</label>
                <input type="number" value={n} onChange={e => setN(Math.max(3, parseInt(e.target.value) || 3))} min={3} max={20}
                  className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
              <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">Latura (a)</label>
                <input type="number" value={side} onChange={e => setSide(parseFloat(e.target.value) || 1)} min={0.1}
                  className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <ResultDisplay label="Arie" value={area.toFixed(4)} unit="u²" />
              <ResultDisplay label="Perimetru" value={perimeter.toFixed(2)} unit="u" />
              <ResultDisplay label="Apotema" value={apothem.toFixed(4)} />
              <ResultDisplay label="R circumscris" value={circumR.toFixed(4)} />
            </div>
          </div>
          <div className="rounded-md bg-primary/5 border border-primary/10 p-2 flex items-center">
            <svg viewBox={`0 0 ${svgS} ${svgS}`} width={svgS} height={svgS}>
              <polygon points={pts} fill="hsl(172,60%,30%)" fillOpacity="0.15" stroke="hsl(172,60%,30%)" strokeWidth="2" />
              <circle cx={cx} cy={cy} r="2" fill="hsl(35,90%,55%)" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 text-[10px]">
          <div className="rounded-md bg-secondary px-2 py-1 text-center">
            <span className="text-muted-foreground">Unghi int.</span>
            <p className="font-bold text-foreground">{intAngle.toFixed(1)}°</p>
          </div>
          <div className="rounded-md bg-secondary px-2 py-1 text-center">
            <span className="text-muted-foreground">Unghi ext.</span>
            <p className="font-bold text-foreground">{extAngle.toFixed(1)}°</p>
          </div>
          <div className="rounded-md bg-secondary px-2 py-1 text-center">
            <span className="text-muted-foreground">Diagonale</span>
            <p className="font-bold text-foreground">{diagonals}</p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default PoligoaneCalculator;
