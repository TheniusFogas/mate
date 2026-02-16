import { useState, useMemo, lazy, Suspense } from "react";
import { ChevronRight, BookOpen, Eye, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { CalcConfig } from "@/lib/calcTypes";
import { getAdsForPosition, getReferralsForZone } from "@/lib/adminStore";
import { getVizType } from "@/lib/vizConfig";

const Viz3D = lazy(() => import("./Viz3D"));
const Viz2D = lazy(() => import("./Viz2D"));

const CompactCalc = ({ calc }: { calc: CalcConfig }) => {
  const [open, setOpen] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [showViz, setShowViz] = useState(false);
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
  const hasViz = vizType !== 'none';

  const ads = useMemo(() => getAdsForPosition('calculator', calc.id), [calc.id]);
  const referrals = useMemo(() => getReferralsForZone(calc.id), [calc.id]);

  return (
    <div className="glass rounded-[5px] overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-1.5 px-2 py-1.5 text-left hover:bg-secondary/30 transition-colors"
      >
        <ChevronRight className={`h-2.5 w-2.5 text-muted-foreground shrink-0 transition-transform duration-150 ${open ? "rotate-90" : ""}`} />
        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-semibold text-foreground leading-tight block truncate">{calc.name}</span>
          <span className="text-[9px] text-muted-foreground leading-tight block truncate">{calc.description}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {hasViz && <Eye className="h-2.5 w-2.5 text-primary/40" />}
          <Link
            to={`/calculator/${calc.id}`}
            onClick={e => e.stopPropagation()}
            className="text-muted-foreground/40 hover:text-primary transition-colors"
          >
            <ExternalLink className="h-2.5 w-2.5" />
          </Link>
        </div>
      </button>

      {open && (
        <div className="px-2 pb-2 space-y-1.5 border-t border-border/30">
          {/* Inputs */}
          <div className="grid grid-cols-2 gap-1 pt-1.5">
            {calc.inputs.map(input => (
              <div key={input.key}>
                <label className="text-[8px] font-medium text-muted-foreground uppercase tracking-wider leading-none block mb-0.5">
                  {input.label}{input.unit && ` (${input.unit})`}
                </label>
                <input
                  type="number"
                  value={inputs[input.key]}
                  onChange={e => setInputs(prev => ({ ...prev, [input.key]: parseFloat(e.target.value) || 0 }))}
                  min={input.min} max={input.max} step={input.step || 1}
                  className="w-full h-5 rounded-[4px] border border-input bg-background px-1 text-[10px] font-mono outline-none focus:border-primary focus:ring-1 focus:ring-ring transition-colors"
                />
              </div>
            ))}
          </div>

          {/* Results */}
          <div className="rounded-[4px] bg-primary/5 border border-primary/10 p-1.5 space-y-0.5">
            {results.map((r, idx) => (
              <div key={idx} className="flex items-center justify-between gap-1">
                <span className="text-[9px] text-muted-foreground truncate">{r.label}</span>
                <span className="text-[10px] font-mono font-semibold text-foreground whitespace-nowrap">{r.value}</span>
              </div>
            ))}
          </div>

          {/* Viz */}
          {hasViz && (
            <>
              <button
                onClick={() => setShowViz(!showViz)}
                className="flex items-center gap-1 text-[9px] text-primary hover:underline font-medium"
              >
                <Eye className="h-2.5 w-2.5" />
                {showViz ? "Ascunde" : `Vizualizare ${vizType === '3d' ? '3D' : '2D'}`}
              </button>
              {showViz && (
                <Suspense fallback={<div className="h-[100px] bg-muted/20 rounded-[4px] animate-pulse" />}>
                  {vizType === '3d' ? <Viz3D calcId={calc.id} params={inputs} /> : <Viz2D calcId={calc.id} params={inputs} />}
                </Suspense>
              )}
            </>
          )}

          {/* Formula */}
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="flex items-center gap-1 text-[9px] text-primary hover:underline"
          >
            <BookOpen className="h-2.5 w-2.5" />
            {showFormula ? "Ascunde" : "Formulă & explicație"}
          </button>

          {showFormula && (
            <div className="rounded-[4px] bg-secondary/40 p-1.5 space-y-0.5">
              <p className="text-[9px] font-mono text-foreground leading-relaxed">{calc.formula}</p>
              <p className="text-[9px] text-muted-foreground leading-relaxed">{calc.explanation}</p>
            </div>
          )}

          {/* Ads */}
          {ads.map(ad => (
            <div key={ad.id} className="text-[9px]" dangerouslySetInnerHTML={{ __html: ad.code }} />
          ))}

          {/* Referrals */}
          {referrals.map(ref => (
            <a key={ref.id} href={ref.url} target="_blank" rel="noopener noreferrer sponsored"
              className="block text-[9px] text-primary hover:underline truncate">
              {ref.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompactCalc;
