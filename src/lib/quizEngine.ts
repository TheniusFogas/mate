// Quiz engine — generates random math problems from existing calculators
import { mathCategories } from "./mathCalcs";
import type { CalcConfig, CalcResult } from "./calcTypes";

export interface QuizQuestion {
  calc: CalcConfig;
  inputs: Record<string, number>;
  correctResults: CalcResult[];
  userAnswer: string;
  isCorrect: boolean | null;
}

const randomBetween = (min: number, max: number, step = 1): number => {
  const steps = Math.floor((max - min) / step);
  return min + Math.floor(Math.random() * (steps + 1)) * step;
};

// Pick a random calculator and generate random inputs
const generateQuestion = (categoryId?: string): QuizQuestion => {
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

  return { calc, inputs, correctResults, userAnswer: "", isCorrect: null };
};

export const generateQuiz = (count: number, categoryId?: string): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion(categoryId));
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
