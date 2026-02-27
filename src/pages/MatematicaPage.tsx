import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import CompactCalc from "@/components/CompactCalc";
import { mathCategories } from "@/lib/mathCalcs";
import { getAdsForPosition } from "@/lib/adminStore";
import { isExamMode, toggleExamMode } from "@/lib/calcFeatures";
import { useI18n } from "@/lib/i18n";

const MatematicaPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [examOn, setExamOn] = useState(isExamMode);
  const { t, tCatName, tCatDesc, tCalcName, tCalcDesc } = useI18n();

  const totalCalcs = mathCategories.reduce((s, c) => s + c.calculators.length, 0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return mathCategories
      .filter(cat => !activeCategory || cat.id === activeCategory)
      .map(cat => ({
        ...cat,
        calculators: cat.calculators.filter(c => {
          if (!q) return true;
          const name = tCalcName(c.id, c.name).toLowerCase();
          const desc = tCalcDesc(c.id, c.description).toLowerCase();
          return name.includes(q) || desc.includes(q) || c.formula.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
        }),
      }))
      .filter(cat => cat.calculators.length > 0);
  }, [search, activeCategory, tCalcName, tCalcDesc]);

  const shownCount = filtered.reduce((s, c) => s + c.calculators.length, 0);
  const headerAds = useMemo(() => getAdsForPosition('header'), []);
  const betweenAds = useMemo(() => getAdsForPosition('between-sections'), []);

  return (
    <Layout>
      <div className="container mx-auto px-2 py-2 max-w-7xl">
        {headerAds.map(ad => (
          <div key={ad.id} className="mb-2" dangerouslySetInnerHTML={{ __html: ad.code }} />
        ))}

        {/* Hero */}
        <header className="mb-2">
          <div>
            <h1 className="font-display text-sm font-bold text-foreground leading-none">{t("home.title")}</h1>
            <p className="text-[9px] text-muted-foreground">{totalCalcs} {t("home.subtitle")}</p>
          </div>
        </header>

        {/* Exam mode banner */}
        <AnimatePresence>
          {examOn && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
              <div className="mb-2 rounded-[5px] bg-warning/10 border border-warning/30 px-3 py-1.5 flex items-center justify-between">
                <span className="text-[10px] font-medium text-warning">{t("exam.active")}</span>
                <button onClick={() => { toggleExamMode(); setExamOn(isExamMode()); }} className="text-[9px] text-warning hover:underline">{t("exam.disable")}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search */}
        <div className="relative mb-2">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <input type="text" placeholder={t("home.search")} value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-7 pl-7 pr-2 rounded-[5px] glass border-border/50 text-[11px] outline-none focus:border-primary focus:ring-1 focus:ring-ring transition-colors" />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-1 mb-2">
          <button onClick={() => setActiveCategory(null)}
            className={`px-2 py-0.5 rounded-[5px] text-[9px] font-medium transition-colors ${!activeCategory ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
            {t("home.all")} ({totalCalcs})
          </button>
          {mathCategories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-2 py-0.5 rounded-[5px] text-[9px] font-medium transition-colors flex items-center gap-1 ${activeCategory === cat.id ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
              <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
              {tCatName(cat.id)} ({cat.calculators.length})
            </button>
          ))}
        </div>

        {search && (
          <p className="text-[9px] text-muted-foreground mb-1.5">
            {shownCount} {shownCount !== 1 ? t("home.results") : t("home.result")} {t("home.for")} „{search}"
          </p>
        )}

        {/* Bento Grid */}
        <div className="space-y-3">
          {filtered.map((cat, catIdx) => (
            <motion.section key={cat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: catIdx * 0.05 }}>
              <h2 className="text-xs font-bold text-primary mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full shrink-0 shadow-[0_0_6px_currentColor]" style={{ backgroundColor: cat.color }} />
                {tCatName(cat.id)}
                <span className="text-muted-foreground font-normal normal-case tracking-normal text-[9px]">— {tCatDesc(cat.id)}</span>
              </h2>
              <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.calculators.map(calc => (
                  <CompactCalc key={calc.id} calc={calc} />
                ))}
              </div>
              {catIdx < filtered.length - 1 && betweenAds.map(ad => (
                <div key={ad.id} className="mt-2" dangerouslySetInnerHTML={{ __html: ad.code }} />
              ))}
            </motion.section>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[11px] text-muted-foreground">{t("home.noResults")} „{search}".</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MatematicaPage;
