import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const CercCalculator = () => {
  const [r, setR] = useState(5);
  const [angleDeg, setAngleDeg] = useState(90);

  const area = Math.PI * r * r;
  const circumference = 2 * Math.PI * r;
  const diameter = 2 * r;
  const angleRad = (angleDeg * Math.PI) / 180;
  const arcLength = r * angleRad;
  const sectorArea = (r * r * angleRad) / 2;
  const chordLength = 2 * r * Math.sin(angleRad / 2);
  const segmentArea = sectorArea - (r * r * Math.sin(angleRad)) / 2;

  return (
    <CalculatorCard
      title="Calculator Cerc"
      description="Arie, circumferință, arc, sector, segment, coardă"
      formula="A = πr² | C = 2πr | Arc = rθ | Sector = r²θ/2"
      explanation="Cercul e mulțimea punctelor echidistante de centru. Sectorul e aria dintre 2 raze. Segmentul circular e aria dintre coardă și arc. Coarda e segmentul care unește 2 puncte de pe cerc."
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">Raza (r)</label>
            <input type="number" value={r} onChange={e => setR(parseFloat(e.target.value) || 1)} min={0.1}
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
          <div className="space-y-0.5"><label className="text-[10px] text-muted-foreground">Unghi (°)</label>
            <input type="number" value={angleDeg} onChange={e => setAngleDeg(parseFloat(e.target.value) || 0)} min={0} max={360}
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <ResultDisplay label="Arie cerc" value={area.toFixed(4)} unit="u²" />
          <ResultDisplay label="Circumferință" value={circumference.toFixed(4)} unit="u" />
          <ResultDisplay label="Diametru" value={diameter.toFixed(2)} unit="u" />
          <ResultDisplay label="Lungime arc" value={arcLength.toFixed(4)} unit="u" />
          <ResultDisplay label="Arie sector" value={sectorArea.toFixed(4)} unit="u²" />
          <ResultDisplay label="Lungime coardă" value={chordLength.toFixed(4)} unit="u" />
        </div>
        <div className="rounded-md bg-secondary px-2 py-1 text-[10px] text-center">
          <span className="text-muted-foreground">Arie segment circular: </span>
          <span className="font-mono font-bold text-foreground">{segmentArea.toFixed(4)} u²</span>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default CercCalculator;
