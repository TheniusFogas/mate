import { Link, useLocation } from "react-router-dom";
import { Menu, X, Settings } from "lucide-react";
import { useState } from "react";
import mathLogo from "@/assets/math-logo.png";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass-strong border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between px-3 py-1.5">
          <Link to="/" className="flex items-center gap-1.5 font-display text-base font-bold text-foreground">
            <img src={mathLogo} alt="MathLab" className="h-6 w-6 rounded-[5px]" />
            <span className="text-sm">Math<span className="text-primary">Lab</span></span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            <Link
              to="/"
              className={`rounded-[5px] px-2.5 py-1 text-[11px] font-medium transition-all ${
                location.pathname === '/' || location.pathname.startsWith('/calculator')
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              Calculatoare
            </Link>
            <Link
              to="/admin"
              className="rounded-[5px] px-1.5 py-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
            >
              <Settings className="h-3 w-3" />
            </Link>
          </nav>

          <button
            className="flex h-6 w-6 items-center justify-center rounded-[5px] text-foreground hover:bg-secondary md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-border/50 px-3 py-1.5 md:hidden glass">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center rounded-[5px] px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Calculatoare
            </Link>
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[11px] text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <Settings className="h-3 w-3" /> Admin
            </Link>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="mt-6 border-t border-border bg-card/50 py-3">
        <div className="container mx-auto px-3 text-center text-[10px] text-muted-foreground">
          <p>© 2026 MathLab — Calculatoare matematică online gratuite</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
