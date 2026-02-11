import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import InputField from "../InputField";
import ResultDisplay from "../ResultDisplay";

const SuprafataCalculator = () => {
  const [lungime, setLungime] = useState(5);
  const [latime, setLatime] = useState(4);
  const [inaltime, setInaltime] = useState(2.7);
  const [nrUsi, setNrUsi] = useState(1);
  const [nrFerestre, setNrFerestre] = useState(2);
  const [usiW, setUsiW] = useState(0.9);
  const [usiH, setUsiH] = useState(2.1);
  const [ferestreW, setFerestreW] = useState(1.2);
  const [ferestreH, setFerestreH] = useState(1.4);

  const supPodea = lungime * latime;
  const supPereti = 2 * (lungime + latime) * inaltime;
  const supUsi = nrUsi * usiW * usiH;
  const supFerestre = nrFerestre * ferestreW * ferestreH;
  const supPeretiNet = supPereti - supUsi - supFerestre;

  return (
    <CalculatorCard title="Suprafață Cameră" description="Calculează suprafețele camerei cu deduceri pentru uși și ferestre">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Dimensiuni cameră</h4>
          <InputField label="Lungime" value={lungime} onChange={setLungime} unit="m" showSlider min={1} max={20} step={0.1} />
          <InputField label="Lățime" value={latime} onChange={setLatime} unit="m" showSlider min={1} max={20} step={0.1} />
          <InputField label="Înălțime" value={inaltime} onChange={setInaltime} unit="m" showSlider min={2} max={5} step={0.1} />

          <h4 className="mt-2 text-sm font-semibold text-foreground">Uși</h4>
          <InputField label="Număr uși" value={nrUsi} onChange={setNrUsi} min={0} max={5} />
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Lățime ușă" value={usiW} onChange={setUsiW} unit="m" step={0.1} min={0.5} max={2} />
            <InputField label="Înălțime ușă" value={usiH} onChange={setUsiH} unit="m" step={0.1} min={1.5} max={2.5} />
          </div>

          <h4 className="mt-2 text-sm font-semibold text-foreground">Ferestre</h4>
          <InputField label="Număr ferestre" value={nrFerestre} onChange={setNrFerestre} min={0} max={10} />
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Lățime fereastră" value={ferestreW} onChange={setFerestreW} unit="m" step={0.1} min={0.3} max={3} />
            <InputField label="Înălțime fereastră" value={ferestreH} onChange={setFerestreH} unit="m" step={0.1} min={0.3} max={2.5} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-primary/5 p-4">
            <svg viewBox="0 0 200 150" className="w-full">
              <rect x="20" y="20" width="160" height="110" fill="hsl(35,80%,50%)" opacity="0.1" stroke="hsl(35,80%,50%)" strokeWidth="2" rx="2" />
              <text x="100" y="75" textAnchor="middle" className="text-xs" fill="hsl(35,80%,50%)">{lungime}m × {latime}m</text>
              <text x="100" y="92" textAnchor="middle" className="text-[10px]" fill="hsl(200,10%,45%)">h = {inaltime}m</text>
              {nrUsi > 0 && <rect x="30" y="95" width="15" height="25" fill="hsl(200,25%,10%)" opacity="0.3" rx="1" />}
              {nrFerestre > 0 && <rect x="140" y="35" width="25" height="18" fill="hsl(205,75%,48%)" opacity="0.3" rx="1" />}
              {nrFerestre > 1 && <rect x="100" y="35" width="25" height="18" fill="hsl(205,75%,48%)" opacity="0.3" rx="1" />}
            </svg>
          </div>

          <ResultDisplay label="Suprafață podea" value={supPodea.toFixed(2)} unit="m²" />
          <ResultDisplay label="Suprafață pereți (brut)" value={supPereti.toFixed(2)} unit="m²" />
          <ResultDisplay label="Suprafață pereți (net)" value={supPeretiNet.toFixed(2)} unit="m²" />
          <ResultDisplay label="Suprafață tavan" value={supPodea.toFixed(2)} unit="m²" />
        </div>
      </div>
    </CalculatorCard>
  );
};

export default SuprafataCalculator;
