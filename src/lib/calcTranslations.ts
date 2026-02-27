import type { Lang } from "./i18n";

// ══════════════════════════════════════════════════
// COMPLETE CALCULATOR TRANSLATIONS (all 6 languages)
// ══════════════════════════════════════════════════

type T5 = Record<Exclude<Lang, "ro">, string>;

// Calculator name translations (Romanian is the fallback from mathCalcs.ts)
const CALC_NAMES: Record<string, T5> = {
  // Aritmetică
  procente: { en: "Percentage Calculator", fr: "Calcul de Pourcentage", de: "Prozentrechner", it: "Calcolo Percentuali", es: "Cálculo de Porcentajes" },
  proportii: { en: "Rule of Three", fr: "Règle de Trois", de: "Dreisatz", it: "Regola del Tre", es: "Regla de Tres" },
  cmmdc: { en: "GCD & LCM", fr: "PGCD & PPCM", de: "GGT & KGV", it: "MCD & MCM", es: "MCD & MCM" },
  medii: { en: "Means (Am, Gm, Hm)", fr: "Moyennes (Ma, Mg, Mh)", de: "Mittelwerte (Am, Gm, Hm)", it: "Medie (Ma, Mg, Mh)", es: "Medias (Ma, Mg, Mh)" },
  fractii: { en: "Fraction Operations", fr: "Opérations sur Fractions", de: "Bruchrechnung", it: "Operazioni con Frazioni", es: "Operaciones con Fracciones" },
  puteri: { en: "Powers & Radicals", fr: "Puissances & Radicaux", de: "Potenzen & Wurzeln", it: "Potenze e Radicali", es: "Potencias y Radicales" },
  factorizare: { en: "Prime Factorization", fr: "Factorisation Première", de: "Primfaktorzerlegung", it: "Fattorizzazione in Primi", es: "Factorización Prima" },
  numar_prim: { en: "Prime Number Check", fr: "Vérification Nombre Premier", de: "Primzahlprüfung", it: "Verifica Numero Primo", es: "Verificar Número Primo" },
  rotunjiri: { en: "Rounding", fr: "Arrondis", de: "Rundungen", it: "Arrotondamenti", es: "Redondeos" },
  operatii_baza: { en: "Basic Operations", fr: "Opérations de Base", de: "Grundrechenarten", it: "Operazioni di Base", es: "Operaciones Básicas" },
  suma_cifre: { en: "Digit Sum", fr: "Somme des Chiffres", de: "Quersumme", it: "Somma delle Cifre", es: "Suma de Dígitos" },

  // Algebră
  ec_grad1: { en: "Linear Equation", fr: "Équation Degré 1", de: "Lineare Gleichung", it: "Equazione di 1° Grado", es: "Ecuación de Grado 1" },
  ec_grad2: { en: "Quadratic Equation", fr: "Équation Degré 2", de: "Quadratische Gleichung", it: "Equazione di 2° Grado", es: "Ecuación de Grado 2" },
  ec_grad3: { en: "Cubic Equation (Cardano)", fr: "Équation Degré 3 (Cardano)", de: "Kubische Gleichung (Cardano)", it: "Equazione di 3° Grado (Cardano)", es: "Ecuación de Grado 3 (Cardano)" },
  sisteme_2x2: { en: "2×2 System (Cramer)", fr: "Système 2×2 (Cramer)", de: "2×2-System (Cramer)", it: "Sistema 2×2 (Cramer)", es: "Sistema 2×2 (Cramer)" },
  sisteme_3x3: { en: "3×3 System (Cramer)", fr: "Système 3×3 (Cramer)", de: "3×3-System (Cramer)", it: "Sistema 3×3 (Cramer)", es: "Sistema 3×3 (Cramer)" },
  progresie_a: { en: "Arithmetic Progression", fr: "Progression Arithmétique", de: "Arithmetische Folge", it: "Progressione Aritmetica", es: "Progresión Aritmética" },
  progresie_g: { en: "Geometric Progression", fr: "Progression Géométrique", de: "Geometrische Folge", it: "Progressione Geometrica", es: "Progresión Geométrica" },
  logaritmi: { en: "Logarithms", fr: "Logarithmes", de: "Logarithmen", it: "Logaritmi", es: "Logaritmos" },
  nr_complexe: { en: "Complex Numbers", fr: "Nombres Complexes", de: "Komplexe Zahlen", it: "Numeri Complessi", es: "Números Complejos" },
  inecuatie_g1: { en: "Linear Inequality", fr: "Inéquation Degré 1", de: "Lineare Ungleichung", it: "Disequazione di 1° Grado", es: "Inecuación de Grado 1" },
  inecuatie_g2: { en: "Quadratic Inequality", fr: "Inéquation Degré 2", de: "Quadratische Ungleichung", it: "Disequazione di 2° Grado", es: "Inecuación de Grado 2" },
  polinom_eval: { en: "Polynomial Evaluation (Degree 3)", fr: "Évaluation Polynôme (Degré 3)", de: "Polynomauswertung (Grad 3)", it: "Valutazione Polinomio (Grado 3)", es: "Evaluación Polinomio (Grado 3)" },
  valoare_abs: { en: "Absolute Value Equation", fr: "Équation avec Module", de: "Betragsgleichung", it: "Equazione con Modulo", es: "Ecuación con Valor Absoluto" },
  ec_exponentiala: { en: "Exponential Equation", fr: "Équation Exponentielle", de: "Exponentialgleichung", it: "Equazione Esponenziale", es: "Ecuación Exponencial" },
  dobanda_compusa: { en: "Compound Interest", fr: "Intérêts Composés", de: "Zinseszins", it: "Interesse Composto", es: "Interés Compuesto" },
  ec_biquadratica: { en: "Biquadratic Equation", fr: "Équation Biquadratique", de: "Biquadratische Gleichung", it: "Equazione Biquadratica", es: "Ecuación Bicuadrática" },
  ec_irationala: { en: "Irrational Equation", fr: "Équation Irrationnelle", de: "Irrationale Gleichung", it: "Equazione Irrazionale", es: "Ecuación Irracional" },

  // Geometrie Plană
  triunghi: { en: "Triangle (Heron)", fr: "Triangle (Héron)", de: "Dreieck (Heron)", it: "Triangolo (Erone)", es: "Triángulo (Herón)" },
  dreptunghi: { en: "Rectangle", fr: "Rectangle", de: "Rechteck", it: "Rettangolo", es: "Rectángulo" },
  cerc: { en: "Circle", fr: "Cercle", de: "Kreis", it: "Cerchio", es: "Círculo" },
  trapez: { en: "Trapezoid", fr: "Trapèze", de: "Trapez", it: "Trapezio", es: "Trapecio" },
  paralelogram: { en: "Parallelogram", fr: "Parallélogramme", de: "Parallelogramm", it: "Parallelogramma", es: "Paralelogramo" },
  romb: { en: "Rhombus", fr: "Losange", de: "Raute", it: "Rombo", es: "Rombo" },
  hexagon: { en: "Regular Hexagon", fr: "Hexagone Régulier", de: "Regelmäßiges Sechseck", it: "Esagono Regolare", es: "Hexágono Regular" },
  pentagon: { en: "Regular Pentagon", fr: "Pentagone Régulier", de: "Regelmäßiges Fünfeck", it: "Pentagono Regolare", es: "Pentágono Regular" },
  pitagora: { en: "Pythagorean Theorem", fr: "Théorème de Pythagore", de: "Satz des Pythagoras", it: "Teorema di Pitagora", es: "Teorema de Pitágoras" },
  elipsa: { en: "Ellipse", fr: "Ellipse", de: "Ellipse", it: "Ellisse", es: "Elipse" },
  dist_puncte: { en: "Distance Between Points", fr: "Distance entre Points", de: "Abstand zwischen Punkten", it: "Distanza tra Punti", es: "Distancia entre Puntos" },
  ec_dreapta: { en: "Line Equation", fr: "Équation de la Droite", de: "Geradengleichung", it: "Equazione della Retta", es: "Ecuación de la Recta" },
  t_cosinusurilor: { en: "Law of Cosines", fr: "Théorème du Cosinus", de: "Kosinussatz", it: "Teorema del Coseno", es: "Teorema del Coseno" },
  vectori_2d: { en: "2D Vectors", fr: "Vecteurs 2D", de: "2D-Vektoren", it: "Vettori 2D", es: "Vectores 2D" },
  dist_punct_dreapta: { en: "Point-Line Distance", fr: "Distance Point-Droite", de: "Punkt-Gerade-Abstand", it: "Distanza Punto-Retta", es: "Distancia Punto-Recta" },
  poligon_reg: { en: "Regular Polygon", fr: "Polygone Régulier", de: "Regelmäßiges Polygon", it: "Poligono Regolare", es: "Polígono Regular" },

  // Geometrie Spațiu
  cub: { en: "Cube", fr: "Cube", de: "Würfel", it: "Cubo", es: "Cubo" },
  paralelipiped: { en: "Rectangular Prism", fr: "Parallélépipède", de: "Quader", it: "Parallelepipedo", es: "Paralelepípedo" },
  sfera: { en: "Sphere", fr: "Sphère", de: "Kugel", it: "Sfera", es: "Esfera" },
  cilindru: { en: "Cylinder", fr: "Cylindre", de: "Zylinder", it: "Cilindro", es: "Cilindro" },
  con: { en: "Cone", fr: "Cône", de: "Kegel", it: "Cono", es: "Cono" },
  piramida: { en: "Pyramid", fr: "Pyramide", de: "Pyramide", it: "Piramide", es: "Pirámide" },
  trunchi_con: { en: "Frustum (Truncated Cone)", fr: "Tronc de Cône", de: "Kegelstumpf", it: "Tronco di Cono", es: "Tronco de Cono" },
  prisma: { en: "Triangular Prism", fr: "Prisme Triangulaire", de: "Dreieckiges Prisma", it: "Prisma Triangolare", es: "Prisma Triangular" },
  tetraedru: { en: "Regular Tetrahedron", fr: "Tétraèdre Régulier", de: "Regelmäßiger Tetraeder", it: "Tetraedro Regolare", es: "Tetraedro Regular" },
  tor: { en: "Torus (Donut)", fr: "Tore (Donut)", de: "Torus (Donut)", it: "Toro (Ciambella)", es: "Toro (Dona)" },

  // Trigonometrie
  functii_trig: { en: "Trigonometric Functions", fr: "Fonctions Trigonométriques", de: "Trigonometrische Funktionen", it: "Funzioni Trigonometriche", es: "Funciones Trigonométricas" },
  grade_rad: { en: "Degrees ↔ Radians", fr: "Degrés ↔ Radians", de: "Grad ↔ Bogenmaß", it: "Gradi ↔ Radianti", es: "Grados ↔ Radianes" },
  formule_adunare: { en: "Addition Formulas", fr: "Formules d'Addition", de: "Additionstheoreme", it: "Formule di Addizione", es: "Fórmulas de Adición" },
  formule_duplicare: { en: "Double Angle Formulas", fr: "Formules de Duplication", de: "Doppelwinkelformeln", it: "Formule di Duplicazione", es: "Fórmulas de Duplicación" },
  arc_functii: { en: "Inverse Functions (arcsin)", fr: "Fonctions Inverses (arcsin)", de: "Umkehrfunktionen (arcsin)", it: "Funzioni Inverse (arcsin)", es: "Funciones Inversas (arcsin)" },
  triunghi_oarecare: { en: "General Triangle", fr: "Triangle Quelconque", de: "Allgemeines Dreieck", it: "Triangolo Qualsiasi", es: "Triángulo General" },
  identitati_trig: { en: "Trigonometric Identities", fr: "Identités Trigonométriques", de: "Trigonometrische Identitäten", it: "Identità Trigonometriche", es: "Identidades Trigonométricas" },
  ec_trig: { en: "Trigonometric Equations", fr: "Équations Trigonométriques", de: "Trigonometrische Gleichungen", it: "Equazioni Trigonometriche", es: "Ecuaciones Trigonométricas" },

  // Analiză
  derivata_xn: { en: "Derivative of xⁿ", fr: "Dérivée de xⁿ", de: "Ableitung von xⁿ", it: "Derivata di xⁿ", es: "Derivada de xⁿ" },
  integrala_xn: { en: "Integral of xⁿ", fr: "Intégrale de xⁿ", de: "Integral von xⁿ", it: "Integrale di xⁿ", es: "Integral de xⁿ" },
  ec_tangentei: { en: "Tangent Line Equation", fr: "Équation de la Tangente", de: "Tangentengleichung", it: "Equazione della Tangente", es: "Ecuación de la Tangente" },
  limita: { en: "Polynomial Ratio Limit", fr: "Limite Rapport Polynômes", de: "Grenzwert Polynomquotient", it: "Limite Rapporto Polinomi", es: "Límite Cociente Polinomios" },
  arie_curba: { en: "Area Under Curve", fr: "Aire sous la Courbe", de: "Fläche unter der Kurve", it: "Area sotto la Curva", es: "Área bajo la Curva" },
  rata_variatie: { en: "Average Rate of Change", fr: "Taux Moyen de Variation", de: "Mittlere Änderungsrate", it: "Tasso Medio di Variazione", es: "Tasa Media de Variación" },
  monotonie: { en: "Function Monotonicity", fr: "Monotonie de Fonction", de: "Monotonie der Funktion", it: "Monotonia della Funzione", es: "Monotonía de la Función" },
  serie_taylor: { en: "Taylor Approximation", fr: "Approximation de Taylor", de: "Taylor-Approximation", it: "Approssimazione di Taylor", es: "Aproximación de Taylor" },

  // Combinatorică
  permutari: { en: "Permutations", fr: "Permutations", de: "Permutationen", it: "Permutazioni", es: "Permutaciones" },
  aranjamente: { en: "Arrangements", fr: "Arrangements", de: "Variationen", it: "Disposizioni", es: "Variaciones" },
  combinari: { en: "Combinations", fr: "Combinaisons", de: "Kombinationen", it: "Combinazioni", es: "Combinaciones" },
  binom_newton: { en: "Newton's Binomial", fr: "Binôme de Newton", de: "Binomischer Lehrsatz", it: "Binomio di Newton", es: "Binomio de Newton" },
  probabilitate: { en: "Classical Probability", fr: "Probabilité Classique", de: "Klassische Wahrscheinlichkeit", it: "Probabilità Classica", es: "Probabilidad Clásica" },
  incluziune: { en: "Inclusion-Exclusion", fr: "Inclusion-Exclusion", de: "Inklusion-Exklusion", it: "Inclusione-Esclusione", es: "Inclusión-Exclusión" },
  distributie_binomiala: { en: "Binomial Distribution", fr: "Distribution Binomiale", de: "Binomialverteilung", it: "Distribuzione Binomiale", es: "Distribución Binomial" },
  distributie_poisson: { en: "Poisson Distribution", fr: "Distribution de Poisson", de: "Poisson-Verteilung", it: "Distribuzione di Poisson", es: "Distribución de Poisson" },
  principiu_numarare: { en: "Counting Principles", fr: "Principes de Dénombrement", de: "Zählprinzipien", it: "Principi di Conteggio", es: "Principios de Conteo" },

  // Matrice
  det_2x2: { en: "2×2 Determinant", fr: "Déterminant 2×2", de: "2×2-Determinante", it: "Determinante 2×2", es: "Determinante 2×2" },
  det_3x3: { en: "3×3 Determinant (Sarrus)", fr: "Déterminant 3×3 (Sarrus)", de: "3×3-Determinante (Sarrus)", it: "Determinante 3×3 (Sarrus)", es: "Determinante 3×3 (Sarrus)" },
  inversa_2x2: { en: "2×2 Inverse", fr: "Inverse 2×2", de: "2×2-Inverse", it: "Inversa 2×2", es: "Inversa 2×2" },
  transpusa: { en: "Transpose", fr: "Transposée", de: "Transponierte", it: "Trasposta", es: "Transpuesta" },
  inmultire_mat: { en: "Matrix Multiplication 2×2", fr: "Multiplication Matricielle 2×2", de: "Matrizenmultiplikation 2×2", it: "Moltiplicazione Matrici 2×2", es: "Multiplicación de Matrices 2×2" },

  // Teoria Numerelor
  fibonacci: { en: "Fibonacci", fr: "Fibonacci", de: "Fibonacci", it: "Fibonacci", es: "Fibonacci" },
  euler_totient: { en: "Euler's Totient φ(n)", fr: "Indicatrice d'Euler φ(n)", de: "Eulersche φ-Funktion", it: "Funzione φ di Eulero", es: "Función φ de Euler" },
  conv_baze: { en: "Base Conversion", fr: "Conversion de Bases", de: "Basisumrechnung", it: "Conversione di Base", es: "Conversión de Base" },
  modular: { en: "Modular Arithmetic", fr: "Arithmétique Modulaire", de: "Modulare Arithmetik", it: "Aritmetica Modulare", es: "Aritmética Modular" },
  nr_perfecte: { en: "Perfect Numbers", fr: "Nombres Parfaits", de: "Vollkommene Zahlen", it: "Numeri Perfetti", es: "Números Perfectos" },
  nr_aur: { en: "Golden Ratio", fr: "Nombre d'Or", de: "Goldener Schnitt", it: "Sezione Aurea", es: "Proporción Áurea" },
  catalan: { en: "Catalan Numbers", fr: "Nombres de Catalan", de: "Catalan-Zahlen", it: "Numeri di Catalan", es: "Números de Catalan" },
  ecuatii_diofantine: { en: "Diophantine Equations", fr: "Équations Diophantiennes", de: "Diophantische Gleichungen", it: "Equazioni Diofantee", es: "Ecuaciones Diofánticas" },

  // Statistică
  medie_ponderata: { en: "Weighted Average", fr: "Moyenne Pondérée", de: "Gewichteter Mittelwert", it: "Media Ponderata", es: "Media Ponderada" },
  varianta_dev: { en: "Variance & Std Dev", fr: "Variance & Écart-Type", de: "Varianz & Standardabweichung", it: "Varianza & Dev. Std", es: "Varianza & Desv. Estándar" },
  coef_variatie: { en: "Coefficient of Variation", fr: "Coefficient de Variation", de: "Variationskoeffizient", it: "Coefficiente di Variazione", es: "Coeficiente de Variación" },
  regresie: { en: "Linear Regression", fr: "Régression Linéaire", de: "Lineare Regression", it: "Regressione Lineare", es: "Regresión Lineal" },
  mediana_mod: { en: "Median & Mode", fr: "Médiane & Mode", de: "Median & Modus", it: "Mediana & Moda", es: "Mediana & Moda" },
  distributie_normala: { en: "Normal Distribution (Z)", fr: "Distribution Normale (Z)", de: "Normalverteilung (Z)", it: "Distribuzione Normale (Z)", es: "Distribución Normal (Z)" },
  test_t: { en: "Student's t-Test", fr: "Test t de Student", de: "Student-t-Test", it: "Test t di Student", es: "Prueba t de Student" },
  chi_patrat: { en: "Chi-Square Test (χ²)", fr: "Test du Chi-Deux (χ²)", de: "Chi-Quadrat-Test (χ²)", it: "Test Chi-Quadro (χ²)", es: "Prueba Chi-Cuadrado (χ²)" },

  // Metode Numerice
  newton_raphson: { en: "Newton-Raphson", fr: "Newton-Raphson", de: "Newton-Raphson", it: "Newton-Raphson", es: "Newton-Raphson" },
  interpolation: { en: "Linear Interpolation", fr: "Interpolation Linéaire", de: "Lineare Interpolation", it: "Interpolazione Lineare", es: "Interpolación Lineal" },
  euler_ode: { en: "Differential Equation (Euler)", fr: "Équation Différentielle (Euler)", de: "Differentialgleichung (Euler)", it: "Equazione Differenziale (Eulero)", es: "Ecuación Diferencial (Euler)" },
  trapez_integrare: { en: "Numerical Integration (Trapezoid)", fr: "Intégration Numérique (Trapèze)", de: "Numerische Integration (Trapez)", it: "Integrazione Numerica (Trapezi)", es: "Integración Numérica (Trapecios)" },

  // Interpolare
  lagrange: { en: "Lagrange Interpolation", fr: "Interpolation de Lagrange", de: "Lagrange-Interpolation", it: "Interpolazione di Lagrange", es: "Interpolación de Lagrange" },

  // Conversii
  temperatura: { en: "Temperature", fr: "Température", de: "Temperatur", it: "Temperatura", es: "Temperatura" },
  lungime: { en: "Length Units", fr: "Unités de Longueur", de: "Längeneinheiten", it: "Unità di Lunghezza", es: "Unidades de Longitud" },
  arie_conv: { en: "Area Units", fr: "Unités de Surface", de: "Flächeneinheiten", it: "Unità di Area", es: "Unidades de Área" },
  volum_conv: { en: "Volume Units", fr: "Unités de Volume", de: "Volumeneinheiten", it: "Unità di Volume", es: "Unidades de Volumen" },
  greutate: { en: "Weight Units", fr: "Unités de Poids", de: "Gewichtseinheiten", it: "Unità di Peso", es: "Unidades de Peso" },
  viteza: { en: "Speed Units", fr: "Unités de Vitesse", de: "Geschwindigkeitseinheiten", it: "Unità di Velocità", es: "Unidades de Velocidad" },

  // Informatică
  binar_dec: { en: "Binary → Decimal", fr: "Binaire → Décimal", de: "Binär → Dezimal", it: "Binario → Decimale", es: "Binario → Decimal" },
  dec_binar: { en: "Decimal → Binary", fr: "Décimal → Binaire", de: "Dezimal → Binär", it: "Decimale → Binario", es: "Decimal → Binario" },
  ascii_conv: { en: "ASCII / Unicode", fr: "ASCII / Unicode", de: "ASCII / Unicode", it: "ASCII / Unicode", es: "ASCII / Unicode" },
  boolean_calc: { en: "Logic Gates", fr: "Portes Logiques", de: "Logikgatter", it: "Porte Logiche", es: "Puertas Lógicas" },
  complexitate: { en: "Algorithmic Complexity", fr: "Complexité Algorithmique", de: "Algorithmische Komplexität", it: "Complessità Algoritmica", es: "Complejidad Algorítmica" },
  storage_conv: { en: "Storage Units", fr: "Unités de Stockage", de: "Speichereinheiten", it: "Unità di Archiviazione", es: "Unidades de Almacenamiento" },
  ip_subnet: { en: "IP Subnetting", fr: "Sous-Réseau IP", de: "IP-Subnetting", it: "Subnetting IP", es: "Subnetting IP" },
  hash_check: { en: "Checksum", fr: "Somme de Contrôle", de: "Prüfsumme", it: "Checksum", es: "Checksum" },

  // Fizică
  mrua: { en: "Uniform Accelerated Motion", fr: "Mouvement Rectiligne Uniformément Accéléré", de: "Gleichmäßig beschleunigte Bewegung", it: "Moto Rettilineo Uniformemente Accelerato", es: "Movimiento Rectilíneo Uniformemente Acelerado" },
  forta_newton: { en: "Newton's Second Law", fr: "Deuxième Loi de Newton", de: "Zweites Newtonsches Gesetz", it: "Seconda Legge di Newton", es: "Segunda Ley de Newton" },
  energie_cinetica: { en: "Kinetic & Potential Energy", fr: "Énergie Cinétique & Potentielle", de: "Kinetische & Potentielle Energie", it: "Energia Cinetica & Potenziale", es: "Energía Cinética & Potencial" },
  legea_ohm: { en: "Ohm's Law", fr: "Loi d'Ohm", de: "Ohmsches Gesetz", it: "Legge di Ohm", es: "Ley de Ohm" },
  cadere_libera: { en: "Free Fall", fr: "Chute Libre", de: "Freier Fall", it: "Caduta Libera", es: "Caída Libre" },
  lucru_mecanic: { en: "Work & Power", fr: "Travail & Puissance", de: "Arbeit & Leistung", it: "Lavoro & Potenza", es: "Trabajo & Potencia" },
  densitate: { en: "Density", fr: "Densité", de: "Dichte", it: "Densità", es: "Densidad" },
  presiune: { en: "Pressure", fr: "Pression", de: "Druck", it: "Pressione", es: "Presión" },
};

