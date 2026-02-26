import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronRight, Check, X, RotateCcw, Trophy, Share2, Crown, Trash2, Clock } from "lucide-react";
import { mathCategories } from "@/lib/mathCalcs";
import { generateQuiz, checkAnswer, type QuizQuestion, type QuizDifficulty } from "@/lib/quizEngine";
import { getScores, addScore, clearScores } from "@/lib/quizScores";
import { useI18n } from "@/lib/i18n";

const TIMER_SECONDS: Record<QuizDifficulty, number> = { easy: 30, medium: 20, hard: 0 };

const QuizMode = ({ onClose }: { onClose: () => void }) => {
  const { t } = useI18n();
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("medium");
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasTimer = difficulty !== "hard";
  const maxTime = TIMER_SECONDS[difficulty];

  const stopTimer = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };

  const startTimer = () => {
    stopTimer();
    setStartTime(Date.now());
    if (!hasTimer) return; // No timer for hard mode
    const secs = maxTime;
    setTimeLeft(secs);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { stopTimer(); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  // Auto-submit when timer runs out (only for easy/medium)
  useEffect(() => {
    if (hasTimer && started && !finished && !showResult && timeLeft === 0 && timerRef.current === null && questions.length > 0) {
      const q = questions[currentIdx];
      if (q && q.isCorrect === null) {
        const updated = [...questions];
        updated[currentIdx] = { ...q, userAnswer: t("quiz.timeExpired"), isCorrect: false };
        setQuestions(updated);
        setShowResult(true);
      }
    }
  }, [timeLeft, started, finished, showResult, hasTimer]);

  useEffect(() => () => stopTimer(), []);

  const handleStart = () => {
    const qs = generateQuiz(questionCount, categoryId, difficulty);
    setQuestions(qs);
    setCurrentIdx(0);
    setAnswer("");
    setShowResult(false);
    setFinished(false);
    setScoreSaved(false);
    setTotalTime(0);
    setStarted(true);
    setStartTime(Date.now());
    if (hasTimer) {
      const secs = maxTime;
      setTimeLeft(secs);
      stopTimer();
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { stopTimer(); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const getTimeUsed = () => hasTimer ? maxTime - timeLeft : Math.round((Date.now() - startTime) / 1000);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    stopTimer();
    const q = questions[currentIdx];
    const correct = checkAnswer(q, answer);
    const updated = [...questions];
    updated[currentIdx] = { ...q, userAnswer: answer, isCorrect: correct };
    setQuestions(updated);
    setTotalTime(prev => prev + getTimeUsed());
    setShowResult(true);
  };

  const handleChoiceSelect = (choice: string) => {
    if (showResult) return;
    stopTimer();
    setAnswer(choice);
    const q = questions[currentIdx];
    const correct = checkAnswer(q, choice);
    const updated = [...questions];
    updated[currentIdx] = { ...q, userAnswer: choice, isCorrect: correct };
    setQuestions(updated);
    setTotalTime(prev => prev + getTimeUsed());
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setFinished(true);
      stopTimer();
    } else {
      setCurrentIdx(currentIdx + 1);
      setAnswer("");
      setShowResult(false);
      startTimer();
    }
  };

  const handleSaveScore = () => {
    if (!playerName.trim()) return;
    const catName = categoryId ? mathCategories.find(c => c.id === categoryId)?.name || t("home.all") : t("home.all");
    addScore({ name: playerName.trim(), score, total: questions.length, difficulty, category: catName });
    setScoreSaved(true);
  };

  const score = questions.filter(q => q.isCorrect === true).length;
  const current = questions[currentIdx];
  const scores = getScores();
  const diffLabel = (d: QuizDifficulty) => t(`quiz.${d}`);
  const diffColors: Record<QuizDifficulty, string> = { easy: "text-success", medium: "text-warning", hard: "text-destructive" };

  if (showLeaderboard) {
    const shareText = scores.length > 0
      ? `🏆 ${t("lb.shareText")}:\n${scores.slice(0, 5).map((s, i) => `${i+1}. ${s.name} — ${s.score}/${s.total} (${diffLabel(s.difficulty)})`).join("\n")}\n\n${window.location.origin}`
      : "";
    return (
      <Overlay>
        <Panel>
          <Header title={t("lb.title")} onClose={() => setShowLeaderboard(false)}
            extra={scores.length > 0 ? (
              <button onClick={() => navigator.clipboard.writeText(shareText)}
                className="text-muted-foreground hover:text-foreground" title={t("lb.share")}>
                <Share2 className="h-3.5 w-3.5" />
              </button>
            ) : undefined}
          />
          <div className="p-4 space-y-2">
            {scores.length === 0 ? (
              <p className="text-center text-[11px] text-muted-foreground py-6">{t("lb.noScores")}</p>
            ) : (
              <>
                {scores.map((s, i) => (
                  <div key={s.id} className={`flex items-center gap-2 rounded-[5px] p-2 text-[10px] ${i === 0 ? "bg-primary/10 border border-primary/20" : "bg-secondary/30"}`}>
                    <span className="font-bold text-foreground w-5 text-center">{i < 3 ? ["🥇","🥈","🥉"][i] : `${i+1}.`}</span>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-foreground truncate block">{s.name}</span>
                      <span className="text-[8px] text-muted-foreground">{s.category} • <span className={diffColors[s.difficulty]}>{diffLabel(s.difficulty)}</span></span>
                    </div>
                    <span className="font-mono font-bold text-primary">{s.score}/{s.total}</span>
                  </div>
                ))}
                <div className="flex items-center justify-center gap-2 pt-2 border-t border-border/30">
                  <span className="text-[9px] text-muted-foreground">{t("lb.share")}</span>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(shareText)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="h-6 w-6 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-80 transition-opacity" title="Facebook">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="h-6 w-6 rounded-full bg-foreground flex items-center justify-center text-background hover:opacity-80 transition-opacity" title="X">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <button onClick={() => navigator.clipboard.writeText(shareText)}
                    className="h-6 w-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground hover:opacity-80 transition-opacity" title="Copy">
                    <Share2 className="h-3 w-3" />
                  </button>
                </div>
                <button onClick={() => { clearScores(); setShowLeaderboard(false); }}
                  className="w-full mt-1 py-1 rounded-[5px] text-[9px] text-destructive hover:bg-destructive/10 flex items-center justify-center gap-1">
                  <Trash2 className="h-3 w-3" /> {t("lb.clear")}
                </button>
              </>
            )}
          </div>
        </Panel>
      </Overlay>
    );
  }

  return (
    <Overlay>
      <Panel>
        <Header title={t("quiz.title")} icon={<Brain className="h-4 w-4 text-primary" />} onClose={onClose}
          extra={<button onClick={() => setShowLeaderboard(true)} className="text-muted-foreground hover:text-foreground" title={t("nav.leaderboard")}><Crown className="h-4 w-4" /></button>}
        />
        <div className="p-4">
          {!started ? (
            <SetupView categoryId={categoryId} setCategoryId={setCategoryId}
              questionCount={questionCount} setQuestionCount={setQuestionCount}
              difficulty={difficulty} setDifficulty={setDifficulty} onStart={handleStart} />
          ) : finished ? (
            <FinishedView score={score} questions={questions} difficulty={difficulty} totalTime={totalTime}
              playerName={playerName} setPlayerName={setPlayerName}
              scoreSaved={scoreSaved} onSaveScore={handleSaveScore}
              onRestart={handleStart} onClose={onClose} />
          ) : current ? (
            <QuestionView current={current} currentIdx={currentIdx} total={questions.length}
              score={score} answer={answer} setAnswer={setAnswer}
              showResult={showResult} difficulty={difficulty} timeLeft={timeLeft} maxTime={maxTime}
              hasTimer={hasTimer}
              onSubmit={handleSubmit} onNext={handleNext} onChoiceSelect={handleChoiceSelect} />
          ) : null}
        </div>
      </Panel>
    </Overlay>
  );
};

// --- Sub-components ---

const Overlay = ({ children }: { children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
    {children}
  </motion.div>
);

const Panel = ({ children }: { children: React.ReactNode }) => (
  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
    className="glass rounded-lg w-full max-w-md shadow-elevated overflow-hidden max-h-[90vh] overflow-y-auto">
    {children}
  </motion.div>
);

const Header = ({ title, icon, onClose, extra }: { title: string; icon?: React.ReactNode; onClose: () => void; extra?: React.ReactNode }) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
    <h3 className="text-sm font-bold text-foreground flex items-center gap-2">{icon}{title}</h3>
    <div className="flex items-center gap-2">
      {extra}
      <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
    </div>
  </div>
);

const SetupView = ({ categoryId, setCategoryId, questionCount, setQuestionCount, difficulty, setDifficulty, onStart }: {
  categoryId?: string; setCategoryId: (v: string | undefined) => void;
  questionCount: number; setQuestionCount: (n: number) => void;
  difficulty: QuizDifficulty; setDifficulty: (d: QuizDifficulty) => void;
  onStart: () => void;
}) => {
  const { t } = useI18n();
  return (
    <div className="space-y-3">
      <div>
        <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">{t("quiz.difficulty")}</label>
        <div className="flex gap-1">
          {(["easy", "medium", "hard"] as QuizDifficulty[]).map(d => (
            <button key={d} onClick={() => setDifficulty(d)}
              className={`flex-1 px-2 py-1.5 rounded-[5px] text-[10px] font-medium transition-colors ${difficulty === d ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
              <span className="block font-semibold">{t(`quiz.${d}`)}</span>
              <span className="block text-[8px] opacity-70">
                {d === "easy" ? `${t("quiz.3choices")} • ${TIMER_SECONDS[d]}s` : d === "medium" ? `${t("quiz.6choices")} • ${TIMER_SECONDS[d]}s` : `${t("quiz.freeText")} • ${t("quiz.noTimer")}`}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">{t("quiz.category")}</label>
        <select value={categoryId || ""} onChange={e => setCategoryId(e.target.value || undefined)}
          className="w-full h-7 rounded-[5px] glass border border-border text-[11px] px-2 outline-none focus:border-primary">
          <option value="">{t("quiz.allCategories")}</option>
          {mathCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div>
        <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">{t("quiz.questions")}</label>
        <div className="flex gap-1">
          {[3, 5, 10, 15].map(n => (
            <button key={n} onClick={() => setQuestionCount(n)}
              className={`px-3 py-1 rounded-[5px] text-[11px] font-medium transition-colors ${questionCount === n ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
              {n}
            </button>
          ))}
        </div>
      </div>
      <button onClick={onStart} className="w-full py-2 rounded-[5px] gradient-primary text-primary-foreground text-[11px] font-semibold hover:opacity-90 transition-opacity">
        {t("quiz.start")}
      </button>
    </div>
  );
};

const FinishedView = ({ score, questions, difficulty, totalTime, playerName, setPlayerName, scoreSaved, onSaveScore, onRestart, onClose }: {
  score: number; questions: QuizQuestion[]; difficulty: QuizDifficulty; totalTime: number;
  playerName: string; setPlayerName: (s: string) => void;
  scoreSaved: boolean; onSaveScore: () => void;
  onRestart: () => void; onClose: () => void;
}) => {
  const { t } = useI18n();
  const diffColors: Record<QuizDifficulty, string> = { easy: "text-success", medium: "text-warning", hard: "text-destructive" };
  const text = `${t("quiz.scoreText")} ${score}/${questions.length} ${t("quiz.atQuiz")} (${t(`quiz.${difficulty}`)}) ${totalTime}s! 🧠🎯`;
  const url = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
      <Trophy className="h-10 w-10 text-primary mx-auto" />
      <h4 className="text-base font-bold text-foreground">{t("quiz.finished")}</h4>
      <div className="text-2xl font-mono font-bold text-primary">{score}/{questions.length}</div>
      <div className="flex items-center justify-center gap-2 text-[10px]">
        <span className={`font-medium ${diffColors[difficulty]}`}>{t(`quiz.${difficulty}`)}</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground flex items-center gap-0.5"><Clock className="h-3 w-3" /> {totalTime}s</span>
      </div>
      <p className="text-[11px] text-muted-foreground">
        {score === questions.length ? t("quiz.perfect") : score >= questions.length * 0.7 ? t("quiz.good") : t("quiz.practice")}
      </p>

      {!scoreSaved ? (
        <div className="flex gap-1">
          <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} placeholder={t("quiz.saveName")}
            onKeyDown={e => { if (e.key === "Enter") onSaveScore(); }}
            className="flex-1 h-7 rounded-[5px] border border-input bg-secondary/60 px-2 text-[11px] outline-none focus:border-primary" />
          <button onClick={onSaveScore} disabled={!playerName.trim()}
            className="px-3 h-7 rounded-[5px] gradient-primary text-primary-foreground text-[10px] font-semibold disabled:opacity-40">
            {t("quiz.save")}
          </button>
        </div>
      ) : (
        <p className="text-[10px] text-primary font-medium">{t("quiz.saved")}</p>
      )}

      <div className="flex items-center justify-center gap-2">
        <span className="text-[9px] text-muted-foreground">{t("quiz.share")}</span>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer"
          className="h-7 w-7 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-80 transition-opacity" title="Facebook">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer"
          className="h-7 w-7 rounded-full bg-foreground flex items-center justify-center text-background hover:opacity-80 transition-opacity" title="X">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <button onClick={() => navigator.clipboard.writeText(`${text}\n${url}`)}
          className="h-7 w-7 rounded-full bg-accent flex items-center justify-center text-accent-foreground hover:opacity-80 transition-opacity" title="Copy">
          <Share2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="text-[8px] text-muted-foreground">{t("quiz.shareIg")}</p>

      <div className="space-y-1 text-left max-h-40 overflow-y-auto">
        {questions.map((q, i) => (
          <div key={i} className={`rounded-[4px] p-1.5 text-[9px] flex items-start gap-1.5 ${q.isCorrect ? "bg-primary/10" : "bg-destructive/10"}`}>
            {q.isCorrect ? <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" /> : <X className="h-3 w-3 text-destructive shrink-0 mt-0.5" />}
            <div className="min-w-0">
              <span className="font-medium text-foreground">{q.calc.name}</span>
              {!q.isCorrect && <span className="text-muted-foreground"> — {t("quiz.wrongAnswer")} {q.correctResults[0]?.value}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={onRestart} className="flex-1 py-1.5 rounded-[5px] gradient-primary text-primary-foreground text-[11px] font-semibold flex items-center justify-center gap-1">
          <RotateCcw className="h-3 w-3" /> {t("quiz.restart")}
        </button>
        <button onClick={onClose} className="flex-1 py-1.5 rounded-[5px] glass text-muted-foreground text-[11px] font-medium hover:text-foreground">
          {t("quiz.close")}
        </button>
      </div>
    </motion.div>
  );
};

const QuestionView = ({ current, currentIdx, total, score, answer, setAnswer, showResult, difficulty, timeLeft, maxTime, hasTimer, onSubmit, onNext, onChoiceSelect }: {
  current: QuizQuestion; currentIdx: number; total: number; score: number;
  answer: string; setAnswer: (s: string) => void; showResult: boolean;
  difficulty: QuizDifficulty; timeLeft: number; maxTime: number; hasTimer: boolean;
  onSubmit: () => void; onNext: () => void; onChoiceSelect: (c: string) => void;
}) => {
  const { t } = useI18n();
  const timerPct = hasTimer ? (timeLeft / maxTime) * 100 : 100;
  const timerColor = hasTimer ? (timeLeft <= 5 ? "bg-destructive" : timeLeft <= 10 ? "bg-warning" : "bg-primary") : "bg-primary";

  return (
    <AnimatePresence mode="wait">
      <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
        <div className="flex items-center justify-between text-[9px] text-muted-foreground">
          <span>{t("quiz.question")} {currentIdx + 1}/{total}</span>
          <span className="flex items-center gap-1.5">
            {hasTimer ? (
              <span className={`flex items-center gap-0.5 font-mono font-bold ${timeLeft <= 5 ? "text-destructive" : timeLeft <= 10 ? "text-warning" : "text-foreground"}`}>
                <Clock className="h-3 w-3" /> {timeLeft}s
              </span>
            ) : (
              <span className="text-muted-foreground text-[8px]">∞</span>
            )}
            <span className={`${difficulty === "easy" ? "text-success" : difficulty === "medium" ? "text-warning" : "text-destructive"} font-medium`}>{t(`quiz.${difficulty}`)}</span>
            <span>{score} {t("quiz.correct")}</span>
          </span>
        </div>

        {/* Timer bar (only for easy/medium) */}
        {hasTimer && (
          <div className="h-1 rounded-full bg-secondary overflow-hidden">
            <motion.div className={`h-full rounded-full ${timerColor}`}
              animate={{ width: `${timerPct}%` }} transition={{ duration: 0.5 }} />
          </div>
        )}

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

        {difficulty !== "hard" && current.choices ? (
          <div className={`grid gap-1 ${difficulty === "medium" ? "grid-cols-2" : "grid-cols-1"}`}>
            {current.choices.map((choice, i) => {
              const isSelected = answer === choice;
              const isCorrectChoice = showResult && choice === current.correctResults[0]?.value?.toString();
              const isWrong = showResult && isSelected && !current.isCorrect;
              return (
                <button key={i} onClick={() => onChoiceSelect(choice)} disabled={showResult}
                  className={`px-3 py-2 rounded-[5px] text-[11px] font-mono font-medium border transition-all text-left ${
                    isCorrectChoice ? "border-primary/50 bg-primary/10 text-primary" :
                    isWrong ? "border-destructive/50 bg-destructive/10 text-destructive" :
                    isSelected ? "border-primary bg-primary/10 text-primary" :
                    "border-border/50 bg-secondary/30 text-foreground hover:border-primary/50 hover:bg-primary/5"
                  } disabled:cursor-default`}>
                  {choice}
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <label className="text-[9px] text-muted-foreground block mb-0.5">
              {current.correctResults[0]?.label || "Rezultat"} = ?
            </label>
            <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} disabled={showResult}
              onKeyDown={e => { if (e.key === "Enter" && !showResult) onSubmit(); }}
              placeholder={t("quiz.typeAnswer")}
              className="w-full h-8 rounded-[5px] border border-input bg-secondary/60 px-2 text-[12px] font-mono outline-none focus:border-primary focus:ring-1 focus:ring-ring disabled:opacity-60"
              autoFocus />
          </div>
        )}

        {showResult && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
            className={`rounded-[5px] p-2 text-[10px] flex items-center gap-2 ${current.isCorrect ? "bg-primary/10 border border-primary/30" : "bg-destructive/10 border border-destructive/30"}`}>
            {current.isCorrect
              ? <><Check className="h-3.5 w-3.5 text-primary" /><span className="text-primary font-medium">{t("quiz.correctAnswer")}</span></>
              : <><X className="h-3.5 w-3.5 text-destructive" /><span className="text-destructive font-medium">{t("quiz.wrongAnswer")} <span className="font-mono">{current.correctResults[0]?.value}</span></span></>
            }
          </motion.div>
        )}

        {difficulty === "hard" && !showResult ? (
          <button onClick={onSubmit} disabled={!answer.trim()}
            className="w-full py-1.5 rounded-[5px] gradient-primary text-primary-foreground text-[11px] font-semibold disabled:opacity-40 flex items-center justify-center gap-1">
            {t("quiz.check")} <ChevronRight className="h-3 w-3" />
          </button>
        ) : showResult ? (
          <button onClick={onNext}
            className="w-full py-1.5 rounded-[5px] gradient-primary text-primary-foreground text-[11px] font-semibold flex items-center justify-center gap-1">
            {currentIdx + 1 >= total ? t("quiz.seeResults") : t("quiz.next")} <ChevronRight className="h-3 w-3" />
          </button>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizMode;
