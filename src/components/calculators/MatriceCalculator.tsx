import { useState, useMemo } from "react";
import CalculatorCard from "../CalculatorCard";
import ResultDisplay from "../ResultDisplay";

type MatrixSize = 2 | 3;

const MatriceCalculator = () => {
  const [size, setSize] = useState<MatrixSize>(3);
  const [matA, setMatA] = useState<number[][]>([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 10],
  ]);
  const [matB, setMatB] = useState<number[][]>([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]);
  const [operation, setOperation] = useState<"add" | "sub" | "mul" | "detA" | "transpA">("mul");

  const setCell = (mat: "A" | "B", r: number, c: number, val: number) => {
    const setter = mat === "A" ? setMatA : setMatB;
    setter(prev => {
      const copy = prev.map(row => [...row]);
      copy[r][c] = val;
      return copy;
    });
  };

  const changeSize = (newSize: MatrixSize) => {
    setSize(newSize);
    const makeMatrix = (fill: number) =>
      Array.from({ length: newSize }, (_, r) =>
        Array.from({ length: newSize }, (_, c) => (r === c ? fill : 0))
      );
    setMatA(makeMatrix(1));
    setMatB(makeMatrix(1));
  };

  const det2 = (m: number[][]) => m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const det3 = (m: number[][]) =>
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

  const determinant = (m: number[][]) => (m.length === 2 ? det2(m) : det3(m));

  const transpose = (m: number[][]) => m[0].map((_, c) => m.map(row => row[c]));

  const addMatrices = (a: number[][], b: number[][], sign: 1 | -1) =>
    a.map((row, r) => row.map((v, c) => v + sign * b[r][c]));

  const mulMatrices = (a: number[][], b: number[][]) => {
    const n = a.length;
    return Array.from({ length: n }, (_, r) =>
      Array.from({ length: n }, (_, c) =>
        a[r].reduce((sum, v, k) => sum + v * b[k][c], 0)
      )
    );
  };

  const result = useMemo(() => {
    const a = matA.slice(0, size).map(r => r.slice(0, size));
    const b = matB.slice(0, size).map(r => r.slice(0, size));
    switch (operation) {
      case "add": return { matrix: addMatrices(a, b, 1), scalar: null };
      case "sub": return { matrix: addMatrices(a, b, -1), scalar: null };
      case "mul": return { matrix: mulMatrices(a, b), scalar: null };
      case "detA": return { matrix: null, scalar: determinant(a) };
      case "transpA": return { matrix: transpose(a), scalar: null };
    }
  }, [matA, matB, size, operation]);

  const ops = [
    { key: "add" as const, label: "A + B" },
    { key: "sub" as const, label: "A - B" },
    { key: "mul" as const, label: "A × B" },
    { key: "detA" as const, label: "det(A)" },
    { key: "transpA" as const, label: "Aᵀ" },
  ];

  const needsB = operation === "add" || operation === "sub" || operation === "mul";

  const MatrixInput = ({ label, matrix, matId }: { label: string; matrix: number[][]; matId: "A" | "B" }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {Array.from({ length: size }).map((_, r) =>
          Array.from({ length: size }).map((_, c) => (
            <input
              key={`${r}-${c}`}
              type="number"
              value={matrix[r]?.[c] ?? 0}
              onChange={e => setCell(matId, r, c, parseFloat(e.target.value) || 0)}
              className="w-16 rounded-md border border-input bg-background px-2 py-1.5 text-center text-sm font-mono text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring"
            />
          ))
        )}
      </div>
    </div>
  );

  const MatrixDisplay = ({ matrix }: { matrix: number[][] }) => (
    <div className="inline-grid gap-1 rounded-lg bg-primary/5 border border-primary/10 p-3" style={{ gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)` }}>
      {matrix.map((row, r) =>
        row.map((v, c) => (
          <div key={`${r}-${c}`} className="w-16 rounded-md bg-card px-2 py-1.5 text-center text-sm font-mono font-semibold text-primary">
            {Number.isInteger(v) ? v : v.toFixed(2)}
          </div>
        ))
      )}
    </div>
  );

  return (
    <CalculatorCard title="Calculator Matrice" description="Adunare, scădere, înmulțire, determinant, transpusă">
      <div className="space-y-4">
        {/* Size selector */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">Dimensiune:</span>
          {([2, 3] as MatrixSize[]).map(s => (
            <button key={s} onClick={() => changeSize(s)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${size === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {s}×{s}
            </button>
          ))}
        </div>

        {/* Operation selector */}
        <div className="flex flex-wrap gap-2">
          {ops.map(op => (
            <button key={op.key} onClick={() => setOperation(op.key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${operation === op.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
              {op.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <MatrixInput label="Matricea A" matrix={matA} matId="A" />
            {needsB && <MatrixInput label="Matricea B" matrix={matB} matId="B" />}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Rezultat</h4>
            {result.matrix && <MatrixDisplay matrix={result.matrix} />}
            {result.scalar !== null && (
              <ResultDisplay label="Determinant(A)" value={result.scalar} />
            )}
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default MatriceCalculator;
