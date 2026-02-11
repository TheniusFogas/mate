import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import InputField from "../InputField";
import ResultDisplay from "../ResultDisplay";

const VopseaCalculator = () => {
  const [suprafata, setSuprafata] = useState(40);
  const [nrStraturi, setNrStraturi] = useState(2);
  const [acoperire, setAcoperire] = useState(10); // m²/litru
  const [pretLitru, setPretLitru] = useState(35);

  const litriNecesari = (suprafata * nrStraturi) / acoperire;
  const costTotal = litriNecesari * pretLitru;

  return (
    <CalculatorCard title="Calculator Vopsea" description="Calculează cantitatea de vopsea necesară și costul estimat">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <InputField label="Suprafață de vopsit" value={suprafata} onChange={setSuprafata} unit="m²" showSlider min={1} max={200} />
          <InputField label="Număr straturi" value={nrStraturi} onChange={setNrStraturi} min={1} max={5} />
          <InputField label="Acoperire vopsea" value={acoperire} onChange={setAcoperire} unit="m²/litru" min={1} max={20} step={0.5} />
          <InputField label="Preț per litru" value={pretLitru} onChange={setPretLitru} unit="lei" min={1} max={200} />
        </div>
        <div className="space-y-4">
          <ResultDisplay label="Litri necesari" value={litriNecesari.toFixed(1)} unit="litri" />
          <ResultDisplay label="Cost estimat" value={costTotal.toFixed(0)} unit="lei" />
          <div className="rounded-lg bg-accent/10 p-3">
            <p className="text-xs text-muted-foreground">
              💡 Se recomandă adăugarea a 10-15% în plus pentru risipă și corecții.
              Cantitate recomandată: <strong className="text-foreground">{(litriNecesari * 1.1).toFixed(1)} litri</strong>
            </p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default VopseaCalculator;
