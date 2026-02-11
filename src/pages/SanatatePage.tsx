import Layout from "@/components/Layout";
import BMICalculator from "@/components/calculators/BMICalculator";
import CaloriiCalculator from "@/components/calculators/CaloriiCalculator";
import FumatCalculator from "@/components/calculators/FumatCalculator";
import ApaCalculator from "@/components/calculators/ApaCalculator";
import { Heart } from "lucide-react";

const SanatatePage = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-health">
          <Heart className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Calculatoare Sănătate</h1>
          <p className="text-sm text-muted-foreground">IMC, calorii, hidratare, cost fumat</p>
        </div>
      </div>
      <div className="space-y-8">
        <BMICalculator />
        <CaloriiCalculator />
        <ApaCalculator />
        <FumatCalculator />
      </div>
    </div>
  </Layout>
);

export default SanatatePage;