// Calculator description translations
const CALC_DESCS: Record<string, T5> = {
  procente: { en: "Calculate percentage of a number", fr: "Calcule le pourcentage d'un nombre", de: "Prozent einer Zahl berechnen", it: "Calcola la percentuale di un numero", es: "Calcula el porcentaje de un número" },
  proportii: { en: "If A→B, then C→?", fr: "Si A→B, alors C→?", de: "Wenn A→B, dann C→?", it: "Se A→B, allora C→?", es: "Si A→B, entonces C→?" },
  cmmdc: { en: "Greatest common divisor & least common multiple", fr: "Plus grand div. commun & plus petit multiple commun", de: "Größter gemeinsamer Teiler & kleinstes gem. Vielfaches", it: "Massimo comun div. & minimo comune multiplo", es: "Máximo común divisor & mínimo común múltiplo" },
  medii: { en: "Arithmetic, geometric, harmonic mean", fr: "Moyenne arithmétique, géométrique, harmonique", de: "Arithmetisches, geometrisches, harmonisches Mittel", it: "Media aritmetica, geometrica, armonica", es: "Media aritmética, geométrica, armónica" },
  fractii: { en: "Addition, subtraction, multiplication, division", fr: "Addition, soustraction, multiplication, division", de: "Addition, Subtraktion, Multiplikation, Division", it: "Addizione, sottrazione, moltiplicazione, divisione", es: "Suma, resta, multiplicación, división" },
  puteri: { en: "aⁿ and nth root", fr: "aⁿ et racine d'ordre n", de: "aⁿ und n-te Wurzel", it: "aⁿ e radice di ordine n", es: "aⁿ y raíz de orden n" },
  factorizare: { en: "Decomposition into prime factors", fr: "Décomposition en facteurs premiers", de: "Zerlegung in Primfaktoren", it: "Scomposizione in fattori primi", es: "Descomposición en factores primos" },
  numar_prim: { en: "Check if a number is prime", fr: "Vérifie si un nombre est premier", de: "Prüfe ob eine Zahl prim ist", it: "Verifica se un numero è primo", es: "Verifica si un número es primo" },
  rotunjiri: { en: "Floor, ceil, round, truncation", fr: "Plancher, plafond, arrondi, troncature", de: "Abrunden, Aufrunden, Runden, Abschneiden", it: "Floor, ceil, round, troncamento", es: "Floor, ceil, round, truncamiento" },
  operatii_baza: { en: "Addition, subtraction, multiplication, division", fr: "Addition, soustraction, multiplication, division", de: "Addition, Subtraktion, Multiplikation, Division", it: "Addizione, sottrazione, moltiplicazione, divisione", es: "Suma, resta, multiplicación, división" },
  suma_cifre: { en: "Sum and product of digits", fr: "Somme et produit des chiffres", de: "Quersumme und Querprodukt", it: "Somma e prodotto delle cifre", es: "Suma y producto de dígitos" },
  ec_grad1: { en: "ax + b = 0", fr: "ax + b = 0", de: "ax + b = 0", it: "ax + b = 0", es: "ax + b = 0" },
  ec_grad2: { en: "ax² + bx + c = 0", fr: "ax² + bx + c = 0", de: "ax² + bx + c = 0", it: "ax² + bx + c = 0", es: "ax² + bx + c = 0" },
  ec_grad3: { en: "x³ + px + q = 0 (reduced form)", fr: "x³ + px + q = 0 (forme réduite)", de: "x³ + px + q = 0 (reduzierte Form)", it: "x³ + px + q = 0 (forma ridotta)", es: "x³ + px + q = 0 (forma reducida)" },
  sisteme_2x2: { en: "ax+by=e, cx+dy=f", fr: "ax+by=e, cx+dy=f", de: "ax+by=e, cx+dy=f", it: "ax+by=e, cx+dy=f", es: "ax+by=e, cx+dy=f" },
  sisteme_3x3: { en: "3 equations with 3 unknowns", fr: "3 équations à 3 inconnues", de: "3 Gleichungen mit 3 Unbekannten", it: "3 equazioni con 3 incognite", es: "3 ecuaciones con 3 incógnitas" },
  progresie_a: { en: "General term and sum", fr: "Terme général et somme", de: "Allgemeines Glied und Summe", it: "Termine generale e somma", es: "Término general y suma" },
  progresie_g: { en: "General term, sum, infinite sum", fr: "Terme général, somme, somme infinie", de: "Allgemeines Glied, Summe, unendliche Summe", it: "Termine generale, somma, somma infinita", es: "Término general, suma, suma infinita" },
  logaritmi: { en: "log_b(x) in various bases", fr: "log_b(x) en différentes bases", de: "log_b(x) in verschiedenen Basen", it: "log_b(x) in varie basi", es: "log_b(x) en varias bases" },
  nr_complexe: { en: "z = a + bi: operations, modulus, argument", fr: "z = a + bi: opérations, module, argument", de: "z = a + bi: Operationen, Betrag, Argument", it: "z = a + bi: operazioni, modulo, argomento", es: "z = a + bi: operaciones, módulo, argumento" },
  triunghi: { en: "Area with Heron's formula", fr: "Aire avec la formule de Héron", de: "Fläche mit Herons Formel", it: "Area con la formula di Erone", es: "Área con la fórmula de Herón" },
  dreptunghi: { en: "Area, perimeter, diagonal", fr: "Aire, périmètre, diagonale", de: "Fläche, Umfang, Diagonale", it: "Area, perimetro, diagonale", es: "Área, perímetro, diagonal" },
  cerc: { en: "Area, circumference, sector", fr: "Aire, circonférence, secteur", de: "Fläche, Umfang, Sektor", it: "Area, circonferenza, settore", es: "Área, circunferencia, sector" },
  sfera: { en: "Volume & Surface area", fr: "Volume & Superficie", de: "Volumen & Oberfläche", it: "Volume & Superficie", es: "Volumen & Superficie" },
  cilindru: { en: "Volume, lateral area, total area", fr: "Volume, aire latérale, aire totale", de: "Volumen, Mantelfläche, Gesamtfläche", it: "Volume, area laterale, area totale", es: "Volumen, área lateral, área total" },
  temperatura: { en: "°C ↔ °F ↔ K", fr: "°C ↔ °F ↔ K", de: "°C ↔ °F ↔ K", it: "°C ↔ °F ↔ K", es: "°C ↔ °F ↔ K" },
  lungime: { en: "m → km, cm, inch, ft", fr: "m → km, cm, pouce, pied", de: "m → km, cm, Zoll, Fuß", it: "m → km, cm, pollici, piedi", es: "m → km, cm, pulgadas, pies" },
  binar_dec: { en: "Convert from base 2 to base 10", fr: "Conversion base 2 en base 10", de: "Umrechnung Basis 2 zu Basis 10", it: "Conversione da base 2 a base 10", es: "Conversión de base 2 a base 10" },
  dec_binar: { en: "Convert from base 10 to base 2", fr: "Conversion base 10 en base 2", de: "Umrechnung Basis 10 zu Basis 2", it: "Conversione da base 10 a base 2", es: "Conversión de base 10 a base 2" },
  mrua: { en: "Speed, distance, time with constant acceleration", fr: "Vitesse, distance, temps avec accélération constante", de: "Geschwindigkeit, Strecke, Zeit mit konstanter Beschleunigung", it: "Velocità, distanza, tempo con accelerazione costante", es: "Velocidad, distancia, tiempo con aceleración constante" },
  forta_newton: { en: "Force = mass × acceleration", fr: "Force = masse × accélération", de: "Kraft = Masse × Beschleunigung", it: "Forza = massa × accelerazione", es: "Fuerza = masa × aceleración" },
  energie_cinetica: { en: "Energy of moving bodies and at height", fr: "Énergie des corps en mouvement et en hauteur", de: "Energie bewegter Körper und in der Höhe", it: "Energia dei corpi in moto e in altezza", es: "Energía de cuerpos en movimiento y en altura" },
  legea_ohm: { en: "U = I × R — voltage, current, resistance", fr: "U = I × R — tension, courant, résistance", de: "U = I × R — Spannung, Strom, Widerstand", it: "U = I × R — tensione, corrente, resistenza", es: "U = I × R — voltaje, corriente, resistencia" },
  cadere_libera: { en: "Motion under gravity influence", fr: "Mouvement sous l'influence de la gravité", de: "Bewegung unter Schwerkrafteinfluss", it: "Moto sotto l'influenza della gravità", es: "Movimiento bajo la influencia de la gravedad" },
  lucru_mecanic: { en: "L = F × d × cos(α); P = L/t", fr: "L = F × d × cos(α); P = L/t", de: "W = F × d × cos(α); P = W/t", it: "L = F × d × cos(α); P = L/t", es: "W = F × d × cos(α); P = W/t" },
  densitate: { en: "ρ = m/V — mass, volume, density", fr: "ρ = m/V — masse, volume, densité", de: "ρ = m/V — Masse, Volumen, Dichte", it: "ρ = m/V — massa, volume, densità", es: "ρ = m/V — masa, volumen, densidad" },
  presiune: { en: "P = F/S — force per area", fr: "P = F/S — force par surface", de: "P = F/S — Kraft pro Fläche", it: "P = F/S — forza per superficie", es: "P = F/S — fuerza por superficie" },
};

