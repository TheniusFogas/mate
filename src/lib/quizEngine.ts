// Quiz engine — generates random math problems from existing calculators
import { mathCategories } from "./mathCalcs";
import type { CalcConfig, CalcResult } from "./calcTypes";

export type QuizDifficulty = "easy" | "medium" | "hard";

export interface QuizQuestion {
  calc: CalcConfig;
  inputs: Record<string, number>;
  correctResults: CalcResult[];
  choices?: string[]; // for easy/medium modes
  userAnswer: string;
  isCorrect: boolean | null;
}

const randomBetween = (min: number, max: number, step = 1): number => {
  const steps = Math.floor((max - min) / step);
  return min + Math.floor(Math.random() * (steps + 1)) * step;
};

// Generate wrong but plausible choices near the correct answer
const generateChoices = (correct: string, count: number): string[] => {
  const num = parseFloat(correct.replace(",", "."));
  if (isNaN(num)) {
    // Non-numeric: just return the correct one (fallback)
    return [correct];
  }
  const choices = new Set<string>();
  choices.add(correct);
  let attempts = 0;
  while (choices.size < count && attempts < 50) {
    const offset = (Math.random() - 0.5) * Math.max(Math.abs(num) * 0.5, 5);
    const wrong = Number.isInteger(num)
      ? Math.round(num + offset).toString()
      : (num + offset).toFixed(correct.includes(".") ? (correct.split(".")[1]?.length || 2) : 2);
    if (wrong !== correct) choices.add(wrong);
    attempts++;
  }
  return shuffle([...choices]);
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Pick a random calculator and generate random inputs
const generateQuestion = (categoryId?: string, difficulty: QuizDifficulty = "hard"): QuizQuestion => {
  const cats = categoryId
    ? mathCategories.filter(c => c.id === categoryId)
    : mathCategories;
  
  const cat = cats[Math.floor(Math.random() * cats.length)];
  const calc = cat.calculators[Math.floor(Math.random() * cat.calculators.length)];
  
  const inputs: Record<string, number> = {};
  calc.inputs.forEach(inp => {
    const min = inp.min ?? 1;
    const max = inp.max ?? 100;
    const step = inp.step ?? 1;
    inputs[inp.key] = randomBetween(min, max, step);
  });

  let correctResults: CalcResult[];
  try {
    correctResults = calc.calculate(inputs);
  } catch {
    correctResults = [{ label: "Eroare", value: "—" }];
  }

  let choices: string[] | undefined;
  if (difficulty !== "hard") {
    const choiceCount = difficulty === "easy" ? 3 : 6;
    const correctVal = correctResults[0]?.value?.toString() || "0";
    choices = generateChoices(correctVal, choiceCount);
  }

  return { calc, inputs, correctResults, choices, userAnswer: "", isCorrect: null };
};

export const generateQuiz = (count: number, categoryId?: string, difficulty: QuizDifficulty = "hard"): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion(categoryId, difficulty));
  }
  return questions;
};

export const checkAnswer = (question: QuizQuestion, answer: string): boolean => {
  // Check if the answer matches any of the result values (first result by default)
  const firstResult = question.correctResults[0]?.value?.toString() || "";
  const cleanAnswer = answer.trim().replace(",", ".");
  const cleanCorrect = firstResult.trim().replace(",", ".");
  
  // Exact match
  if (cleanAnswer === cleanCorrect) return true;
  
  // Numeric comparison with tolerance
  const numAnswer = parseFloat(cleanAnswer);
  const numCorrect = parseFloat(cleanCorrect);
  if (!isNaN(numAnswer) && !isNaN(numCorrect)) {
    const tolerance = Math.abs(numCorrect) * 0.01 || 0.01; // 1% tolerance
    return Math.abs(numAnswer - numCorrect) <= tolerance;
  }
  
  return false;
};
