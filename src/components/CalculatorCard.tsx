import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

interface CalculatorCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
  formula?: string;
  explanation?: string;
}

const CalculatorCard = ({ title, description, children, icon, formula, explanation }: CalculatorCardProps) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        {icon && (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-sm font-semibold text-foreground leading-tight">{title}</h3>
          {description && <p className="text-xs text-muted-foreground truncate">{description}</p>}
        </div>
        {(formula || explanation) && (
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            Formulă
            <ChevronDown className={`h-3 w-3 transition-transform ${showExplanation ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {showExplanation && (formula || explanation) && (
        <div className="px-4 py-2 bg-primary/5 border-b border-border text-xs text-muted-foreground space-y-1">
          {formula && (
            <p className="font-mono text-primary font-medium">{formula}</p>
          )}
          {explanation && <p className="leading-relaxed">{explanation}</p>}
        </div>
      )}

      <div className="p-3">{children}</div>
    </div>
  );
};

export default CalculatorCard;