// ══════════════════════════════════════════════════
// COMMON LABEL DICTIONARY (auto-translate result/input labels)
// Maps Romanian words to all 6 languages
// ══════════════════════════════════════════════════

const LABEL_DICT: Record<string, Record<Lang, string>> = {
  // Result labels
  "Rezultat": { ro: "Rezultat", en: "Result", fr: "Résultat", de: "Ergebnis", it: "Risultato", es: "Resultado" },
  "Eroare": { ro: "Eroare", en: "Error", fr: "Erreur", de: "Fehler", it: "Errore", es: "Error" },
  "Arie": { ro: "Arie", en: "Area", fr: "Aire", de: "Fläche", it: "Area", es: "Área" },
  "Arie cerc": { ro: "Arie cerc", en: "Circle area", fr: "Aire cercle", de: "Kreisfläche", it: "Area cerchio", es: "Área círculo" },
  "Arie sector": { ro: "Arie sector", en: "Sector area", fr: "Aire secteur", de: "Sektorfläche", it: "Area settore", es: "Área sector" },
  "Arie bază": { ro: "Arie bază", en: "Base area", fr: "Aire base", de: "Grundfläche", it: "Area base", es: "Área base" },
  "Arie totală": { ro: "Arie totală", en: "Total area", fr: "Aire totale", de: "Gesamtfläche", it: "Area totale", es: "Área total" },
  "Arie laterală": { ro: "Arie laterală", en: "Lateral area", fr: "Aire latérale", de: "Mantelfläche", it: "Area laterale", es: "Área lateral" },
  "Perimetru": { ro: "Perimetru", en: "Perimeter", fr: "Périmètre", de: "Umfang", it: "Perimetro", es: "Perímetro" },
  "Circumferință": { ro: "Circumferință", en: "Circumference", fr: "Circonférence", de: "Umfang", it: "Circonferenza", es: "Circunferencia" },
  "Diagonala": { ro: "Diagonala", en: "Diagonal", fr: "Diagonale", de: "Diagonale", it: "Diagonale", es: "Diagonal" },
  "Volum": { ro: "Volum", en: "Volume", fr: "Volume", de: "Volumen", it: "Volume", es: "Volumen" },
  "Latura": { ro: "Latura", en: "Side", fr: "Côté", de: "Seite", it: "Lato", es: "Lado" },
  "Apotema": { ro: "Apotema", en: "Apothem", fr: "Apothème", de: "Apothema", it: "Apotema", es: "Apotema" },
  "Înălțime": { ro: "Înălțime", en: "Height", fr: "Hauteur", de: "Höhe", it: "Altezza", es: "Altura" },
  "Diametru": { ro: "Diametru", en: "Diameter", fr: "Diamètre", de: "Durchmesser", it: "Diametro", es: "Diámetro" },
  "Generatoarea": { ro: "Generatoarea", en: "Slant height", fr: "Génératrice", de: "Mantellinie", it: "Generatrice", es: "Generatriz" },
  "Lungime arc": { ro: "Lungime arc", en: "Arc length", fr: "Longueur d'arc", de: "Bogenlänge", it: "Lunghezza arco", es: "Longitud arco" },
  "R circumscris": { ro: "R circumscris", en: "Circumradius R", fr: "R circonscrit", de: "Umkreisradius R", it: "R circoscritto", es: "R circunscrito" },
  "r înscris": { ro: "r înscris", en: "Inradius r", fr: "r inscrit", de: "Inkreisradius r", it: "r inscritto", es: "r inscrito" },
  "Soluție": { ro: "Soluție", en: "Solution", fr: "Solution", de: "Lösung", it: "Soluzione", es: "Solución" },
  "Soluții x": { ro: "Soluții x", en: "Solutions x", fr: "Solutions x", de: "Lösungen x", it: "Soluzioni x", es: "Soluciones x" },
  "Soluții reale": { ro: "Soluții reale", en: "Real solutions", fr: "Solutions réelles", de: "Reelle Lösungen", it: "Soluzioni reali", es: "Soluciones reales" },
  "Verificare": { ro: "Verificare", en: "Verification", fr: "Vérification", de: "Überprüfung", it: "Verifica", es: "Verificación" },
  "Tip": { ro: "Tip", en: "Type", fr: "Type", de: "Typ", it: "Tipo", es: "Tipo" },
  "Punct critic": { ro: "Punct critic", en: "Critical point", fr: "Point critique", de: "Kritischer Punkt", it: "Punto critico", es: "Punto crítico" },
  "Rest": { ro: "Rest", en: "Remainder", fr: "Reste", de: "Rest", it: "Resto", es: "Resto" },
  "Factorizare": { ro: "Factorizare", en: "Factorization", fr: "Factorisation", de: "Faktorisierung", it: "Fattorizzazione", es: "Factorización" },
  "Factori primi": { ro: "Factori primi", en: "Prime factors", fr: "Facteurs premiers", de: "Primfaktoren", it: "Fattori primi", es: "Factores primos" },
  "Nr. divizori": { ro: "Nr. divizori", en: "Num. divisors", fr: "Nb. diviseurs", de: "Anz. Teiler", it: "Nr. divisori", es: "Núm. divisores" },
  "Nr. cifre": { ro: "Nr. cifre", en: "Num. digits", fr: "Nb. chiffres", de: "Anz. Ziffern", it: "Nr. cifre", es: "Núm. dígitos" },
  "Nr. biți": { ro: "Nr. biți", en: "Num. bits", fr: "Nb. bits", de: "Anz. Bits", it: "Nr. bit", es: "Núm. bits" },
  "Este prim?": { ro: "Este prim?", en: "Is prime?", fr: "Est premier ?", de: "Ist Primzahl?", it: "È primo?", es: "¿Es primo?" },
  "Următorul prim": { ro: "Următorul prim", en: "Next prime", fr: "Premier suivant", de: "Nächste Primzahl", it: "Primo successivo", es: "Siguiente primo" },
  "Precedentul prim": { ro: "Precedentul prim", en: "Previous prime", fr: "Premier précédent", de: "Vorherige Primzahl", it: "Primo precedente", es: "Primo anterior" },
  "Adunare": { ro: "Adunare", en: "Addition", fr: "Addition", de: "Addition", it: "Addizione", es: "Suma" },
  "Scădere": { ro: "Scădere", en: "Subtraction", fr: "Soustraction", de: "Subtraktion", it: "Sottrazione", es: "Resta" },
  "Înmulțire": { ro: "Înmulțire", en: "Multiplication", fr: "Multiplication", de: "Multiplikation", it: "Moltiplicazione", es: "Multiplicación" },
  "Împărțire": { ro: "Împărțire", en: "Division", fr: "Division", de: "Division", it: "Divisione", es: "División" },
  "Suma cifrelor": { ro: "Suma cifrelor", en: "Digit sum", fr: "Somme des chiffres", de: "Quersumme", it: "Somma cifre", es: "Suma de dígitos" },
  "Produsul cifrelor": { ro: "Produsul cifrelor", en: "Digit product", fr: "Produit des chiffres", de: "Querprodukt", it: "Prodotto cifre", es: "Producto de dígitos" },
  "Rădăcina digitală": { ro: "Rădăcina digitală", en: "Digital root", fr: "Racine numérique", de: "Digitale Wurzel", it: "Radice digitale", es: "Raíz digital" },
  "Aritmetică": { ro: "Aritmetică", en: "Arithmetic", fr: "Arithmétique", de: "Arithmetisch", it: "Aritmetica", es: "Aritmética" },
  "Geometrică": { ro: "Geometrică", en: "Geometric", fr: "Géométrique", de: "Geometrisch", it: "Geometrica", es: "Geométrica" },
  "Armonică": { ro: "Armonică", en: "Harmonic", fr: "Harmonique", de: "Harmonisch", it: "Armonica", es: "Armónica" },
  "Pătratică": { ro: "Pătratică", en: "Quadratic", fr: "Quadratique", de: "Quadratisch", it: "Quadratica", es: "Cuadrática" },
  "Radiani": { ro: "Radiani", en: "Radians", fr: "Radians", de: "Bogenmaß", it: "Radianti", es: "Radianes" },
  "Gradiani": { ro: "Gradiani", en: "Gradians", fr: "Grades", de: "Gon", it: "Gradienti", es: "Gradianes" },
  "Primitivă": { ro: "Primitivă", en: "Antiderivative", fr: "Primitive", de: "Stammfunktion", it: "Primitiva", es: "Primitiva" },
  "∫ definit": { ro: "∫ definit", en: "∫ definite", fr: "∫ définie", de: "∫ bestimmt", it: "∫ definito", es: "∫ definida" },
  "Tangenta": { ro: "Tangenta", en: "Tangent", fr: "Tangente", de: "Tangente", it: "Tangente", es: "Tangente" },
  "Vârf": { ro: "Vârf", en: "Vertex", fr: "Sommet", de: "Scheitelpunkt", it: "Vertice", es: "Vértice" },
  "Minim": { ro: "Minim", en: "Minimum", fr: "Minimum", de: "Minimum", it: "Minimo", es: "Mínimo" },
  "Maxim": { ro: "Maxim", en: "Maximum", fr: "Maximum", de: "Maximum", it: "Massimo", es: "Máximo" },
  "Cresc.": { ro: "Cresc.", en: "Incr.", fr: "Croiss.", de: "Steig.", it: "Cresc.", es: "Crec." },
  "Desc.": { ro: "Desc.", en: "Decr.", fr: "Décroiss.", de: "Fall.", it: "Decr.", es: "Decr." },
  "Monotonie": { ro: "Monotonie", en: "Monotonicity", fr: "Monotonie", de: "Monotonie", it: "Monotonia", es: "Monotonía" },
  "Crescătoare": { ro: "Crescătoare", en: "Increasing", fr: "Croissante", de: "Steigend", it: "Crescente", es: "Creciente" },
  "Descrescătoare": { ro: "Descrescătoare", en: "Decreasing", fr: "Décroissante", de: "Fallend", it: "Decrescente", es: "Decreciente" },
  "Constantă": { ro: "Constantă", en: "Constant", fr: "Constante", de: "Konstant", it: "Costante", es: "Constante" },
  "Liniară": { ro: "Liniară", en: "Linear", fr: "Linéaire", de: "Linear", it: "Lineare", es: "Lineal" },
  "Media": { ro: "Media", en: "Mean", fr: "Moyenne", de: "Mittelwert", it: "Media", es: "Media" },
  "Media ponderată": { ro: "Media ponderată", en: "Weighted mean", fr: "Moyenne pondérée", de: "Gewichtetes Mittel", it: "Media ponderata", es: "Media ponderada" },
  "Media simplă": { ro: "Media simplă", en: "Simple mean", fr: "Moyenne simple", de: "Einfaches Mittel", it: "Media semplice", es: "Media simple" },
  "Varianța": { ro: "Varianța", en: "Variance", fr: "Variance", de: "Varianz", it: "Varianza", es: "Varianza" },
  "Dev. std": { ro: "Dev. std", en: "Std dev", fr: "Écart-type", de: "Std.-Abw.", it: "Dev. std", es: "Desv. est." },
  "Mediană": { ro: "Mediană", en: "Median", fr: "Médiane", de: "Median", it: "Mediana", es: "Mediana" },
  "Mod": { ro: "Mod", en: "Mode", fr: "Mode", de: "Modus", it: "Moda", es: "Moda" },
  "Amplitudine": { ro: "Amplitudine", en: "Range", fr: "Amplitude", de: "Spannweite", it: "Ampiezza", es: "Rango" },
  "Ecuația": { ro: "Ecuația", en: "Equation", fr: "Équation", de: "Gleichung", it: "Equazione", es: "Ecuación" },
  "Interpretare": { ro: "Interpretare", en: "Interpretation", fr: "Interprétation", de: "Interpretation", it: "Interpretazione", es: "Interpretación" },
  "Omogen": { ro: "Omogen", en: "Homogeneous", fr: "Homogène", de: "Homogen", it: "Omogeneo", es: "Homogéneo" },
  "Eterogen": { ro: "Eterogen", en: "Heterogeneous", fr: "Hétérogène", de: "Heterogen", it: "Eterogeneo", es: "Heterogéneo" },
  "Semnificativ?": { ro: "Semnificativ?", en: "Significant?", fr: "Significatif ?", de: "Signifikant?", it: "Significativo?", es: "¿Significativo?" },
  "Coeficienți": { ro: "Coeficienți", en: "Coefficients", fr: "Coefficients", de: "Koeffizienten", it: "Coefficienti", es: "Coeficientes" },
  "Primii termeni": { ro: "Primii termeni", en: "First terms", fr: "Premiers termes", de: "Erste Glieder", it: "Primi termini", es: "Primeros términos" },
  "Cu repetiție nᵏ": { ro: "Cu repetiție nᵏ", en: "With repetition nᵏ", fr: "Avec répétition nᵏ", de: "Mit Wiederholung nᵏ", it: "Con ripetizione nᵏ", es: "Con repetición nᵏ" },
  "Produs": { ro: "Produs", en: "Product", fr: "Produit", de: "Produkt", it: "Prodotto", es: "Producto" },
  "Sumă": { ro: "Sumă", en: "Sum", fr: "Somme", de: "Summe", it: "Somma", es: "Suma" },
  "Cotă": { ro: "Cotă", en: "Odds", fr: "Cote", de: "Quote", it: "Quota", es: "Cuota" },
  "Doar A": { ro: "Doar A", en: "Only A", fr: "Seulement A", de: "Nur A", it: "Solo A", es: "Solo A" },
  "Doar B": { ro: "Doar B", en: "Only B", fr: "Seulement B", de: "Nur B", it: "Solo B", es: "Solo B" },
  "Trasa": { ro: "Trasa", en: "Trace", fr: "Trace", de: "Spur", it: "Traccia", es: "Traza" },
  "Inversă": { ro: "Inversă", en: "Inverse", fr: "Inverse", de: "Inverse", it: "Inversa", es: "Inversa" },
  "Distanța": { ro: "Distanța", en: "Distance", fr: "Distance", de: "Abstand", it: "Distanza", es: "Distancia" },
  "Mijloc": { ro: "Mijloc", en: "Midpoint", fr: "Milieu", de: "Mittelpunkt", it: "Punto medio", es: "Punto medio" },
  "Caracter": { ro: "Caracter", en: "Character", fr: "Caractère", de: "Zeichen", it: "Carattere", es: "Carácter" },
  "Binar": { ro: "Binar", en: "Binary", fr: "Binaire", de: "Binär", it: "Binario", es: "Binario" },
  "Zecimal": { ro: "Zecimal", en: "Decimal", fr: "Décimal", de: "Dezimal", it: "Decimale", es: "Decimal" },
  "Octal": { ro: "Octal", en: "Octal", fr: "Octal", de: "Oktal", it: "Ottale", es: "Octal" },
  "Hexazecimal": { ro: "Hexazecimal", en: "Hexadecimal", fr: "Hexadécimal", de: "Hexadezimal", it: "Esadecimale", es: "Hexadecimal" },
  "Mască": { ro: "Mască", en: "Mask", fr: "Masque", de: "Maske", it: "Maschera", es: "Máscara" },
  "Total adrese": { ro: "Total adrese", en: "Total addresses", fr: "Total adresses", de: "Gesamtadressen", it: "Totale indirizzi", es: "Total direcciones" },
  "Adrese utilizabile": { ro: "Adrese utilizabile", en: "Usable addresses", fr: "Adresses utilisables", de: "Nutzbare Adressen", it: "Indirizzi utilizzabili", es: "Direcciones utilizables" },
  "Biți host": { ro: "Biți host", en: "Host bits", fr: "Bits hôte", de: "Host-Bits", it: "Bit host", es: "Bits host" },
  "Paritate": { ro: "Paritate", en: "Parity", fr: "Parité", de: "Parität", it: "Parità", es: "Paridad" },
  "Fahrenheit": { ro: "Fahrenheit", en: "Fahrenheit", fr: "Fahrenheit", de: "Fahrenheit", it: "Fahrenheit", es: "Fahrenheit" },
  "Kelvin": { ro: "Kelvin", en: "Kelvin", fr: "Kelvin", de: "Kelvin", it: "Kelvin", es: "Kelvin" },
  "Rankine": { ro: "Rankine", en: "Rankine", fr: "Rankine", de: "Rankine", it: "Rankine", es: "Rankine" },
  "Grame": { ro: "Grame", en: "Grams", fr: "Grammes", de: "Gramm", it: "Grammi", es: "Gramos" },
  "Pounds": { ro: "Pounds", en: "Pounds", fr: "Livres", de: "Pfund", it: "Libbre", es: "Libras" },
  "Ounces": { ro: "Ounces", en: "Ounces", fr: "Onces", de: "Unzen", it: "Once", es: "Onzas" },
  "Tone": { ro: "Tone", en: "Tonnes", fr: "Tonnes", de: "Tonnen", it: "Tonnellate", es: "Toneladas" },
  "Viteză finală": { ro: "Viteză finală", en: "Final speed", fr: "Vitesse finale", de: "Endgeschwindigkeit", it: "Velocità finale", es: "Velocidad final" },
  "Viteză medie": { ro: "Viteză medie", en: "Average speed", fr: "Vitesse moyenne", de: "Durchschnittsgeschwindigkeit", it: "Velocità media", es: "Velocidad media" },
  "Viteză impact": { ro: "Viteză impact", en: "Impact speed", fr: "Vitesse impact", de: "Aufprallgeschw.", it: "Velocità impatto", es: "Velocidad impacto" },
  "Timp cădere": { ro: "Timp cădere", en: "Fall time", fr: "Temps de chute", de: "Fallzeit", it: "Tempo caduta", es: "Tiempo caída" },
  "Capital final": { ro: "Capital final", en: "Final capital", fr: "Capital final", de: "Endkapital", it: "Capitale finale", es: "Capital final" },
  "Dobândă totală": { ro: "Dobândă totală", en: "Total interest", fr: "Intérêts totaux", de: "Gesamtzinsen", it: "Interessi totali", es: "Intereses totales" },
  "Timp dublare": { ro: "Timp dublare", en: "Doubling time", fr: "Temps de doublement", de: "Verdoppelungszeit", it: "Tempo raddoppio", es: "Tiempo duplicación" },
  "Condiție": { ro: "Condiție", en: "Condition", fr: "Condition", de: "Bedingung", it: "Condizione", es: "Condición" },
  "Are soluții?": { ro: "Are soluții?", en: "Has solutions?", fr: "A des solutions ?", de: "Hat Lösungen?", it: "Ha soluzioni?", es: "¿Tiene soluciones?" },
  "Perfect?": { ro: "Perfect?", en: "Perfect?", fr: "Parfait ?", de: "Vollkommen?", it: "Perfetto?", es: "¿Perfecto?" },
  "Deficient": { ro: "Deficient", en: "Deficient", fr: "Déficient", de: "Mangelhaft", it: "Difettivo", es: "Deficiente" },
  "Abundent": { ro: "Abundent", en: "Abundant", fr: "Abondant", de: "Abundant", it: "Abbondante", es: "Abundante" },
  "Perfect": { ro: "Perfect", en: "Perfect", fr: "Parfait", de: "Vollkommen", it: "Perfetto", es: "Perfecto" },
  "Panta (m)": { ro: "Panta (m)", en: "Slope (m)", fr: "Pente (m)", de: "Steigung (m)", it: "Pendenza (m)", es: "Pendiente (m)" },
  "Intercept (b)": { ro: "Intercept (b)", en: "Intercept (b)", fr: "Ordonnée (b)", de: "Achsenabschnitt (b)", it: "Intercetta (b)", es: "Intercepto (b)" },
  "Eroare relativă": { ro: "Eroare relativă", en: "Relative error", fr: "Erreur relative", de: "Relativer Fehler", it: "Errore relativo", es: "Error relativo" },
  "Eroare %": { ro: "Eroare %", en: "Error %", fr: "Erreur %", de: "Fehler %", it: "Errore %", es: "Error %" },
  "x candidat": { ro: "x candidat", en: "x candidate", fr: "x candidat", de: "x Kandidat", it: "x candidato", es: "x candidato" },
  "✓ Valid": { ro: "✓ Valid", en: "✓ Valid", fr: "✓ Valide", de: "✓ Gültig", it: "✓ Valido", es: "✓ Válido" },
  "✗ Soluție falsă": { ro: "✗ Soluție falsă", en: "✗ False solution", fr: "✗ Solution fausse", de: "✗ Scheinlösung", it: "✗ Soluzione falsa", es: "✗ Solución falsa" },
  "Plutește în apă?": { ro: "Plutește în apă?", en: "Floats in water?", fr: "Flotte dans l'eau ?", de: "Schwimmt in Wasser?", it: "Galleggia in acqua?", es: "¿Flota en agua?" },
  "Da ✓": { ro: "Da ✓", en: "Yes ✓", fr: "Oui ✓", de: "Ja ✓", it: "Sì ✓", es: "Sí ✓" },
  "Nu ✗": { ro: "Nu ✗", en: "No ✗", fr: "Non ✗", de: "Nein ✗", it: "No ✗", es: "No ✗" },
  "DA ✓": { ro: "DA ✓", en: "YES ✓", fr: "OUI ✓", de: "JA ✓", it: "SÌ ✓", es: "SÍ ✓" },
  "NU ✗": { ro: "NU ✗", en: "NO ✗", fr: "NON ✗", de: "NEIN ✗", it: "NO ✗", es: "NO ✗" },
  "Linia mijlocie": { ro: "Linia mijlocie", en: "Midsegment", fr: "Segment milieu", de: "Mittelsegment", it: "Segmento medio", es: "Segmento medio" },
  "Unghi int.": { ro: "Unghi int.", en: "Int. angle", fr: "Angle int.", de: "Innenwinkel", it: "Angolo int.", es: "Ángulo int." },
  "Diagonale": { ro: "Diagonale", en: "Diagonals", fr: "Diagonales", de: "Diagonalen", it: "Diagonali", es: "Diagonales" },
  "Verticală": { ro: "Verticală", en: "Vertical", fr: "Verticale", de: "Vertikal", it: "Verticale", es: "Vertical" },
  "Excentricitate": { ro: "Excentricitate", en: "Eccentricity", fr: "Excentricité", de: "Exzentrizität", it: "Eccentricità", es: "Excentricidad" },
  "Stirling ≈": { ro: "Stirling ≈", en: "Stirling ≈", fr: "Stirling ≈", de: "Stirling ≈", it: "Stirling ≈", es: "Stirling ≈" },
  "Sistem": { ro: "Sistem", en: "System", fr: "Système", de: "System", it: "Sistema", es: "Sistema" },
  "Conjugat": { ro: "Conjugat", en: "Conjugate", fr: "Conjugué", de: "Konjugiert", it: "Coniugato", es: "Conjugado" },
};

