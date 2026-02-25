// High-scores persistence (localStorage)
export interface ScoreEntry {
  id: string;
  name: string;
  score: number;
  total: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  timestamp: number;
}

const STORAGE_KEY = "mathlab_quiz_scores";

export const getScores = (): ScoreEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

export const addScore = (entry: Omit<ScoreEntry, "id" | "timestamp">): ScoreEntry => {
  const scores = getScores();
  const newEntry: ScoreEntry = {
    ...entry,
    id: Math.random().toString(36).slice(2, 9),
    timestamp: Date.now(),
  };
  scores.push(newEntry);
  scores.sort((a, b) => {
    const pctA = a.score / a.total;
    const pctB = b.score / b.total;
    if (pctB !== pctA) return pctB - pctA;
    // difficulty weight: hard > medium > easy
    const dw = { hard: 3, medium: 2, easy: 1 };
    return dw[b.difficulty] - dw[a.difficulty];
  });
  const top = scores.slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(top));
  return newEntry;
};

export const clearScores = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
