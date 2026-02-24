import { useState, useMemo, lazy, Suspense } from "react";
import { Search, GraduationCap, History, X, Trash2, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import CompactCalc from "@/components/CompactCalc";
import { mathCategories } from "@/lib/mathCalcs";
import { getAdsForPosition } from "@/lib/adminStore";
import { isExamMode, toggleExamMode, getHistory, clearHistory, type HistoryEntry } from "@/lib/calcFeatures";

const QuizMode = lazy(() => import("@/components/QuizMode"));

const MatematicaPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [examOn, setExamOn] = useState(isExamMode);
  const [showHistory, setShowHistory] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

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

  const handleToggleExam = () => {
    toggleExamMode();
    setExamOn(isExamMode());
  };

  const handleShowHistory = () => {
    setHistory(getHistory());
    setShowHistory(true);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-2 py-2 max-w-7xl">
        {headerAds.map(ad => (
          <div key={ad.id} className="mb-2" dangerouslySetInnerHTML={{ __html: ad.code }} />
        ))}

        {/* Hero */}
        <header className="mb-2">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h1 className="font-display text-sm font-bold text-foreground leading-none">Calculatoare Matematică</h1>
              <p className="text-[9px] text-muted-foreground">{totalCalcs} instrumente • vizualizări interactive • formule detaliate</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowQuiz(true)}
                className="flex items-center gap-0.5 px-2 py-1 rounded-[5px] text-[9px] font-medium transition-colors glass text-muted-foreground hover:text-foreground"
                title="Quiz matematic"
              >
                <Brain className="h-3 w-3" />
                <span className="hidden sm:inline">Quiz</span>
              </button>
              <button
                onClick={handleShowHistory}
                className="flex items-center gap-0.5 px-2 py-1 rounded-[5px] text-[9px] font-medium transition-colors glass text-muted-foreground hover:text-foreground"
                title="Istoric calcule"
              >
                <History className="h-3 w-3" />
                <span className="hidden sm:inline">Istoric</span>
              </button>
              <button
                onClick={handleToggleExam}
                className={`flex items-center gap-0.5 px-2 py-1 rounded-[5px] text-[9px] font-medium transition-colors ${
                  examOn ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
                }`}
                title="Mod examen — ascunde formulele"
              >
                <GraduationCap className="h-3 w-3" />
                <span className="hidden sm:inline">Examen</span>
              </button>
            </div>
          </div>
        </header>

        {/* Exam mode banner */}
        <AnimatePresence>
          {examOn && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mb-2 rounded-[5px] bg-warning/10 border border-warning/30 px-3 py-1.5 flex items-center justify-between">
                <span className="text-[10px] font-medium text-warning">🎓 Mod Examen activ — formulele și explicațiile sunt ascunse</span>
                <button onClick={handleToggleExam} className="text-[9px] text-warning hover:underline">Dezactivează</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

        {/* Category pills */}
        <div className="flex flex-wrap gap-1 mb-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-2 py-0.5 rounded-[5px] text-[9px] font-medium transition-colors ${
              !activeCategory ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            Toate ({totalCalcs})
          </button>
          {mathCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-2 py-0.5 rounded-[5px] text-[9px] font-medium transition-colors flex items-center gap-1 ${
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
            <motion.section
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.05 }}
            >
              <h2 className="text-xs font-bold text-primary mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full shrink-0 shadow-[0_0_6px_currentColor]" style={{ backgroundColor: cat.color }} />
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
            </motion.section>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[11px] text-muted-foreground">Niciun calculator găsit pentru „{search}".</p>
          </div>
        )}

        {/* History Panel */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="glass rounded-lg w-full max-w-lg max-h-[80vh] flex flex-col shadow-elevated"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <History className="h-4 w-4 text-primary" /> Istoric Calcule
                  </h3>
                  <div className="flex items-center gap-2">
                    {history.length > 0 && (
                      <button onClick={handleClearHistory} className="text-[9px] text-destructive hover:underline flex items-center gap-0.5">
                        <Trash2 className="h-3 w-3" /> Șterge tot
                      </button>
                    )}
                    <button onClick={() => setShowHistory(false)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="overflow-y-auto flex-1 p-3 space-y-2">
                  {history.length === 0 ? (
                    <p className="text-center text-[11px] text-muted-foreground py-8">Niciun calcul salvat.<br />Apasă „Salvează" din orice calculator.</p>
                  ) : (
                    history.map(entry => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-[5px] bg-secondary/30 border border-border/30 p-2.5 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-foreground">{entry.calcName}</span>
                          <span className="text-[8px] text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleString("ro-RO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                          {entry.results.map((r, i) => (
                            <div key={i} className="text-[9px]">
                              <span className="text-muted-foreground">{r.label}: </span>
                              <span className="font-mono font-semibold text-foreground">{r.value}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiz Modal */}
        <AnimatePresence>
          {showQuiz && (
            <Suspense fallback={null}>
              <QuizMode onClose={() => setShowQuiz(false)} />
            </Suspense>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default MatematicaPage;