// Input label translations
const INPUT_LABELS: Record<string, Record<Lang, string>> = {
  "Valoare": { ro: "Valoare", en: "Value", fr: "Valeur", de: "Wert", it: "Valore", es: "Valor" },
  "Baza": { ro: "Baza", en: "Base", fr: "Base", de: "Basis", it: "Base", es: "Base" },
  "Baza mare": { ro: "Baza mare", en: "Large base", fr: "Grande base", de: "Große Basis", it: "Base maggiore", es: "Base mayor" },
  "Baza mică": { ro: "Baza mică", en: "Small base", fr: "Petite base", de: "Kleine Basis", it: "Base minore", es: "Base menor" },
  "Raza": { ro: "Raza", en: "Radius", fr: "Rayon", de: "Radius", it: "Raggio", es: "Radio" },
  "Raza mare": { ro: "Raza mare", en: "Large radius", fr: "Grand rayon", de: "Großer Radius", it: "Raggio maggiore", es: "Radio mayor" },
  "Raza mică": { ro: "Raza mică", en: "Small radius", fr: "Petit rayon", de: "Kleiner Radius", it: "Raggio minore", es: "Radio menor" },
  "Muchia": { ro: "Muchia", en: "Edge", fr: "Arête", de: "Kante", it: "Spigolo", es: "Arista" },
  "Lungime": { ro: "Lungime", en: "Length", fr: "Longueur", de: "Länge", it: "Lunghezza", es: "Longitud" },
  "Lățime": { ro: "Lățime", en: "Width", fr: "Largeur", de: "Breite", it: "Larghezza", es: "Ancho" },
  "Înălțime": { ro: "Înălțime", en: "Height", fr: "Hauteur", de: "Höhe", it: "Altezza", es: "Altura" },
  "Unghi (°)": { ro: "Unghi (°)", en: "Angle (°)", fr: "Angle (°)", de: "Winkel (°)", it: "Angolo (°)", es: "Ángulo (°)" },
  "Unghi sector (°)": { ro: "Unghi sector (°)", en: "Sector angle (°)", fr: "Angle secteur (°)", de: "Sektorwinkel (°)", it: "Angolo settore (°)", es: "Ángulo sector (°)" },
  "Cateta a": { ro: "Cateta a", en: "Leg a", fr: "Cathète a", de: "Kathete a", it: "Cateto a", es: "Cateto a" },
  "Cateta b": { ro: "Cateta b", en: "Leg b", fr: "Cathète b", de: "Kathete b", it: "Cateto b", es: "Cateto b" },
  "Latura a": { ro: "Latura a", en: "Side a", fr: "Côté a", de: "Seite a", it: "Lato a", es: "Lado a" },
  "Latura b": { ro: "Latura b", en: "Side b", fr: "Côté b", de: "Seite b", it: "Lato b", es: "Lado b" },
  "Latura": { ro: "Latura", en: "Side", fr: "Côté", de: "Seite", it: "Lato", es: "Lado" },
  "Nr. laturi": { ro: "Nr. laturi", en: "Num. sides", fr: "Nb. côtés", de: "Anz. Seiten", it: "Nr. lati", es: "Núm. lados" },
  "Semiaxa mare": { ro: "Semiaxa mare", en: "Semi-major axis", fr: "Demi-grand axe", de: "Große Halbachse", it: "Semiasse maggiore", es: "Semieje mayor" },
  "Semiaxa mică": { ro: "Semiaxa mică", en: "Semi-minor axis", fr: "Demi-petit axe", de: "Kleine Halbachse", it: "Semiasse minore", es: "Semieje menor" },
  "Număr": { ro: "Număr", en: "Number", fr: "Nombre", de: "Zahl", it: "Numero", es: "Número" },
  "Procent (%)": { ro: "Procent (%)", en: "Percent (%)", fr: "Pourcentage (%)", de: "Prozent (%)", it: "Percentuale (%)", es: "Porcentaje (%)" },
  "Exponent": { ro: "Exponent", en: "Exponent", fr: "Exposant", de: "Exponent", it: "Esponente", es: "Exponente" },
  "Putere (n)": { ro: "Putere (n)", en: "Power (n)", fr: "Puissance (n)", de: "Potenz (n)", it: "Potenza (n)", es: "Potencia (n)" },
  "Punct (x)": { ro: "Punct (x)", en: "Point (x)", fr: "Point (x)", de: "Punkt (x)", it: "Punto (x)", es: "Punto (x)" },
  "De la": { ro: "De la", en: "From", fr: "De", de: "Von", it: "Da", es: "Desde" },
  "Până la": { ro: "Până la", en: "To", fr: "À", de: "Bis", it: "A", es: "Hasta" },
  "Termeni": { ro: "Termeni", en: "Terms", fr: "Termes", de: "Terme", it: "Termini", es: "Términos" },
  "Iterații": { ro: "Iterații", en: "Iterations", fr: "Itérations", de: "Iterationen", it: "Iterazioni", es: "Iteraciones" },
  "Nr. zecimal": { ro: "Nr. zecimal", en: "Decimal number", fr: "Nombre décimal", de: "Dezimalzahl", it: "Numero decimale", es: "Número decimal" },
  "Cod ASCII": { ro: "Cod ASCII", en: "ASCII Code", fr: "Code ASCII", de: "ASCII-Code", it: "Codice ASCII", es: "Código ASCII" },
  "Număr binar (ca zecimal)": { ro: "Număr binar (ca zecimal)", en: "Binary number (as decimal)", fr: "Nombre binaire (comme décimal)", de: "Binärzahl (als Dezimal)", it: "Numero binario (come decimale)", es: "Número binario (como decimal)" },
  "Număr zecimal": { ro: "Număr zecimal", en: "Decimal number", fr: "Nombre décimal", de: "Dezimalzahl", it: "Numero decimale", es: "Número decimal" },
  "°Celsius": { ro: "°Celsius", en: "°Celsius", fr: "°Celsius", de: "°Celsius", it: "°Celsius", es: "°Celsius" },
  "Metri": { ro: "Metri", en: "Meters", fr: "Mètres", de: "Meter", it: "Metri", es: "Metros" },
  "Litri": { ro: "Litri", en: "Liters", fr: "Litres", de: "Liter", it: "Litri", es: "Litros" },
  "Kilograme": { ro: "Kilograme", en: "Kilograms", fr: "Kilogrammes", de: "Kilogramm", it: "Chilogrammi", es: "Kilogramos" },
  "Megabytes": { ro: "Megabytes", en: "Megabytes", fr: "Mégaoctets", de: "Megabyte", it: "Megabyte", es: "Megabytes" },
  "Favorabile": { ro: "Favorabile", en: "Favorable", fr: "Favorables", de: "Günstige", it: "Favorevoli", es: "Favorables" },
  "Total": { ro: "Total", en: "Total", fr: "Total", de: "Gesamt", it: "Totale", es: "Total" },
  "Grade": { ro: "Grade", en: "Degrees", fr: "Degrés", de: "Grad", it: "Gradi", es: "Grados" },
  "Rația (r)": { ro: "Rația (r)", en: "Ratio (r)", fr: "Raison (r)", de: "Differenz (r)", it: "Ragione (r)", es: "Razón (r)" },
  "Rația (q)": { ro: "Rația (q)", en: "Ratio (q)", fr: "Raison (q)", de: "Quotient (q)", it: "Ragione (q)", es: "Razón (q)" },
  "Coef (a)": { ro: "Coef (a)", en: "Coeff (a)", fr: "Coeff (a)", de: "Koeff (a)", it: "Coeff (a)", es: "Coef (a)" },
  "Coef": { ro: "Coef", en: "Coeff", fr: "Coeff", de: "Koeff", it: "Coeff", es: "Coef" },
  "Capital (P)": { ro: "Capital (P)", en: "Capital (P)", fr: "Capital (P)", de: "Kapital (P)", it: "Capitale (P)", es: "Capital (P)" },
  "Rată anuală": { ro: "Rată anuală", en: "Annual rate", fr: "Taux annuel", de: "Jahreszins", it: "Tasso annuale", es: "Tasa anual" },
  "Capitalizări/an": { ro: "Capitalizări/an", en: "Compound/year", fr: "Capitalisations/an", de: "Zinsperioden/Jahr", it: "Capitalizzazioni/anno", es: "Capitalizaciones/año" },
  "Ani": { ro: "Ani", en: "Years", fr: "Années", de: "Jahre", it: "Anni", es: "Años" },
  "Dimensiune (n)": { ro: "Dimensiune (n)", en: "Size (n)", fr: "Taille (n)", de: "Größe (n)", it: "Dimensione (n)", es: "Tamaño (n)" },
  "Viteza inițială (m/s)": { ro: "Viteza inițială (m/s)", en: "Initial velocity (m/s)", fr: "Vitesse initiale (m/s)", de: "Anfangsgeschwindigkeit (m/s)", it: "Velocità iniziale (m/s)", es: "Velocidad inicial (m/s)" },
  "Accelerație (m/s²)": { ro: "Accelerație (m/s²)", en: "Acceleration (m/s²)", fr: "Accélération (m/s²)", de: "Beschleunigung (m/s²)", it: "Accelerazione (m/s²)", es: "Aceleración (m/s²)" },
  "Timp (s)": { ro: "Timp (s)", en: "Time (s)", fr: "Temps (s)", de: "Zeit (s)", it: "Tempo (s)", es: "Tiempo (s)" },
  "Masa (kg)": { ro: "Masa (kg)", en: "Mass (kg)", fr: "Masse (kg)", de: "Masse (kg)", it: "Massa (kg)", es: "Masa (kg)" },
  "Viteza (m/s)": { ro: "Viteza (m/s)", en: "Velocity (m/s)", fr: "Vitesse (m/s)", de: "Geschwindigkeit (m/s)", it: "Velocità (m/s)", es: "Velocidad (m/s)" },
  "Înălțimea (m)": { ro: "Înălțimea (m)", en: "Height (m)", fr: "Hauteur (m)", de: "Höhe (m)", it: "Altezza (m)", es: "Altura (m)" },
  "Tensiune (V)": { ro: "Tensiune (V)", en: "Voltage (V)", fr: "Tension (V)", de: "Spannung (V)", it: "Tensione (V)", es: "Voltaje (V)" },
  "Rezistență (Ω)": { ro: "Rezistență (Ω)", en: "Resistance (Ω)", fr: "Résistance (Ω)", de: "Widerstand (Ω)", it: "Resistenza (Ω)", es: "Resistencia (Ω)" },
  "Forța (N)": { ro: "Forța (N)", en: "Force (N)", fr: "Force (N)", de: "Kraft (N)", it: "Forza (N)", es: "Fuerza (N)" },
  "Distanța (m)": { ro: "Distanța (m)", en: "Distance (m)", fr: "Distance (m)", de: "Strecke (m)", it: "Distanza (m)", es: "Distancia (m)" },
  "Suprafața (m²)": { ro: "Suprafața (m²)", en: "Area (m²)", fr: "Surface (m²)", de: "Fläche (m²)", it: "Superficie (m²)", es: "Superficie (m²)" },
  "Volumul (m³)": { ro: "Volumul (m³)", en: "Volume (m³)", fr: "Volume (m³)", de: "Volumen (m³)", it: "Volume (m³)", es: "Volumen (m³)" },
};

