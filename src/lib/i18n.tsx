import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getCalcName, getCalcDesc, getCatName, getCatDesc, translateLabel, translateInputLabel } from "./calcTranslations";

export type Lang = "ro" | "en" | "fr" | "de" | "it" | "es";

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "ro", label: "Română", flag: "🇷🇴" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

const UI: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.leaderboard": { ro: "Clasament", en: "Leaderboard", fr: "Classement", de: "Rangliste", it: "Classifica", es: "Clasificación" },
  "nav.history": { ro: "Istoric", en: "History", fr: "Historique", de: "Verlauf", it: "Cronologia", es: "Historial" },
  "nav.exam": { ro: "Examen", en: "Exam", fr: "Examen", de: "Prüfung", it: "Esame", es: "Examen" },
  "nav.quiz": { ro: "Quiz", en: "Quiz", fr: "Quiz", de: "Quiz", it: "Quiz", es: "Quiz" },
  "nav.admin": { ro: "Admin", en: "Admin", fr: "Admin", de: "Admin", it: "Admin", es: "Admin" },
  "nav.lightMode": { ro: "Mod luminos", en: "Light mode", fr: "Mode clair", de: "Hellmodus", it: "Modalità chiara", es: "Modo claro" },
  "nav.darkMode": { ro: "Mod întunecat", en: "Dark mode", fr: "Mode sombre", de: "Dunkelmodus", it: "Modalità scura", es: "Modo oscuro" },

  // Home / Page
  "home.title": { ro: "Calculatoare Științifice", en: "Scientific Calculators", fr: "Calculatrices Scientifiques", de: "Wissenschaftliche Rechner", it: "Calcolatrici Scientifiche", es: "Calculadoras Científicas" },
  "home.subtitle": { ro: "instrumente • vizualizări interactive • formule detaliate", en: "tools • interactive visualizations • detailed formulas", fr: "outils • visualisations interactives • formules détaillées", de: "Werkzeuge • interaktive Visualisierungen • detaillierte Formeln", it: "strumenti • visualizzazioni interattive • formule dettagliate", es: "herramientas • visualizaciones interactivas • fórmulas detalladas" },
  "home.all": { ro: "Toate", en: "All", fr: "Toutes", de: "Alle", it: "Tutte", es: "Todas" },
  "home.search": { ro: "Caută calculator, formulă...", en: "Search calculator, formula...", fr: "Chercher calculatrice, formule...", de: "Rechner, Formel suchen...", it: "Cerca calcolatrice, formula...", es: "Buscar calculadora, fórmula..." },
  "home.results": { ro: "rezultate", en: "results", fr: "résultats", de: "Ergebnisse", it: "risultati", es: "resultados" },
  "home.result": { ro: "rezultat", en: "result", fr: "résultat", de: "Ergebnis", it: "risultato", es: "resultado" },
  "home.for": { ro: "pentru", en: "for", fr: "pour", de: "für", it: "per", es: "para" },
  "home.noResults": { ro: "Niciun calculator găsit pentru", en: "No calculator found for", fr: "Aucune calculatrice trouvée pour", de: "Kein Rechner gefunden für", it: "Nessuna calcolatrice trovata per", es: "No se encontró calculadora para" },

  // Index page
  "index.hero": { ro: "Calculatoare Online", en: "Online Calculators", fr: "Calculatrices en Ligne", de: "Online-Rechner", it: "Calcolatrici Online", es: "Calculadoras en Línea" },
  "index.heroDesc": { ro: "Instrumente gratuite pentru matematică, fizică, informatică și viața de zi cu zi — rapide, precise și ușor de folosit.", en: "Free tools for math, physics, computer science and everyday life — fast, accurate and easy to use.", fr: "Outils gratuits pour les mathématiques, la physique, l'informatique et la vie quotidienne — rapides, précis et faciles à utiliser.", de: "Kostenlose Werkzeuge für Mathematik, Physik, Informatik und den Alltag — schnell, präzise und einfach zu bedienen.", it: "Strumenti gratuiti per matematica, fisica, informatica e la vita quotidiana — veloci, precisi e facili da usare.", es: "Herramientas gratuitas para matemáticas, física, informática y la vida diaria — rápidas, precisas y fáciles de usar." },
  "index.catScience": { ro: "Matematică, Fizică & Informatică", en: "Math, Physics & Computer Science", fr: "Maths, Physique & Informatique", de: "Mathe, Physik & Informatik", it: "Matematica, Fisica & Informatica", es: "Matemáticas, Física e Informática" },
  "index.catScienceDesc": { ro: "Algebră, geometrie, trigonometrie, analiză, fizică, baze numerice — cu vizualizări interactive", en: "Algebra, geometry, trigonometry, analysis, physics, number bases — with interactive visualizations", fr: "Algèbre, géométrie, trigonométrie, analyse, physique, bases numériques — avec visualisations interactives", de: "Algebra, Geometrie, Trigonometrie, Analysis, Physik, Zahlensysteme — mit interaktiven Visualisierungen", it: "Algebra, geometria, trigonometria, analisi, fisica, basi numeriche — con visualizzazioni interattive", es: "Álgebra, geometría, trigonometría, análisis, física, bases numéricas — con visualizaciones interactivas" },
  "index.catHome": { ro: "Casă & Renovări", en: "Home & Renovations", fr: "Maison & Rénovations", de: "Haus & Renovierungen", it: "Casa & Ristrutturazioni", es: "Hogar & Renovaciones" },
  "index.catHomeDesc": { ro: "Suprafețe camere, vopsea, pardoseală — cu estimări avansate de cost", en: "Room surfaces, paint, flooring — with advanced cost estimates", fr: "Surfaces de pièces, peinture, parquet — avec estimations de coûts avancées", de: "Raumflächen, Farbe, Bodenbelag — mit erweiterten Kostenschätzungen", it: "Superfici stanze, vernice, pavimentazione — con stime di costo avanzate", es: "Superficies de habitaciones, pintura, pisos — con estimaciones de costos avanzadas" },
  "index.catHealth": { ro: "Sănătate", en: "Health", fr: "Santé", de: "Gesundheit", it: "Salute", es: "Salud" },
  "index.catHealthDesc": { ro: "IMC, calorii, hidratare, cost fumat — monitorizează-ți sănătatea", en: "BMI, calories, hydration, smoking cost — monitor your health", fr: "IMC, calories, hydratation, coût du tabac — surveillez votre santé", de: "BMI, Kalorien, Hydration, Rauchkosten — überwachen Sie Ihre Gesundheit", it: "IMC, calorie, idratazione, costo fumo — monitora la tua salute", es: "IMC, calorías, hidratación, costo de fumar — monitorea tu salud" },
  "index.calcCount": { ro: "calculatoare", en: "calculators", fr: "calculatrices", de: "Rechner", it: "calcolatrici", es: "calculadoras" },

  // Quiz
  "quiz.title": { ro: "Quiz Matematic", en: "Math Quiz", fr: "Quiz Mathématique", de: "Mathe-Quiz", it: "Quiz Matematico", es: "Quiz Matemático" },
  "quiz.start": { ro: "Începe Quiz", en: "Start Quiz", fr: "Commencer", de: "Quiz starten", it: "Inizia Quiz", es: "Iniciar Quiz" },
  "quiz.difficulty": { ro: "Dificultate", en: "Difficulty", fr: "Difficulté", de: "Schwierigkeit", it: "Difficoltà", es: "Dificultad" },
  "quiz.easy": { ro: "Ușor", en: "Easy", fr: "Facile", de: "Leicht", it: "Facile", es: "Fácil" },
  "quiz.medium": { ro: "Mediu", en: "Medium", fr: "Moyen", de: "Mittel", it: "Medio", es: "Medio" },
  "quiz.hard": { ro: "Greu", en: "Hard", fr: "Difficile", de: "Schwer", it: "Difficile", es: "Difícil" },
  "quiz.category": { ro: "Categorie", en: "Category", fr: "Catégorie", de: "Kategorie", it: "Categoria", es: "Categoría" },
  "quiz.allCategories": { ro: "Toate categoriile", en: "All categories", fr: "Toutes les catégories", de: "Alle Kategorien", it: "Tutte le categorie", es: "Todas las categorías" },
  "quiz.questions": { ro: "Număr întrebări", en: "Questions", fr: "Questions", de: "Fragen", it: "Domande", es: "Preguntas" },
  "quiz.question": { ro: "Întrebarea", en: "Question", fr: "Question", de: "Frage", it: "Domanda", es: "Pregunta" },
  "quiz.correct": { ro: "corecte", en: "correct", fr: "correctes", de: "richtig", it: "corrette", es: "correctas" },
  "quiz.check": { ro: "Verifică", en: "Check", fr: "Vérifier", de: "Prüfen", it: "Verifica", es: "Verificar" },
  "quiz.next": { ro: "Următoarea", en: "Next", fr: "Suivante", de: "Nächste", it: "Prossima", es: "Siguiente" },
  "quiz.seeResults": { ro: "Vezi rezultatele", en: "See results", fr: "Voir résultats", de: "Ergebnisse", it: "Vedi risultati", es: "Ver resultados" },
  "quiz.finished": { ro: "Quiz Terminat!", en: "Quiz Finished!", fr: "Quiz Terminé !", de: "Quiz Beendet!", it: "Quiz Terminato!", es: "¡Quiz Terminado!" },
  "quiz.perfect": { ro: "Perfect! 🎉", en: "Perfect! 🎉", fr: "Parfait ! 🎉", de: "Perfekt! 🎉", it: "Perfetto! 🎉", es: "¡Perfecto! 🎉" },
  "quiz.good": { ro: "Foarte bine! 💪", en: "Very good! 💪", fr: "Très bien ! 💪", de: "Sehr gut! 💪", it: "Molto bene! 💪", es: "¡Muy bien! 💪" },
  "quiz.practice": { ro: "Mai exersează! 📚", en: "Keep practicing! 📚", fr: "Continue ! 📚", de: "Weiter üben! 📚", it: "Continua! 📚", es: "¡Sigue practicando! 📚" },
  "quiz.saveName": { ro: "Numele tău...", en: "Your name...", fr: "Ton nom...", de: "Dein Name...", it: "Il tuo nome...", es: "Tu nombre..." },
  "quiz.save": { ro: "Salvează", en: "Save", fr: "Sauver", de: "Speichern", it: "Salva", es: "Guardar" },
  "quiz.saved": { ro: "✅ Scor salvat în clasament!", en: "✅ Score saved!", fr: "✅ Score sauvé !", de: "✅ Punktzahl gespeichert!", it: "✅ Punteggio salvato!", es: "✅ ¡Puntuación guardada!" },
  "quiz.share": { ro: "Distribuie:", en: "Share:", fr: "Partager :", de: "Teilen:", it: "Condividi:", es: "Compartir:" },
  "quiz.shareIg": { ro: "Instagram & TikTok: copiază textul și lipește-l în story/post", en: "Instagram & TikTok: copy & paste to story/post", fr: "Instagram & TikTok : copier-coller", de: "Instagram & TikTok: Text kopieren", it: "Instagram & TikTok: copia e incolla", es: "Instagram & TikTok: copia y pega" },
  "quiz.restart": { ro: "Reia", en: "Restart", fr: "Recommencer", de: "Neustart", it: "Ricomincia", es: "Reiniciar" },
  "quiz.close": { ro: "Închide", en: "Close", fr: "Fermer", de: "Schließen", it: "Chiudi", es: "Cerrar" },
  "quiz.correctAnswer": { ro: "Corect! 🎉", en: "Correct! 🎉", fr: "Correct ! 🎉", de: "Richtig! 🎉", it: "Corretto! 🎉", es: "¡Correcto! 🎉" },
  "quiz.wrongAnswer": { ro: "Greșit. Răspuns:", en: "Wrong. Answer:", fr: "Faux. Réponse :", de: "Falsch. Antwort:", it: "Sbagliato. Risposta:", es: "Incorrecto. Respuesta:" },
  "quiz.typeAnswer": { ro: "Introdu răspunsul...", en: "Type your answer...", fr: "Entrez la réponse...", de: "Antwort eingeben...", it: "Inserisci la risposta...", es: "Escribe la respuesta..." },
  "quiz.timeExpired": { ro: "(timp expirat)", en: "(time expired)", fr: "(temps écoulé)", de: "(Zeit abgelaufen)", it: "(tempo scaduto)", es: "(tiempo agotado)" },
  "quiz.noTimer": { ro: "Fără timp", en: "No timer", fr: "Sans chrono", de: "Ohne Timer", it: "Senza timer", es: "Sin cronómetro" },
  "quiz.3choices": { ro: "3 variante", en: "3 choices", fr: "3 choix", de: "3 Optionen", it: "3 opzioni", es: "3 opciones" },
  "quiz.6choices": { ro: "6 variante", en: "6 choices", fr: "6 choix", de: "6 Optionen", it: "6 opzioni", es: "6 opciones" },
  "quiz.freeText": { ro: "Liber", en: "Free text", fr: "Libre", de: "Freitext", it: "Libero", es: "Libre" },
  "quiz.scoreText": { ro: "Am obținut", en: "I scored", fr: "J'ai obtenu", de: "Ich habe erreicht", it: "Ho ottenuto", es: "Obtuve" },
  "quiz.atQuiz": { ro: "la Quiz-ul Matematic", en: "on the Math Quiz", fr: "au Quiz Mathématique", de: "beim Mathe-Quiz", it: "al Quiz Matematico", es: "en el Quiz Matemático" },

  // Leaderboard
  "lb.title": { ro: "🏆 Clasament", en: "🏆 Leaderboard", fr: "🏆 Classement", de: "🏆 Rangliste", it: "🏆 Classifica", es: "🏆 Clasificación" },
  "lb.noScores": { ro: "Niciun scor salvat încă.", en: "No scores saved yet.", fr: "Aucun score enregistré.", de: "Noch keine Punkte.", it: "Nessun punteggio salvato.", es: "Sin puntuaciones." },
  "lb.share": { ro: "Partajează:", en: "Share:", fr: "Partager :", de: "Teilen:", it: "Condividi:", es: "Compartir:" },
  "lb.clear": { ro: "Șterge clasament", en: "Clear leaderboard", fr: "Effacer classement", de: "Rangliste löschen", it: "Cancella classifica", es: "Borrar clasificación" },
  "lb.shareText": { ro: "Clasament MathLab Quiz", en: "MathLab Quiz Leaderboard", fr: "Classement Quiz MathLab", de: "MathLab Quiz Rangliste", it: "Classifica Quiz MathLab", es: "Clasificación Quiz MathLab" },

  // History
  "hist.title": { ro: "Istoric Calcule", en: "Calculation History", fr: "Historique des Calculs", de: "Berechnungsverlauf", it: "Cronologia Calcoli", es: "Historial de Cálculos" },
  "hist.empty": { ro: "Niciun calcul salvat.", en: "No calculations saved.", fr: "Aucun calcul sauvé.", de: "Keine Berechnungen.", it: "Nessun calcolo salvato.", es: "Sin cálculos guardados." },
  "hist.emptyHint": { ro: "Apasă Salvează din orice calculator.", en: "Press Save in any calculator.", fr: "Appuyez sur Sauver.", de: "Drücke Speichern.", it: "Premi Salva.", es: "Pulsa Guardar." },
  "hist.clearAll": { ro: "Șterge tot", en: "Clear all", fr: "Tout effacer", de: "Alles löschen", it: "Cancella tutto", es: "Borrar todo" },

  // Exam mode
  "exam.active": { ro: "🎓 Mod Examen activ — formulele și explicațiile sunt ascunse", en: "🎓 Exam Mode active — formulas and explanations are hidden", fr: "🎓 Mode Examen actif — formules et explications masquées", de: "🎓 Prüfungsmodus aktiv — Formeln und Erklärungen ausgeblendet", it: "🎓 Modalità Esame attiva — formule e spiegazioni nascoste", es: "🎓 Modo Examen activo — fórmulas y explicaciones ocultas" },
  "exam.disable": { ro: "Dezactivează", en: "Disable", fr: "Désactiver", de: "Deaktivieren", it: "Disattiva", es: "Desactivar" },

  // Footer
  "footer.text": { ro: "© 2026 MathLab — Calculatoare online gratuite", en: "© 2026 MathLab — Free online calculators", fr: "© 2026 MathLab — Calculatrices en ligne gratuites", de: "© 2026 MathLab — Kostenlose Online-Rechner", it: "© 2026 MathLab — Calcolatrici online gratuite", es: "© 2026 MathLab — Calculadoras en línea gratuitas" },

  // Calculator UI
  "calc.save": { ro: "Salvează", en: "Save", fr: "Sauver", de: "Speichern", it: "Salva", es: "Guardar" },
  "calc.pdf": { ro: "PDF", en: "PDF", fr: "PDF", de: "PDF", it: "PDF", es: "PDF" },
  "calc.link": { ro: "Link", en: "Link", fr: "Lien", de: "Link", it: "Link", es: "Enlace" },
  "calc.copied": { ro: "Copiat!", en: "Copied!", fr: "Copié !", de: "Kopiert!", it: "Copiato!", es: "¡Copiado!" },
  "calc.formulaBtn": { ro: "Formulă & explicație", en: "Formula & explanation", fr: "Formule & explication", de: "Formel & Erklärung", it: "Formula & spiegazione", es: "Fórmula & explicación" },
  "calc.hideFormula": { ro: "Ascunde", en: "Hide", fr: "Masquer", de: "Ausblenden", it: "Nascondi", es: "Ocultar" },
  "calc.viz2d": { ro: "Vizualizare 2D", en: "2D Visualization", fr: "Visualisation 2D", de: "2D-Visualisierung", it: "Visualizzazione 2D", es: "Visualización 2D" },
  "calc.viz3d": { ro: "Vizualizare 3D", en: "3D Visualization", fr: "Visualisation 3D", de: "3D-Visualisierung", it: "Visualizzazione 3D", es: "Visualización 3D" },
  "calc.hideViz": { ro: "Ascunde", en: "Hide", fr: "Masquer", de: "Ausblenden", it: "Nascondi", es: "Ocultar" },
};

