import type { CalcCategory } from "./calcTypes";

const PI = Math.PI;
const fmt = (n: number, d = 6) => {
  if (isNaN(n) || !isFinite(n)) return "—";
  return Number.isInteger(n) ? n.toString() : parseFloat(n.toFixed(d)).toString();
};
const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= Math.min(Math.round(n), 170); i++) r *= i;
  return r;
};
const gcd = (a: number, b: number): number => {
  a = Math.abs(Math.round(a)); b = Math.abs(Math.round(b));
  while (b) { [a, b] = [b, a % b]; }
  return a;
};
const lcm = (a: number, b: number) => (a && b) ? Math.abs(a * b) / gcd(a, b) : 0;
const isPrime = (n: number): boolean => {
  n = Math.abs(Math.round(n));
  if (n < 2) return false; if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) if (n % i === 0 || n % (i + 2) === 0) return false;
  return true;
};
const primeFactors = (n: number): number[] => {
  n = Math.abs(Math.round(n)); if (n < 2) return [];
  const f: number[] = [];
  for (let d = 2; d * d <= n; d++) while (n % d === 0) { f.push(d); n /= d; }
  if (n > 1) f.push(n);
  return f;
};
const fib = (n: number): number => {
  n = Math.max(0, Math.round(n));
  if (n <= 0) return 0; if (n <= 2) return 1;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
};
const eulerTotient = (num: number): number => {
  let n = Math.abs(Math.round(num)); let result = n;
  for (let p = 2; p * p <= n; p++) {
    if (n % p === 0) { while (n % p === 0) n /= p; result -= result / p; }
  }
  if (n > 1) result -= result / n;
  return Math.round(result);
};
const simplify = (n: number, d: number) => {
  if (!d) return "—";
  const g = gcd(Math.abs(n), Math.abs(d));
  return `${(d < 0 ? -n : n) / g}/${Math.abs(d) / g}`;
};