// Category translations (including missing ones)
const CAT_NAMES: Record<string, T5> = {
  aritmetica: { en: "Arithmetic", fr: "Arithmétique", de: "Arithmetik", it: "Aritmetica", es: "Aritmética" },
  algebra: { en: "Algebra", fr: "Algèbre", de: "Algebra", it: "Algebra", es: "Álgebra" },
  geometrie_plana: { en: "Plane Geometry", fr: "Géométrie Plane", de: "Ebene Geometrie", it: "Geometria Piana", es: "Geometría Plana" },
  geometrie_spatiu: { en: "Solid Geometry", fr: "Géométrie dans l'Espace", de: "Raumgeometrie", it: "Geometria Solida", es: "Geometría del Espacio" },
  trigonometrie: { en: "Trigonometry", fr: "Trigonométrie", de: "Trigonometrie", it: "Trigonometria", es: "Trigonometría" },
  analiza: { en: "Analysis", fr: "Analyse", de: "Analysis", it: "Analisi", es: "Análisis" },
  combinatorica: { en: "Combinatorics & Probability", fr: "Combinatoire & Probabilités", de: "Kombinatorik & Wahrscheinlichkeit", it: "Combinatoria & Probabilità", es: "Combinatoria & Probabilidad" },
  matrice: { en: "Matrices", fr: "Matrices", de: "Matrizen", it: "Matrici", es: "Matrices" },
  teoria_nr: { en: "Number Theory", fr: "Théorie des Nombres", de: "Zahlentheorie", it: "Teoria dei Numeri", es: "Teoría de Números" },
  statistica: { en: "Statistics", fr: "Statistiques", de: "Statistik", it: "Statistica", es: "Estadística" },
  metode_numerice: { en: "Numerical Methods", fr: "Méthodes Numériques", de: "Numerische Methoden", it: "Metodi Numerici", es: "Métodos Numéricos" },
  interpolare_av: { en: "Advanced Interpolation", fr: "Interpolation Avancée", de: "Erweiterte Interpolation", it: "Interpolazione Avanzata", es: "Interpolación Avanzada" },
  conversii: { en: "Conversions", fr: "Conversions", de: "Umrechnungen", it: "Conversioni", es: "Conversiones" },
  informatica: { en: "Computer Science", fr: "Informatique", de: "Informatik", it: "Informatica", es: "Informática" },
  fizica: { en: "Physics", fr: "Physique", de: "Physik", it: "Fisica", es: "Física" },
};

