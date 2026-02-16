import { useState, useMemo } from "react";
import { Search, Calculator } from "lucide-react";
import Layout from "@/components/Layout";
import CompactCalc from "@/components/CompactCalc";
import { mathCategories } from "@/lib/mathCalcs";
import { getAdsForPosition } from "@/lib/adminStore";

const MatematicaPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const totalCalcs = mathCategories.reduce((s, c) => s + c.calculators.length, 0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return mathCategories
      .filter(cat => !activeCategory || cat.id === activeCategory)
      .map(cat => ({
        ...cat,
        calculators: cat.calculators.filter(
          c => !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.formula.toLowerCase().includes(q)
        ),
      }))
      .filter(cat => cat.calculators.length > 0);
  }, [search, activeCategory]);

  const shownCount = filtered.reduce((s, c) => s + c.calculators.length, 0);
  const headerAds = useMemo(() => getAdsForPosition('header'), []);
  const betweenAds = useMemo(() => getAdsForPosition('between-sections'), []);

  return (
    <Layout>
      <div className="container mx-auto px-2 py-2 max-w-7xl">
        {headerAds.map(ad => (
          <div key={ad.id} className="mb-2" dangerouslySetInnerHTML={{ __html: ad.code }} />
        ))}

        {/* Hero - ultra compact */}
        <header className="mb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-[5px] gradient-primary text-primary-foreground">
              <Calculator className="h-3 w-3" />
            </div>
            <div>
              <h1 className="font-display text-sm font-bold text-foreground leading-none">Calculatoare Matematică</h1>
              <p className="text-[9px] text-muted-foreground">{totalCalcs} instrumente • vizualizări interactive • formule detaliate</p>
            </div>
          </div>
        </header>

        {/* Search */}
        <div className="relative mb-2">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Caută calculator, formulă..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-7 pl-7 pr-2 rounded-[5px] glass border-border/50 text-[11px] outline-none focus:border-primary focus:ring-1 focus:ring-ring transition-colors"
          />
        </div>

        {/* Category pills - scrollable on mobile */}
        <div className="flex gap-1 mb-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 px-2 py-0.5 rounded-[5px] text-[9px] font-medium transition-colors ${
              !activeCategory ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            Toate ({totalCalcs})
          </button>
          {mathCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`shrink-0 px-2 py-0.5 rounded-[5px] text-[9px] font-medium transition-colors flex items-center gap-1 ${
                activeCategory === cat.id ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
              {cat.name} ({cat.calculators.length})
            </button>
          ))}
        </div>

        {search && (
          <p className="text-[9px] text-muted-foreground mb-1.5">
            {shownCount} rezultat{shownCount !== 1 ? "e" : ""} pentru „{search}"
          </p>
        )}

        {/* Bento Grid */}
        <div className="space-y-3">
          {filtered.map((cat, catIdx) => (
            <section key={cat.id}>
              <h2 className="text-[10px] font-semibold text-foreground mb-1 flex items-center gap-1 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                {cat.name}
                <span className="text-muted-foreground font-normal normal-case tracking-normal text-[9px]">— {cat.description}</span>
              </h2>
              <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.calculators.map(calc => (
                  <CompactCalc key={calc.id} calc={calc} />
                ))}
              </div>

              {catIdx < filtered.length - 1 && betweenAds.map(ad => (
                <div key={ad.id} className="mt-2" dangerouslySetInnerHTML={{ __html: ad.code }} />
              ))}
            </section>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[11px] text-muted-foreground">Niciun calculator găsit pentru „{search}".</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MatematicaPage;
