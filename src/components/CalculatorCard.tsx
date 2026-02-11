import { ReactNode } from "react";

interface CalculatorCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
}

const CalculatorCard = ({ title, description, children, icon }: CalculatorCardProps) => (
  <div className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover">
    <div className="mb-4 flex items-center gap-3">
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
    {children}
  </div>
);

export default CalculatorCard;
