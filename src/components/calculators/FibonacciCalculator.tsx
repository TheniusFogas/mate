import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const FibonacciCalculator = () => {
  const [n, setN] = useState(15);

  const fib: number[] = [0, 1];
  for (let i = 2; i <= Math.min(n, 78); i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }

  const phi = (1 + Math.sqrt(5)) / 2;
  const binet = Math.round((Math.pow(phi, n) - Math.pow(-phi, -n)) / Math.sqrt(5));

  return (
    <CalculatorCard
      title="Fibonacci & Numărul de Aur"
      description="Șirul Fibonacci, φ (phi), formula Binet"
      formula="Fn = Fn-1 + Fn-2 | Binet: Fn = (phi^n - psi^n) / sqrt(5)"
      explanation="Sirul Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13... Apare in natura (spirale, flori, cochilii). Raportul Fn+1/Fn tinde la phi = (1+sqrt5)/2 = 1.618 (numarul de aur), prezent in arta, arhitectura, design."
    >
      <div className="space-y-3">
        <div className="space-y-0.5">
          <label className="text-[10px] text-muted-foreground">Numărul de termeni (n)</label>
          <input type="number" value={n} onChange={e => setN(Math.max(1, Math.min(78, parseInt(e.target.value) || 1)))} min={1} max={78}
            className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <ResultDisplay label={`F(${n})`} value={fib[Math.min(n, 78)]?.toLocaleString() ?? "—"} />
          <ResultDisplay label="φ (phi)" value={phi.toFixed(8)} />
          <ResultDisplay label="Binet F(n)" value={binet.toLocaleString()} />
        </div>
        <div className="rounded-md bg-primary/5 border border-primary/10 px-3 py-2">
          <p className="text-[10px] text-muted-foreground mb-1">Primii {Math.min(n, 20)} termeni:</p>
          <p className="text-xs font-mono text-foreground">{fib.slice(0, 20).map(v => v.toLocaleString()).join(", ")}{n > 20 ? ", ..." : ""}</p>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default FibonacciCalculator;