const getLang = (): Lang => {
  if (typeof window === "undefined") return "ro";
  const stored = localStorage.getItem("mathlab-lang");
  if (stored && ["ro","en","fr","de","it","es"].includes(stored)) return stored as Lang;
  return "ro";
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  tCatName: (catId: string) => string;
  tCatDesc: (catId: string) => string;
  tCalcName: (calcId: string, fallback: string) => string;
  tCalcDesc: (calcId: string, fallback: string) => string;
  tLabel: (roText: string) => string;
  tInputLabel: (roText: string) => string;
}

const I18nContext = createContext<I18nCtx>({
  lang: "ro",
  setLang: () => {},
  t: (k) => k,
  tCatName: (id) => id,
  tCatDesc: (id) => id,
  tCalcName: (_, fb) => fb,
  tCalcDesc: (_, fb) => fb,
  tLabel: (t) => t,
  tInputLabel: (t) => t,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(getLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("mathlab-lang", l);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => UI[key]?.[lang] || UI[key]?.["ro"] || key;
  const tCatName = (catId: string): string => getCatName(catId, lang, catId);
  const tCatDesc = (catId: string): string => getCatDesc(catId, lang, "");
  const tCalcNameFn = (calcId: string, fallback: string): string => getCalcName(calcId, lang, fallback);
  const tCalcDescFn = (calcId: string, fallback: string): string => getCalcDesc(calcId, lang, fallback);
  const tLabelFn = (roText: string): string => translateLabel(roText, lang);
  const tInputLabelFn = (roText: string): string => translateInputLabel(roText, lang);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, tCatName, tCatDesc, tCalcName: tCalcNameFn, tCalcDesc: tCalcDescFn, tLabel: tLabelFn, tInputLabel: tInputLabelFn }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
