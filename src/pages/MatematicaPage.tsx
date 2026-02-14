import { useState, useMemo } from "react";
import { Search, Calculator } from "lucide-react";
import Layout from "@/components/Layout";
import CompactCalc from "@/components/CompactCalc";
import { mathCategories } from "@/lib/mathCalcs";

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

  return (
    <Layout>
      <div className="container mx-auto px-2 py-3 max-w-6xl">
        {/* Header */}
        <header className="mb-3">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-[4px] gradient-math">
              <Calculator className="h-3 w-3 text-primary-foreground" />
            </div>
            <h1 className="font-display text-base font-bold text-foreground">Calculatoare Matematică</h1>
          </div>
          <p className="text-[10px] text-muted-foreground ml-7.5">
            {totalCalcs} calculatoare cu formule și explicații complete
          </p>
        </header>

        {/* Search */}
        <div className="relative mb-2">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Caută calculator, formulă..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-7 pl-7 pr-2 rounded-[6px] border border-input bg-background text-[11px] outline-none focus:border-primary focus:ring-1 focus:ring-ring"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-1 mb-3">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-2 py-0.5 rounded-[6px] text-[10px] font-medium transition-colors ${
              !activeCategory ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Toate ({totalCalcs})
          </button>
          {mathCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-2 py-0.5 rounded-[6px] text-[10px] font-medium transition-colors flex items-center gap-1 ${
                activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
              {cat.name} ({cat.calculators.length})
            </button>
          ))}
        </div>

        {search && (
          <p className="text-[10px] text-muted-foreground mb-2">
            {shownCount} rezultat{shownCount !== 1 ? "e" : ""} pentru „{search}"
          </p>
        )}

        {/* Sections */}
        <div className="space-y-4">
          {filtered.map(cat => (
            <section key={cat.id}>
              <h2 className="text-[10px] font-semibold text-foreground mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                {cat.name}
                <span className="text-muted-foreground font-normal normal-case tracking-normal">— {cat.description}</span>
              </h2>
              <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.calculators.map(calc => (
                  <CompactCalc key={calc.id} calc={calc} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-xs text-muted-foreground">Niciun calculator găsit pentru „{search}".</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MatematicaPage;
