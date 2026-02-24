import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronRight, Check, X, RotateCcw, Trophy } from "lucide-react";
import { mathCategories } from "@/lib/mathCalcs";
import { generateQuiz, checkAnswer, type QuizQuestion } from "@/lib/quizEngine";

const QuizMode = ({ onClose }: { onClose: () => void }) => {
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [questionCount, setQuestionCount] = useState(5);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleStart = () => {
    setQuestions(generateQuiz(questionCount, categoryId));
    setCurrentIdx(0);
    setAnswer("");
    setShowResult(false);
    setFinished(false);
    setStarted(true);
  };

  const handleSubmit = () => {
    if (!answer.trim()) return;
    const q = questions[currentIdx];
    const correct = checkAnswer(q, answer);
    const updated = [...questions];
    updated[currentIdx] = { ...q, userAnswer: answer, isCorrect: correct };
    setQuestions(updated);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIdx(currentIdx + 1);
      setAnswer("");
      setShowResult(false);
    }
  };

  const score = questions.filter(q => q.isCorrect === true).length;
  const current = questions[currentIdx];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass rounded-lg w-full max-w-md shadow-elevated overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" /> Quiz Matematic
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4">
          {!started ? (
            /* Setup */
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">Categorie</label>
                <select
                  value={categoryId || ""}
                  onChange={e => setCategoryId(e.target.value || undefined)}
                  className="w-full h-7 rounded-[5px] glass border border-border text-[11px] px-2 outline-none focus:border-primary"
                >
                  <option value="">Toate categoriile</option>
                  {mathCategories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">Număr întrebări</label>
                <div className="flex gap-1">
                  {[3, 5, 10, 15].map(n => (
                    <button
                      key={n}
                      onClick={() => setQuestionCount(n)}
                      className={`px-3 py-1 rounded-[5px] text-[11px] font-medium transition-colors ${
                        questionCount === n ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleStart}
                className="w-full py-2 rounded-[5px] gradient-primary text-primary-foreground text-[11px] font-semibold hover:opacity-90 transition-opacity"
              >
                Începe Quiz
              </button>
            </div>
          ) : finished ? (
            /* Results */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-3"
            >
              <Trophy className="h-10 w-10 text-primary mx-auto" />
              <h4 className="text-base font-bold text-foreground">Quiz Terminat!</h4>
              <div className="text-2xl font-mono font-bold text-primary">{score}/{questions.length}</div>
              <p className="text-[11px] text-muted-foreground">
                {score === questions.length ? "Perfect! 🎉" : score >= questions.length * 0.7 ? "Foarte bine! 💪" : "Mai exersează! 📚"}
              </p>

              {/* Review answers */}
              <div className="space-y-1 text-left max-h-40 overflow-y-auto">
                {questions.map((q, i) => (
                  <div key={i} className={`rounded-[4px] p-1.5 text-[9px] flex items-start gap-1.5 ${q.isCorrect ? "bg-green-500/10" : "bg-destructive/10"}`}>
                    {q.isCorrect ? <Check className="h-3 w-3 text-green-500 shrink-0 mt-0.5" /> : <X className="h-3 w-3 text-destructive shrink-0 mt-0.5" />}
                    <div className="min-w-0">
                      <span className="font-medium text-foreground">{q.calc.name}</span>
                      {!q.isCorrect && (
                        <span className="text-muted-foreground"> — Corect: {q.correctResults[0]?.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={handleStart} className="flex-1 py-1.5 rounded-[5px] gradient-primary text-primary-foreground text-[11px] font-semibold flex items-center justify-center gap-1">
                  <RotateCcw className="h-3 w-3" /> Reia
                </button>
                <button onClick={onClose} className="flex-1 py-1.5 rounded-[5px] glass text-muted-foreground text-[11px] font-medium hover:text-foreground">
                  Închide
                </button>
              </div>
            </motion.div>
          ) : current ? (
            /* Question */
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3"
              >
                {/* Progress */}
                <div className="flex items-center justify-between text-[9px] text-muted-foreground">
                  <span>Întrebarea {currentIdx + 1}/{questions.length}</span>
                  <span>{score} corecte</span>
                </div>
                <div className="h-1 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <div className="rounded-[5px] bg-secondary/30 border border-border/30 p-3 space-y-2">
                  <h4 className="text-[11px] font-semibold text-foreground">{current.calc.name}</h4>
                  <p className="text-[9px] text-muted-foreground">{current.calc.description}</p>
                  <div className="grid grid-cols-2 gap-1">
                    {current.calc.inputs.map(inp => (
                      <div key={inp.key} className="text-[9px]">
                        <span className="text-muted-foreground">{inp.label}: </span>
                        <span className="font-mono font-semibold text-foreground">{current.inputs[inp.key]}</span>
                        {inp.unit && <span className="text-muted-foreground/70"> {inp.unit}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Answer input */}
                <div>
                  <label className="text-[9px] text-muted-foreground block mb-0.5">
                    {current.correctResults[0]?.label || "Rezultat"} = ?
                  </label>
                  <input
                    type="text"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    disabled={showResult}
                    onKeyDown={e => { if (e.key === "Enter" && !showResult) handleSubmit(); }}
                    placeholder="Introdu răspunsul..."
                    className="w-full h-8 rounded-[5px] border border-input bg-secondary/60 px-2 text-[12px] font-mono outline-none focus:border-primary focus:ring-1 focus:ring-ring disabled:opacity-60"
                    autoFocus
                  />
                </div>

                {/* Result feedback */}
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-[5px] p-2 text-[10px] flex items-center gap-2 ${
                      current.isCorrect ? "bg-green-500/10 border border-green-500/30" : "bg-destructive/10 border border-destructive/30"
                    }`}
                  >
                    {current.isCorrect
                      ? <><Check className="h-3.5 w-3.5 text-green-500" /><span className="text-green-400 font-medium">Corect! 🎉</span></>
                      : <><X className="h-3.5 w-3.5 text-destructive" /><span className="text-destructive font-medium">Greșit. Răspuns: <span className="font-mono">{current.correctResults[0]?.value}</span></span></>
                    }
                  </motion.div>
                )}

                {/* Actions */}
                {!showResult ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!answer.trim()}
                    className="w-full py-1.5 rounded-[5px] gradient-primary text-primary-foreground text-[11px] font-semibold disabled:opacity-40 flex items-center justify-center gap-1"
                  >
                    Verifică <ChevronRight className="h-3 w-3" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="w-full py-1.5 rounded-[5px] gradient-primary text-primary-foreground text-[11px] font-semibold flex items-center justify-center gap-1"
                  >
                    {currentIdx + 1 >= questions.length ? "Vezi rezultatele" : "Următoarea"} <ChevronRight className="h-3 w-3" />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuizMode;
