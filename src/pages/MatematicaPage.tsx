import Layout from "@/components/Layout";
import ArieCalculator from "@/components/calculators/ArieCalculator";
import VolumCalculator from "@/components/calculators/VolumCalculator";
import EcuatieGrad2Calculator from "@/components/calculators/EcuatieGrad2Calculator";
import TrigonometrieCalculator from "@/components/calculators/TrigonometrieCalculator";
import MatriceCalculator from "@/components/calculators/MatriceCalculator";
import PitagoraCalculator from "@/components/calculators/PitagoraCalculator";
import StatisticaCalculator from "@/components/calculators/StatisticaCalculator";
import { Calculator } from "lucide-react";

const MatematicaPage = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-math">
          <Calculator className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Calculatoare Matematică</h1>
          <p className="text-sm text-muted-foreground">Arii, volume, ecuații, trigonometrie, matrice, statistică</p>
        </div>
      </div>
      <div className="space-y-8">
        <ArieCalculator />
        <VolumCalculator />
        <EcuatieGrad2Calculator />
        <TrigonometrieCalculator />
        <PitagoraCalculator />
        <MatriceCalculator />
        <StatisticaCalculator />
      </div>
    </div>
  </Layout>
);

export default MatematicaPage;
