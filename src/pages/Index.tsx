import { Link } from "react-router-dom";
import { Calculator, Home, Heart, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const categories = [
  {
    to: "/matematica",
    title: "Matematică",
    description: "Arii, volume, perimetre — cu forme vizuale interactive și calcule instant",
    icon: Calculator,
    gradient: "gradient-math",
    count: "7 calculatoare",
  },
  {
    to: "/casa",
    title: "Casă & Renovări",
    description: "Suprafețe camere, vopsea, pardoseală — cu estimări avansate de cost",
    icon: Home,
    gradient: "gradient-home",
    count: "3 calculatoare",
  },
  {
    to: "/sanatate",
    title: "Sănătate",
    description: "IMC, calorii, hidratare, cost fumat — monitorizează-ți sănătatea",
    icon: Heart,
    gradient: "gradient-health",
    count: "4 calculatoare",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 800 400">
            {Array.from({ length: 15 }).map((_, i) => (
              <circle key={i} cx={60 + i * 55} cy={200 + Math.sin(i) * 80} r={20 + i * 3} fill="white" opacity={0.1 + i * 0.02} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={`r${i}`} x={100 + i * 90} y={50 + i * 30} width={40} height={40} fill="white" opacity={0.08} rx={8} transform={`rotate(${i * 15}, ${120 + i * 90}, ${70 + i * 30})`} />
            ))}
          </svg>
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl"
          >
            Calculatoare Online
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/70"
          >
            Instrumente gratuite pentru matematică, casă și sănătate — rapide, precise și ușor de folosit.
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 -mt-12 relative z-10 pb-8">
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.to}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <Link
                to={cat.to}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:-translate-y-1"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${cat.gradient}`}>
                  <cat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">{cat.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{cat.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{cat.count}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
