import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import InputField from "../InputField";
import ResultDisplay from "../ResultDisplay";

const shapes = ["Cerc", "Dreptunghi", "Triunghi", "Trapez"] as const;
type Shape = typeof shapes[number];

const ShapeVisual = ({ shape, dims }: { shape: Shape; dims: Record<string, number> }) => {
  const svgSize = 160;
  return (
    <div className="flex items-center justify-center rounded-lg bg-primary/5 p-4">
      <svg width={svgSize} height={svgSize} viewBox="0 0 160 160">
        {shape === "Cerc" && (
          <circle cx="80" cy="80" r={Math.min(70, Math.max(20, dims.raza || 40))} fill="hsl(172,60%,30%)" opacity="0.2" stroke="hsl(172,60%,30%)" strokeWidth="2" />
        )}
        {shape === "Dreptunghi" && (
          <rect x={80 - Math.min(70, dims.lungime || 50) / 2} y={80 - Math.min(60, dims.latime || 30) / 2} width={Math.min(140, dims.lungime || 100)} height={Math.min(120, dims.latime || 60)} fill="hsl(220,70%,50%)" opacity="0.2" stroke="hsl(220,70%,50%)" strokeWidth="2" rx="2" />
        )}
        {shape === "Triunghi" && (
          <polygon points={`80,20 ${140},140 ${20},140`} fill="hsl(35,90%,55%)" opacity="0.2" stroke="hsl(35,90%,55%)" strokeWidth="2" />
        )}
        {shape === "Trapez" && (
          <polygon points="50,30 110,30 140,130 20,130" fill="hsl(152,60%,40%)" opacity="0.2" stroke="hsl(152,60%,40%)" strokeWidth="2" />
        )}
      </svg>
    </div>
  );
};

const ArieCalculator = () => {
  const [shape, setShape] = useState<Shape>("Cerc");
  const [dims, setDims] = useState<Record<string, number>>({ raza: 5, lungime: 10, latime: 6, baza: 8, inaltime: 5, bazaMare: 10, bazaMica: 6 });

  const updateDim = (key: string, val: number) => setDims(prev => ({ ...prev, [key]: val }));

  const calculateArea = (): number => {
    switch (shape) {
      case "Cerc": return Math.PI * dims.raza ** 2;
      case "Dreptunghi": return dims.lungime * dims.latime;
      case "Triunghi": return (dims.baza * dims.inaltime) / 2;
      case "Trapez": return ((dims.bazaMare + dims.bazaMica) * dims.inaltime) / 2;
      default: return 0;
    }
  };

  const calculatePerimeter = (): number => {
    switch (shape) {
      case "Cerc": return 2 * Math.PI * dims.raza;
      case "Dreptunghi": return 2 * (dims.lungime + dims.latime);
      case "Triunghi": {
        const c = Math.sqrt(dims.baza ** 2 + dims.inaltime ** 2);
        return dims.baza + dims.inaltime + c;
      }
      case "Trapez": return dims.bazaMare + dims.bazaMica + 2 * dims.inaltime;
      default: return 0;
    }
  };

  return (
    <CalculatorCard title="Calculator Arii & Perimetre" description="Calculează aria și perimetrul formelor geometrice">
      <div className="mb-4 flex flex-wrap gap-2">
        {shapes.map(s => (
          <button
            key={s}
            onClick={() => setShape(s)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              shape === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {shape === "Cerc" && <InputField label="Raza" value={dims.raza} onChange={v => updateDim("raza", v)} unit="cm" showSlider min={1} max={50} step={0.5} />}
          {shape === "Dreptunghi" && (
            <>
              <InputField label="Lungime" value={dims.lungime} onChange={v => updateDim("lungime", v)} unit="cm" showSlider min={1} max={100} />
              <InputField label="Lățime" value={dims.latime} onChange={v => updateDim("latime", v)} unit="cm" showSlider min={1} max={100} />
            </>
          )}
          {shape === "Triunghi" && (
            <>
              <InputField label="Baza" value={dims.baza} onChange={v => updateDim("baza", v)} unit="cm" showSlider min={1} max={100} />
              <InputField label="Înălțime" value={dims.inaltime} onChange={v => updateDim("inaltime", v)} unit="cm" showSlider min={1} max={100} />
            </>
          )}
          {shape === "Trapez" && (
            <>
              <InputField label="Baza mare" value={dims.bazaMare} onChange={v => updateDim("bazaMare", v)} unit="cm" showSlider min={1} max={100} />
              <InputField label="Baza mică" value={dims.bazaMica} onChange={v => updateDim("bazaMica", v)} unit="cm" showSlider min={1} max={100} />
              <InputField label="Înălțime" value={dims.inaltime} onChange={v => updateDim("inaltime", v)} unit="cm" showSlider min={1} max={100} />
            </>
          )}
        </div>

        <div className="space-y-4">
          <ShapeVisual shape={shape} dims={dims} />
          <ResultDisplay label="Arie" value={calculateArea().toFixed(2)} unit="cm²" />
          <ResultDisplay label="Perimetru" value={calculatePerimeter().toFixed(2)} unit="cm" />
        </div>
      </div>
    </CalculatorCard>
  );
};

export default ArieCalculator;
