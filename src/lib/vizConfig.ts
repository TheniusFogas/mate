// Centralized visualization config: maps every calculator ID to a viz type
type VizType = 'none' | '2d' | '3d';

const VIZ_3D = new Set([
  'cub', 'paralelipiped', 'sfera', 'cilindru', 'con', 'piramida', 'tor',
  'tetraedru', 'trunchi_con', 'prisma',
]);

const VIZ_2D = new Set([
  // Geometry
  'triunghi', 'dreptunghi', 'cerc', 'trapez', 'paralelogram', 'romb', 'poligon_reg',
  'vectori_2d', 'dist_punct_dreapta',
  // Algebra - graphs
  'ec_grad1', 'ec_grad2', 'ec_grad3', 'inecuatie_g1', 'inecuatie_g2',
  'polinom_eval', 'valoare_abs', 'ec_exponentiala', 'ec_biquadratica', 'ec_irationala',
  'progresie_a', 'progresie_g', 'dobanda_compusa',
  // Trigonometry
  'functii_trig', 'grade_rad', 'formule_adunare', 'formule_duplicare',
  'arc_functii', 'triunghi_oarecare', 'identitati_trig', 'ec_trig',
  // Analysis
  'derivata_xn', 'integrala_xn', 'ec_tangentei', 'limita',
  'arie_curba', 'rata_variatie', 'monotonie', 'serie_taylor',
  // Statistics
  'varianta_dev', 'regresie', 'mediana_mod', 'distributie_binomiala', 'distributie_poisson',
  // Arithmetic
  'procente', 'fractii', 'puteri', 'factorizare',
  'medii', 'operatii_baza', 'suma_cifre',
  // Number theory
  'fibonacci', 'conv_baze', 'nr_aur', 'catalan',
  // Combinatorics
  'permutari', 'aranjamente', 'combinari', 'binom_newton', 'probabilitate',
  // Matrices
  'det_2x2', 'inversa_2x2', 'inmultire_mat',
  // Conversions
  'temperatura', 'lungime', 'greutate', 'viteza',
  // Geometry analytics
  'distanta_2p', 'ec_dreapta', 'ec_cerc',
]);

export const getVizType = (id: string): VizType => {
  if (VIZ_3D.has(id)) return '3d';
  if (VIZ_2D.has(id)) return '2d';
  return 'none';
};
