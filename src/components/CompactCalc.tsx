import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { ChevronRight, BookOpen, Eye, ExternalLink, Download, Save, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { CalcConfig } from "@/lib/calcTypes";
import { getAdsForPosition, getReferralsForZone } from "@/lib/adminStore";
import { getVizType } from "@/lib/vizConfig";
import { isExamMode, subscribeExamMode, addToHistory, exportCalcPDF } from "@/lib/calcFeatures";
import { useI18n } from "@/lib/i18n";

const Viz3D = lazy(() => import("./Viz3D"));
const Viz2D = lazy(() => import("./Viz2D"));

const CompactCalc = ({ calc }: { calc: CalcConfig }) => {
  const { t, tCalcName, tCalcDesc, tLabel, tInputLabel } = useI18n();
  const [open, setOpen] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [showViz, setShowViz] = useState(false);
  const [examModeOn, setExamModeOn] = useState(isExamMode);
  const [copied, setCopied] = useState(false);
  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const d: Record<string, number> = {};
    calc.inputs.forEach(i => (d[i.key] = i.default));
    return d;
  });

  useEffect(() => { const unsub = subscribeExamMode(() => setExamModeOn(isExamMode())); return () => { unsub(); }; }, []);

  const results = useMemo(() => {
    try { return calc.calculate(inputs); }
    catch { return [{ label: "Eroare", value: "—" }]; }
  }, [inputs, calc]);

  const vizType = getVizType(calc.id);
  const hasViz = vizType !== 'none';

  const ads = useMemo(() => getAdsForPosition('calculator', calc.id), [calc.id]);
  const referrals = useMemo(() => getReferralsForZone(calc.id), [calc.id]);

  const handleSaveHistory = () => {
    addToHistory({ calcName: tCalcName(calc.id, calc.name), calcId: calc.id, inputs, results });
  };

  const handleExportPDF = () => {
    exportCalcPDF(
      tCalcName(calc.id, calc.name), calc.formula, calc.explanation,
      calc.inputs.map(i => ({ label: tInputLabel(i.label), value: inputs[i.key], unit: i.unit })),
      results.map(r => ({ label: tLabel(r.label), value: r.value }))
    );
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([k, v]) => params.set(k, v.toString()));
    const url = `${window.location.origin}/calculator/${calc.id}?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const name = tCalcName(calc.id, calc.name);
  const desc = tCalcDesc(calc.id, calc.description);

  return (
    <div className="glass rounded-[5px] overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-1.5 px-2 py-1.5 text-left hover:bg-secondary/30 transition-colors"
      >
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.15 }} className="shrink-0">
          <ChevronRight className="h-2.5 w-2.5 text-muted-foreground" />
        </motion.div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-semibold text-foreground leading-tight block truncate">{name}</span>
          <span className="text-[9px] text-muted-foreground/70 leading-tight block truncate">{desc}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {hasViz && <Eye className="h-2.5 w-2.5 text-primary/40" />}
          <Link to={`/calculator/${calc.id}`} onClick={e => e.stopPropagation()} className="text-muted-foreground/40 hover:text-primary transition-colors">
            <ExternalLink className="h-2.5 w-2.5" />
          </Link>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="overflow-hidden">
            <div className="px-2 pb-2 space-y-1.5 border-t border-border/30">
              {/* Inputs */}
              <div className="grid grid-cols-2 gap-1 pt-1.5">
                {calc.inputs.map(input => (
                  <div key={input.key}>
                    <label className="text-[8px] font-medium text-muted-foreground uppercase tracking-wider leading-none block mb-0.5">
                      {tInputLabel(input.label)}{input.unit && ` (${input.unit})`}
                    </label>
                    <input type="number" value={inputs[input.key]}
                      onChange={e => setInputs(prev => ({ ...prev, [input.key]: parseFloat(e.target.value) || 0 }))}
                      min={input.min} max={input.max} step={input.step || 1}
                      className="w-full h-5 rounded-[4px] border border-input bg-secondary/60 px-1 text-[10px] font-mono outline-none focus:border-primary focus:ring-1 focus:ring-ring transition-colors [&::-webkit-inner-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:opacity-100"
                    />
                  </div>
                ))}
              </div>

              {/* Results */}
              <motion.div key={JSON.stringify(results)} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}
                className="rounded-[4px] bg-primary/5 border border-primary/10 p-1.5 space-y-0.5">
                {results.map((r, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-1">
                    <span className="text-[9px] text-muted-foreground truncate">{tLabel(r.label)}</span>
                    <span className="text-[10px] font-mono font-semibold text-foreground whitespace-nowrap">{tLabel(r.value)}</span>
                  </div>
                ))}
              </motion.div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button onClick={handleSaveHistory} className="flex items-center gap-0.5 text-[8px] text-muted-foreground hover:text-primary transition-colors px-1.5 py-0.5 rounded bg-secondary/40 hover:bg-secondary/80" title={t("calc.save")}>
                  <Save className="h-2.5 w-2.5" /> {t("calc.save")}
                </button>
                <button onClick={handleExportPDF} className="flex items-center gap-0.5 text-[8px] text-muted-foreground hover:text-primary transition-colors px-1.5 py-0.5 rounded bg-secondary/40 hover:bg-secondary/80" title={t("calc.pdf")}>
                  <Download className="h-2.5 w-2.5" /> {t("calc.pdf")}
                </button>
                <button onClick={handleShare} className="flex items-center gap-0.5 text-[8px] text-muted-foreground hover:text-primary transition-colors px-1.5 py-0.5 rounded bg-secondary/40 hover:bg-secondary/80" title={t("calc.link")}>
                  <Share2 className="h-2.5 w-2.5" /> {copied ? t("calc.copied") : t("calc.link")}
                </button>
              </div>

              {/* Viz */}
              {hasViz && (
                <>
                  <button onClick={() => setShowViz(!showViz)} className="flex items-center gap-1 text-[9px] text-primary hover:underline font-medium">
                    <Eye className="h-2.5 w-2.5" />
                    {showViz ? t("calc.hideViz") : (vizType === '3d' ? t("calc.viz3d") : t("calc.viz2d"))}
                  </button>
                  <AnimatePresence>
                    {showViz && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <Suspense fallback={<div className="h-[100px] bg-muted/20 rounded-[4px] animate-pulse" />}>
                          {vizType === '3d' ? <Viz3D calcId={calc.id} params={inputs} /> : <Viz2D calcId={calc.id} params={inputs} />}
                        </Suspense>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

              {/* Formula */}
              {!examModeOn && (
                <>
                  <button onClick={() => setShowFormula(!showFormula)} className="flex items-center gap-1 text-[9px] text-primary hover:underline">
                    <BookOpen className="h-2.5 w-2.5" />
                    {showFormula ? t("calc.hideFormula") : t("calc.formulaBtn")}
                  </button>
                  <AnimatePresence>
                    {showFormula && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="rounded-[4px] bg-secondary/40 p-1.5 space-y-0.5">
                          <p className="text-[9px] font-mono text-foreground leading-relaxed">{calc.formula}</p>
                          <p className="text-[9px] text-muted-foreground leading-relaxed">{calc.explanation}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

              {/* Ads */}
              {ads.map(ad => (
                <div key={ad.id} className="text-[9px]" dangerouslySetInnerHTML={{ __html: ad.code }} />
              ))}
              {referrals.map(ref => (
                <a key={ref.id} href={ref.url} target="_blank" rel="noopener noreferrer sponsored" className="block text-[9px] text-primary hover:underline truncate">
                  {ref.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompactCalc;
