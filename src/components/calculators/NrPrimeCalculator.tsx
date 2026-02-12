import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
};

const factorize = (n: number) => {
  const factors: [number, number][] = [];
  let num = Math.abs(Math.round(n));
  for (let d = 2; d * d <= num; d++) {
    let count = 0;
    while (num % d === 0) { num /= d; count++; }
    if (count > 0) factors.push([d, count]);
  }
  if (num > 1) factors.push([num, 1]);
  return factors;
};

const getDivisors = (n: number) => {
  const divs: number[] = [];
  const num = Math.abs(Math.round(n));
  for (let i = 1; i * i <= num; i++) {
    if (num % i === 0) {
      divs.push(i);
      if (i !== num / i) divs.push(num / i);
    }
  }
  return divs.sort((a, b) => a - b);
};

const NrPrimeCalculator = () => {
  const [n, setN] = useState(97);

  const num = Math.abs(Math.round(n));
  const prime = isPrime(num);
  const factors = factorize(num);
  const divisors = num <= 100000 ? getDivisors(num) : [];

  // Find next/prev prime
  let nextP = num + 1;
  while (nextP < 1e8 && !isPrime(nextP)) nextP++;
  let prevP = num - 1;
  while (prevP > 1 && !isPrime(prevP)) prevP--;

  return (
    <CalculatorCard
      title="Numere Prime & Factorizare"
      description="Test primalitate, factorizare, divizori"
      formula="n = p₁^e₁ × p₂^e₂ × ... × pₖ^eₖ"
      explanation="Un număr prim este divizibil doar cu 1 și cu sine. Teorema fundamentală a aritmeticii: orice n>1 se descompune unic în produs de puteri de numere prime. Nr. de divizori = Π(eᵢ+1)."
    >
      <div className="space-y-3">
        <div className="space-y-0.5">
          <label className="text-[11px] font-medium text-muted-foreground">Număr</label>
          <input type="number" value={n} onChange={e => setN(parseInt(e.target.value) || 0)}
            className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <ResultDisplay label="Prim?" value={prime ? "✅ DA" : "❌ NU"} />
          <ResultDisplay label="Nr. divizori" value={divisors.length} />
          <ResultDisplay label="Sumă div." value={divisors.reduce((s, d) => s + d, 0)} />
        </div>
        <div className="rounded-md bg-primary/5 border border-primary/10 px-3 py-2 text-xs space-y-1">
          <p className="text-muted-foreground">Factorizare: <span className="font-mono text-foreground">{factors.length > 0 ? factors.map(([p, e]) => e > 1 ? `${p}^${e}` : `${p}`).join(" × ") : num}</span></p>
          {divisors.length > 0 && divisors.length <= 30 && (
            <p className="text-muted-foreground">Divizori: <span className="font-mono text-foreground">{divisors.join(", ")}</span></p>
          )}
          <p className="text-muted-foreground">Prim anterior: <strong className="text-foreground">{prevP > 1 ? prevP : "—"}</strong> | Prim următor: <strong className="text-foreground">{nextP}</strong></p>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default NrPrimeCalculator;
