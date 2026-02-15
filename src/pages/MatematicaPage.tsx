import { useState, useMemo } from "react";
import { Search } from "lucide-react";
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
      <div className="container mx-auto px-1.5 py-2 max-w-7xl">
        {/* Header Ads */}
        {headerAds.map(ad => (
          <div key={ad.id} className="mb-2" dangerouslySetInnerHTML={{ __html: ad.code }} />
        ))}

        {/* Header */}
        <header className="mb-2">
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-[3px] gradient-primary text-primary-foreground text-[10px] font-bold">
              ∑
            </div>
            <h1 className="font-display text-sm font-bold text-foreground">Calculatoare Matematică</h1>
            <span className="text-[9px] text-muted-foreground ml-auto">{totalCalcs} calculatoare</span>
          </div>
        </header>

        {/* Search */}
        <div className="relative mb-1.5">
          <Search className="absolute left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Caută calculator, formulă..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-6 pl-6 pr-2 rounded-[4px] border border-input bg-background text-[10px] outline-none focus:border-primary focus:ring-1 focus:ring-ring"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-0.5 mb-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-1.5 py-px rounded-[3px] text-[9px] font-medium transition-colors ${
              !activeCategory ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Toate ({totalCalcs})
          </button>
          {mathCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-1.5 py-px rounded-[3px] text-[9px] font-medium transition-colors flex items-center gap-0.5 ${
                activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
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

        {/* Sections */}
        <div className="space-y-3">
          {filtered.map((cat, catIdx) => (
            <section key={cat.id}>
              <h2 className="text-[9px] font-semibold text-foreground mb-1 flex items-center gap-1 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                {cat.name}
                <span className="text-muted-foreground font-normal normal-case tracking-normal">— {cat.description}</span>
              </h2>
              <div className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.calculators.map(calc => (
                  <CompactCalc key={calc.id} calc={calc} />
                ))}
              </div>

              {/* Between-sections ads */}
              {catIdx < filtered.length - 1 && betweenAds.map(ad => (
                <div key={ad.id} className="mt-2" dangerouslySetInnerHTML={{ __html: ad.code }} />
              ))}
            </section>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-6">
            <p className="text-[10px] text-muted-foreground">Niciun calculator găsit pentru „{search}".</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MatematicaPage;
