import Layout from "@/components/Layout";
import { Calculator, ChevronDown } from "lucide-react";
import { useState } from "react";

// Algebra
import ProcenteCalculator from "@/components/calculators/ProcenteCalculator";
import ProportiiCalculator from "@/components/calculators/ProportiiCalculator";
import FractiiCalculator from "@/components/calculators/FractiiCalculator";
import EcuatiiLinCalculator from "@/components/calculators/EcuatiiLinCalculator";
import EcuatieGrad2Calculator from "@/components/calculators/EcuatieGrad2Calculator";
import InecuatiiCalculator from "@/components/calculators/InecuatiiCalculator";
import ProgresiiCalculator from "@/components/calculators/ProgresiiCalculator";
import LogaritmiCalculator from "@/components/calculators/LogaritmiCalculator";
import PuteriRadicaliCalculator from "@/components/calculators/PuteriRadicaliCalculator";
import MatriceCalculator from "@/components/calculators/MatriceCalculator";

// Geometrie
import ArieCalculator from "@/components/calculators/ArieCalculator";
import VolumCalculator from "@/components/calculators/VolumCalculator";
import PitagoraCalculator from "@/components/calculators/PitagoraCalculator";
import TrigonometrieCalculator from "@/components/calculators/TrigonometrieCalculator";
import PoligoaneCalculator from "@/components/calculators/PoligoaneCalculator";
import CercCalculator from "@/components/calculators/CercCalculator";
import GeometrieAnaliticaCalculator from "@/components/calculators/GeometrieAnaliticaCalculator";

// Analiza matematica
import LimiteCalculator from "@/components/calculators/LimiteCalculator";
import DerivateCalculator from "@/components/calculators/DerivateCalculator";
import IntegraleCalculator from "@/components/calculators/IntegraleCalculator";
import StatisticaCalculator from "@/components/calculators/StatisticaCalculator";

// Teoria numerelor & altele
import CmmdcCalculator from "@/components/calculators/CmmdcCalculator";
import NrPrimeCalculator from "@/components/calculators/NrPrimeCalculator";
import CombinatricaCalculator from "@/components/calculators/CombinatricaCalculator";
import FibonacciCalculator from "@/components/calculators/FibonacciCalculator";
import ConversiiBazeCalculator from "@/components/calculators/ConversiiBazeCalculator";
import ConversiiUnitatiCalculator from "@/components/calculators/ConversiiUnitatiCalculator";

interface Section {
  title: string;
  color: string;
  count: number;
  children: React.ReactNode;
}

const CollapsibleSection = ({ title, color, count, children }: Section) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${color}`} />
          <h2 className="font-display text-sm font-semibold text-foreground">{title}</h2>
          <span className="text-[10px] text-muted-foreground bg-secondary rounded-full px-2 py-0.5">{count}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-3 pb-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {children}
        </div>
      )}
    </div>
  );
};

const MatematicaPage = () => (
  <Layout>
    <div className="container mx-auto px-3 py-4">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md gradient-math">
          <Calculator className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold text-foreground leading-tight">Calculatoare Matematică</h1>
          <p className="text-[11px] text-muted-foreground">28 calculatoare — algebră, geometrie, analiză, teoria numerelor</p>
        </div>
      </div>

      <div className="space-y-3">
        <CollapsibleSection title="Algebră" color="bg-blue-500" count={10}>
          <ProcenteCalculator />
          <ProportiiCalculator />
          <FractiiCalculator />
          <EcuatiiLinCalculator />
          <EcuatieGrad2Calculator />
          <InecuatiiCalculator />
          <ProgresiiCalculator />
          <LogaritmiCalculator />
          <PuteriRadicaliCalculator />
          <MatriceCalculator />
        </CollapsibleSection>

        <CollapsibleSection title="Geometrie" color="bg-emerald-500" count={7}>
          <ArieCalculator />
          <VolumCalculator />
          <PitagoraCalculator />
          <TrigonometrieCalculator />
          <PoligoaneCalculator />
          <CercCalculator />
          <GeometrieAnaliticaCalculator />
        </CollapsibleSection>

        <CollapsibleSection title="Analiză Matematică" color="bg-purple-500" count={4}>
          <LimiteCalculator />
          <DerivateCalculator />
          <IntegraleCalculator />
          <StatisticaCalculator />
        </CollapsibleSection>

        <CollapsibleSection title="Teoria Numerelor & Utilități" color="bg-amber-500" count={5}>
          <CmmdcCalculator />
          <NrPrimeCalculator />
          <CombinatricaCalculator />
          <FibonacciCalculator />
          <ConversiiBazeCalculator />
        </CollapsibleSection>

        <CollapsibleSection title="Conversii" color="bg-rose-500" count={1}>
          <ConversiiUnitatiCalculator />
        </CollapsibleSection>
      </div>
    </div>
  </Layout>
);

export default MatematicaPage;
