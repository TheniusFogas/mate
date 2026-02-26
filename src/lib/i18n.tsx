import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

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
  "nav.admin": { ro: "Admin", en: "Admin", fr: "Admin", de: "Admin", it: "Admin", es: "Admin" },
  "nav.lightMode": { ro: "Mod luminos", en: "Light mode", fr: "Mode clair", de: "Hellmodus", it: "Modalità chiara", es: "Modo claro" },
  "nav.darkMode": { ro: "Mod întunecat", en: "Dark mode", fr: "Mode sombre", de: "Dunkelmodus", it: "Modalità scura", es: "Modo oscuro" },

  // Home
  "home.title": { ro: "Calculatoare Matematică", en: "Math Calculators", fr: "Calculatrices Mathématiques", de: "Mathematik-Rechner", it: "Calcolatrici Matematiche", es: "Calculadoras Matemáticas" },
  "home.subtitle": { ro: "instrumente • vizualizări interactive • formule detaliate", en: "tools • interactive visualizations • detailed formulas", fr: "outils • visualisations interactives • formules détaillées", de: "Werkzeuge • interaktive Visualisierungen • detaillierte Formeln", it: "strumenti • visualizzazioni interattive • formule dettagliate", es: "herramientas • visualizaciones interactivas • fórmulas detalladas" },
  "home.all": { ro: "Toate", en: "All", fr: "Toutes", de: "Alle", it: "Tutte", es: "Todas" },
  "home.search": { ro: "Caută calculator, formulă...", en: "Search calculator, formula...", fr: "Chercher calculatrice, formule...", de: "Rechner, Formel suchen...", it: "Cerca calcolatrice, formula...", es: "Buscar calculadora, fórmula..." },
  "home.results": { ro: "rezultate", en: "results", fr: "résultats", de: "Ergebnisse", it: "risultati", es: "resultados" },
  "home.result": { ro: "rezultat", en: "result", fr: "résultat", de: "Ergebnis", it: "risultato", es: "resultado" },
  "home.for": { ro: "pentru", en: "for", fr: "pour", de: "für", it: "per", es: "para" },
  "home.noResults": { ro: "Niciun calculator găsit pentru", en: "No calculator found for", fr: "Aucune calculatrice trouvée pour", de: "Kein Rechner gefunden für", it: "Nessuna calcolatrice trovata per", es: "No se encontró calculadora para" },

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
  "footer.text": { ro: "© 2026 MathLab — Calculatoare matematică online gratuite", en: "© 2026 MathLab — Free online math calculators", fr: "© 2026 MathLab — Calculatrices mathématiques en ligne gratuites", de: "© 2026 MathLab — Kostenlose Online-Mathematikrechner", it: "© 2026 MathLab — Calcolatrici matematiche online gratuite", es: "© 2026 MathLab — Calculadoras matemáticas en línea gratuitas" },

  // Calculator UI
  "calc.save": { ro: "Salvează", en: "Save", fr: "Sauver", de: "Speichern", it: "Salva", es: "Guardar" },
  "calc.pdf": { ro: "PDF", en: "PDF", fr: "PDF", de: "PDF", it: "PDF", es: "PDF" },
  "calc.share": { ro: "Share", en: "Share", fr: "Partager", de: "Teilen", it: "Condividi", es: "Compartir" },
  "calc.formula": { ro: "Formulă", en: "Formula", fr: "Formule", de: "Formel", it: "Formula", es: "Fórmula" },
  "calc.explanation": { ro: "Explicație", en: "Explanation", fr: "Explication", de: "Erklärung", it: "Spiegazione", es: "Explicación" },
  "calc.copied": { ro: "Copiat!", en: "Copied!", fr: "Copié !", de: "Kopiert!", it: "Copiato!", es: "¡Copiado!" },

  // Categories
  "cat.aritmetica": { ro: "Aritmetică", en: "Arithmetic", fr: "Arithmétique", de: "Arithmetik", it: "Aritmetica", es: "Aritmética" },
  "cat.algebra": { ro: "Algebră", en: "Algebra", fr: "Algèbre", de: "Algebra", it: "Algebra", es: "Álgebra" },
  "cat.geometrie2d": { ro: "Geometrie 2D", en: "2D Geometry", fr: "Géométrie 2D", de: "2D-Geometrie", it: "Geometria 2D", es: "Geometría 2D" },
  "cat.geometrie3d": { ro: "Geometrie 3D", en: "3D Geometry", fr: "Géométrie 3D", de: "3D-Geometrie", it: "Geometria 3D", es: "Geometría 3D" },
  "cat.trigonometrie": { ro: "Trigonometrie", en: "Trigonometry", fr: "Trigonométrie", de: "Trigonometrie", it: "Trigonometria", es: "Trigonometría" },
  "cat.analiza": { ro: "Analiză", en: "Analysis", fr: "Analyse", de: "Analysis", it: "Analisi", es: "Análisis" },
  "cat.combinatorica": { ro: "Combinatorică & Statistică", en: "Combinatorics & Statistics", fr: "Combinatoire & Statistiques", de: "Kombinatorik & Statistik", it: "Combinatoria & Statistica", es: "Combinatoria & Estadística" },
  "cat.conversii": { ro: "Conversii", en: "Conversions", fr: "Conversions", de: "Umrechnungen", it: "Conversioni", es: "Conversiones" },
  "cat.informatica": { ro: "Informatică", en: "Computer Science", fr: "Informatique", de: "Informatik", it: "Informatica", es: "Informática" },
  "cat.fizica": { ro: "Fizică", en: "Physics", fr: "Physique", de: "Physik", it: "Fisica", es: "Física" },
};

