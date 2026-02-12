import { useState } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

const ConversiiBazeCalculator = () => {
  const [decimal, setDecimal] = useState(255);

  const num = Math.round(Math.abs(decimal));

  return (
    <CalculatorCard
      title="Conversii Baze Numerice"
      description="Binar, octal, hexazecimal, orice bază"
      formula="N₁₀ → N₂, N₈, N₁₆"
      explanation="Orice număr natural poate fi reprezentat în orice bază b≥2. Se face prin împărțiri succesive la bază, citind resturile de jos în sus. Baza 2 (binar) e folosită în computere, baza 16 (hex) în programare."
    >
      <div className="space-y-3">
        <div className="space-y-0.5">
          <label className="text-[11px] font-medium text-muted-foreground">Număr în baza 10</label>
          <input type="number" value={decimal} onChange={e => setDecimal(parseInt(e.target.value) || 0)}
            className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ResultDisplay label="Binar (baza 2)" value={num.toString(2)} />
          <ResultDisplay label="Octal (baza 8)" value={num.toString(8)} />
          <ResultDisplay label="Hexazecimal (baza 16)" value={num.toString(16).toUpperCase()} />
          <ResultDisplay label="Baza 3" value={num.toString(3)} />
        </div>
        <div className="rounded-md bg-primary/5 border border-primary/10 px-3 py-2 text-xs font-mono text-foreground space-y-0.5">
          <p>{num}₁₀ = {num.toString(2)}₂ = {num.toString(8)}₈ = {num.toString(16).toUpperCase()}₁₆</p>
          <p className="text-muted-foreground text-[10px]">Nr. biți necesari: {num > 0 ? Math.floor(Math.log2(num)) + 1 : 1}</p>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default ConversiiBazeCalculator;
