import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import InputField from "../InputField";
import ResultDisplay from "../ResultDisplay";

const FumatCalculator = () => {
  const [tigariPeZi, setTigariPeZi] = useState(15);
  const [pretPachet, setPretPachet] = useState(25);
  const [aniFumat, setAniFumat] = useState(10);

  const tigariPeAn = tigariPeZi * 365;
  const pacheteZi = tigariPeZi / 20;
  const costZi = pacheteZi * pretPachet;
  const costLuna = costZi * 30;
  const costAn = costZi * 365;
  const costTotal = costAn * aniFumat;
  const totalTigari = tigariPeZi * 365 * aniFumat;

  return (
    <CalculatorCard title="Calculator Cost Fumat" description="Calculează cât te costă fumatul și ce ai putea economisi">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <InputField label="Țigări pe zi" value={tigariPeZi} onChange={setTigariPeZi} showSlider min={1} max={60} />
          <InputField label="Preț pachet (20 țigări)" value={pretPachet} onChange={setPretPachet} unit="lei" showSlider min={5} max={100} />
          <InputField label="Ani de fumat" value={aniFumat} onChange={setAniFumat} unit="ani" showSlider min={1} max={50} />
        </div>
        <div className="space-y-3">
          <ResultDisplay label="Cost pe zi" value={costZi.toFixed(1)} unit="lei" />
          <ResultDisplay label="Cost pe lună" value={costLuna.toFixed(0)} unit="lei" />
          <ResultDisplay label="Cost pe an" value={costAn.toFixed(0)} unit="lei" />
          <ResultDisplay label={`Cost total (${aniFumat} ani)`} value={costTotal.toFixed(0)} unit="lei" />

          <div className="rounded-lg bg-destructive/10 p-3">
            <p className="text-xs text-muted-foreground">
              🚬 Total țigări fumate: <strong className="text-foreground">{totalTigari.toLocaleString()}</strong>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              💰 Cu banii economisiți ai putea cumpăra: <strong className="text-foreground">{Math.floor(costTotal / 5000)} vacanțe</strong> sau <strong className="text-foreground">{Math.floor(costTotal / 50000)} mașini second-hand</strong>
            </p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default FumatCalculator;
