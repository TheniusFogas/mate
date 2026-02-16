import { useMemo, useState, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, BookOpen, Eye, Home } from "lucide-react";
import Layout from "@/components/Layout";
import { mathCategories } from "@/lib/mathCalcs";
import { getVizType } from "@/lib/vizConfig";
import { getAdsForPosition, getReferralsForZone } from "@/lib/adminStore";
import type { CalcConfig, CalcCategory } from "@/lib/calcTypes";

const Viz3D = lazy(() => import("@/components/Viz3D"));
const Viz2D = lazy(() => import("@/components/Viz2D"));

const CalculatorPage = () => {
  const { id } = useParams<{ id: string }>();

  const { calc, category } = useMemo(() => {
    let calc: CalcConfig | undefined;
    let category: CalcCategory | undefined;
    for (const cat of mathCategories) {
      const found = cat.calculators.find(c => c.id === id);
      if (found) { calc = found; category = cat; break; }
    }
    return { calc, category };
  }, [id]);

  if (!calc || !category) {
    return (
      <Layout>
        <div className="container mx-auto px-3 py-8 text-center">
          <p className="text-sm text-muted-foreground">Calculator negăsit.</p>
          <Link to="/" className="text-primary text-xs hover:underline mt-2 inline-block">← Înapoi</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead calc={calc} category={category} />
      <div className="container mx-auto px-2 py-2 max-w-3xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-[9px] text-muted-foreground mb-2">
          <Link to="/" className="hover:text-foreground flex items-center gap-0.5">
            <Home className="h-2.5 w-2.5" /> Calculatoare
          </Link>
          <ChevronRight className="h-2 w-2" />
          <Link to={`/?cat=${category.id}`} className="hover:text-foreground">{category.name}</Link>
          <ChevronRight className="h-2 w-2" />
          <span className="text-foreground font-medium">{calc.name}</span>
        </nav>

        <FullCalculator calc={calc} />
      </div>
    </Layout>
  );
};

const SEOHead = ({ calc, category }: { calc: CalcConfig; category: CalcCategory }) => {
  // Update document head for SEO
  useMemo(() => {
    document.title = `${calc.name} — Calculator Online | CalcMath`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', `${calc.description}. ${calc.formula}. Calculator online gratuit cu vizualizare interactivă.`);

    // Add JSON-LD
    let script = document.getElementById('calc-jsonld');
    if (!script) { script = document.createElement('script'); script.id = 'calc-jsonld'; script.setAttribute('type', 'application/ld+json'); document.head.appendChild(script); }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": calc.name,
      "description": calc.description,
      "url": `https://calcmath.ro/calculator/${calc.id}`,
      "applicationCategory": "EducationalApplication",
      "applicationSubCategory": category.name,
    });
  }, [calc, category]);

  return null;
};

const FullCalculator = ({ calc }: { calc: CalcConfig }) => {
  const [showViz, setShowViz] = useState(true);
  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const d: Record<string, number> = {};
    calc.inputs.forEach(i => (d[i.key] = i.default));
    return d;
  });

  const results = useMemo(() => {
    try { return calc.calculate(inputs); }
    catch { return [{ label: "Eroare", value: "—" }]; }
  }, [inputs, calc]);

  const vizType = getVizType(calc.id);
  const ads = useMemo(() => getAdsForPosition('calculator', calc.id), [calc.id]);
  const referrals = useMemo(() => getReferralsForZone(calc.id), [calc.id]);

  return (
    <article className="space-y-2">
      {/* Title */}
      <header>
        <h1 className="font-display text-base font-bold text-foreground leading-tight">{calc.name}</h1>
        <p className="text-[11px] text-muted-foreground">{calc.description}</p>
      </header>

      <div className="grid gap-2 lg:grid-cols-2">
        {/* Left: Inputs + Results */}
        <div className="space-y-2">
          <div className="glass rounded-[5px] p-2 space-y-1.5">
            <h2 className="text-[10px] font-semibold text-foreground uppercase tracking-wider">Parametri</h2>
            <div className="grid grid-cols-2 gap-1">
              {calc.inputs.map(input => (
                <div key={input.key}>
                  <label className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider block mb-0.5">
                    {input.label}{input.unit && ` (${input.unit})`}
                  </label>
                  <input
                    type="number"
                    value={inputs[input.key]}
                    onChange={e => setInputs(prev => ({ ...prev, [input.key]: parseFloat(e.target.value) || 0 }))}
                    min={input.min} max={input.max} step={input.step || 1}
                    className="w-full h-6 rounded-[4px] border border-input bg-background px-1.5 text-[11px] font-mono outline-none focus:border-primary focus:ring-1 focus:ring-ring"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-[5px] p-2">
            <h2 className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-1">Rezultate</h2>
            <div className="space-y-0.5">
              {results.map((r, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 py-0.5 border-b border-border/20 last:border-0">
                  <span className="text-[10px] text-muted-foreground">{r.label}</span>
                  <span className="text-[11px] font-mono font-semibold text-foreground">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Visualization */}
        <div className="space-y-2">
          {vizType !== 'none' && (
            <div className="glass rounded-[5px] p-2">
              <button onClick={() => setShowViz(!showViz)} className="flex items-center gap-1 text-[10px] font-semibold text-foreground mb-1">
                <Eye className="h-3 w-3 text-primary" />
                Vizualizare {vizType === '3d' ? '3D' : '2D'}
              </button>
              {showViz && (
                <Suspense fallback={<div className="h-[160px] bg-muted/20 rounded-[4px] animate-pulse" />}>
                  {vizType === '3d'
                    ? <Viz3D calcId={calc.id} params={inputs} />
                    : <Viz2D calcId={calc.id} params={inputs} />
                  }
                </Suspense>
              )}
            </div>
          )}

          {/* Formula & explanation */}
          <div className="glass rounded-[5px] p-2 space-y-1">
            <h2 className="text-[10px] font-semibold text-foreground uppercase tracking-wider flex items-center gap-1">
              <BookOpen className="h-3 w-3 text-primary" /> Formulă
            </h2>
            <p className="text-[10px] font-mono text-foreground bg-secondary/30 rounded-[4px] p-1.5 leading-relaxed">{calc.formula}</p>
            <h2 className="text-[10px] font-semibold text-foreground uppercase tracking-wider mt-1">Explicație</h2>
            <p className="text-[10px] text-muted-foreground leading-relaxed">{calc.explanation}</p>
          </div>
        </div>
      </div>

      {/* Ads & Referrals */}
      {ads.map(ad => (
        <div key={ad.id} className="text-[10px]" dangerouslySetInnerHTML={{ __html: ad.code }} />
      ))}
      {referrals.map(ref => (
        <a key={ref.id} href={ref.url} target="_blank" rel="noopener noreferrer sponsored"
          className="block text-[10px] text-primary hover:underline">
          {ref.label}
        </a>
      ))}
    </article>
  );
};

export default CalculatorPage;
