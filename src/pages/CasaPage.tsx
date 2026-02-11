import Layout from "@/components/Layout";
import SuprafataCalculator from "@/components/calculators/SuprafataCalculator";
import VopseaCalculator from "@/components/calculators/VopseaCalculator";
import MochetaCalculator from "@/components/calculators/MochetaCalculator";
import { Home } from "lucide-react";

const CasaPage = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-home">
          <Home className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Calculatoare Casă & Renovări</h1>
          <p className="text-sm text-muted-foreground">Suprafețe, vopsea, pardoseală — estimări avansate</p>
        </div>
      </div>
      <div className="space-y-8">
        <SuprafataCalculator />
        <VopseaCalculator />
        <MochetaCalculator />
      </div>
    </div>
  </Layout>
);

export default CasaPage;
