import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import InputField from "../InputField";
import ResultDisplay from "../ResultDisplay";

const ApaCalculator = () => {
  const [greutate, setGreutate] = useState(75);
  const [activitate, setActivitate] = useState(30); // min exercițiu
  const [temperatura, setTemperatura] = useState(22);

  let apa = greutate * 33; // ml de bază
  apa += (activitate / 30) * 350; // +350ml la 30min exercițiu
  if (temperatura > 30) apa += 500;
  else if (temperatura > 25) apa += 250;

  const pahare = apa / 250;

  return (
    <CalculatorCard title="Calculator Apă Zilnică" description="Calculează cantitatea optimă de apă pe care ar trebui să o bei zilnic">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <InputField label="Greutate" value={greutate} onChange={setGreutate} unit="kg" showSlider min={30} max={150} />
          <InputField label="Exercițiu fizic" value={activitate} onChange={setActivitate} unit="min/zi" showSlider min={0} max={180} step={5} />
          <InputField label="Temperatura medie" value={temperatura} onChange={setTemperatura} unit="°C" showSlider min={-10} max={45} />
        </div>
        <div className="space-y-4">
          <ResultDisplay label="Apă recomandată" value={(apa / 1000).toFixed(1)} unit="litri/zi" />
          <ResultDisplay label="Echivalent pahare" value={pahare.toFixed(0)} unit="pahare (250ml)" />

          <div className="flex flex-wrap gap-1">
            {Array.from({ length: Math.min(20, Math.round(pahare)) }).map((_, i) => (
              <span key={i} className="text-lg">💧</span>
            ))}
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default ApaCalculator;
