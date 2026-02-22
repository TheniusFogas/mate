// Shared state for exam mode, history, and PDF export

import type { CalcResult } from "./calcTypes";

// ─── Exam Mode ───
let examMode = false;
const listeners = new Set<() => void>();

export const isExamMode = () => examMode;
export const toggleExamMode = () => {
  examMode = !examMode;
  listeners.forEach(fn => fn());
};
export const subscribeExamMode = (fn: () => void) => {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
};

// ─── Calculation History ───
export interface HistoryEntry {
  id: string;
  calcName: string;
  calcId: string;
  inputs: Record<string, number>;
  results: CalcResult[];
  timestamp: number;
}

const HISTORY_KEY = "calc_history";
const MAX_HISTORY = 50;

export const getHistory = (): HistoryEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch { return []; }
};

export const addToHistory = (entry: Omit<HistoryEntry, "id" | "timestamp">) => {
  const history = getHistory();
  history.unshift({
    ...entry,
    id: Math.random().toString(36).slice(2, 10),
    timestamp: Date.now(),
  });
  if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};

// ─── PDF Export ───
export const exportCalcPDF = (
  calcName: string,
  formula: string,
  explanation: string,
  inputs: { label: string; value: number; unit?: string }[],
  results: CalcResult[]
) => {
  const now = new Date().toLocaleString("ro-RO");
  const html = `
<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<title>${calcName} — Rezultate</title>
<style>
  body { font-family: 'Segoe UI', sans-serif; max-width: 700px; margin: 40px auto; color: #1a1a2e; padding: 20px; }
  h1 { color: #0891b2; font-size: 22px; border-bottom: 2px solid #0891b2; padding-bottom: 8px; }
  .meta { color: #666; font-size: 12px; margin-bottom: 20px; }
  .section { margin: 16px 0; padding: 12px; border-radius: 8px; }
  .formula { background: #f0f9ff; border-left: 4px solid #0891b2; font-family: monospace; font-size: 14px; }
  .explanation { background: #f8fafc; border-left: 4px solid #64748b; font-size: 13px; line-height: 1.6; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0; }
  th { background: #0891b2; color: white; padding: 8px 12px; text-align: left; font-size: 13px; }
  td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
  tr:nth-child(even) { background: #f8fafc; }
  .footer { margin-top: 30px; text-align: center; color: #94a3b8; font-size: 11px; }
  @media print { body { margin: 20px; } }
</style>
</head><body>
<h1>📐 ${calcName}</h1>
<div class="meta">Generat: ${now}</div>
<div class="section formula"><strong>Formula:</strong> ${formula}</div>
<div class="section explanation"><strong>Explicație:</strong> ${explanation}</div>
<h2 style="font-size:16px; color:#0891b2;">Valori introduse</h2>
<table>
<tr><th>Parametru</th><th>Valoare</th></tr>
${inputs.map(i => `<tr><td>${i.label}${i.unit ? ` (${i.unit})` : ''}</td><td><strong>${i.value}</strong></td></tr>`).join('')}
</table>
<h2 style="font-size:16px; color:#0891b2;">Rezultate</h2>
<table>
<tr><th>Mărime</th><th>Valoare</th></tr>
${results.map(r => `<tr><td>${r.label}</td><td><strong>${r.value}</strong></td></tr>`).join('')}
</table>
<div class="footer">Generat cu Calculatoare Matematică • calculatoare.app</div>
</body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) {
    win.onload = () => {
      setTimeout(() => { win.print(); }, 500);
    };
  }
  setTimeout(() => URL.revokeObjectURL(url), 10000);
};
