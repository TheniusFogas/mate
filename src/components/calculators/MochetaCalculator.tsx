import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import InputField from "../InputField";
import ResultDisplay from "../ResultDisplay";

const tipuri = [
  { name: "Parchet laminat", pret: 55, pierdere: 10 },
  { name: "Gresie/Faianță", pret: 80, pierdere: 15 },
  { name: "Mochetă", pret: 35, pierdere: 5 },
  { name: "Parchet masiv", pret: 120, pierdere: 12 },
  { name: "Vinil/LVT", pret: 65, pierdere: 8 },
];

const MochetaCalculator = () => {
  const [lungime, setLungime] = useState(5);
  const [latime, setLatime] = useState(4);
  const [tipIndex, setTipIndex] = useState(0);
  const [pretCustom, setPretCustom] = useState<number | null>(null);

  const tip = tipuri[tipIndex];
  const suprafata = lungime * latime;
  const pierdere = suprafata * (tip.pierdere / 100);
  const supTotala = suprafata + pierdere;
  const pret = pretCustom ?? tip.pret;
  const cost = supTotala * pret;

  return (
    <CalculatorCard title="Calculator Pardoseală" description="Estimează cantitatea și costul materialelor pentru pardoseală">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tip pardoseală</label>
            <div className="grid grid-cols-2 gap-2">
              {tipuri.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => { setTipIndex(i); setPretCustom(null); }}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    tipIndex === i ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <InputField label="Lungime cameră" value={lungime} onChange={setLungime} unit="m" showSlider min={1} max={30} step={0.1} />
          <InputField label="Lățime cameră" value={latime} onChange={setLatime} unit="m" showSlider min={1} max={30} step={0.1} />
          <InputField label="Preț per m²" value={pretCustom ?? tip.pret} onChange={setPretCustom} unit="lei/m²" min={1} max={500} />
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-primary/5 p-4">
            <svg viewBox="0 0 200 160" className="w-full">
              <rect x="10" y="10" width="180" height="140" fill="hsl(35,80%,50%)" opacity="0.08" stroke="hsl(35,80%,50%)" strokeWidth="1" rx="3" />
              {Array.from({ length: Math.min(8, Math.ceil(lungime)) }).map((_, i) =>
                Array.from({ length: Math.min(6, Math.ceil(latime)) }).map((_, j) => (
                  <rect key={`${i}-${j}`} x={15 + i * 21} y={15 + j * 21} width="18" height="18" fill="hsl(35,80%,50%)" opacity={0.15 + (i + j) * 0.02} rx="1" />
                ))
              )}
              <text x="100" y="85" textAnchor="middle" className="text-xs font-medium" fill="hsl(35,80%,40%)">{lungime}m × {latime}m</text>
            </svg>
          </div>
          <ResultDisplay label="Suprafață utilă" value={suprafata.toFixed(2)} unit="m²" />
          <ResultDisplay label={`Pierdere estimată (${tip.pierdere}%)`} value={pierdere.toFixed(2)} unit="m²" />
          <ResultDisplay label="Material necesar" value={supTotala.toFixed(2)} unit="m²" />
          <ResultDisplay label="Cost estimat total" value={cost.toFixed(0)} unit="lei" />
        </div>
      </div>
    </CalculatorCard>
  );
};

export default MochetaCalculator;
