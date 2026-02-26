import { Link, useLocation } from "react-router-dom";
import { Menu, X, Settings, Sun, Moon, Crown, History, GraduationCap, ChevronDown } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
import mathLogo from "@/assets/math-logo.png";
import { useI18n, LANGUAGES, type Lang } from "@/lib/i18n";
import { isExamMode, toggleExamMode, getHistory, clearHistory, type HistoryEntry } from "@/lib/calcFeatures";
import { getScores, clearScores } from "@/lib/quizScores";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Share2 } from "lucide-react";

const getTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("mathlab-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getTheme);
  const [langOpen, setLangOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [examOn, setExamOn] = useState(isExamMode);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("mathlab-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const handleToggleExam = () => { toggleExamMode(); setExamOn(isExamMode()); };
  const handleShowHistory = () => { setHistory(getHistory()); setShowHistory(true); };
  const handleClearHistory = () => { clearHistory(); setHistory([]); };

  const currentFlag = LANGUAGES.find(l => l.code === lang)?.flag || "🇷🇴";

  const scores = getScores();
  const diffLabels: Record<string, string> = { easy: t("quiz.easy"), medium: t("quiz.medium"), hard: t("quiz.hard") };
  const diffColors: Record<string, string> = { easy: "text-success", medium: "text-warning", hard: "text-destructive" };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <header className="sticky top-0 z-50 glass-strong border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between px-3 py-1.5">
          <Link to="/" className="flex items-center gap-1.5 font-display text-base font-bold text-foreground">
            <img src={mathLogo} alt="MathLab" className="h-6 w-6 rounded-[5px]" />
            <span className="text-sm">Math<span className="text-primary">Lab</span></span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            <button onClick={() => setShowLeaderboard(true)}
              className="rounded-[5px] px-2 py-1 text-[11px] font-medium transition-all text-muted-foreground hover:bg-secondary hover:text-foreground flex items-center gap-1">
              <Crown className="h-3 w-3" /> {t("nav.leaderboard")}
            </button>
            <button onClick={handleShowHistory}
              className="rounded-[5px] px-2 py-1 text-[11px] font-medium transition-all text-muted-foreground hover:bg-secondary hover:text-foreground flex items-center gap-1">
              <History className="h-3 w-3" /> {t("nav.history")}
            </button>
            <button onClick={handleToggleExam}
              className={`rounded-[5px] px-2 py-1 text-[11px] font-medium transition-all flex items-center gap-1 ${
                examOn ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}>
              <GraduationCap className="h-3 w-3" /> {t("nav.exam")}
            </button>
            <div className="w-px h-4 bg-border/50 mx-1" />
            {/* Language selector */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)}
                className="rounded-[5px] px-1.5 py-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all flex items-center gap-0.5 text-[11px]">
                <span>{currentFlag}</span>
                <ChevronDown className="h-2.5 w-2.5" />
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 z-50 rounded-[5px] border border-border bg-popover shadow-elevated py-1 min-w-[120px]">
                    {LANGUAGES.map(l => (
                      <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className={`w-full px-3 py-1.5 text-[11px] text-left hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 ${lang === l.code ? "font-semibold text-primary" : "text-foreground"}`}>
                        <span>{l.flag}</span> {l.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button onClick={toggleTheme}
              className="rounded-[5px] px-1.5 py-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
              title={theme === "dark" ? t("nav.lightMode") : t("nav.darkMode")}>
              {theme === "dark" ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
            </button>
            <Link to="/admin"
              className="rounded-[5px] px-1.5 py-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
              <Settings className="h-3 w-3" />
            </Link>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            {/* Mobile language */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)}
                className="flex h-6 w-6 items-center justify-center rounded-[5px] text-foreground hover:bg-secondary text-[11px]">
                {currentFlag}
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 z-50 rounded-[5px] border border-border bg-popover shadow-elevated py-1 min-w-[120px]">
                    {LANGUAGES.map(l => (
                      <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className={`w-full px-3 py-1.5 text-[11px] text-left hover:bg-accent hover:text-accent-foreground flex items-center gap-2 ${lang === l.code ? "font-semibold text-primary" : "text-foreground"}`}>
                        <span>{l.flag}</span> {l.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button onClick={toggleTheme}
              className="flex h-6 w-6 items-center justify-center rounded-[5px] text-foreground hover:bg-secondary">
              {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button className="flex h-6 w-6 items-center justify-center rounded-[5px] text-foreground hover:bg-secondary"
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-border/50 px-3 py-1.5 md:hidden glass">
            <button onClick={() => { setShowLeaderboard(true); setMenuOpen(false); }}
              className="flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground w-full">
              <Crown className="h-3 w-3" /> {t("nav.leaderboard")}
            </button>
            <button onClick={() => { handleShowHistory(); setMenuOpen(false); }}
              className="flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground w-full">
              <History className="h-3 w-3" /> {t("nav.history")}
            </button>
            <button onClick={() => { handleToggleExam(); setMenuOpen(false); }}
              className={`flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[11px] font-medium w-full ${examOn ? "text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
              <GraduationCap className="h-3 w-3" /> {t("nav.exam")}
            </button>
            <Link to="/admin" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[11px] text-muted-foreground hover:bg-secondary hover:text-foreground">
              <Settings className="h-3 w-3" /> {t("nav.admin")}
            </Link>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="mt-6 border-t border-border bg-card/50 py-3">
        <div className="container mx-auto px-3 text-center text-[10px] text-muted-foreground">
          <p>{t("footer.text")}</p>
        </div>
      </footer>

      {/* History Panel */}
      <AnimatePresence>
        {showHistory && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="glass rounded-lg w-full max-w-lg max-h-[80vh] flex flex-col shadow-elevated">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" /> {t("hist.title")}
                </h3>
                <div className="flex items-center gap-2">
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-[9px] text-destructive hover:underline flex items-center gap-0.5">
                      <Trash2 className="h-3 w-3" /> {t("hist.clearAll")}
                    </button>
                  )}
                  <button onClick={() => setShowHistory(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto flex-1 p-3 space-y-2">
                {history.length === 0 ? (
                  <p className="text-center text-[11px] text-muted-foreground py-8">{t("hist.empty")}<br />{t("hist.emptyHint")}</p>
                ) : (
                  history.map(entry => (
                    <div key={entry.id} className="rounded-[5px] bg-secondary/30 border border-border/30 p-2.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-foreground">{entry.calcName}</span>
                        <span className="text-[8px] text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleString(lang === "ro" ? "ro-RO" : lang, { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
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
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leaderboard Panel */}
      <AnimatePresence>
        {showLeaderboard && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="glass rounded-lg w-full max-w-md max-h-[80vh] flex flex-col shadow-elevated">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-bold text-foreground">{t("lb.title")}</h3>
                <button onClick={() => setShowLeaderboard(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4 space-y-2 overflow-y-auto flex-1">
                {scores.length === 0 ? (
                  <p className="text-center text-[11px] text-muted-foreground py-6">{t("lb.noScores")}</p>
                ) : (
                  <>
                    {scores.map((s, i) => (
                      <div key={s.id} className={`flex items-center gap-2 rounded-[5px] p-2 text-[10px] ${i === 0 ? "bg-primary/10 border border-primary/20" : "bg-secondary/30"}`}>
                        <span className="font-bold text-foreground w-5 text-center">{i < 3 ? ["🥇","🥈","🥉"][i] : `${i+1}.`}</span>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-foreground truncate block">{s.name}</span>
                          <span className="text-[8px] text-muted-foreground">{s.category} • <span className={diffColors[s.difficulty]}>{diffLabels[s.difficulty]}</span></span>
                        </div>
                        <span className="font-mono font-bold text-primary">{s.score}/{s.total}</span>
                      </div>
                    ))}
                    <button onClick={() => { clearScores(); setShowLeaderboard(false); }}
                      className="w-full mt-1 py-1 rounded-[5px] text-[9px] text-destructive hover:bg-destructive/10 flex items-center justify-center gap-1">
                      <Trash2 className="h-3 w-3" /> {t("lb.clear")}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
