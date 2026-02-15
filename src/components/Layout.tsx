import { Link, useLocation } from "react-router-dom";
import { Menu, X, Settings } from "lucide-react";
import { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between px-3 py-2">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <div className="flex h-7 w-7 items-center justify-center rounded-[4px] gradient-primary text-primary-foreground text-sm font-bold">
              ∑
            </div>
            <span>Calc<span className="text-primary">Math</span></span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              className={`flex items-center gap-1.5 rounded-[4px] px-3 py-1.5 text-xs font-medium transition-all ${
                location.pathname === '/' || location.pathname === '/matematica'
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              Calculatoare
            </Link>
            <Link
              to="/admin"
              className="flex items-center gap-1 rounded-[4px] px-2 py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
            >
              <Settings className="h-3 w-3" />
            </Link>
          </nav>

          <button
            className="flex h-7 w-7 items-center justify-center rounded-[4px] text-foreground hover:bg-secondary md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-border bg-card px-3 py-2 md:hidden">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-[4px] px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Calculatoare Matematică
            </Link>
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-[4px] px-2 py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <Settings className="h-3 w-3" />
              Admin
            </Link>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="mt-8 border-t border-border bg-card py-4">
        <div className="container mx-auto px-3 text-center text-[10px] text-muted-foreground">
          <p>© 2026 CalcMath — Calculatoare matematică online gratuite pentru studenți</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