const CAT_DESCS: Record<string, T5> = {
  aritmetica: { en: "Basic operations, percentages, fractions, factorization", fr: "Opérations fondamentales, pourcentages, fractions", de: "Grundoperationen, Prozente, Brüche, Faktorisierung", it: "Operazioni fondamentali, percentuali, frazioni", es: "Operaciones fundamentales, porcentajes, fracciones" },
  algebra: { en: "Equations, systems, progressions, logarithms", fr: "Équations, systèmes, progressions, logarithmes", de: "Gleichungen, Systeme, Folgen, Logarithmen", it: "Equazioni, sistemi, progressioni, logaritmi", es: "Ecuaciones, sistemas, progresiones, logaritmos" },
  geometrie_plana: { en: "Areas, perimeters, distances, plane equations", fr: "Aires, périmètres, distances, équations dans le plan", de: "Flächen, Umfänge, Abstände, Ebenengleichungen", it: "Aree, perimetri, distanze, equazioni nel piano", es: "Áreas, perímetros, distancias, ecuaciones en el plano" },
  geometrie_spatiu: { en: "Volumes, surface areas, geometric solids", fr: "Volumes, surfaces, solides géométriques", de: "Volumen, Oberflächen, geometrische Körper", it: "Volumi, superfici, solidi geometrici", es: "Volúmenes, superficies, sólidos geométricos" },
  trigonometrie: { en: "Trigonometric functions, identities, triangle", fr: "Fonctions trigonométriques, identités, triangle", de: "Trigonometrische Funktionen, Identitäten, Dreieck", it: "Funzioni trigonometriche, identità, triangolo", es: "Funciones trigonométricas, identidades, triángulo" },
  analiza: { en: "Derivatives, integrals, limits, tangent lines", fr: "Dérivées, intégrales, limites, tangentes", de: "Ableitungen, Integrale, Grenzwerte, Tangenten", it: "Derivate, integrali, limiti, tangenti", es: "Derivadas, integrales, límites, tangentes" },
  combinatorica: { en: "Permutations, combinations, probability, distributions", fr: "Permutations, combinaisons, probabilité, distributions", de: "Permutationen, Kombinationen, Wahrscheinlichkeit, Verteilungen", it: "Permutazioni, combinazioni, probabilità, distribuzioni", es: "Permutaciones, combinaciones, probabilidad, distribuciones" },
  matrice: { en: "Determinant, inverse, transpose, multiplication", fr: "Déterminant, inverse, transposée, multiplication", de: "Determinante, Inverse, Transponierte, Multiplikation", it: "Determinante, inversa, trasposta, moltiplicazione", es: "Determinante, inversa, transpuesta, multiplicación" },
  teoria_nr: { en: "Fibonacci, Euler, base conversions, modular arithmetic", fr: "Fibonacci, Euler, conversions de base, arithmétique modulaire", de: "Fibonacci, Euler, Basisumrechnungen, modulare Arithmetik", it: "Fibonacci, Eulero, conversioni di base, aritmetica modulare", es: "Fibonacci, Euler, conversiones de base, aritmética modular" },
  statistica: { en: "Weighted mean, variance, correlation, regression", fr: "Moyenne pondérée, variance, corrélation, régression", de: "Gewichteter Mittelwert, Varianz, Korrelation, Regression", it: "Media ponderata, varianza, correlazione, regressione", es: "Media ponderada, varianza, correlación, regresión" },
  metode_numerice: { en: "Approximations, interpolation, differential equations", fr: "Approximations, interpolation, équations différentielles", de: "Näherungen, Interpolation, Differentialgleichungen", it: "Approssimazioni, interpolazione, equazioni differenziali", es: "Aproximaciones, interpolación, ecuaciones diferenciales" },
  interpolare_av: { en: "Lagrange polynomial interpolation", fr: "Interpolation polynomiale de Lagrange", de: "Lagrange-Polynominterpolation", it: "Interpolazione polinomiale di Lagrange", es: "Interpolación polinomial de Lagrange" },
  conversii: { en: "Temperature, length, area, volume, weight, speed", fr: "Température, longueur, aire, volume, poids, vitesse", de: "Temperatur, Länge, Fläche, Volumen, Gewicht, Geschwindigkeit", it: "Temperatura, lunghezza, area, volume, peso, velocità", es: "Temperatura, longitud, área, volumen, peso, velocidad" },
  informatica: { en: "Number bases, boolean logic, algorithmic complexity", fr: "Bases numériques, logique booléenne, complexité algorithmique", de: "Zahlensysteme, Boolesche Logik, algorithmische Komplexität", it: "Basi numeriche, logica booleana, complessità algoritmica", es: "Bases numéricas, lógica booleana, complejidad algorítmica" },
  fizica: { en: "Kinematics, forces, energy, electricity", fr: "Cinématique, forces, énergie, électricité", de: "Kinematik, Kräfte, Energie, Elektrizität", it: "Cinematica, forze, energia, elettricità", es: "Cinemática, fuerzas, energía, electricidad" },
};

