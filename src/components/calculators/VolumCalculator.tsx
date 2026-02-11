import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import InputField from "../InputField";
import ResultDisplay from "../ResultDisplay";

const solids = ["Cub", "Sferă", "Cilindru", "Con"] as const;
type Solid = typeof solids[number];

const Solid3DVisual = ({ solid }: { solid: Solid }) => {
  return (
    <div className="flex items-center justify-center rounded-lg bg-primary/5 p-6">
      <svg width="160" height="160" viewBox="0 0 160 160">
        {solid === "Cub" && (
          <g>
            <rect x="35" y="50" width="70" height="70" fill="hsl(220,70%,50%)" opacity="0.15" stroke="hsl(220,70%,50%)" strokeWidth="2" />
            <polygon points="35,50 60,25 130,25 105,50" fill="hsl(220,70%,55%)" opacity="0.1" stroke="hsl(220,70%,50%)" strokeWidth="2" />
            <polygon points="105,50 130,25 130,95 105,120" fill="hsl(220,70%,45%)" opacity="0.2" stroke="hsl(220,70%,50%)" strokeWidth="2" />
          </g>
        )}
        {solid === "Sferă" && (
          <g>
            <circle cx="80" cy="80" r="60" fill="hsl(172,60%,30%)" opacity="0.15" stroke="hsl(172,60%,30%)" strokeWidth="2" />
            <ellipse cx="80" cy="80" rx="60" ry="20" fill="none" stroke="hsl(172,60%,30%)" strokeWidth="1" strokeDasharray="4,4" />
          </g>
        )}
        {solid === "Cilindru" && (
          <g>
            <ellipse cx="80" cy="35" rx="50" ry="15" fill="hsl(35,90%,55%)" opacity="0.15" stroke="hsl(35,90%,55%)" strokeWidth="2" />
            <rect x="30" y="35" width="100" height="90" fill="hsl(35,90%,55%)" opacity="0.1" />
            <line x1="30" y1="35" x2="30" y2="125" stroke="hsl(35,90%,55%)" strokeWidth="2" />
            <line x1="130" y1="35" x2="130" y2="125" stroke="hsl(35,90%,55%)" strokeWidth="2" />
            <ellipse cx="80" cy="125" rx="50" ry="15" fill="hsl(35,90%,55%)" opacity="0.15" stroke="hsl(35,90%,55%)" strokeWidth="2" />
          </g>
        )}
        {solid === "Con" && (
          <g>
            <line x1="80" y1="20" x2="30" y2="125" stroke="hsl(152,60%,40%)" strokeWidth="2" />
            <line x1="80" y1="20" x2="130" y2="125" stroke="hsl(152,60%,40%)" strokeWidth="2" />
            <ellipse cx="80" cy="125" rx="50" ry="15" fill="hsl(152,60%,40%)" opacity="0.15" stroke="hsl(152,60%,40%)" strokeWidth="2" />
            <polygon points="80,20 30,125 130,125" fill="hsl(152,60%,40%)" opacity="0.1" />
          </g>
        )}
      </svg>
    </div>
  );
};

const VolumCalculator = () => {
  const [solid, setSolid] = useState<Solid>("Cub");
  const [dims, setDims] = useState({ latura: 5, raza: 5, inaltime: 10 });

  const updateDim = (key: string, val: number) => setDims(prev => ({ ...prev, [key]: val }));

  const calcVolume = (): number => {
    switch (solid) {
      case "Cub": return dims.latura ** 3;
      case "Sferă": return (4 / 3) * Math.PI * dims.raza ** 3;
      case "Cilindru": return Math.PI * dims.raza ** 2 * dims.inaltime;
      case "Con": return (1 / 3) * Math.PI * dims.raza ** 2 * dims.inaltime;
      default: return 0;
    }
  };

  const calcSurface = (): number => {
    switch (solid) {
      case "Cub": return 6 * dims.latura ** 2;
      case "Sferă": return 4 * Math.PI * dims.raza ** 2;
      case "Cilindru": return 2 * Math.PI * dims.raza * (dims.raza + dims.inaltime);
      case "Con": {
        const gen = Math.sqrt(dims.raza ** 2 + dims.inaltime ** 2);
        return Math.PI * dims.raza * (dims.raza + gen);
      }
      default: return 0;
    }
  };

  return (
    <CalculatorCard title="Calculator Volume & Suprafețe 3D" description="Calculează volumul și suprafața totală a corpurilor geometrice">
      <div className="mb-4 flex flex-wrap gap-2">
        {solids.map(s => (
          <button key={s} onClick={() => setSolid(s)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${solid === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {solid === "Cub" && <InputField label="Latura" value={dims.latura} onChange={v => updateDim("latura", v)} unit="cm" showSlider min={1} max={50} />}
          {(solid === "Sferă" || solid === "Cilindru" || solid === "Con") && (
            <InputField label="Raza" value={dims.raza} onChange={v => updateDim("raza", v)} unit="cm" showSlider min={1} max={50} />
          )}
          {(solid === "Cilindru" || solid === "Con") && (
            <InputField label="Înălțime" value={dims.inaltime} onChange={v => updateDim("inaltime", v)} unit="cm" showSlider min={1} max={100} />
          )}
        </div>
        <div className="space-y-4">
          <Solid3DVisual solid={solid} />
          <ResultDisplay label="Volum" value={calcVolume().toFixed(2)} unit="cm³" />
          <ResultDisplay label="Suprafață totală" value={calcSurface().toFixed(2)} unit="cm²" />
        </div>
      </div>
    </CalculatorCard>
  );
};

export default VolumCalculator;