export const mathCategories: CalcCategory[] = [
  // ═══ ARITMETICĂ ═══
  {
    id: "aritmetica", name: "Aritmetică", description: "Operații fundamentale, procente, fracții, factorizare",
    color: "hsl(220,70%,55%)",
    calculators: [
      {
        id: "procente", name: "Calcul Procente", description: "Calculează procentul dintr-un număr",
        formula: "Rezultat = (Valoare × Procent) / 100",
        explanation: "Procentul (%) înseamnă 'la sută'. Se aplică în reduceri, TVA, dobânzi bancare, comisioane. De exemplu, 15% din 200 = 200 × 15/100 = 30. Procentul de creștere = (val_nouă - val_veche) / val_veche × 100. Procentele compuse se calculează cu formula dobânzii compuse. În finanțe, procentele se folosesc pentru randamente, inflație, rate de dobândă. Un procent poate fi transformat în fracție (25% = 1/4) sau zecimală (25% = 0.25).",
        inputs: [{ key: "v", label: "Valoare", default: 200 }, { key: "p", label: "Procent (%)", default: 15 }],
        calculate: (v) => [
          { label: "Rezultat", value: fmt(v.v * v.p / 100) },
          { label: "Rest", value: fmt(v.v - v.v * v.p / 100) },
          { label: "Creștere cu p%", value: fmt(v.v * (1 + v.p / 100)) },
        ],
      },
      {
        id: "proportii", name: "Regula de Trei Simplă", description: "Dacă A→B, atunci C→?",
        formula: "X = (B × C) / A",
        explanation: "Regula de trei rezolvă proporții directe: dacă A corespunde lui B, atunci C corespunde lui X = B×C/A. Se aplică la rețete culinare (scalarea ingredientelor), conversii valutare, estimări de costuri, calcule de viteză-timp-distanță. Proporția inversă: X = A×B/C. Proporționalitatea directă înseamnă că raportul rămâne constant: A/B = C/X. Este una dintre cele mai utile formule din viața de zi cu zi.",
        inputs: [{ key: "a", label: "A", default: 5 }, { key: "b", label: "B", default: 10 }, { key: "c", label: "C", default: 8 }],
        calculate: (v) => [
          { label: "X (directă)", value: v.a ? fmt(v.b * v.c / v.a) : "—" },
          { label: "X (inversă)", value: v.c ? fmt(v.a * v.b / v.c) : "—" },
        ],
      },
      {
        id: "cmmdc", name: "CMMDC și CMMMC", description: "Cel mai mare div. comun & cel mai mic multiplu comun",
        formula: "CMMDC: algoritmul lui Euclid; CMMMC = |a×b| / CMMDC(a,b)",
        explanation: "CMMDC(a,b) este cel mai mare număr care divide atât a cât și b. Se calculează prin algoritmul lui Euclid: se împarte a la b, apoi b la rest, repetat până rest=0. Ultimul rest nenul = CMMDC. CMMMC este cel mai mic număr divisibil cu ambele. Se folosesc la simplificarea fracțiilor, aducerea la numitor comun, probleme de periodicitate. CMMDC(a,b) × CMMMC(a,b) = |a×b|.",
        inputs: [{ key: "a", label: "A", default: 24 }, { key: "b", label: "B", default: 36 }],
        calculate: (v) => [
          { label: "CMMDC", value: fmt(gcd(v.a, v.b)) },
          { label: "CMMMC", value: fmt(lcm(v.a, v.b)) },
          { label: "a×b", value: fmt(v.a * v.b) },
        ],
      },
      {
        id: "medii", name: "Medii (Ma, Mg, Mh)", description: "Media aritmetică, geometrică, armonică",
        formula: "Ma=(a+b)/2; Mg=√(ab); Mh=2ab/(a+b)",
        explanation: "Cele trei medii clasice satisfac inegalitatea Mh ≤ Mg ≤ Ma (cu egalitate doar când a=b). Media aritmetică este cea mai folosită. Media geometrică se aplică la rate de creștere și randamente financiare. Media armonică se folosește pentru viteze medii pe distanțe egale. Alte medii: media pătratică √((a²+b²)/2) și media ponderată. Relația fundamentală: Mg² = Ma × Mh.",
        inputs: [{ key: "a", label: "a", default: 4 }, { key: "b", label: "b", default: 16 }],
        calculate: (v) => [
          { label: "Aritmetică", value: fmt((v.a + v.b) / 2) },
          { label: "Geometrică", value: fmt(Math.sqrt(Math.abs(v.a * v.b))) },
          { label: "Armonică", value: v.a + v.b ? fmt(2 * v.a * v.b / (v.a + v.b)) : "—" },
          { label: "Pătratică", value: fmt(Math.sqrt((v.a ** 2 + v.b ** 2) / 2)) },
        ],
      },
      {
        id: "fractii", name: "Operații cu Fracții", description: "Adunare, scădere, înmulțire, împărțire",
        formula: "a/b + c/d = (ad+bc)/bd; a/b × c/d = ac/bd",
        explanation: "Fracțiile reprezintă părți dintr-un întreg. Pentru adunare/scădere se aduce la numitor comun (bd), apoi se operează numărătorii. Pentru înmulțire se înmulțesc separat. Pentru împărțire se inversează și se înmulțește. Simplificarea: se împarte la CMMDC. Fracție ireductibilă: CMMDC(numărător, numitor) = 1. Conversie la zecimal: se face împărțirea. Fracții echivalente: a/b = (a×k)/(b×k).",
        inputs: [{ key: "a", label: "a (sus)", default: 1 }, { key: "b", label: "b (jos)", default: 3 }, { key: "c", label: "c (sus)", default: 2 }, { key: "d", label: "d (jos)", default: 5 }],
        calculate: (v) => {
          if (!v.b || !v.d) return [{ label: "Eroare", value: "Numitor = 0" }];
          const den = v.b * v.d;
          return [
            { label: "Adunare", value: simplify(v.a * v.d + v.c * v.b, den) },
            { label: "Scădere", value: simplify(v.a * v.d - v.c * v.b, den) },
            { label: "Înmulțire", value: simplify(v.a * v.c, den) },
            { label: "Împărțire", value: v.c ? simplify(v.a * v.d, v.b * v.c) : "—" },
            { label: "a/b zecimal", value: fmt(v.a / v.b) },
          ];
        },
      },
      {
        id: "puteri", name: "Puteri și Radicali", description: "a^n și rădăcina de ordin n",
        formula: "aⁿ = a × a × ... × a; ⁿ√a = a^(1/n)",
        explanation: "Puterea a^n = a înmulțit de n ori cu sine. Proprietăți: a^m × a^n = a^(m+n), (a^m)^n = a^(mn), a^0 = 1, a^(-n) = 1/a^n. Radicalul de ordin n este operația inversă: ⁿ√a = a^(1/n). Radicali: √(ab) = √a × √b, √(a/b) = √a/√b. Raționalizarea numitorului: a/√b = a√b/b. Exponenții fracționari: a^(m/n) = ⁿ√(a^m).",
        inputs: [{ key: "a", label: "Baza", default: 2 }, { key: "n", label: "Exponent", default: 10 }],
        calculate: (v) => [
          { label: `${fmt(v.a)}^${fmt(v.n)}`, value: fmt(Math.pow(v.a, v.n)) },
          { label: `Radical ordin ${fmt(v.n)}`, value: v.a >= 0 ? fmt(Math.pow(v.a, 1 / v.n)) : "—" },
          { label: `${fmt(v.a)}^(-${fmt(v.n)})`, value: fmt(Math.pow(v.a, -v.n)) },
        ],
      },
      {
        id: "factorizare", name: "Factorizare Numere Prime", description: "Descompunere în factori primi",
        formula: "n = p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ",
        explanation: "Teorema fundamentală a aritmeticii: orice n > 1 se scrie unic ca produs de puteri de numere prime. Se împarte succesiv la cel mai mic prim care divide n. Numărul de divizori d(n) = ∏(aᵢ+1). Suma divizorilor σ(n) = ∏(p^(a+1)-1)/(p-1). Se folosește în criptografie RSA, simplificarea fracțiilor, CMMDC/CMMMC.",
        inputs: [{ key: "n", label: "Număr", default: 360, min: 2 }],
        calculate: (v) => {
          const n = Math.abs(Math.round(v.n));
          if (n < 2) return [{ label: "Factorizare", value: fmt(n) }];
          const f = primeFactors(n);
          const c: Record<number, number> = {};
          f.forEach(x => c[x] = (c[x] || 0) + 1);
          return [
            { label: "Factorizare", value: Object.entries(c).map(([p, e]) => e > 1 ? `${p}^${e}` : p).join(" × ") },
            { label: "Nr. divizori", value: fmt(Object.values(c).reduce((a, e) => a * (e + 1), 1)) },
            { label: "Factori primi", value: Object.keys(c).join(", ") },
          ];
        },
      },
      {
        id: "numar_prim", name: "Verificare Număr Prim", description: "Verifică dacă un număr este prim",
        formula: "n este prim dacă n > 1 și nu are alți div. decât 1 și n",
        explanation: "Un număr prim are exact 2 divizori: 1 și el însuși. Se verifică divisibilitatea cu numerele de la 2 la √n. Primele prime: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. Există infinit de numere prime (demonstrat de Euclid). Numerele prime sunt baza criptografiei moderne RSA. Ciurul lui Eratostene găsește toate primele până la N în O(N log log N).",
        inputs: [{ key: "n", label: "Număr", default: 97, min: 1 }],
        calculate: (v) => {
          const n = Math.abs(Math.round(v.n));
          let next = n + 1; while (!isPrime(next) && next < n + 1000) next++;
          let prev = n - 1; while (prev > 1 && !isPrime(prev)) prev--;
          return [
            { label: "Este prim?", value: isPrime(n) ? "DA ✓" : "NU ✗" },
            { label: "Următorul prim", value: fmt(next) },
            { label: "Precedentul prim", value: prev > 1 ? fmt(prev) : "—" },
          ];
        },
      },
      {
        id: "rotunjiri", name: "Rotunjiri", description: "Floor, ceil, round, trunchiere",
        formula: "⌊x⌋ = floor; ⌈x⌉ = ceil; [x] = round",
        explanation: "Floor (parte întreagă inferioară): cel mai mare întreg ≤ x. Ceil: cel mai mic întreg ≥ x. Round: rotunjire la cel mai apropiat întreg. Trunchiere: eliminarea zecimalelor fără rotunjire. Floor(-2.3) = -3, Ceil(-2.3) = -2, Trunc(-2.3) = -2. Se folosesc în programare, grafică, discretizare, indexare.",
        inputs: [{ key: "x", label: "x", default: 3.7, step: 0.1 }],
        calculate: (v) => [
          { label: "Floor ⌊x⌋", value: fmt(Math.floor(v.x)) },
          { label: "Ceil ⌈x⌉", value: fmt(Math.ceil(v.x)) },
          { label: "Round [x]", value: fmt(Math.round(v.x)) },
          { label: "Trunchiere", value: fmt(Math.trunc(v.x)) },
        ],
      },
      {
        id: "operatii_baza", name: "Operații de Bază", description: "Adunare, scădere, înmulțire, împărțire",
        formula: "a+b, a-b, a×b, a÷b",
        explanation: "Cele patru operații fundamentale ale aritmeticii. Adunarea este comutativă (a+b=b+a) și asociativă. Înmulțirea distribuie peste adunare: a(b+c) = ab+ac. Împărțirea: a÷b = a×(1/b). Împărțirea cu rest: a = b×q + r, unde 0 ≤ r < b. Ordinea operațiilor: paranteze → puteri → înmulțire/împărțire → adunare/scădere.",
        inputs: [{ key: "a", label: "a", default: 42 }, { key: "b", label: "b", default: 7 }],
        calculate: (v) => [
          { label: "a + b", value: fmt(v.a + v.b) },
          { label: "a − b", value: fmt(v.a - v.b) },
          { label: "a × b", value: fmt(v.a * v.b) },
          { label: "a ÷ b", value: v.b ? fmt(v.a / v.b) : "—" },
          { label: "Rest (a mod b)", value: v.b ? fmt(v.a % v.b) : "—" },
        ],
      },
      {
        id: "suma_cifre", name: "Suma Cifrelor", description: "Suma cifrelor și produsul cifrelor unui număr",
        formula: "S = Σ cifrele lui n",
        explanation: "Suma cifrelor se obține adunând fiecare cifră a numărului. Un număr e divisibil cu 3 dacă suma cifrelor e div. cu 3. Div. cu 9: suma cifrelor div. cu 9. Rădăcina digitală = suma cifrelor repetată până la o cifră = 1 + (n-1) mod 9. Se folosește la verificarea calculelor, teste de divisibilitate, numere harshad.",
        inputs: [{ key: "n", label: "Număr", default: 12345 }],
        calculate: (v) => {
          const digits = Math.abs(Math.round(v.n)).toString().split("").map(Number);
          const sum = digits.reduce((s, d) => s + d, 0);
          const prod = digits.reduce((s, d) => s * d, 1);
          let dr = Math.abs(Math.round(v.n));
          while (dr > 9) dr = dr.toString().split("").map(Number).reduce((s, d) => s + d, 0);
          return [
            { label: "Suma cifrelor", value: fmt(sum) },
            { label: "Produsul cifrelor", value: fmt(prod) },
            { label: "Nr. cifre", value: fmt(digits.length) },
            { label: "Rădăcina digitală", value: fmt(dr) },
          ];
        },
      },
    ],
  },

  // ═══ ALGEBRĂ ═══
  {
    id: "algebra", name: "Algebră", description: "Ecuații, sisteme, progresii, logaritmi, numere complexe",
    color: "hsl(260,65%,55%)",
    calculators: [
      {
        id: "ec_grad1", name: "Ecuație Grad 1", description: "ax + b = 0",
        formula: "x = -b / a",
        explanation: "Ecuația de gradul 1 are exact o soluție (dacă a≠0). Se izolează x prin trecerea termenului liber în dreapta și împărțirea la coeficientul lui x. Dacă a=0 și b=0, ecuația are infinit de soluții (identitate). Dacă a=0 și b≠0, ecuația este imposibilă (contradicție). Ecuațiile liniare modelează relații de proporționalitate directă. Graficul y=ax+b este o dreaptă cu panta a și interceptul b.",
        inputs: [{ key: "a", label: "a", default: 3 }, { key: "b", label: "b", default: -6 }],
        calculate: (v) => [{ label: "x", value: v.a ? fmt(-v.b / v.a) : v.b === 0 ? "∀x ∈ ℝ" : "∅" }],
      },
      {
        id: "ec_grad2", name: "Ecuație Grad 2", description: "ax² + bx + c = 0",
        formula: "x = (-b ± √Δ) / 2a, Δ = b² - 4ac",
        explanation: "Discriminantul Δ determină natura soluțiilor: Δ>0 → 2 soluții reale distincte, Δ=0 → soluție dublă, Δ<0 → 2 soluții complexe conjugate. Relațiile lui Viète: x₁+x₂ = -b/a, x₁·x₂ = c/a. Forma canonică: a(x-x₀)²+y₀ unde x₀=-b/(2a), y₀=f(x₀). Parabola are vârf în (x₀, y₀). Se folosește în fizică (mișcarea parabolică), economie, optimizare.",
        inputs: [{ key: "a", label: "a", default: 1 }, { key: "b", label: "b", default: -5 }, { key: "c", label: "c", default: 6 }],
        calculate: (v) => {
          if (!v.a) return [{ label: "Eroare", value: "a ≠ 0" }];
          const d = v.b ** 2 - 4 * v.a * v.c;
          if (d > 0) return [
            { label: "Δ", value: fmt(d) + " > 0" },
            { label: "x₁", value: fmt((-v.b + Math.sqrt(d)) / (2 * v.a)) },
            { label: "x₂", value: fmt((-v.b - Math.sqrt(d)) / (2 * v.a)) },
            { label: "x₁+x₂", value: fmt(-v.b / v.a) },
            { label: "x₁·x₂", value: fmt(v.c / v.a) },
          ];
          if (d === 0) return [{ label: "Δ", value: "0" }, { label: "x (dublu)", value: fmt(-v.b / (2 * v.a)) }];
          return [
            { label: "Δ", value: fmt(d) + " < 0" },
            { label: "x₁", value: `${fmt(-v.b / (2 * v.a))} + ${fmt(Math.sqrt(-d) / (2 * v.a))}i` },
            { label: "x₂", value: `${fmt(-v.b / (2 * v.a))} - ${fmt(Math.sqrt(-d) / (2 * v.a))}i` },
          ];
        },
      },
      {
        id: "ec_grad3", name: "Ecuație Grad 3 (Cardano)", description: "x³ + px + q = 0 (formă redusă)",
        formula: "Δ = (q/2)² + (p/3)³; Cardano",
        explanation: "Ecuația cubică x³+px+q=0 se rezolvă cu formula lui Cardano. Discriminantul Δ=(q/2)²+(p/3)³ determină natura rădăcinilor: Δ>0 → o rădăcină reală + 2 complexe, Δ=0 → toate reale (minim 2 egale), Δ<0 → 3 rădăcini reale distincte (casus irreducibilis). Orice ecuație ax³+bx²+cx+d=0 se poate reduce prin substituția x=t-b/(3a). Are întotdeauna cel puțin o rădăcină reală.",
        inputs: [{ key: "p", label: "p", default: -15 }, { key: "q", label: "q", default: -126 }],
        calculate: (v) => {
          const D = (v.q / 2) ** 2 + (v.p / 3) ** 3;
          if (D > 0) {
            const u = Math.cbrt(-v.q / 2 + Math.sqrt(D));
            const w = Math.cbrt(-v.q / 2 - Math.sqrt(D));
            return [
              { label: "Δ", value: fmt(D) + " > 0" },
              { label: "x₁ (reală)", value: fmt(u + w) },
              { label: "Tip", value: "1 reală + 2 complexe" },
            ];
          }
          return [
            { label: "Δ", value: fmt(D) + (D === 0 ? " = 0" : " < 0") },
            { label: "Tip", value: D === 0 ? "Rădăcini reale (min 2 egale)" : "3 rădăcini reale distincte" },
          ];
        },
      },
      {
        id: "sisteme_2x2", name: "Sistem 2×2 (Cramer)", description: "ax+by=e, cx+dy=f",
        formula: "x = (ed-bf)/(ad-bc), y = (af-ce)/(ad-bc)",
        explanation: "Metoda Cramer folosește determinanți: D=ad-bc. Dacă D≠0, sistemul are soluție unică. D=0 → incompatibil sau nedeterminat. Interpretare geometrică: 2 drepte în plan — se intersectează (soluție unică), sunt paralele (incompatibil) sau coincid (infinit de soluții). Metode alternative: substituție, reducere, Gauss. Se aplică în circuite electrice, echilibre chimice, economie.",
        inputs: [{ key: "a", label: "a", default: 2 }, { key: "b", label: "b", default: 3 }, { key: "e", label: "= e", default: 8 }, { key: "c", label: "c", default: 1 }, { key: "d", label: "d", default: -1 }, { key: "f", label: "= f", default: 1 }],
        calculate: (v) => {
          const D = v.a * v.d - v.b * v.c;
          if (!D) return [{ label: "Sistem", value: "D=0 → incompatibil/nedeterminat" }];
          return [
            { label: "det(A)", value: fmt(D) },
            { label: "x", value: fmt((v.e * v.d - v.b * v.f) / D) },
            { label: "y", value: fmt((v.a * v.f - v.e * v.c) / D) },
          ];
        },
      },
      {
        id: "sisteme_3x3", name: "Sistem 3×3 (Cramer)", description: "3 ecuații cu 3 necunoscute",
        formula: "x = Dx/D, y = Dy/D, z = Dz/D",
        explanation: "Sistemul 3×3 se rezolvă cu Cramer: se calculează determinantul D și determinanții Dx, Dy, Dz (înlocuind coloanele cu termenii liberi). Dacă D≠0, soluția este unică. Formula Sarrus pentru determinanți 3×3. Metoda Gauss (eliminare) este mai eficientă computațional. Se aplică în 3D: intersecția a 3 plane, sisteme de forțe, circuite complexe.",
        inputs: [
          { key: "a1", label: "a₁", default: 2 }, { key: "b1", label: "b₁", default: 1 }, { key: "c1", label: "c₁", default: -1 }, { key: "d1", label: "= d₁", default: 8 },
          { key: "a2", label: "a₂", default: -3 }, { key: "b2", label: "b₂", default: -1 }, { key: "c2", label: "c₂", default: 2 }, { key: "d2", label: "= d₂", default: -11 },
          { key: "a3", label: "a₃", default: -2 }, { key: "b3", label: "b₃", default: 1 }, { key: "c3", label: "c₃", default: 2 }, { key: "d3", label: "= d₃", default: -3 },
        ],
        calculate: (v) => {
          const det = (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) =>
            a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
          const D = det(v.a1, v.b1, v.c1, v.a2, v.b2, v.c2, v.a3, v.b3, v.c3);
          if (!D) return [{ label: "Sistem", value: "D=0" }];
          const Dx = det(v.d1, v.b1, v.c1, v.d2, v.b2, v.c2, v.d3, v.b3, v.c3);
          const Dy = det(v.a1, v.d1, v.c1, v.a2, v.d2, v.c2, v.a3, v.d3, v.c3);
          const Dz = det(v.a1, v.b1, v.d1, v.a2, v.b2, v.d2, v.a3, v.b3, v.d3);
          return [
            { label: "D", value: fmt(D) },
            { label: "x", value: fmt(Dx / D) },
            { label: "y", value: fmt(Dy / D) },
            { label: "z", value: fmt(Dz / D) },
          ];
        },
      },
      {
        id: "progresie_a", name: "Progresie Aritmetică", description: "Termen general și sumă",
        formula: "aₙ = a₁ + (n-1)·r; Sₙ = n·(a₁+aₙ)/2",
        explanation: "În progresie aritmetică fiecare termen crește cu rația r constantă. Termenul general: aₙ = a₁+(n-1)r. Suma: Sₙ = n(a₁+aₙ)/2 = n(2a₁+(n-1)r)/2. Proprietatea mediei: aₙ = (aₙ₋₁+aₙ₊₁)/2. Exemple: numere pare (r=2), numere impare (r=2). Se aplică în amortizarea liniară, salarii cu mărire fixă, problema lui Gauss (suma primelor n numere).",
        inputs: [{ key: "a1", label: "a₁", default: 2 }, { key: "r", label: "Rația (r)", default: 3 }, { key: "n", label: "n", default: 10 }],
        calculate: (v) => {
          const an = v.a1 + (v.n - 1) * v.r;
          return [
            { label: `a${fmt(v.n)}`, value: fmt(an) },
            { label: `S${fmt(v.n)}`, value: fmt(v.n * (v.a1 + an) / 2) },
            { label: "a₅", value: fmt(v.a1 + 4 * v.r) },
          ];
        },
      },
      {
        id: "progresie_g", name: "Progresie Geometrică", description: "Termen general, sumă, sumă infinită",
        formula: "aₙ = a₁·qⁿ⁻¹; Sₙ = a₁·(qⁿ-1)/(q-1)",
        explanation: "În progresie geometrică fiecare termen se înmulțește cu rația q. Termenul general: aₙ=a₁·q^(n-1). Suma: Sₙ=a₁(qⁿ-1)/(q-1). Dacă |q|<1, seria converge: S∞=a₁/(1-q). Proprietatea mediei geometrice: aₙ²=aₙ₋₁·aₙ₊₁. Exemple: dobânda compusă, creșterea populației, fractali. Suma infinită apare în fizică (reflexii multiple).",
        inputs: [{ key: "a1", label: "a₁", default: 2 }, { key: "q", label: "Rația (q)", default: 3 }, { key: "n", label: "n", default: 5 }],
        calculate: (v) => {
          const an = v.a1 * Math.pow(v.q, v.n - 1);
          const sn = v.q !== 1 ? v.a1 * (Math.pow(v.q, v.n) - 1) / (v.q - 1) : v.a1 * v.n;
          const r = [{ label: `a${fmt(v.n)}`, value: fmt(an) }, { label: `S${fmt(v.n)}`, value: fmt(sn) }];
          if (Math.abs(v.q) < 1) r.push({ label: "S∞", value: fmt(v.a1 / (1 - v.q)) });
          return r;
        },
      },
      {
        id: "logaritmi", name: "Logaritmi", description: "log_b(x) în diverse baze",
        formula: "log_b(x) = ln(x) / ln(b)",
        explanation: "Logaritmul log_b(x)=n înseamnă b^n=x. Proprietăți: log(a·b)=log(a)+log(b), log(a/b)=log(a)-log(b), log(a^n)=n·log(a). Schimbarea bazei: log_b(x)=ln(x)/ln(b). Logaritmul natural ln(x) are baza e≈2.718. Logaritmul zecimal log₁₀ se folosește în decibeli, scala Richter, pH. Inversa: b^(log_b(x))=x.",
        inputs: [{ key: "x", label: "x", default: 100, min: 0.001 }, { key: "b", label: "Baza", default: 10, min: 0.001 }],
        calculate: (v) => [
          { label: `log${fmt(v.b)}(${fmt(v.x)})`, value: v.x > 0 && v.b > 0 && v.b !== 1 ? fmt(Math.log(v.x) / Math.log(v.b)) : "—" },
          { label: `ln(${fmt(v.x)})`, value: v.x > 0 ? fmt(Math.log(v.x)) : "—" },
          { label: `log₁₀(${fmt(v.x)})`, value: v.x > 0 ? fmt(Math.log10(v.x)) : "—" },
          { label: `log₂(${fmt(v.x)})`, value: v.x > 0 ? fmt(Math.log2(v.x)) : "—" },
        ],
      },
      {
        id: "nr_complexe", name: "Numere Complexe", description: "z = a + bi: operații, modul, argument",
        formula: "(a+bi)·(c+di) = (ac-bd) + (ad+bc)i",
        explanation: "Numerele complexe z=a+bi, unde i²=-1. Modulul |z|=√(a²+b²). Argumentul arg(z)=arctan(b/a). Conjugatul z̄=a-bi. Forma trigonometrică: z=r(cosθ+i·sinθ). Formula lui Euler: e^(iθ)=cosθ+i·sinθ. Modulul produsului = produsul modulelor. Argumentul produsului = suma argumentelor. Se folosesc în electrotehnica (curent alternativ), mecanica cuantică, procesarea semnalelor.",
        inputs: [{ key: "a", label: "a", default: 3 }, { key: "b", label: "b (·i)", default: 4 }, { key: "c", label: "c", default: 1 }, { key: "d", label: "d (·i)", default: -2 }],
        calculate: (v) => [
          { label: "z₁ + z₂", value: `${fmt(v.a + v.c)} + ${fmt(v.b + v.d)}i` },
          { label: "z₁ × z₂", value: `${fmt(v.a * v.c - v.b * v.d)} + ${fmt(v.a * v.d + v.b * v.c)}i` },
          { label: "|z₁|", value: fmt(Math.sqrt(v.a ** 2 + v.b ** 2)) },
          { label: "arg(z₁) °", value: fmt(Math.atan2(v.b, v.a) * 180 / PI) },
          { label: "|z₂|", value: fmt(Math.sqrt(v.c ** 2 + v.d ** 2)) },
        ],
      },
      {
        id: "inecuatie_g1", name: "Inecuație Grad 1", description: "ax + b > 0",
        formula: "ax + b > 0 ⟹ x > -b/a (a>0) sau x < -b/a (a<0)",
        explanation: "La înmulțirea cu un număr negativ, semnul inecuației se schimbă. Soluția este un interval: (−∞, x₀) sau (x₀, +∞). Reuniunea și intersecția intervalelor rezolvă inecuații compuse. Inecuațiile apar în probleme de optimizare, constrângeri, domenii de definiție. |ax+b|>c se descompune în ax+b>c SAU ax+b<-c.",
        inputs: [{ key: "a", label: "a", default: 2 }, { key: "b", label: "b", default: -6 }],
        calculate: (v) => {
          if (!v.a) return [{ label: "Soluție", value: v.b > 0 ? "∀x ∈ ℝ" : "∅" }];
          const x0 = -v.b / v.a;
          return [
            { label: "Punct critic", value: fmt(x0) },
            { label: "ax+b > 0", value: v.a > 0 ? `x > ${fmt(x0)}` : `x < ${fmt(x0)}` },
            { label: "ax+b ≥ 0", value: v.a > 0 ? `x ≥ ${fmt(x0)}` : `x ≤ ${fmt(x0)}` },
          ];
        },
      },
      {
        id: "inecuatie_g2", name: "Inecuație Grad 2", description: "ax² + bx + c > 0",
        formula: "Se analizează semnul parabola folosind Δ",
        explanation: "Se calculează rădăcinile x₁, x₂ din ax²+bx+c=0. Dacă a>0, parabola e în sus: ax²+bx+c>0 pe (-∞,x₁)∪(x₂,+∞). Dacă a<0, parabola e în jos: ax²+bx+c>0 pe (x₁,x₂). Δ<0 și a>0: expresia e mereu pozitivă. Se rezolvă cu tabel de semne. Apare în optimizare, domenii ale funcțiilor iraționale.",
        inputs: [{ key: "a", label: "a", default: 1 }, { key: "b", label: "b", default: -3 }, { key: "c", label: "c", default: 2 }],
        calculate: (v) => {
          if (!v.a) return [{ label: "Eroare", value: "a ≠ 0" }];
          const d = v.b ** 2 - 4 * v.a * v.c;
          if (d < 0) return [
            { label: "Δ", value: fmt(d) + " < 0" },
            { label: "ax²+bx+c > 0", value: v.a > 0 ? "∀x ∈ ℝ" : "∅" },
          ];
          const x1 = (-v.b - Math.sqrt(d)) / (2 * v.a), x2 = (-v.b + Math.sqrt(d)) / (2 * v.a);
          return [
            { label: "Δ", value: fmt(d) },
            { label: "x₁", value: fmt(Math.min(x1, x2)) },
            { label: "x₂", value: fmt(Math.max(x1, x2)) },
            { label: "> 0", value: v.a > 0 ? `(-∞,${fmt(Math.min(x1, x2))})∪(${fmt(Math.max(x1, x2))},+∞)` : `(${fmt(Math.min(x1, x2))},${fmt(Math.max(x1, x2))})` },
          ];
        },
      },
      {
        id: "polinom_eval", name: "Evaluare Polinom (grad 3)", description: "f(x) = ax³ + bx² + cx + d",
        formula: "Horner: ((a·x+b)·x+c)·x+d",
        explanation: "Schema lui Horner optimizează calculul polinomului: ((a·x+b)·x+c)·x+d — doar n înmulțiri și n adunări (vs. metoda directă). Derivata: f'(x) = 3ax²+2bx+c. Împărțirea la (x-r): algoritmul Ruffini. Teorema restului: restul împărțirii la (x-r) = f(r). Un polinom de grad n are exact n rădăcini în ℂ.",
        inputs: [{ key: "a", label: "a (x³)", default: 1 }, { key: "b", label: "b (x²)", default: -2 }, { key: "c", label: "c (x)", default: 1 }, { key: "d", label: "d", default: 0 }, { key: "x", label: "x", default: 3 }],
        calculate: (v) => [
          { label: "f(x)", value: fmt(v.a * v.x ** 3 + v.b * v.x ** 2 + v.c * v.x + v.d) },
          { label: "f'(x)", value: fmt(3 * v.a * v.x ** 2 + 2 * v.b * v.x + v.c) },
          { label: "f''(x)", value: fmt(6 * v.a * v.x + 2 * v.b) },
        ],
      },
      {
        id: "valoare_abs", name: "Ecuație cu Modul", description: "|ax + b| = c",
        formula: "|ax+b|=c ⟹ ax+b=c sau ax+b=-c",
        explanation: "Valoarea absolută |x| = distanța de la x la 0 pe axă. |ax+b|=c are 2 soluții (c>0), 1 (c=0), niciuna (c<0). |ax+b|<c ⟺ -c<ax+b<c. |ax+b|>c ⟺ ax+b>c sau ax+b<-c. Proprietăți: |a·b|=|a|·|b|, |a+b|≤|a|+|b| (inegalitatea triunghiului). Se folosește la distanțe, erori, toleranțe.",
        inputs: [{ key: "a", label: "a", default: 2 }, { key: "b", label: "b", default: -3 }, { key: "c", label: "c", default: 5 }],
        calculate: (v) => {
          if (v.c < 0) return [{ label: "Soluție", value: "∅ (c < 0)" }];
          if (!v.a) return [{ label: "Soluție", value: Math.abs(v.b) === v.c ? "∀x ∈ ℝ" : "∅" }];
          if (v.c === 0) return [{ label: "x", value: fmt(-v.b / v.a) }];
          return [
            { label: "x₁", value: fmt((v.c - v.b) / v.a) },
            { label: "x₂", value: fmt((-v.c - v.b) / v.a) },
          ];
        },
      },
      {
        id: "ec_exponentiala", name: "Ecuație Exponențială", description: "a^x = b",
        formula: "a^x = b ⟹ x = log_a(b) = ln(b)/ln(a)",
        explanation: "Ecuația exponențială a^x=b se rezolvă logaritmând: x=log_a(b). Condiții: a>0, a≠1, b>0. Funcția exponențială f(x)=a^x este strict crescătoare (a>1) sau descrescătoare (0<a<1). Baza naturală e≈2.718: e^x este derivata sa proprie. Se aplică în creșterea populației, dezintegrarea radioactivă, dobânda compusă, curbe de învățare.",
        inputs: [{ key: "a", label: "Baza (a)", default: 2 }, { key: "b", label: "Rezultat (b)", default: 1024 }],
        calculate: (v) => [
          { label: "x = log_a(b)", value: v.a > 0 && v.a !== 1 && v.b > 0 ? fmt(Math.log(v.b) / Math.log(v.a)) : "—" },
          { label: "Verificare a^x", value: v.a > 0 && v.a !== 1 && v.b > 0 ? fmt(Math.pow(v.a, Math.log(v.b) / Math.log(v.a))) : "—" },
        ],
      },
      {
        id: "dobanda_compusa", name: "Dobândă Compusă", description: "A = P(1 + r/n)^(nt)",
        formula: "A = P·(1 + r/n)^(nt)",
        explanation: "Capital final A cu dobândă compusă: P=capital inițial, r=rata anuală (ex: 0.05), n=nr. capitalizări/an, t=ani. Dobânda compusă vs simplă: compusă crește exponențial, simplă crește liniar. Regula lui 72: timpul de dublare ≈ 72/r%. Se aplică în credite, investiții, inflație. Valoarea prezentă: P = A/(1+r/n)^(nt).",
        inputs: [{ key: "P", label: "Capital (P)", default: 10000 }, { key: "r", label: "Rată anuală", default: 0.05, step: 0.01 }, { key: "n", label: "Capitalizări/an", default: 12 }, { key: "t", label: "Ani", default: 10 }],
        calculate: (v) => {
          const A = v.P * Math.pow(1 + v.r / v.n, v.n * v.t);
          return [
            { label: "Capital final", value: fmt(A) },
            { label: "Dobândă totală", value: fmt(A - v.P) },
            { label: "Timp dublare", value: fmt(72 / (v.r * 100)) + " ani" },
          ];
        },
      },
      {
        id: "ec_biquadratica", name: "Ecuație Biquadratică", description: "ax⁴ + bx² + c = 0",
        formula: "Se substituie t=x² → at²+bt+c=0",
        explanation: "Ecuația biquadratică ax⁴+bx²+c=0 se rezolvă prin substituția t=x². Se obține ecuația de grad 2: at²+bt+c=0. Soluțiile t₁,t₂ dau x=±√t (doar dacă t≥0). Poate avea 0, 2 sau 4 soluții reale. Se aplică în fizică (oscilații neliniare), optică, mecanică.",
        inputs: [{ key: "a", label: "a", default: 1 }, { key: "b", label: "b", default: -5 }, { key: "c", label: "c", default: 4 }],
        calculate: (v) => {
          if (!v.a) return [{ label: "Eroare", value: "a ≠ 0" }];
          const d = v.b ** 2 - 4 * v.a * v.c;
          if (d < 0) return [{ label: "Δ", value: fmt(d) + " < 0" }, { label: "Soluții reale", value: "0" }];
          const t1 = (-v.b + Math.sqrt(d)) / (2 * v.a), t2 = (-v.b - Math.sqrt(d)) / (2 * v.a);
          const sols: string[] = [];
          if (t1 >= 0) { sols.push(`±${fmt(Math.sqrt(t1))}`); }
          if (t2 >= 0 && Math.abs(t2 - t1) > 1e-10) { sols.push(`±${fmt(Math.sqrt(t2))}`); }
          return [
            { label: "Δ", value: fmt(d) },
            { label: "t₁", value: fmt(t1) }, { label: "t₂", value: fmt(t2) },
            { label: "Soluții x", value: sols.length ? sols.join(", ") : "∅ (t<0)" },
          ];
        },
      },
      {
        id: "ec_irationala", name: "Ecuație Irațională", description: "√(ax+b) = c",
        formula: "√(ax+b) = c → ax+b = c² (c≥0)",
        explanation: "Se ridică ambii membri la pătrat: ax+b=c². Condiții: c≥0 și ax+b≥0. Se verifică obligatoriu soluția în ecuația inițială (pot apărea soluții false). Se aplică în fizică (cinematică), geometrie (distanțe), optimizare.",
        inputs: [{ key: "a", label: "a", default: 2 }, { key: "b", label: "b", default: 3 }, { key: "c", label: "c", default: 3 }],
        calculate: (v) => {
          if (v.c < 0) return [{ label: "Soluție", value: "∅ (c < 0)" }];
          if (!v.a) return [{ label: "Soluție", value: Math.sqrt(v.b) === v.c ? "∀x" : "∅" }];
          const x = (v.c ** 2 - v.b) / v.a;
          const check = v.a * x + v.b;
          const valid = check >= 0 && Math.abs(Math.sqrt(check) - v.c) < 1e-9;
          return [
            { label: "x candidat", value: fmt(x) },
            { label: "Verificare", value: valid ? "✓ Valid" : "✗ Soluție falsă" },
          ];
        },
      },
    ],
  },

  // ═══ GEOMETRIE PLANĂ ═══
  {
    id: "geometrie_plana", name: "Geometrie Plană", description: "Arii, perimetre, distanțe, ecuații în plan",
    color: "hsl(150,60%,45%)",
    calculators: [
      {
        id: "triunghi", name: "Triunghi (Heron)", description: "Arie cu formula lui Heron",
        formula: "A = √[s(s-a)(s-b)(s-c)], s=(a+b+c)/2",
        explanation: "Formula lui Heron calculează aria doar din cele 3 laturi. Semiperimetrul s=(a+b+c)/2. Condiție de existență: suma oricăror 2 laturi > a treia (inegalitatea triunghiului). Aria = base×h/2. Centrul de greutate: intersecția medianelor, la 2/3 din vârf. Raza cercului înscris: r=A/s. Raza cercului circumscris: R=abc/(4A). Teorema sinusurilor: a/sinA = 2R.",
        inputs: [{ key: "a", label: "a", default: 3 }, { key: "b", label: "b", default: 4 }, { key: "c", label: "c", default: 5 }],
        calculate: (v) => {
          const p = v.a + v.b + v.c, s = p / 2;
          const area = Math.sqrt(Math.max(0, s * (s - v.a) * (s - v.b) * (s - v.c)));
          const R = v.a * v.b * v.c / (4 * area || 1);
          const r = area / (s || 1);
          return [
            { label: "Perimetru", value: fmt(p) }, { label: "Arie", value: fmt(area) },
            { label: "R circumscris", value: fmt(R) }, { label: "r înscris", value: fmt(r) },
          ];
        },
      },
      {
        id: "dreptunghi", name: "Dreptunghi", description: "Arie, perimetru, diagonală",
        formula: "A = L×l; P = 2(L+l); d = √(L²+l²)",
        explanation: "Dreptunghiul are laturile opuse egale și unghiuri drepte. Diagonala d=√(L²+l²) (Pitagora). Aria = lungime × lățime. Este un caz particular de paralelogram. Pătratul este un dreptunghi cu L=l. Se folosește la calculul suprafețelor, planimetrie, parcele de teren. Dreptunghiul de aur: L/l = φ ≈ 1.618.",
        inputs: [{ key: "L", label: "Lungime", default: 8 }, { key: "l", label: "Lățime", default: 5 }],
        calculate: (v) => [
          { label: "Arie", value: fmt(v.L * v.l) }, { label: "Perimetru", value: fmt(2 * (v.L + v.l)) },
          { label: "Diagonala", value: fmt(Math.sqrt(v.L ** 2 + v.l ** 2)) },
        ],
      },
      {
        id: "cerc", name: "Cerc", description: "Arie, circumferință, sector",
        formula: "A = πr²; C = 2πr",
        explanation: "Cercul cu raza r: aria πr², circumferința 2πr. Diametrul d=2r. π≈3.14159 este raportul circumferință/diametru. Sectorul de cerc cu unghi α: arie = αr²/2 (rad). Lungimea arcului = αr. Coarda: lungime = 2r·sin(α/2). Cercul este locul geometric al punctelor echidistante de centru. Ecuația: (x-a)²+(y-b)²=r².",
        inputs: [{ key: "r", label: "Raza", default: 5 }, { key: "alpha", label: "Unghi sector (°)", default: 90 }],
        calculate: (v) => {
          const ar = v.alpha * PI / 180;
          return [
            { label: "Arie cerc", value: fmt(PI * v.r ** 2) }, { label: "Circumferință", value: fmt(2 * PI * v.r) },
            { label: "Arie sector", value: fmt(ar * v.r ** 2 / 2) }, { label: "Lungime arc", value: fmt(ar * v.r) },
          ];
        },
      },
      {
        id: "trapez", name: "Trapez", description: "Arie, linie mijlocie",
        formula: "A = (B+b)·h/2; Lm = (B+b)/2",
        explanation: "Trapezul are două laturi paralele (bazele B și b). Aria = media aritmetică a bazelor × înălțimea. Linia mijlocie = (B+b)/2 este paralelă cu bazele. Trapezul isoscel are laturile nepaparele egale. Aria se mai poate calcula cu diagonalele: A=d₁d₂sin(α)/2. Se folosește în construcții, profiluri de drum, secțiuni transversale.",
        inputs: [{ key: "B", label: "Baza mare", default: 10 }, { key: "b", label: "Baza mică", default: 6 }, { key: "h", label: "Înălțime", default: 4 }],
        calculate: (v) => [
          { label: "Arie", value: fmt((v.B + v.b) * v.h / 2) },
          { label: "Linia mijlocie", value: fmt((v.B + v.b) / 2) },
        ],
      },
      {
        id: "paralelogram", name: "Paralelogram", description: "Arie, perimetru, diagonale",
        formula: "A = b×h; P = 2(a+b)",
        explanation: "Paralelogramul are laturile opuse paralele și egale. Aria = baza × înălțime. Diagonalele se înjumătățesc reciproc. Relația diagonalelor: d₁²+d₂² = 2(a²+b²). Cazuri particulare: dreptunghi (unghiuri drepte), romb (laturi egale), pătrat (ambele). Se folosește în fizică (vectori, paralelogramul forțelor), cristalografie.",
        inputs: [{ key: "a", label: "Latura a", default: 8 }, { key: "b", label: "Latura b", default: 5 }, { key: "h", label: "Înălțime", default: 4 }],
        calculate: (v) => [
          { label: "Arie", value: fmt(v.b * v.h) }, { label: "Perimetru", value: fmt(2 * (v.a + v.b)) },
        ],
      },
      {
        id: "romb", name: "Romb", description: "Arie din diagonale",
        formula: "A = d₁·d₂/2; l = √((d₁/2)²+(d₂/2)²)",
        explanation: "Rombul are toate 4 laturile egale. Diagonalele sunt perpendiculare și se înjumătățesc. Aria = produsul diagonalelor/2. Latura: l=√((d₁/2)²+(d₂/2)²). Perimetrul = 4l. Unghiuri: cos(α) = 1-2(d₁/(2l))². Rombul este un paralelogram cu laturi egale. Cazul particular: pătrat (d₁=d₂).",
        inputs: [{ key: "d1", label: "d₁", default: 6 }, { key: "d2", label: "d₂", default: 8 }],
        calculate: (v) => {
          const l = Math.sqrt((v.d1 / 2) ** 2 + (v.d2 / 2) ** 2);
          return [
            { label: "Arie", value: fmt(v.d1 * v.d2 / 2) }, { label: "Latura", value: fmt(l) },
            { label: "Perimetru", value: fmt(4 * l) },
          ];
        },
      },
      {
        id: "hexagon", name: "Hexagon Regulat", description: "Arie, perimetru, apotema",
        formula: "A = (3√3/2)·a²; P = 6a",
        explanation: "Hexagonul regulat se compune din 6 triunghiuri echilaterale. Apotema = a√3/2. Are simetrie de ordine 6. Diagonala mare = 2a. Se găsește în natură (fagurele de albine) și chimie (benzen). Unghiul interior = 120°. Pavarea planului cu hexagoane este optimă (cea mai mică perimetru la arie dată). Se folosește în rețele celulare.",
        inputs: [{ key: "a", label: "Latura", default: 5 }],
        calculate: (v) => [
          { label: "Arie", value: fmt(3 * Math.sqrt(3) / 2 * v.a ** 2) },
          { label: "Perimetru", value: fmt(6 * v.a) },
          { label: "Apotema", value: fmt(v.a * Math.sqrt(3) / 2) },
        ],
      },
      {
        id: "pentagon", name: "Pentagon Regulat", description: "Arie, perimetru",
        formula: "A = (a²/4)·√(25+10√5); P = 5a",
        explanation: "Pentagonul regulat are 5 laturi egale și unghiuri interioare de 108°. Apare în natură (stele de mare) și geometria sacră. Diagonala/latura = φ (secțiunea de aur). Nu se poate construi prin pavaj periodic (dar apare în cvasi-cristale Penrose). Arie = (5/4)a²·cot(π/5). Se folosește în designul logo-urilor, arhitectura Pentagon.",
        inputs: [{ key: "a", label: "Latura", default: 5 }],
        calculate: (v) => [
          { label: "Arie", value: fmt(v.a ** 2 / 4 * Math.sqrt(25 + 10 * Math.sqrt(5))) },
          { label: "Perimetru", value: fmt(5 * v.a) },
          { label: "Apotema", value: fmt(v.a / (2 * Math.tan(PI / 5))) },
        ],
      },
      {
        id: "pitagora", name: "Teorema lui Pitagora", description: "a² + b² = c²",
        formula: "c = √(a²+b²); a = √(c²-b²)",
        explanation: "În triunghiul dreptunghic, suma pătratelor catetelor = pătratul ipotenuzei. c²=a²+b² unde c=ipotenuza. Reciproca: dacă a²+b²=c², triunghiul e dreptunghic. Triple pitagoreice: (3,4,5), (5,12,13), (8,15,17). Se generalizează: 3D: d²=a²+b²+c². Distanța euclidiană. Se aplică în construcții, navigație, grafică pe computer.",
        inputs: [{ key: "a", label: "Cateta a", default: 3 }, { key: "b", label: "Cateta b", default: 4 }],
        calculate: (v) => [
          { label: "Ipotenuza c", value: fmt(Math.sqrt(v.a ** 2 + v.b ** 2)) },
          { label: "Arie triunghi", value: fmt(v.a * v.b / 2) },
          { label: "Unghi A (°)", value: fmt(Math.atan(v.a / v.b) * 180 / PI) },
        ],
      },
      {
        id: "elipsa", name: "Elipsă", description: "Arie, perimetru aproximativ",
        formula: "A = π·a·b; P ≈ π[3(a+b) - √((3a+b)(a+3b))]",
        explanation: "Elipsa are 2 axe: semiaxa mare a și semiaxa mică b. Aria = πab. Perimetrul nu are formulă exactă — se aproximează cu formula lui Ramanujan. Excentricitatea e=√(1-b²/a²): e=0 → cerc, e→1 → elipsă foarte alungită. Focarele sunt la distanța c=ae de centru. Suma distanțelor de la orice punct la cele 2 focare = 2a. Orbitele planetare sunt elipse (Kepler).",
        inputs: [{ key: "a", label: "Semiaxa mare", default: 5 }, { key: "b", label: "Semiaxa mică", default: 3 }],
        calculate: (v) => {
          const P = PI * (3 * (v.a + v.b) - Math.sqrt((3 * v.a + v.b) * (v.a + 3 * v.b)));
          return [
            { label: "Arie", value: fmt(PI * v.a * v.b) },
            { label: "Perimetru ≈", value: fmt(P) },
            { label: "Excentricitate", value: v.a >= v.b ? fmt(Math.sqrt(1 - (v.b / v.a) ** 2)) : "—" },
          ];
        },
      },
      {
        id: "dist_puncte", name: "Distanța între 2 Puncte", description: "Distanță și punct mijloc",
        formula: "d = √[(x₂-x₁)² + (y₂-y₁)²]",
        explanation: "Distanța euclidiană dintre A(x₁,y₁) și B(x₂,y₂). Aplică teorema lui Pitagora în plan cartezian. Mijlocul segmentului: M((x₁+x₂)/2, (y₁+y₂)/2). Distanța Manhattan (taxi): |x₂-x₁|+|y₂-y₁|. Se generalizează la n dimensiuni. Se folosește în GIS, grafică, machine learning (k-NN), fizică (distanțe).",
        inputs: [{ key: "x1", label: "x₁", default: 1 }, { key: "y1", label: "y₁", default: 2 }, { key: "x2", label: "x₂", default: 4 }, { key: "y2", label: "y₂", default: 6 }],
        calculate: (v) => [
          { label: "Distanța", value: fmt(Math.sqrt((v.x2 - v.x1) ** 2 + (v.y2 - v.y1) ** 2)) },
          { label: "Mijloc", value: `(${fmt((v.x1 + v.x2) / 2)}, ${fmt((v.y1 + v.y2) / 2)})` },
        ],
      },
      {
        id: "ec_dreapta", name: "Ecuația Dreptei", description: "Dreapta prin 2 puncte",
        formula: "m = (y₂-y₁)/(x₂-x₁); y = mx + b",
        explanation: "Panta m indică înclinarea dreptei. m>0 → crescătoare, m<0 → descrescătoare. Drepte paralele: m₁=m₂. Drepte perpendiculare: m₁·m₂=-1. Forma generală: ax+by+c=0. Distanța punct-dreaptă: d=|ax₀+by₀+c|/√(a²+b²). Se aplică în regresie liniară, grafice, geometria analitică.",
        inputs: [{ key: "x1", label: "x₁", default: 1 }, { key: "y1", label: "y₁", default: 2 }, { key: "x2", label: "x₂", default: 4 }, { key: "y2", label: "y₂", default: 8 }],
        calculate: (v) => {
          if (v.x1 === v.x2) return [{ label: "Ecuația", value: `x = ${fmt(v.x1)}` }, { label: "Tip", value: "Verticală" }];
          const m = (v.y2 - v.y1) / (v.x2 - v.x1), b = v.y1 - m * v.x1;
          return [
            { label: "Panta (m)", value: fmt(m) }, { label: "Intercept (b)", value: fmt(b) },
            { label: "y = mx+b", value: `y = ${fmt(m)}x + ${fmt(b)}` },
            { label: "Unghi (°)", value: fmt(Math.atan(m) * 180 / PI) },
          ];
        },
      },
      {
        id: "t_cosinusurilor", name: "Teorema Cosinusurilor", description: "c² = a²+b²-2ab·cos(C)",
        formula: "c² = a² + b² - 2ab·cos(C)",
        explanation: "Generalizarea teoremei lui Pitagora pentru orice triunghi. C=90° → cos(C)=0 → c²=a²+b². Permite calculul unei laturi când cunoaștem 2 laturi și unghiul inclus. Inversul: cos(C)=(a²+b²-c²)/(2ab). Se aplică în navigație, topografie, triangulație. Completează teorema sinusurilor pentru rezolvarea completă a triunghiurilor.",
        inputs: [{ key: "a", label: "a", default: 5 }, { key: "b", label: "b", default: 7 }, { key: "C", label: "Unghi C (°)", default: 60 }],
        calculate: (v) => {
          const Cr = v.C * PI / 180;
          const c = Math.sqrt(v.a ** 2 + v.b ** 2 - 2 * v.a * v.b * Math.cos(Cr));
          return [
            { label: "c", value: fmt(c) },
            { label: "Arie", value: fmt(0.5 * v.a * v.b * Math.sin(Cr)) },
          ];
        },
      },
      {
        id: "vectori_2d", name: "Vectori 2D", description: "Produs scalar, unghi, normă, proiecție",
        formula: "a·b = ax·bx + ay·by; |a| = √(ax²+ay²)",
        explanation: "Vectorii 2D au componentele (x,y). Norma (lungimea): |v|=√(x²+y²). Produsul scalar: a·b=ax·bx+ay·by=|a||b|cos(θ). Vectori perpendiculari: a·b=0. Proiecția lui a pe b: proj=(a·b/|b|²)·b. Vectorul unitate: v/|v|. Se aplică în fizică (forțe, viteze), grafică, navigație, mecanică.",
        inputs: [{ key: "ax", label: "aₓ", default: 3 }, { key: "ay", label: "aᵧ", default: 4 }, { key: "bx", label: "bₓ", default: -1 }, { key: "by", label: "bᵧ", default: 2 }],
        calculate: (v) => {
          const na = Math.sqrt(v.ax ** 2 + v.ay ** 2), nb = Math.sqrt(v.bx ** 2 + v.by ** 2);
          const dot = v.ax * v.bx + v.ay * v.by;
          const cross = v.ax * v.by - v.ay * v.bx;
          const angle = na && nb ? Math.acos(Math.min(1, Math.max(-1, dot / (na * nb)))) * 180 / PI : 0;
          return [
            { label: "|a|", value: fmt(na) }, { label: "|b|", value: fmt(nb) },
            { label: "a · b", value: fmt(dot) }, { label: "a × b (z)", value: fmt(cross) },
            { label: "Unghi (°)", value: fmt(angle) },
            { label: "Proiecție a→b", value: nb ? fmt(dot / nb) : "—" },
          ];
        },
      },
      {
        id: "dist_punct_dreapta", name: "Distanța Punct-Dreaptă", description: "d = |ax₀+by₀+c|/√(a²+b²)",
        formula: "d = |a·x₀ + b·y₀ + c| / √(a² + b²)",
        explanation: "Distanța de la punctul P(x₀,y₀) la dreapta ax+by+c=0. Formula derivă din proiecția ortogonală. Dreaptă orizontală (b=0): d=|ax₀+c|/|a|. Dreaptă verticală (a=0): d=|by₀+c|/|b|. Se aplică la determinarea înălțimii triunghiului, distanța până la drum/linie de cale ferată, probleme de optimizare geometrică.",
        inputs: [{ key: "a", label: "a", default: 3 }, { key: "b", label: "b", default: -4 }, { key: "c", label: "c", default: 5 }, { key: "x0", label: "x₀", default: 1 }, { key: "y0", label: "y₀", default: 2 }],
        calculate: (v) => {
          const d = Math.sqrt(v.a ** 2 + v.b ** 2);
          return [
            { label: "Distanța", value: d ? fmt(Math.abs(v.a * v.x0 + v.b * v.y0 + v.c) / d) : "—" },
            { label: "Dreapta", value: `${fmt(v.a)}x + ${fmt(v.b)}y + ${fmt(v.c)} = 0` },
          ];
        },
      },
      {
        id: "poligon_reg", name: "Poligon Regulat (n laturi)", description: "Arie, perimetru, unghi interior",
        formula: "A = (n·a²)/(4·tan(π/n)); P = n·a",
        explanation: "Poligonul regulat cu n laturi egale de lungime a. Arie = na²/(4tan(π/n)). Unghi interior = (n-2)·180°/n. Unghi exterior = 360°/n. Apotema = a/(2tan(π/n)). Raza circumscrisă R = a/(2sin(π/n)). Diagonale = n(n-3)/2. Se aplică în design, arhitectură, jocuri, cristalografie. Limita n→∞: poligonul devine cerc.",
        inputs: [{ key: "n", label: "Nr. laturi", default: 7, min: 3, max: 100 }, { key: "a", label: "Latura", default: 5 }],
        calculate: (v) => {
          const n = Math.max(3, Math.round(v.n));
          const area = n * v.a ** 2 / (4 * Math.tan(PI / n));
          const apothem = v.a / (2 * Math.tan(PI / n));
          const R = v.a / (2 * Math.sin(PI / n));
          return [
            { label: "Arie", value: fmt(area) }, { label: "Perimetru", value: fmt(n * v.a) },
            { label: "Apotema", value: fmt(apothem) }, { label: "R circumscris", value: fmt(R) },
            { label: "Unghi int.", value: fmt((n - 2) * 180 / n) + "°" },
            { label: "Diagonale", value: fmt(n * (n - 3) / 2) },
          ];
        },
      },
    ],
  },

  // ═══ GEOMETRIE ÎN SPAȚIU ═══
  {
    id: "geometrie_spatiu", name: "Geometrie în Spațiu", description: "Volume, arii laterale și totale",
    color: "hsl(280,55%,55%)",
    calculators: [
      {
        id: "cub", name: "Cub", description: "V, At, diagonală",
        formula: "V = a³; At = 6a²; d = a√3",
        explanation: "Cubul: 12 muchii egale, 6 fețe pătrate, 8 vârfuri. Diagonala spațială d=a√3. Diagonala feței = a√2. Este un solid platonic regulat (hexaedru). Volumul creșște cubicu cu muchia. Are 48 simetrii. Se folosește în cristalografie (rețea cubică), voxeli, jocuri (zaruri), arhitectură.",
        inputs: [{ key: "a", label: "Muchia", default: 5 }],
        calculate: (v) => [
          { label: "Volum", value: fmt(v.a ** 3) },
          { label: "Arie totală", value: fmt(6 * v.a ** 2) },
          { label: "Diag. spațiu", value: fmt(v.a * Math.sqrt(3)) },
          { label: "Diag. față", value: fmt(v.a * Math.sqrt(2)) },
        ],
      },
      {
        id: "paralelipiped", name: "Paralelipiped", description: "V, At, diagonală",
        formula: "V = L·l·h; At = 2(Ll+Lh+lh)",
        explanation: "Paralelipipedul dreptunghic are 6 fețe dreptunghiulare. Cele 4 diagonale spațiale sunt egale: d=√(L²+l²+h²). Caz particular: cubul (L=l=h). V = aria bazei × înălțime. Se aplică la calcul de volume în construcții, depozitare, ambalaje. Principiul lui Cavalieri: solidele cu aceleași secțiuni au același volum.",
        inputs: [{ key: "L", label: "Lungime", default: 6 }, { key: "l", label: "Lățime", default: 4 }, { key: "h", label: "Înălțime", default: 3 }],
        calculate: (v) => [
          { label: "Volum", value: fmt(v.L * v.l * v.h) },
          { label: "Arie totală", value: fmt(2 * (v.L * v.l + v.L * v.h + v.l * v.h)) },
          { label: "Diagonala", value: fmt(Math.sqrt(v.L ** 2 + v.l ** 2 + v.h ** 2)) },
        ],
      },
      {
        id: "sfera", name: "Sferă", description: "V și A",
        formula: "V = 4πr³/3; A = 4πr²",
        explanation: "Sfera: locul geometric al punctelor la distanța r de centru. Are cel mai mic raport suprafață/volum. V=(4/3)πr³, A=4πr². Are infinit de axe de simetrie. Secțiunea plană e un cerc. Ecuația: x²+y²+z²=r². Se aplică în astronomie (planete), fizica bulelor de săpun (tensiune superficială), geodesie.",
        inputs: [{ key: "r", label: "Raza", default: 5 }],
        calculate: (v) => [
          { label: "Volum", value: fmt(4 / 3 * PI * v.r ** 3) },
          { label: "Arie", value: fmt(4 * PI * v.r ** 2) },
          { label: "Diametru", value: fmt(2 * v.r) },
        ],
      },
      {
        id: "cilindru", name: "Cilindru", description: "V, Al, At",
        formula: "V = πr²h; Al = 2πrh; At = 2πr(r+h)",
        explanation: "Cilindrul se obține prin rotația unui dreptunghi în jurul unei laturi. V = aria bazei × h = πr²h. Desfășurarea laterală este un dreptunghi (2πr × h). Se aplică la conserve, conducte, rezervoare, motoare. Cilindrul obliccu: V rămâne πr²h (Cavalieri). Relația: 1L = 1dm³ = π·r²·h.",
        inputs: [{ key: "r", label: "Raza", default: 3 }, { key: "h", label: "Înălțime", default: 10 }],
        calculate: (v) => [
          { label: "Volum", value: fmt(PI * v.r ** 2 * v.h) },
          { label: "Arie laterală", value: fmt(2 * PI * v.r * v.h) },
          { label: "Arie totală", value: fmt(2 * PI * v.r * (v.r + v.h)) },
        ],
      },
      {
        id: "con", name: "Con", description: "V, generatoare, arii",
        formula: "V = πr²h/3; g = √(r²+h²)",
        explanation: "Conul se obține prin rotația unui triunghi dreptunghic. V = (1/3)πr²h = 1/3 din cilindrul corespunzător. Generatoarea g=√(r²+h²). Al=πrg. Se aplică la pâlnii, coifuri, vulcani. Secțiuni conice: cerc (paralel cu baza), elipsă (oblic), parabolă (paralel cu generatoarea), hiperbolă (mai înclinat decât generatoarea).",
        inputs: [{ key: "r", label: "Raza", default: 3 }, { key: "h", label: "Înălțime", default: 8 }],
        calculate: (v) => {
          const g = Math.sqrt(v.r ** 2 + v.h ** 2);
          return [
            { label: "Volum", value: fmt(PI * v.r ** 2 * v.h / 3) },
            { label: "Generatoarea", value: fmt(g) },
            { label: "Arie laterală", value: fmt(PI * v.r * g) },
            { label: "Arie totală", value: fmt(PI * v.r * (v.r + g)) },
          ];
        },
      },
      {
        id: "piramida", name: "Piramidă Regulată", description: "Baza pătrat",
        formula: "V = a²·h/3",
        explanation: "Piramida regulată cu bază pătrat: V=(1/3)·aria bazei·h = a²h/3. Apotema piramidei ap=√(h²+(a/2)²). Aria laterală = 2a·ap. Are 5 fețe, 8 muchii, 5 vârfuri. Piramidele egiptene sunt piramide cu bază pătrat. Trunchiul de piramidă: V=(h/3)(A₁+A₂+√(A₁A₂)). Se aplică în arhitectură, design.",
        inputs: [{ key: "a", label: "Latura bazei", default: 6 }, { key: "h", label: "Înălțime", default: 8 }],
        calculate: (v) => {
          const ap = Math.sqrt(v.h ** 2 + (v.a / 2) ** 2);
          return [
            { label: "Volum", value: fmt(v.a ** 2 * v.h / 3) },
            { label: "Arie bază", value: fmt(v.a ** 2) },
            { label: "Apotema", value: fmt(ap) },
            { label: "Arie laterală", value: fmt(2 * v.a * ap) },
            { label: "Arie totală", value: fmt(v.a ** 2 + 2 * v.a * ap) },
          ];
        },
      },
      {
        id: "trunchi_con", name: "Trunchi de Con", description: "V și generatoare",
        formula: "V = πh(R²+Rr+r²)/3",
        explanation: "Trunchiul de con = conul tăiat cu plan paralel cu baza. Are 2 baze circulare (R și r). V=πh(R²+Rr+r²)/3. Generatoarea g=√(h²+(R-r)²). Al=π(R+r)g. Se aplică la găleți, abajururi, pahare tronconice. Dacă r→0, revenim la con. Dacă R=r, avem cilindru.",
        inputs: [{ key: "R", label: "Raza mare", default: 5 }, { key: "r", label: "Raza mică", default: 3 }, { key: "h", label: "Înălțime", default: 6 }],
        calculate: (v) => [
          { label: "Volum", value: fmt(PI * v.h * (v.R ** 2 + v.R * v.r + v.r ** 2) / 3) },
          { label: "Generatoarea", value: fmt(Math.sqrt(v.h ** 2 + (v.R - v.r) ** 2)) },
        ],
      },
      {
        id: "prisma", name: "Prismă Triunghiulară", description: "V cu baza triunghi",
        formula: "V = (b·ht/2)·H",
        explanation: "Prisma triunghiulară: 2 baze triunghiulare + 3 fețe dreptunghiulare. V = aria bazei × H = (b·ht/2)·H. Are 6 vârfuri, 9 muchii, 5 fețe. Prisma regulată triunghiulară: baza = triunghi echilateral. Se aplică în optica (prisme de sticlă descompun lumina), profiluri metalice (IPE), acoperișuri.",
        inputs: [{ key: "b", label: "Baza trgh", default: 6 }, { key: "ht", label: "h trgh", default: 4 }, { key: "H", label: "H prismă", default: 10 }],
        calculate: (v) => [
          { label: "Arie bază", value: fmt(v.b * v.ht / 2) },
          { label: "Volum", value: fmt(v.b * v.ht / 2 * v.H) },
        ],
      },
      {
        id: "tetraedru", name: "Tetraedru Regulat", description: "Solid cu 4 fețe echilaterale",
        formula: "V = a³√2/12; At = a²√3",
        explanation: "Tetraedrul regulat: 4 fețe triunghiulare echilaterale, 6 muchii, 4 vârfuri. Este cel mai simplu solid platonic. V=a³√2/12. At=a²√3. Înălțimea: h=a√(2/3). Raza sferei circumscrise: R=a√6/4. Se aplică în chimie (molecula CH₄ are formă tetraedrică), teoria grafurilor, meshuri 3D.",
        inputs: [{ key: "a", label: "Muchia", default: 5 }],
        calculate: (v) => [
          { label: "Volum", value: fmt(v.a ** 3 * Math.sqrt(2) / 12) },
          { label: "Arie totală", value: fmt(v.a ** 2 * Math.sqrt(3)) },
          { label: "Înălțime", value: fmt(v.a * Math.sqrt(2 / 3)) },
        ],
      },
      {
        id: "tor", name: "Tor (Donut)", description: "V și A torus",
        formula: "V = 2π²Rr²; A = 4π²Rr",
        explanation: "Torul se obține prin rotația unui cerc (raza r) în jurul unei axe la distanța R de centru. V=2π²Rr². A=4π²Rr. R=raza mare (centru la axă), r=raza mică (secțiune). Se aplică la roți, cauciucuri, bobine toroidale, tokamaki (fuziune nucleară). Coordonatele: x=(R+r·cosφ)cosθ, y=(R+r·cosφ)sinθ, z=r·sinφ.",
        inputs: [{ key: "R", label: "R (mare)", default: 5 }, { key: "r", label: "r (mică)", default: 2 }],
        calculate: (v) => [
          { label: "Volum", value: fmt(2 * PI ** 2 * v.R * v.r ** 2) },
          { label: "Arie", value: fmt(4 * PI ** 2 * v.R * v.r) },
        ],
      },
    ],
  },

  // ═══ TRIGONOMETRIE ═══
  {
    id: "trigonometrie", name: "Trigonometrie", description: "Funcții, identități, formule de adunare/duplicare",
    color: "hsl(340,65%,55%)",
    calculators: [
      {
        id: "functii_trig", name: "Funcții Trigonometrice", description: "sin, cos, tan, cot",
        formula: "sin²α + cos²α = 1",
        explanation: "Funcțiile trig pe cercul unitate: sin=ordonata, cos=abscisa. tan=sin/cos, cot=cos/sin. Periodicitate: sin,cos → 360°; tan,cot → 180°. Valori notabile: sin(30°)=1/2, sin(45°)=√2/2, sin(60°)=√3/2, sin(90°)=1. Secanta sec=1/cos, cosecanta csc=1/sin. Se aplică în fizică (unde), inginerie (semnale), navigație.",
        inputs: [{ key: "deg", label: "Unghi (°)", default: 45 }],
        calculate: (v) => {
          const r = v.deg * PI / 180;
          return [
            { label: "sin", value: fmt(Math.sin(r)) }, { label: "cos", value: fmt(Math.cos(r)) },
            { label: "tan", value: Math.abs(Math.cos(r)) > 1e-10 ? fmt(Math.tan(r)) : "±∞" },
            { label: "cot", value: Math.abs(Math.sin(r)) > 1e-10 ? fmt(1 / Math.tan(r)) : "±∞" },
            { label: "Radiani", value: fmt(r) },
          ];
        },
      },
      {
        id: "grade_rad", name: "Grade ↔ Radiani", description: "Conversie unghiuri",
        formula: "rad = deg × π/180",
        explanation: "Un cerc complet = 360° = 2π rad. Un radian ≈ 57.2958°. Gradianul: cerc = 400 grad. Radianul este unitatea naturală în analiză: derivata sin(x) = cos(x) doar în radiani. 1 grad = π/180 rad ≈ 0.01745 rad. Se folosește în toate formulele de fizică și matematică avansată.",
        inputs: [{ key: "deg", label: "Grade", default: 180 }],
        calculate: (v) => [
          { label: "Radiani", value: fmt(v.deg * PI / 180) },
          { label: "Fracție de π", value: fmt(v.deg / 180) + "π" },
          { label: "Gradiani", value: fmt(v.deg * 10 / 9) },
        ],
      },
      {
        id: "formule_adunare", name: "Formule de Adunare", description: "sin(a±b), cos(a±b)",
        formula: "sin(a+b) = sinA·cosB + cosA·sinB",
        explanation: "Formulele de adunare permit calculu funcțiilor trig pentru sume. sin(a+b) = sin(a)cos(b)+cos(a)sin(b). cos(a+b) = cos(a)cos(b)-sin(a)sin(b). tan(a+b) = (tan(a)+tan(b))/(1-tan(a)tan(b)). Baza formulelor de duplicare. Se demonstrează geometric pe cercul unitate.",
        inputs: [{ key: "a", label: "a (°)", default: 30 }, { key: "b", label: "b (°)", default: 45 }],
        calculate: (v) => {
          const ar = v.a * PI / 180, br = v.b * PI / 180;
          return [
            { label: "sin(a+b)", value: fmt(Math.sin(ar + br)) },
            { label: "sin(a-b)", value: fmt(Math.sin(ar - br)) },
            { label: "cos(a+b)", value: fmt(Math.cos(ar + br)) },
            { label: "cos(a-b)", value: fmt(Math.cos(ar - br)) },
          ];
        },
      },
      {
        id: "formule_duplicare", name: "Formule de Duplicare", description: "sin(2a), cos(2a)",
        formula: "sin(2a) = 2sin(a)cos(a)",
        explanation: "Se deduc din formulele de adunare cu b=a. sin(2a) = 2sin(a)cos(a). cos(2a) = cos²a-sin²a = 2cos²a-1 = 1-2sin²a. tan(2a) = 2tan(a)/(1-tan²a). Formule de injumătățire: sin²(a/2) = (1-cos(a))/2. cos²(a/2) = (1+cos(a))/2. Se folosesc la simplificarea expresiilor, integrare.",
        inputs: [{ key: "a", label: "a (°)", default: 30 }],
        calculate: (v) => {
          const r = v.a * PI / 180;
          return [
            { label: "sin(2a)", value: fmt(Math.sin(2 * r)) },
            { label: "cos(2a)", value: fmt(Math.cos(2 * r)) },
            { label: "sin²(a)", value: fmt(Math.sin(r) ** 2) },
            { label: "cos²(a)", value: fmt(Math.cos(r) ** 2) },
          ];
        },
      },
      {
        id: "arc_functii", name: "Funcții Inverse (arcsin)", description: "Calculeaza unghiul din valoare",
        formula: "arcsin(x): x∈[-1,1] → [-90°,90°]",
        explanation: "Funcțiile inverse: arcsin, arccos, arctan. Domeniu arcsin/arccos: [-1,1]. arctan: ℝ → (-90°,90°). Relații: arcsin(x)+arccos(x)=90°. arctan(x)+arctan(1/x)=90° (x>0). Se folosesc la calculul unghiurilor din coordonate. atan2(y,x) dă unghiul corect în toate cadranele. Se aplică în navigație, robotică, grafică.",
        inputs: [{ key: "x", label: "Valoare [-1,1]", default: 0.5, min: -1, max: 1, step: 0.01 }],
        calculate: (v) => {
          const x = Math.max(-1, Math.min(1, v.x));
          return [
            { label: "arcsin (°)", value: fmt(Math.asin(x) * 180 / PI) },
            { label: "arccos (°)", value: fmt(Math.acos(x) * 180 / PI) },
            { label: "arctan (°)", value: fmt(Math.atan(v.x) * 180 / PI) },
          ];
        },
      },
      {
        id: "triunghi_oarecare", name: "Triunghi Oarecare", description: "Teorema sinusurilor",
        formula: "a/sin(A) = b/sin(B) = 2R",
        explanation: "Teorema sinusurilor leagă laturile de unghiurile opuse: a/sinA = b/sinB = c/sinC = 2R. R = raza cercului circumscris. Se completează cu A+B+C=180°. Cazul ambiguu: date a, b, A pot exista 0, 1 sau 2 soluții. Se aplică în topografie, navigație, astronomie.",
        inputs: [{ key: "a", label: "Latura a", default: 5 }, { key: "A", label: "Unghi A (°)", default: 30 }, { key: "B", label: "Unghi B (°)", default: 60 }],
        calculate: (v) => {
          const Ar = v.A * PI / 180, Br = v.B * PI / 180;
          const C = 180 - v.A - v.B, Cr = C * PI / 180;
          if (C <= 0) return [{ label: "Eroare", value: "A+B < 180°" }];
          const R = v.a / (2 * Math.sin(Ar));
          const b = 2 * R * Math.sin(Br), c = 2 * R * Math.sin(Cr);
          return [
            { label: "C", value: fmt(C) + "°" }, { label: "b", value: fmt(b) }, { label: "c", value: fmt(c) },
            { label: "R", value: fmt(R) }, { label: "Arie", value: fmt(0.5 * v.a * b * Math.sin(Cr)) },
          ];
        },
      },
      {
        id: "identitati_trig", name: "Identități Trigonometrice", description: "Verificare identitate",
        formula: "sin²x + cos²x = 1; 1+tan²x = sec²x",
        explanation: "Identitățile fundamentale: sin²x+cos²x=1, 1+tan²x=sec²x, 1+cot²x=csc²x. Complementaritate: sin(90°-x)=cos(x). Corelații: sinx = cos(90°-x), sin(-x) = -sin(x), cos(-x) = cos(x). Se folosesc la simplificarea expresiilor, demonstrări, calcul de integrale. Formulele produselor: 2sin(a)cos(b)=sin(a+b)+sin(a-b).",
        inputs: [{ key: "deg", label: "Unghi (°)", default: 37 }],
        calculate: (v) => {
          const r = v.deg * PI / 180;
          const s = Math.sin(r), c = Math.cos(r);
          return [
            { label: "sin²+cos²", value: fmt(s ** 2 + c ** 2) },
            { label: "1+tan²", value: Math.abs(c) > 1e-10 ? fmt(1 + Math.tan(r) ** 2) : "—" },
            { label: "sec²", value: Math.abs(c) > 1e-10 ? fmt(1 / c ** 2) : "—" },
            { label: "sin(90-x)", value: fmt(Math.sin(PI / 2 - r)) },
            { label: "cos(x)", value: fmt(c) },
          ];
        },
      },
      {
        id: "ec_trig", name: "Ecuații Trigonometrice", description: "sin(x)=a, cos(x)=a",
        formula: "sin(x)=a → x = arcsin(a) + 2kπ sau π-arcsin(a) + 2kπ",
        explanation: "sin(x)=a: soluția generală x = (-1)ⁿ·arcsin(a) + nπ. cos(x)=a: x = ±arccos(a) + 2kπ. tan(x)=a: x = arctan(a) + kπ. Soluțiile sunt periodice. Pe [0°,360°], sin(x)=a are 0 sau 2 soluții (1 dacă a=±1). Se aplică în oscilații, fenomene periodice, telecomunicații.",
        inputs: [{ key: "a", label: "Valoare a", default: 0.5, step: 0.01 }],
        calculate: (v) => {
          const x = Math.max(-1, Math.min(1, v.a));
          const hasSol = Math.abs(v.a) <= 1;
          return [
            { label: "sin(x)=a: x₁", value: hasSol ? fmt(Math.asin(x) * 180 / PI) + "°" : "∅" },
            { label: "sin(x)=a: x₂", value: hasSol ? fmt(180 - Math.asin(x) * 180 / PI) + "°" : "∅" },
            { label: "cos(x)=a: x₁", value: hasSol ? fmt(Math.acos(x) * 180 / PI) + "°" : "∅" },
            { label: "cos(x)=a: x₂", value: hasSol ? fmt(360 - Math.acos(x) * 180 / PI) + "°" : "∅" },
            { label: "tan(x)=a: x", value: fmt(Math.atan(v.a) * 180 / PI) + "°" },
          ];
        },
      },
    ],
  },

  // ═══ ANALIZĂ MATEMATICĂ ═══
  {
    id: "analiza", name: "Analiză Matematică", description: "Derivate, integrale, limite, tangente",
    color: "hsl(20,80%,55%)",
    calculators: [
      {
        id: "derivata_xn", name: "Derivata lui xⁿ", description: "f(x)=a·xⁿ → f'(x)",
        formula: "(xⁿ)' = n·xⁿ⁻¹",
        explanation: "Derivata puterii: regula fundamentală. f'(x₀) = panta tangentei. Derivata a doua f'' indica concavitatea: f''>0 → convexă, f''<0 → concavă. Reguli: (f+g)'=f'+g', (cf)'=cf', (fg)'=f'g+fg', (f/g)'=(f'g-fg')/g². Derivatele funcțiilor elementare: (sin)'=cos, (cos)'=-sin, (eˣ)'=eˣ, (ln)'=1/x. Se aplică în optimizare, fizică (viteza, accelerația).",
        inputs: [{ key: "a", label: "Coef (a)", default: 3 }, { key: "n", label: "Putere (n)", default: 2 }, { key: "x", label: "Punct (x)", default: 4 }],
        calculate: (v) => [
          { label: "f(x)", value: fmt(v.a * v.x ** v.n) },
          { label: "f'(x)", value: fmt(v.n * v.a * v.x ** (v.n - 1)) },
          { label: "f''(x)", value: fmt(v.n * (v.n - 1) * v.a * v.x ** (v.n - 2)) },
          { label: "Formulă f'", value: `${fmt(v.n * v.a)}·x^${fmt(v.n - 1)}` },
        ],
      },
      {
        id: "integrala_xn", name: "Integrala lui xⁿ", description: "∫a·xⁿdx pe [x₁,x₂]",
        formula: "∫xⁿdx = xⁿ⁺¹/(n+1)+C (n≠-1)",
        explanation: "Integrala este operația inversă derivatei. Integrala nedefinită: F(x)+C, unde F'(x)=f(x). Integrala definită ∫[a,b]f(x)dx = F(b)-F(a) (Leibniz-Newton). Proprietăți: liniaritate, aditivitate pe intervale. Integrale speciale: ∫sin(x)dx=-cos(x)+C, ∫eˣdx=eˣ+C, ∫1/x dx=ln|x|+C. Se aplică la arii, volume de rotație, lucru mecanic.",
        inputs: [{ key: "a", label: "Coef", default: 1 }, { key: "n", label: "Putere", default: 2 }, { key: "x1", label: "De la", default: 0 }, { key: "x2", label: "Până la", default: 3 }],
        calculate: (v) => {
          if (v.n === -1) return [
            { label: "Primitivă", value: `${fmt(v.a)}·ln|x|+C` },
            { label: "∫ definit", value: v.x1 > 0 && v.x2 > 0 ? fmt(v.a * (Math.log(v.x2) - Math.log(v.x1))) : "—" },
          ];
          const F = (x: number) => v.a * x ** (v.n + 1) / (v.n + 1);
          return [
            { label: "Primitivă", value: `${fmt(v.a / (v.n + 1))}·x^${fmt(v.n + 1)}+C` },
            { label: "∫ definit", value: fmt(F(v.x2) - F(v.x1)) },
          ];
        },
      },
      {
        id: "ec_tangentei", name: "Ecuația Tangentei", description: "y = f(x₀)+f'(x₀)(x-x₀)",
        formula: "y = f(x₀) + f'(x₀)·(x-x₀)",
        explanation: "Tangenta la graficul f în x₀: dreapta cu panta f'(x₀) care trece prin (x₀, f(x₀)). Este cea mai bună aproximare liniară locală. Normala: perpendiculară pe tangentă, panta = -1/f'(x₀). Aproximarea liniară: f(x)≈f(x₀)+f'(x₀)(x-x₀) pentru x aproape de x₀. Se folosește în metoda Newton-Raphson, diferențiale, propagarea erorilor.",
        inputs: [{ key: "a", label: "a", default: 1 }, { key: "n", label: "n", default: 2 }, { key: "x0", label: "x₀", default: 2 }],
        calculate: (v) => {
          const fx = v.a * v.x0 ** v.n, fp = v.n * v.a * v.x0 ** (v.n - 1);
          return [
            { label: "f(x₀)", value: fmt(fx) }, { label: "f'(x₀)", value: fmt(fp) },
            { label: "Tangenta", value: `y = ${fmt(fp)}x + ${fmt(fx - fp * v.x0)}` },
            { label: "Normala m", value: fp ? fmt(-1 / fp) : "—" },
          ];
        },
      },
      {
        id: "limita", name: "Limită Raport Polinoame", description: "lim (ax+b)/(cx+d) x→∞",
        formula: "lim = a/c când x→∞ (grad egal)",
        explanation: "La x→∞, termenul dominant decide limita. Grade egale: limita = raportul coeficienților. Grad(P)>Grad(Q) → ±∞. Grad(P)<Grad(Q) → 0. Forme nedeterminate: 0/0, ∞/∞ → regula lui L'Hôpital (se derivează numărătorul și numitorul). Alte forme: 0·∞, ∞-∞, 1^∞. Se aplică la analiza asimptotică, complexitatea algoritmilor.",
        inputs: [{ key: "a", label: "a", default: 3 }, { key: "b", label: "b", default: 5 }, { key: "c", label: "c", default: 2 }, { key: "d", label: "d", default: -1 }],
        calculate: (v) => [
          { label: "lim x→∞", value: v.c ? fmt(v.a / v.c) : v.a ? "±∞" : "—" },
          { label: "lim x→0", value: v.d ? fmt(v.b / v.d) : "±∞" },
          { label: "Asimptotă vert.", value: v.c ? `x = ${fmt(-v.d / v.c)}` : "—" },
        ],
      },
      {
        id: "arie_curba", name: "Arie Sub Curbă", description: "|∫[a,b] f(x)dx|",
        formula: "A = |∫[a,b] f(x)dx|",
        explanation: "Aria sub curbă = integrala definită. Dacă f(x)<0, integrala e negativă → se ia modulul. Arie între 2 curbe: ∫|f(x)-g(x)|dx. Metode numerice: Riemann (sume), Simpson (parabole). Se aplică la lucrul mecanic W=∫F·dx, distanța parcursă, centre de masă, probabilități continue.",
        inputs: [{ key: "a", label: "Coef", default: 1 }, { key: "n", label: "Putere", default: 2 }, { key: "x1", label: "De la", default: 0 }, { key: "x2", label: "Până la", default: 3 }],
        calculate: (v) => {
          if (v.n === -1) return [{ label: "Arie", value: v.x1 > 0 && v.x2 > 0 ? fmt(Math.abs(v.a * (Math.log(v.x2) - Math.log(v.x1)))) : "—" }];
          const F = (x: number) => v.a * x ** (v.n + 1) / (v.n + 1);
          return [{ label: "Arie", value: fmt(Math.abs(F(v.x2) - F(v.x1))) }];
        },
      },
      {
        id: "rata_variatie", name: "Rata Medie de Variație", description: "Panta secantei",
        formula: "Rm = [f(b)-f(a)]/(b-a)",
        explanation: "Rata medie de variație = panta secantei prin (a,f(a)) și (b,f(b)). Când b→a, obținem derivata f'(a) = rata instantanee. Teorema lui Lagrange: ∃ c ∈ (a,b) a.î. f'(c) = [f(b)-f(a)]/(b-a). Se aplică la viteze medii, rate de schimb, slope-uri. Baza definiției derivatei ca limită.",
        inputs: [{ key: "a", label: "Coef", default: 1 }, { key: "n", label: "Putere", default: 2 }, { key: "x1", label: "a", default: 1 }, { key: "x2", label: "b", default: 4 }],
        calculate: (v) => {
          const f = (x: number) => v.a * x ** v.n;
          return [
            { label: "f(a)", value: fmt(f(v.x1)) }, { label: "f(b)", value: fmt(f(v.x2)) },
            { label: "Rata medie", value: v.x2 !== v.x1 ? fmt((f(v.x2) - f(v.x1)) / (v.x2 - v.x1)) : "—" },
          ];
        },
      },
      {
        id: "monotonie", name: "Monotonie Funcție", description: "Intervale de creștere/descreștere f=ax²+bx+c",
        formula: "f'(x)>0 → crescătoare; f'(x)<0 → descrescătoare",
        explanation: "Studiul monotoniei: se calculează f'(x), se găsesc punctele critice (f'=0), se studiază semnul lui f'. f'>0 → crescătoare, f'<0 → descrescătoare. Maximum local: f'=0, f'' < 0. Minimum local: f'=0, f'' > 0. Tabel de variație: puncte critice + semnul derivatei + valorile funcției. Se aplică în optimizare, grafice.",
        inputs: [{ key: "a", label: "a (x²)", default: 1 }, { key: "b", label: "b (x)", default: -4 }, { key: "c", label: "c", default: 3 }],
        calculate: (v) => {
          if (!v.a) return [{ label: "Tip", value: "Liniară" }, { label: "Monotonie", value: v.b > 0 ? "Crescătoare" : v.b < 0 ? "Descrescătoare" : "Constantă" }];
          const xv = -v.b / (2 * v.a), yv = v.a * xv ** 2 + v.b * xv + v.c;
          return [
            { label: "Vârf", value: `(${fmt(xv)}, ${fmt(yv)})` },
            { label: "Tip", value: v.a > 0 ? "Minim" : "Maxim" },
            { label: "Cresc.", value: v.a > 0 ? `(${fmt(xv)}, +∞)` : `(-∞, ${fmt(xv)})` },
            { label: "Desc.", value: v.a > 0 ? `(-∞, ${fmt(xv)})` : `(${fmt(xv)}, +∞)` },
          ];
        },
      },
      {
        id: "serie_taylor", name: "Aproximare Taylor", description: "eˣ, sin(x), cos(x) ~ polinom",
        formula: "eˣ ≈ 1+x+x²/2!+x³/3!+...",
        explanation: "Seria Taylor aproximează funcții prin polinoame: f(x) ≈ f(0)+f'(0)x+f''(0)x²/2!+... Precizia crește cu nr. de termeni. Serii importante: eˣ=Σxⁿ/n!, sin(x)=Σ(-1)ⁿx^(2n+1)/(2n+1)!, cos(x)=Σ(-1)ⁿx^(2n)/(2n)!, ln(1+x)=Σ(-1)^(n+1)xⁿ/n. Raza de convergență definește domeniul de validitate. Se aplică în calcule numerice, fizică.",
        inputs: [{ key: "x", label: "x", default: 1, step: 0.1 }, { key: "n", label: "Termeni", default: 10, min: 1, max: 20 }],
        calculate: (v) => {
          let ex = 0, sx = 0, cx = 0;
          for (let i = 0; i < v.n; i++) {
            ex += v.x ** i / factorial(i);
            sx += ((-1) ** i * v.x ** (2 * i + 1)) / factorial(2 * i + 1);
            cx += ((-1) ** i * v.x ** (2 * i)) / factorial(2 * i);
          }
          return [
            { label: `eˣ Taylor`, value: fmt(ex) }, { label: "eˣ exact", value: fmt(Math.exp(v.x)) },
            { label: `sin Taylor`, value: fmt(sx) }, { label: "sin exact", value: fmt(Math.sin(v.x)) },
            { label: `cos Taylor`, value: fmt(cx) }, { label: "cos exact", value: fmt(Math.cos(v.x)) },
          ];
        },
      },
    ],
  },

  // ═══ COMBINATORICĂ & PROBABILITĂȚI ═══
  {
    id: "combinatorica", name: "Combinatorică & Probabilități", description: "Permutări, aranjamente, combinări, probabilitate",
    color: "hsl(45,85%,50%)",
    calculators: [
      {
        id: "permutari", name: "Permutări", description: "P(n)=n!",
        formula: "P(n) = n! = 1×2×3×...×n",
        explanation: "Permutările = nr. de moduri de a aranja n elemente distincte. Cresc foarte rapid: 10!=3.628.800, 20!≈2.4×10¹⁸. Permutări cu repetiție: n!/(k₁!k₂!...kᵣ!). Se aplică la coduri, parole (câte parole de n caractere), anagrame, ordini de execuție. Formula lui Stirling: n!≈√(2πn)(n/e)ⁿ.",
        inputs: [{ key: "n", label: "n", default: 5, min: 0, max: 20 }],
        calculate: (v) => [
          { label: "P(n) = n!", value: fmt(factorial(Math.round(v.n))) },
          { label: "Stirling ≈", value: fmt(Math.sqrt(2 * PI * v.n) * Math.pow(v.n / Math.E, v.n)) },
        ],
      },
      {
        id: "aranjamente", name: "Aranjamente", description: "A(n,k) = n!/(n-k)!",
        formula: "A(n,k) = n!/(n-k)!",
        explanation: "Aranjamente = câte moduri de a alege k din n, contând ORDINEA. A(n,k)=n(n-1)...(n-k+1). Ex: câte numere de 3 cifre distincte din {1..5}? A(5,3)=60. A(n,n)=n!=P(n). Cu repetiție: nᵏ. Se aplică la clasamente, coduri PIN, distribuirea premiilor, probleme de repartizare cu ordine.",
        inputs: [{ key: "n", label: "n", default: 5, min: 0, max: 20 }, { key: "k", label: "k", default: 2, min: 0, max: 20 }],
        calculate: (v) => {
          const n = Math.round(v.n), k = Math.round(v.k);
          return [
            { label: "A(n,k)", value: k <= n && k >= 0 ? fmt(factorial(n) / factorial(n - k)) : "—" },
            { label: "Cu repetiție nᵏ", value: fmt(Math.pow(n, k)) },
          ];
        },
      },
      {
        id: "combinari", name: "Combinări", description: "C(n,k) = n!/[k!(n-k)!]",
        formula: "C(n,k) = n!/[k!(n-k)!]",
        explanation: "Combinări = câte submulțimi de k din n. NU contează ordinea. C(n,k)=C(n,n-k). C(n,0)=C(n,n)=1. Linia n din triunghiul lui Pascal: C(n,0), C(n,1), ..., C(n,n). Relația Pascal: C(n,k)=C(n-1,k-1)+C(n-1,k). Se aplică la loterie, echipe, comitete, probabilitate. Suma liniei: Σ C(n,k) = 2ⁿ.",
        inputs: [{ key: "n", label: "n", default: 10, min: 0, max: 20 }, { key: "k", label: "k", default: 3, min: 0, max: 20 }],
        calculate: (v) => {
          const n = Math.round(v.n), k = Math.round(v.k);
          const c = k >= 0 && k <= n ? factorial(n) / (factorial(k) * factorial(n - k)) : NaN;
          return [{ label: "C(n,k)", value: fmt(c) }, { label: "C(n,n-k)", value: fmt(c) }];
        },
      },
      {
        id: "binom_newton", name: "Binomul lui Newton", description: "(a+b)ⁿ",
        formula: "(a+b)ⁿ = Σ C(n,k)·aⁿ⁻ᵏ·bᵏ",
        explanation: "Dezvoltarea binomială: (a+b)ⁿ are n+1 termeni. Coeficienții C(n,k) formează triunghiul lui Pascal. Termenul general: Tₖ₊₁=C(n,k)·aⁿ⁻ᵏ·bᵏ. (1+x)ⁿ ≈ 1+nx (pentru |x|<<1). Se aplică la aproximări, dezvoltări polinomiale, probabilitate binomială. Formula: (a-b)ⁿ = Σ(-1)ᵏC(n,k)aⁿ⁻ᵏbᵏ.",
        inputs: [{ key: "a", label: "a", default: 1 }, { key: "b", label: "b", default: 1 }, { key: "n", label: "n", default: 4, min: 0, max: 12 }],
        calculate: (v) => {
          const n = Math.round(v.n);
          const coefs = Array.from({ length: n + 1 }, (_, k) => factorial(n) / (factorial(k) * factorial(n - k)));
          return [
            { label: `(${fmt(v.a)}+${fmt(v.b)})^${n}`, value: fmt(Math.pow(v.a + v.b, n)) },
            { label: "Coeficienți", value: coefs.join(", ") },
          ];
        },
      },
      {
        id: "probabilitate", name: "Probabilitate Clasică", description: "P = favorable/total",
        formula: "P(A) = m/n",
        explanation: "Probabilitatea clasică Laplace: P(A) = nr. cazuri favorabile / nr. cazuri posibile (echiprobabile). P∈[0,1]. P(Ā)=1-P(A). Evenimentele independente: P(A∩B)=P(A)·P(B). Regula adunării: P(A∪B)=P(A)+P(B)-P(A∩B). Cota: m:(n-m). Se aplică la zaruri, monede, cărți, loterie, jocuri de noroc, asigurări.",
        inputs: [{ key: "m", label: "Favorabile", default: 3 }, { key: "n", label: "Total", default: 10 }],
        calculate: (v) => [
          { label: "P(A)", value: v.n ? fmt(v.m / v.n) : "—" },
          { label: "P(A) %", value: v.n ? fmt(v.m / v.n * 100) + "%" : "—" },
          { label: "P(Ā)", value: v.n ? fmt(1 - v.m / v.n) : "—" },
          { label: "Cotă", value: v.n ? `${fmt(v.m)}:${fmt(v.n - v.m)}` : "—" },
        ],
      },
      {
        id: "incluziune", name: "Incluziune-Excludere", description: "|A∪B| = |A|+|B|-|A∩B|",
        formula: "|A∪B| = |A|+|B|-|A∩B|",
        explanation: "Principiul incluziunii-excluderii evită numărarea dublă. Pentru 3 mulțimi: |A∪B∪C|=|A|+|B|+|C|-|A∩B|-|A∩C|-|B∩C|+|A∩B∩C|. Se generalizează la n mulțimi cu semne alternante. Se aplică la numărarea elementelor, probleme de divisibilitate (ciurul), probleme combinatorice cu constrângeri.",
        inputs: [{ key: "a", label: "|A|", default: 15 }, { key: "b", label: "|B|", default: 10 }, { key: "ab", label: "|A∩B|", default: 3 }],
        calculate: (v) => [
          { label: "|A∪B|", value: fmt(v.a + v.b - v.ab) },
          { label: "Doar A", value: fmt(v.a - v.ab) },
          { label: "Doar B", value: fmt(v.b - v.ab) },
        ],
      },
      {
        id: "distributie_binomiala", name: "Distribuție Binomială", description: "P(X=k) = C(n,k)·pᵏ·(1-p)ⁿ⁻ᵏ",
        formula: "P(X=k) = C(n,k)·pᵏ·(1-p)ⁿ⁻ᵏ",
        explanation: "Distribuția binomială: n încercări independente cu probabilitatea p de succes. P(X=k) = C(n,k)·pᵏ·qⁿ⁻ᵏ unde q=1-p. Media E(X)=np. Dispersia D(X)=npq. Se aplică la testarea calității, sondaje, jocuri de noroc, medicamente. Aproximare cu normala: dacă np>5 și nq>5, B(n,p)≈N(np, npq).",
        inputs: [{ key: "n", label: "n (încercări)", default: 10, min: 1 }, { key: "p", label: "p (probabilitate)", default: 0.5, step: 0.01, min: 0, max: 1 }, { key: "k", label: "k (succese)", default: 3, min: 0 }],
        calculate: (v) => {
          const n = Math.round(v.n), k = Math.round(v.k), p = v.p, q = 1 - p;
          const prob = k <= n ? factorial(n) / (factorial(k) * factorial(n - k)) * p ** k * q ** (n - k) : 0;
          return [
            { label: "P(X=k)", value: fmt(prob) },
            { label: "E(X)", value: fmt(n * p) },
            { label: "σ(X)", value: fmt(Math.sqrt(n * p * q)) },
          ];
        },
      },
      {
        id: "distributie_poisson", name: "Distribuția Poisson", description: "P(X=k) = λᵏe⁻λ/k!",
        formula: "P(X=k) = λᵏ·e⁻λ/k!",
        explanation: "Distribuția Poisson modelează nr. de evenimente rare într-un interval fix (timp, spațiu). Parametrul λ = media = variația. Exemple: apeluri/oră, defecte/m², accidente/lună. Suma a două Poisson independente: λ₁+λ₂. Aproximare Binomială: dacă n mare și p mic, B(n,p)≈Poisson(np). Se aplică în telecomunicații, asigurări, controlul calității.",
        inputs: [{ key: "lambda", label: "λ (media)", default: 3, min: 0.1, step: 0.1 }, { key: "k", label: "k", default: 2, min: 0 }],
        calculate: (v) => {
          const k = Math.round(v.k), lam = v.lambda;
          const prob = Math.pow(lam, k) * Math.exp(-lam) / factorial(k);
          let cumul = 0;
          for (let i = 0; i <= k; i++) cumul += Math.pow(lam, i) * Math.exp(-lam) / factorial(i);
          return [
            { label: "P(X=k)", value: fmt(prob) },
            { label: "P(X≤k)", value: fmt(cumul) },
            { label: "E(X)=λ", value: fmt(lam) },
            { label: "σ(X)", value: fmt(Math.sqrt(lam)) },
          ];
        },
      },
      {
        id: "principiu_numarare", name: "Principii de Numărare", description: "Regula produsului & sumei",
        formula: "Produs: n₁·n₂·...·nₖ | Sumă: n₁+n₂+...+nₖ",
        explanation: "Regula produsului: dacă alegerea 1 se face în n₁ moduri ȘI alegerea 2 în n₂ moduri, totalul = n₁·n₂. Regula sumei: dacă SAU, totalul = n₁+n₂ (dacă sunt disjuncte). Se aplică la: numere formate cu cifre, meniuri restaurant, coduri, parole. Principiul sertarelor (Dirichlet): n+1 obiecte în n sertare → minim 2 în același sertar.",
        inputs: [{ key: "n1", label: "n₁", default: 3 }, { key: "n2", label: "n₂", default: 4 }, { key: "n3", label: "n₃", default: 5 }],
        calculate: (v) => [
          { label: "Produs", value: fmt(v.n1 * v.n2 * v.n3) },
          { label: "Sumă", value: fmt(v.n1 + v.n2 + v.n3) },
        ],
      },
    ],
  },


  {
    id: "matrice", name: "Matrice", description: "Operații cu matrice 2×2: det, inversă, transpusă",
    color: "hsl(200,60%,50%)",
    calculators: [
      {
        id: "det_2x2", name: "Determinant 2×2", description: "det = ad-bc",
        formula: "det|a b; c d| = ad - bc",
        explanation: "Determinantul 2×2: ad-bc. Interpretare geometrică: aria paralelogramului format de vectorii (a,c) și (b,d). det=0 → vectorii sunt coliniari (matrice singulară). Proprietăți: det(AB)=det(A)·det(B), det(kA)=k²·det(A), det(Aᵀ)=det(A). Se folosește în sisteme de ecuații (Cramer), transformări geometrice.",
        inputs: [{ key: "a", label: "a", default: 3 }, { key: "b", label: "b", default: 1 }, { key: "c", label: "c", default: 2 }, { key: "d", label: "d", default: 4 }],
        calculate: (v) => [
          { label: "det", value: fmt(v.a * v.d - v.b * v.c) },
          { label: "Trasa", value: fmt(v.a + v.d) },
        ],
      },
      {
        id: "det_3x3", name: "Determinant 3×3 (Sarrus)", description: "Regula lui Sarrus",
        formula: "det = aei+bfg+cdh-ceg-bdi-afh",
        explanation: "Determinantul 3×3 cu regula Sarrus: se copiază primele 2 coloane la dreapta, se fac 3 produse pe diagonala principală (cu +) și 3 pe secundară (cu -). Alternativ: dezvoltare după o linie/coloană cu cofactori. det=0 → sistemul e incompatibil sau nedeterminat. Se aplică la sisteme 3×3, produsul vectorial, coplanaritate.",
        inputs: [
          { key: "a", label: "a₁₁", default: 1 }, { key: "b", label: "a₁₂", default: 2 }, { key: "c", label: "a₁₃", default: 3 },
          { key: "d", label: "a₂₁", default: 4 }, { key: "e", label: "a₂₂", default: 5 }, { key: "f", label: "a₂₃", default: 6 },
          { key: "g", label: "a₃₁", default: 7 }, { key: "h", label: "a₃₂", default: 8 }, { key: "i", label: "a₃₃", default: 10 },
        ],
        calculate: (v) => [
          { label: "det", value: fmt(v.a * (v.e * v.i - v.f * v.h) - v.b * (v.d * v.i - v.f * v.g) + v.c * (v.d * v.h - v.e * v.g)) },
        ],
      },
      {
        id: "inversa_2x2", name: "Inversă 2×2", description: "A⁻¹ = adj(A)/det(A)",
        formula: "A⁻¹ = (1/det)·|d -b; -c a|",
        explanation: "Matricea inversă A⁻¹: A·A⁻¹=I (matricea identitate). Există doar dacă det(A)≠0. Formula 2×2: se interschimbă elementele diagonalei principale, se schimbă semnul celorlalte, se împarte la det. Proprietăți: (AB)⁻¹=B⁻¹A⁻¹, (Aᵀ)⁻¹=(A⁻¹)ᵀ. Se aplică la rezolvarea sistemelor: x=A⁻¹b.",
        inputs: [{ key: "a", label: "a", default: 3 }, { key: "b", label: "b", default: 1 }, { key: "c", label: "c", default: 2 }, { key: "d", label: "d", default: 4 }],
        calculate: (v) => {
          const det = v.a * v.d - v.b * v.c;
          if (!det) return [{ label: "Inversă", value: "Nu există (det=0)" }];
          return [
            { label: "det", value: fmt(det) },
            { label: "A⁻¹[1,1]", value: fmt(v.d / det) }, { label: "A⁻¹[1,2]", value: fmt(-v.b / det) },
            { label: "A⁻¹[2,1]", value: fmt(-v.c / det) }, { label: "A⁻¹[2,2]", value: fmt(v.a / det) },
          ];
        },
      },
      {
        id: "transpusa", name: "Transpusă", description: "Aᵀ: rânduri ↔ coloane",
        formula: "Aᵀ[i,j] = A[j,i]",
        explanation: "Transpusa se obține interschimbând rândurile cu coloanele. (Aᵀ)ᵀ=A. (AB)ᵀ=BᵀAᵀ. Matricea simetrică: A=Aᵀ. Matricea antisimetrică: A=-Aᵀ. det(Aᵀ)=det(A). Se aplică în algebra liniară, mecanica mediilor continue, transformări liniare. Transpusa produsului inversează ordinea factorilor.",
        inputs: [{ key: "a", label: "a₁₁", default: 1 }, { key: "b", label: "a₁₂", default: 2 }, { key: "c", label: "a₂₁", default: 3 }, { key: "d", label: "a₂₂", default: 4 }],
        calculate: (v) => [
          { label: "Aᵀ[1,1]", value: fmt(v.a) }, { label: "Aᵀ[1,2]", value: fmt(v.c) },
          { label: "Aᵀ[2,1]", value: fmt(v.b) }, { label: "Aᵀ[2,2]", value: fmt(v.d) },
        ],
      },
      {
        id: "inmultire_mat", name: "Înmulțire Matrice 2×2", description: "A·B = C",
        formula: "C[i,j] = Σₖ A[i,k]·B[k,j]",
        explanation: "Înmulțirea matricelor: C[i,j] = suma produselor elementelor de pe linia i din A cu coloana j din B. Condiție: nr. coloane A = nr. linii B. NU e comutativă: AB≠BA în general. Dar e asociativă: (AB)C=A(BC). Distribuitivă: A(B+C)=AB+AC. Complexitate O(n³). Se aplică la rotații, transformări liniare, grafuri.",
        inputs: [
          { key: "a", label: "A₁₁", default: 1 }, { key: "b", label: "A₁₂", default: 2 },
          { key: "c", label: "A₂₁", default: 3 }, { key: "d", label: "A₂₂", default: 4 },
          { key: "e", label: "B₁₁", default: 5 }, { key: "f", label: "B₁₂", default: 6 },
          { key: "g", label: "B₂₁", default: 7 }, { key: "h", label: "B₂₂", default: 8 },
        ],
        calculate: (v) => [
          { label: "C₁₁", value: fmt(v.a * v.e + v.b * v.g) },
          { label: "C₁₂", value: fmt(v.a * v.f + v.b * v.h) },
          { label: "C₂₁", value: fmt(v.c * v.e + v.d * v.g) },
          { label: "C₂₂", value: fmt(v.c * v.f + v.d * v.h) },
        ],
      },
    ],
  },

  // ═══ TEORIA NUMERELOR ═══
  {
    id: "teoria_nr", name: "Teoria Numerelor", description: "Fibonacci, Euler, conversii, aritmetică modulară",
    color: "hsl(190,60%,45%)",
    calculators: [
      {
        id: "fibonacci", name: "Fibonacci", description: "F(n) = F(n-1)+F(n-2)",
        formula: "F(n) = F(n-1)+F(n-2); F(0)=0, F(1)=1",
        explanation: "Șirul: 0,1,1,2,3,5,8,13,21... Apare în natură: spirale de floarea-soarelui, scoici, frunze. Raportul F(n+1)/F(n) → φ=(1+√5)/2≈1.618 (secțiunea de aur). Formula lui Binet: F(n)=(φⁿ-ψⁿ)/√5. Identități: F(m+n)=F(m)F(n+1)+F(m-1)F(n). CMMDC(F(m),F(n))=F(CMMDC(m,n)). Se aplică în informatică (heap Fibonacci), art, arhitectură.",
        inputs: [{ key: "n", label: "n", default: 10, min: 0, max: 50 }],
        calculate: (v) => {
          const n = Math.round(v.n), fn = fib(n), fn1 = fib(n + 1);
          return [
            { label: `F(${n})`, value: fmt(fn) }, { label: `F(${n + 1})`, value: fmt(fn1) },
            { label: "Raport (→φ)", value: fn ? fmt(fn1 / fn) : "—" },
          ];
        },
      },
      {
        id: "euler_totient", name: "Funcția Euler φ(n)", description: "Câte numere ≤n coprime cu n",
        formula: "φ(n) = n·∏(1-1/p) pt fiecare p prim | n",
        explanation: "φ(n) = câte numere de la 1 la n au CMMDC(k,n)=1. φ(p)=p-1 pentru p prim. φ(pᵃ)=pᵃ-pᵃ⁻¹. φ este multiplicativă: φ(mn)=φ(m)φ(n) dacă CMMDC(m,n)=1. Teorema lui Euler: a^φ(n)≡1 (mod n) dacă CMMDC(a,n)=1. Baza criptografiei RSA. Σφ(d)=n (suma pe toți d|n).",
        inputs: [{ key: "n", label: "n", default: 12, min: 1 }],
        calculate: (v) => [{ label: `φ(${Math.round(v.n)})`, value: fmt(eulerTotient(v.n)) }],
      },
      {
        id: "conv_baze", name: "Conversie Baze", description: "Decimal ↔ Binar, Octal, Hex",
        formula: "Împărțiri succesive la baza dorită",
        explanation: "Binar (baza 2): limbajul calculatoarelor. Octal (baza 8): Unix permissions. Hexadecimal (baza 16): notație compactă, culori CSS (#FF0000=roșu). Conversia: se împarte succesiv la bază, resturile (citite invers) formează reprezentarea. Biți: 1 byte = 8 biți = 256 valori. 1 nibble = 4 biți = 1 cifră hex.",
        inputs: [{ key: "n", label: "Nr. zecimal", default: 255, min: 0 }],
        calculate: (v) => {
          const n = Math.abs(Math.round(v.n));
          return [
            { label: "Binar", value: n.toString(2) }, { label: "Octal", value: n.toString(8) },
            { label: "Hex", value: n.toString(16).toUpperCase() },
            { label: "Nr. biți", value: fmt(n > 0 ? Math.floor(Math.log2(n)) + 1 : 1) },
          ];
        },
      },
      {
        id: "modular", name: "Aritmetică Modulară", description: "a mod n",
        formula: "a mod n = a - n·⌊a/n⌋",
        explanation: "Aritmetica modulară: a≡b (mod n) dacă n|(a-b). Restul: a mod n = a-n·⌊a/n⌋. Proprietăți: (a+b) mod n = ((a mod n)+(b mod n)) mod n. Similar pentru produs. Inversul modular: a⁻¹ mod n există ⟺ CMMDC(a,n)=1. Se aplică în criptografie (RSA, AES), sume de control (ISBN, IBAN), cifruri.",
        inputs: [{ key: "a", label: "a", default: 17 }, { key: "n", label: "n (modulo)", default: 5 }],
        calculate: (v) => {
          const n = Math.round(v.n), a = Math.round(v.a);
          if (!n) return [{ label: "Eroare", value: "n≠0" }];
          return [
            { label: `${a} mod ${n}`, value: fmt(((a % n) + n) % n) },
            { label: `⌊${a}/${n}⌋`, value: fmt(Math.floor(a / n)) },
          ];
        },
      },
      {
        id: "nr_perfecte", name: "Numere Perfecte", description: "Σ div. proprii = n?",
        formula: "n perfect ⟺ σ(n)-n = n",
        explanation: "Numere perfecte: 6, 28, 496, 8128. Suma divisorilor proprii = nr. însuși. Legate de primele Mersenne: 2^(p-1)·(2^p-1) e perfect dacă 2^p-1 e prim. Numere deficiente: Σdiv<n (ex: 8). Numere abundente: Σdiv>n (ex: 12). Numere prietenase: Σdiv(a)=b și Σdiv(b)=a (ex: 220 și 284).",
        inputs: [{ key: "n", label: "Număr", default: 28, min: 1 }],
        calculate: (v) => {
          const n = Math.abs(Math.round(v.n));
          let sum = 0;
          for (let i = 1; i < n && i < 100000; i++) if (n % i === 0) sum += i;
          return [
            { label: "Σ div.", value: fmt(sum) },
            { label: "Perfect?", value: sum === n && n > 1 ? "DA ✓" : "NU ✗" },
            { label: "Tip", value: n <= 1 ? "—" : sum < n ? "Deficient" : sum > n ? "Abundent" : "Perfect" },
          ];
        },
      },
      {
        id: "nr_aur", name: "Secțiunea de Aur", description: "φ = (1+√5)/2 ≈ 1.618",
        formula: "φ = (1+√5)/2; φ² = φ+1",
        explanation: "Secțiunea de aur φ≈1.618034 este soluția ecuației φ²=φ+1, echivalent x²-x-1=0. Proprietăți: 1/φ=φ-1, φⁿ=F(n)φ+F(n-1). Dreptunghiul de aur: raportul laturilor = φ. Spirala de aur: conectare de sferturi de cerc în pătrate cu laturile F(n). Apare în natură, artă, arhitectură. Fracție continuă: φ = 1+1/(1+1/(1+...)).",
        inputs: [{ key: "n", label: "Putere φⁿ", default: 5 }],
        calculate: (v) => {
          const phi = (1 + Math.sqrt(5)) / 2;
          return [
            { label: "φ", value: fmt(phi) }, { label: "1/φ", value: fmt(1 / phi) },
            { label: `φ^${fmt(v.n)}`, value: fmt(Math.pow(phi, v.n)) },
            { label: "φ²-φ-1", value: fmt(phi ** 2 - phi - 1) },
          ];
        },
      },
      {
        id: "catalan", name: "Numerele lui Catalan", description: "C(n) = C(2n,n)/(n+1)",
        formula: "Cₙ = (2n)!/[(n+1)!·n!]",
        explanation: "Numerele Catalan: 1,1,2,5,14,42,132... Numără: parantezări corecte, arbori binari, triangulări de poligoane, drumuri monotone sub diagonală. C(n) = C(2n,n)/(n+1). Relația de recurență: C(n+1) = Σ C(i)·C(n-i). Cresc exponential: C(n) ~ 4ⁿ/(n√(πn)). Se aplică în informatică (arbori, parsare), combinatorică enumerativă.",
        inputs: [{ key: "n", label: "n", default: 5, min: 0, max: 15 }],
        calculate: (v) => {
          const n = Math.round(Math.max(0, Math.min(15, v.n)));
          const cat = factorial(2 * n) / (factorial(n + 1) * factorial(n));
          const cats: number[] = [];
          for (let i = 0; i <= Math.min(n, 10); i++) cats.push(factorial(2 * i) / (factorial(i + 1) * factorial(i)));
          return [
            { label: `C(${n})`, value: fmt(cat) },
            { label: "Primii termeni", value: cats.join(", ") },
          ];
        },
      },
      {
        id: "ecuatii_diofantine", name: "Ecuații Diofantine", description: "ax + by = c (soluții întregi)",
        formula: "ax + by = c are soluții ⟺ gcd(a,b) | c",
        explanation: "Ecuația diofantină liniară ax+by=c are soluții întregi doar dacă gcd(a,b) divide c. Soluția generală: x=x₀+(b/d)t, y=y₀-(a/d)t, t∈ℤ. Se găsește soluția particulară prin algoritmul extins al lui Euclid. Se aplică la probleme de monede (câte monede de valori a,b pentru totalul c), criptografie, teoria codurilor.",
        inputs: [{ key: "a", label: "a", default: 3 }, { key: "b", label: "b", default: 5 }, { key: "c", label: "c", default: 1 }],
        calculate: (v) => {
          const a = Math.round(v.a), b = Math.round(v.b), c = Math.round(v.c);
          const d = gcd(Math.abs(a), Math.abs(b));
          if (!d) return [{ label: "Eroare", value: "a,b ≠ 0" }];
          const hasS = c % d === 0;
          return [
            { label: "gcd(a,b)", value: fmt(d) },
            { label: "Are soluții?", value: hasS ? "DA ✓" : "NU ✗" },
            { label: "Condiție", value: `${d} | ${c} → ${hasS ? "adevărat" : "fals"}` },
          ];
        },
      },
    ],
  },

  // ═══ STATISTICĂ ═══
  {
    id: "statistica", name: "Statistică", description: "Medie ponderată, varianță, corelație, regresie",
    color: "hsl(100,50%,45%)",
    calculators: [
      {
        id: "medie_ponderata", name: "Medie Ponderată", description: "Media cu ponderi",
        formula: "Mp = Σ(xᵢ·wᵢ)/Σ(wᵢ)",
        explanation: "Media ponderată ține cont de importanța fiecărei valori. Se folosește la medii școlare (coeficienți), indici bursieri (capitalizare), note cu credite ECTS. Media aritmetică simplă = media ponderată cu ponderi egale. Media ponderată minimizează Σwᵢ(xᵢ-M)². Se aplică în finanțe, educație, statistică.",
        inputs: [{ key: "x1", label: "Val 1", default: 8 }, { key: "w1", label: "Pond 1", default: 2 }, { key: "x2", label: "Val 2", default: 9 }, { key: "w2", label: "Pond 2", default: 3 }, { key: "x3", label: "Val 3", default: 7 }, { key: "w3", label: "Pond 3", default: 1 }],
        calculate: (v) => {
          const sw = v.w1 + v.w2 + v.w3;
          return [
            { label: "Media ponderată", value: sw ? fmt((v.x1 * v.w1 + v.x2 * v.w2 + v.x3 * v.w3) / sw) : "—" },
            { label: "Media simplă", value: fmt((v.x1 + v.x2 + v.x3) / 3) },
          ];
        },
      },
      {
        id: "varianta_dev", name: "Varianță & Dev. Std", description: "Dispersie date",
        formula: "σ² = Σ(xᵢ-μ)²/n; σ = √σ²",
        explanation: "Varianța măsoară dispersia datelor față de medie. σ² mică → date concentrate, σ² mare → date împrăștiate. Deviația standard σ este în aceeași unitate ca datele. Varianță populatie: /n, varianță eșantion: /(n-1). Regula empirică (normală): 68% date în [μ-σ, μ+σ], 95% în [μ-2σ, μ+2σ], 99.7% în [μ-3σ, μ+3σ].",
        inputs: [{ key: "a", label: "x₁", default: 2 }, { key: "b", label: "x₂", default: 4 }, { key: "c", label: "x₃", default: 4 }, { key: "d", label: "x₄", default: 4 }, { key: "e", label: "x₅", default: 5 }],
        calculate: (v) => {
          const vals = [v.a, v.b, v.c, v.d, v.e];
          const mean = vals.reduce((s, x) => s + x, 0) / 5;
          const variance = vals.reduce((s, x) => s + (x - mean) ** 2, 0) / 5;
          return [
            { label: "Media", value: fmt(mean) },
            { label: "Varianța", value: fmt(variance) },
            { label: "Dev. std", value: fmt(Math.sqrt(variance)) },
          ];
        },
      },
      {
        id: "coef_variatie", name: "Coeficient de Variație", description: "CV = σ/μ × 100%",
        formula: "CV = (σ/μ)×100%",
        explanation: "CV exprimă dispersia relativă: permite compararea variabilității între seturi cu scale diferite. CV<30% → date omogene, CV>30% → date eterogene. Se aplică la controlul calității (toleranțe), compararea portofoliilor de investiții (risc relativ), studii epidemiologice. CV este adimensional.",
        inputs: [{ key: "mean", label: "Media (μ)", default: 50 }, { key: "std", label: "Dev. std (σ)", default: 5 }],
        calculate: (v) => [
          { label: "CV", value: v.mean ? fmt(v.std / Math.abs(v.mean) * 100) + "%" : "—" },
          { label: "Interpretare", value: v.mean ? (v.std / Math.abs(v.mean) * 100 < 30 ? "Omogen" : "Eterogen") : "—" },
        ],
      },
      {
        id: "regresie", name: "Regresie Liniară", description: "y = mx + b",
        formula: "m = (y₂-y₁)/(x₂-x₁); b = y₁-m·x₁",
        explanation: "Regresia liniară găsește dreapta y=mx+b care aproximează datele. Metoda celor mai mici pătrate minimizează Σ(yᵢ-ŷᵢ)². Coeficientul de determinare R²∈[0,1] măsoară calitatea: R²=1 → potrivire perfectă. Se aplică la previziuni, tendințe, interpolări. Asumari: relație liniară, erori normale, homoscedasticitate.",
        inputs: [{ key: "x1", label: "x₁", default: 1 }, { key: "y1", label: "y₁", default: 3 }, { key: "x2", label: "x₂", default: 5 }, { key: "y2", label: "y₂", default: 11 }],
        calculate: (v) => {
          if (v.x1 === v.x2) return [{ label: "Eroare", value: "x₁≠x₂" }];
          const m = (v.y2 - v.y1) / (v.x2 - v.x1), b = v.y1 - m * v.x1;
          return [
            { label: "Panta (m)", value: fmt(m) }, { label: "Intercept (b)", value: fmt(b) },
            { label: "Ecuația", value: `y = ${fmt(m)}x + ${fmt(b)}` },
          ];
        },
      },
      {
        id: "mediana_mod", name: "Mediană & Mod", description: "Valori centrale pentru 5 date",
        formula: "Mediană = valoarea din mijloc (date ordonate)",
        explanation: "Mediana: valoarea din mijloc a datelor ordonate. Mai robustă la outlieri decât media. Modul: valoarea cea mai frecventă. Media < Mediană < Mod → distribuție asimetrică stânga. Se aplică la venituri (mediana e mai reprezentativă), analiza prețurilor. Pentru n par, mediana = media celor 2 valori din mijloc.",
        inputs: [{ key: "a", label: "x₁", default: 2 }, { key: "b", label: "x₂", default: 7 }, { key: "c", label: "x₃", default: 4 }, { key: "d", label: "x₄", default: 7 }, { key: "e", label: "x₅", default: 5 }],
        calculate: (v) => {
          const vals = [v.a, v.b, v.c, v.d, v.e].sort((a, b) => a - b);
          const median = vals[2];
          const freq: Record<number, number> = {};
          vals.forEach(x => freq[x] = (freq[x] || 0) + 1);
          const maxF = Math.max(...Object.values(freq));
          const modes = Object.keys(freq).filter(k => freq[Number(k)] === maxF);
          return [
            { label: "Mediană", value: fmt(median) },
            { label: "Mod", value: modes.join(", ") },
            { label: "Min", value: fmt(vals[0]) },
            { label: "Max", value: fmt(vals[4]) },
            { label: "Amplitudine", value: fmt(vals[4] - vals[0]) },
          ];
        },
      },
    ],
  },

  // ═══ CONVERSII ═══
  {
    id: "conversii", name: "Conversii", description: "Temperatură, lungime, arie, volum, greutate",
    color: "hsl(0,60%,55%)",
    calculators: [
      {
        id: "temperatura", name: "Temperatură", description: "°C ↔ °F ↔ K",
        formula: "°F = °C×9/5+32; K = °C+273.15",
        explanation: "Cele 3 scale principale: Celsius (metricul standard), Fahrenheit (SUA), Kelvin (SI/științific). Celsius: 0°=gheață, 100°=fierbere (la 1 atm). Fahrenheit: 32°=gheață, 212°=fierbere. Kelvin: 0K = zero absolut (-273.15°C) — temperatura la care mișcarea moleculară încetează teoretic. Se aplică în meteorologie, inginerie, fizică.",
        inputs: [{ key: "c", label: "°Celsius", default: 25 }],
        calculate: (v) => [
          { label: "Fahrenheit", value: fmt(v.c * 9 / 5 + 32) + "°F" },
          { label: "Kelvin", value: fmt(v.c + 273.15) + " K" },
          { label: "Rankine", value: fmt((v.c + 273.15) * 9 / 5) + " °R" },
        ],
      },
      {
        id: "lungime", name: "Unități de Lungime", description: "m → km, cm, inch, ft",
        formula: "1km=1000m; 1inch=2.54cm; 1ft=30.48cm",
        explanation: "Sistemul metric: m, km, cm, mm. Sistemul imperial: inch (2.54cm), foot (30.48cm), yard (91.44cm), mile (1609.34m). Alte unități: anul-lumină (9.461×10¹² km), parsec (3.262 ani-lumină), unitate astronomică (149.6×10⁶ km), angström (10⁻¹⁰ m). Se aplică în construcții, navigație, astronomie.",
        inputs: [{ key: "m", label: "Metri", default: 100 }],
        calculate: (v) => [
          { label: "km", value: fmt(v.m / 1000) }, { label: "cm", value: fmt(v.m * 100) },
          { label: "inch", value: fmt(v.m / 0.0254) }, { label: "feet", value: fmt(v.m / 0.3048) },
          { label: "mile", value: fmt(v.m / 1609.34) },
        ],
      },
      {
        id: "arie_conv", name: "Unități de Arie", description: "m² → km², ha, acri",
        formula: "1km²=10⁶m²; 1ha=10⁴m²; 1acru=4046.86m²",
        explanation: "Unitățile de arie sunt pătratele unităților de lungime. Hectarul (ha) = 10.000 m², folosit în agricultură. Acrul = 4046.86 m², folosit în SUA/UK. Arul = 100 m². Se aplică la terenuri, parcele, suprafețe de locuințe. 1 yard² = 0.836 m². 1 mile² = 2.59 km².",
        inputs: [{ key: "m2", label: "m²", default: 10000 }],
        calculate: (v) => [
          { label: "km²", value: fmt(v.m2 / 1e6) }, { label: "ha", value: fmt(v.m2 / 1e4) },
          { label: "acri", value: fmt(v.m2 / 4046.86) }, { label: "ari", value: fmt(v.m2 / 100) },
        ],
      },
      {
        id: "volum_conv", name: "Unități de Volum", description: "L → m³, mL, galoane",
        formula: "1m³=1000L; 1L=1000mL; 1galUS=3.785L",
        explanation: "Litrul = 1 dm³. 1 m³ = 1000 L. Galonul US = 3.785 L. Galonul imperial = 4.546 L. Barilul de petrol = 158.987 L. Se aplică la rezervoare, consumuri, rețete. 1 cană US = 236.6 mL. 1 fl oz = 29.57 mL. Unitatea SI de volum este m³.",
        inputs: [{ key: "l", label: "Litri", default: 100 }],
        calculate: (v) => [
          { label: "m³", value: fmt(v.l / 1000) }, { label: "mL", value: fmt(v.l * 1000) },
          { label: "gal US", value: fmt(v.l / 3.785) },
        ],
      },
      {
        id: "greutate", name: "Unități de Greutate", description: "kg → g, lb, oz, tone",
        formula: "1kg=1000g; 1lb=0.4536kg; 1oz=28.35g",
        explanation: "Kilogramul este unitatea SI de masă. Libra (pound) = 0.4536 kg, folosită în SUA/UK. Uncia (ounce) = 28.35 g. Tona metrică = 1000 kg. Tona imperială = 1016 kg. Carate (pietre prețioase) = 0.2 g. Se aplică în comerț, logistică, medicină, gastronomie. Masa vs greutatea: G=mg.",
        inputs: [{ key: "kg", label: "Kilograme", default: 75 }],
        calculate: (v) => [
          { label: "Grame", value: fmt(v.kg * 1000) }, { label: "Pounds", value: fmt(v.kg / 0.4536) },
          { label: "Ounces", value: fmt(v.kg * 1000 / 28.35) }, { label: "Tone", value: fmt(v.kg / 1000) },
        ],
      },
      {
        id: "viteza", name: "Unități de Viteză", description: "m/s → km/h, mph, noduri",
        formula: "1 m/s = 3.6 km/h = 2.237 mph",
        explanation: "m/s este unitatea SI. km/h se folosește pentru mașini. mph (mile per hour) în SUA/UK. Nodul (kt) = milă nautică/oră = 1.852 km/h, folosit în navigație și aviație. Mach = viteza sunetului (≈343 m/s la 20°C). Viteza luminii c = 299.792.458 m/s. Se aplică în transport, fizică, meteorologie.",
        inputs: [{ key: "ms", label: "m/s", default: 10 }],
        calculate: (v) => [
          { label: "km/h", value: fmt(v.ms * 3.6) }, { label: "mph", value: fmt(v.ms * 2.237) },
          { label: "noduri", value: fmt(v.ms * 1.944) }, { label: "Mach", value: fmt(v.ms / 343) },
        ],
      },
    ],
  },
];
