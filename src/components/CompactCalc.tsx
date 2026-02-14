import { useState, useMemo } from "react";
import { ChevronRight, BookOpen } from "lucide-react";
import type { CalcConfig } from "@/lib/calcTypes";

const CompactCalc = ({ calc }: { calc: CalcConfig }) => {
  const [open, setOpen] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const d: Record<string, number> = {};
    calc.inputs.forEach(i => (d[i.key] = i.default));
    return d;
  });

  const results = useMemo(() => {
    try { return calc.calculate(inputs); }
    catch { return [{ label: "Eroare", value: "—" }]; }
  }, [inputs, calc]);

  return (
    <div className="border border-border rounded-[6px] bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-1.5 px-2 py-1.5 text-left hover:bg-secondary/40 transition-colors"
      >
        <ChevronRight className={`h-3 w-3 text-muted-foreground shrink-0 transition-transform duration-150 ${open ? "rotate-90" : ""}`} />
        <div className="min-w-0 flex-1">
          <span className="text-[12px] font-medium text-foreground leading-none block truncate">{calc.name}</span>
          <span className="text-[10px] text-muted-foreground leading-none block truncate mt-0.5">{calc.description}</span>
        </div>
      </button>

      {open && (
        <div className="px-2 pb-2 space-y-1.5 border-t border-border/50">
          {/* Inputs */}
          <div className="grid grid-cols-2 gap-1 pt-1.5">
            {calc.inputs.map(input => (
              <div key={input.key}>
                <label className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider leading-none">
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

          {/* Results */}
          <div className="rounded-[4px] bg-primary/5 border border-primary/10 p-1.5 space-y-0.5">
            {results.map((r, idx) => (
              <div key={idx} className="flex items-center justify-between gap-1">
                <span className="text-[10px] text-muted-foreground truncate">{r.label}</span>
                <span className="text-[11px] font-mono font-semibold text-foreground whitespace-nowrap">{r.value}</span>
              </div>
            ))}
          </div>

          {/* Formula toggle */}
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="flex items-center gap-1 text-[10px] text-primary hover:underline"
          >
            <BookOpen className="h-2.5 w-2.5" />
            {showFormula ? "Ascunde" : "Formulă & explicație"}
          </button>

          {showFormula && (
            <div className="rounded-[4px] bg-secondary/50 p-1.5 space-y-1">
              <p className="text-[10px] font-mono text-foreground leading-relaxed">{calc.formula}</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{calc.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompactCalc;