// ══════════════════════════════════════════════════
// EXPORT FUNCTIONS
// ══════════════════════════════════════════════════

export const getCalcName = (id: string, lang: Lang, fallback: string): string => {
  if (lang === "ro") return fallback;
  return CALC_NAMES[id]?.[lang] || fallback;
};

export const getCalcDesc = (id: string, lang: Lang, fallback: string): string => {
  if (lang === "ro") return fallback;
  return CALC_DESCS[id]?.[lang] || fallback;
};

export const getCatName = (id: string, lang: Lang, fallback: string): string => {
  if (lang === "ro") return fallback;
  return CAT_NAMES[id]?.[lang] || fallback;
};

export const getCatDesc = (id: string, lang: Lang, fallback: string): string => {
  if (lang === "ro") return fallback;
  return CAT_DESCS[id]?.[lang] || fallback;
};

export const translateLabel = (roText: string, lang: Lang): string => {
  if (lang === "ro") return roText;
  // Exact match first
  if (LABEL_DICT[roText]?.[lang]) return LABEL_DICT[roText][lang];
  if (INPUT_LABELS[roText]?.[lang]) return INPUT_LABELS[roText][lang];
  return roText;
};

export const translateInputLabel = (roText: string, lang: Lang): string => {
  if (lang === "ro") return roText;
  if (INPUT_LABELS[roText]?.[lang]) return INPUT_LABELS[roText][lang];
  if (LABEL_DICT[roText]?.[lang]) return LABEL_DICT[roText][lang];
  return roText;
};