// Category description translations
const CAT_DESC: Record<string, Record<Lang, string>> = {
  "aritmetica": { ro: "Operații fundamentale, procente, fracții, factorizare", en: "Basic operations, percentages, fractions, factorization", fr: "Opérations fondamentales, pourcentages, fractions", de: "Grundoperationen, Prozente, Brüche, Faktorisierung", it: "Operazioni fondamentali, percentuali, frazioni", es: "Operaciones fundamentales, porcentajes, fracciones" },
  "algebra": { ro: "Ecuații, sisteme, progresii, logaritmi", en: "Equations, systems, progressions, logarithms", fr: "Équations, systèmes, progressions, logarithmes", de: "Gleichungen, Systeme, Progressionen, Logarithmen", it: "Equazioni, sistemi, progressioni, logaritmi", es: "Ecuaciones, sistemas, progresiones, logaritmos" },
  "geometrie2d": { ro: "Arii, perimetre, poligoane, cerc", en: "Areas, perimeters, polygons, circle", fr: "Aires, périmètres, polygones, cercle", de: "Flächen, Umfänge, Polygone, Kreis", it: "Aree, perimetri, poligoni, cerchio", es: "Áreas, perímetros, polígonos, círculo" },
  "geometrie3d": { ro: "Volume, suprafețe, corpuri geometrice", en: "Volumes, surfaces, geometric solids", fr: "Volumes, surfaces, solides géométriques", de: "Volumen, Oberflächen, geometrische Körper", it: "Volumi, superfici, solidi geometrici", es: "Volúmenes, superficies, sólidos geométricos" },
  "trigonometrie": { ro: "Funcții trigonometrice, identități, triunghi", en: "Trigonometric functions, identities, triangle", fr: "Fonctions trigonométriques, identités, triangle", de: "Trigonometrische Funktionen, Identitäten, Dreieck", it: "Funzioni trigonometriche, identità, triangolo", es: "Funciones trigonométricas, identidades, triángulo" },
  "analiza": { ro: "Limite, derivate, integrale", en: "Limits, derivatives, integrals", fr: "Limites, dérivées, intégrales", de: "Grenzwerte, Ableitungen, Integrale", it: "Limiti, derivate, integrali", es: "Límites, derivadas, integrales" },
  "combinatorica": { ro: "Permutări, combinări, medie, mediană, dispersie", en: "Permutations, combinations, mean, median, variance", fr: "Permutations, combinaisons, moyenne, médiane", de: "Permutationen, Kombinationen, Mittelwert, Median", it: "Permutazioni, combinazioni, media, mediana", es: "Permutaciones, combinaciones, media, mediana" },
  "conversii": { ro: "Unități de măsură, baze numerice, temperatură", en: "Units of measurement, number bases, temperature", fr: "Unités de mesure, bases numériques, température", de: "Maßeinheiten, Zahlensysteme, Temperatur", it: "Unità di misura, basi numeriche, temperatura", es: "Unidades de medida, bases numéricas, temperatura" },
  "informatica": { ro: "Baze numerice, logică booleană, complexitate algoritmică", en: "Number bases, boolean logic, algorithmic complexity", fr: "Bases numériques, logique booléenne, complexité algorithmique", de: "Zahlensysteme, Boolesche Logik, algorithmische Komplexität", it: "Basi numeriche, logica booleana, complessità algoritmica", es: "Bases numéricas, lógica booleana, complejidad algorítmica" },
  "fizica": { ro: "Cinematică, forțe, energie, electricitate", en: "Kinematics, forces, energy, electricity", fr: "Cinématique, forces, énergie, électricité", de: "Kinematik, Kräfte, Energie, Elektrizität", it: "Cinematica, forze, energia, elettricità", es: "Cinemática, fuerzas, energía, electricidad" },
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
}

const I18nContext = createContext<I18nCtx>({
  lang: "ro",
  setLang: () => {},
  t: (k) => k,
  tCatName: (id) => id,
  tCatDesc: (id) => id,
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
  const tCatName = (catId: string): string => {
    const key = `cat.${catId}`;
    return UI[key]?.[lang] || UI[key]?.["ro"] || catId;
  };
  const tCatDesc = (catId: string): string => CAT_DESC[catId]?.[lang] || CAT_DESC[catId]?.["ro"] || "";

  return (
    <I18nContext.Provider value={{ lang, setLang, t, tCatName, tCatDesc }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
