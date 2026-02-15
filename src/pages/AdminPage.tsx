import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  getAdminConfig, saveAdminConfig, checkCredentials, changeCredentials,
  generateId, type AdminConfig, type AdSlot, type ReferralLink,
} from "@/lib/adminStore";
import { mathCategories } from "@/lib/mathCalcs";
import { Trash2, Plus, Save, LogOut, Key } from "lucide-react";

const allCalcIds = mathCategories.flatMap(c => c.calculators.map(calc => ({ id: calc.id, name: calc.name })));
const positions = [
  { value: 'header', label: 'Header (sus)' },
  { value: 'between-sections', label: 'Între secțiuni' },
  { value: 'sidebar', label: 'Sidebar' },
  { value: 'footer', label: 'Footer (jos)' },
  { value: 'calculator', label: 'Pe calculator specific' },
];

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [config, setConfig] = useState<AdminConfig>({ adSlots: [], referrals: [] });
  const [tab, setTab] = useState<"ads" | "referrals" | "settings">("ads");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin_session") === "true") {
      setLoggedIn(true);
      setConfig(getAdminConfig());
    }
  }, []);

  const login = () => {
    if (checkCredentials(user, pass)) {
      sessionStorage.setItem("admin_session", "true");
      setLoggedIn(true);
      setConfig(getAdminConfig());
      setError("");
    } else {
      setError("Credențiale invalide. Implicit: admin / admin123");
    }
  };

  const save = () => {
    saveAdminConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const logout = () => {
    sessionStorage.removeItem("admin_session");
    setLoggedIn(false);
  };

  // Ad management
  const addAd = () => {
    setConfig(c => ({
      ...c,
      adSlots: [...c.adSlots, { id: generateId(), name: "", position: "header", code: "", enabled: true }],
    }));
  };

  const updateAd = (id: string, field: keyof AdSlot, value: any) => {
    setConfig(c => ({
      ...c,
      adSlots: c.adSlots.map(s => s.id === id ? { ...s, [field]: value } : s),
    }));
  };

  const removeAd = (id: string) => {
    setConfig(c => ({ ...c, adSlots: c.adSlots.filter(s => s.id !== id) }));
  };

  // Referral management
  const addReferral = () => {
    setConfig(c => ({
      ...c,
      referrals: [...c.referrals, { id: generateId(), label: "", url: "", zone: "global", enabled: true }],
    }));
  };

  const updateRef = (id: string, field: keyof ReferralLink, value: any) => {
    setConfig(c => ({
      ...c,
      referrals: c.referrals.map(r => r.id === id ? { ...r, [field]: value } : r),
    }));
  };

  const removeRef = (id: string) => {
    setConfig(c => ({ ...c, referrals: c.referrals.filter(r => r.id !== id) }));
  };

  if (!loggedIn) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-xs p-4 bg-card border border-border rounded-[6px] shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-[4px] gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">∑</div>
              <h1 className="text-sm font-display font-bold text-foreground">Admin Panel</h1>
            </div>
            <div className="space-y-2">
              <input
                type="text" placeholder="Utilizator" value={user}
                onChange={e => setUser(e.target.value)}
                className="w-full h-7 rounded-[4px] border border-input bg-background px-2 text-xs outline-none focus:border-primary"
              />
              <input
                type="password" placeholder="Parolă" value={pass}
                onChange={e => setPass(e.target.value)}
                onKeyDown={e => e.key === "Enter" && login()}
                className="w-full h-7 rounded-[4px] border border-input bg-background px-2 text-xs outline-none focus:border-primary"
              />
              {error && <p className="text-[10px] text-destructive">{error}</p>}
              <button onClick={login} className="w-full h-7 rounded-[4px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
                Autentificare
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-2 py-3 max-w-4xl">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-display text-sm font-bold text-foreground">Panou Administrare</h1>
          <div className="flex items-center gap-2">
            {saved && <span className="text-[10px] text-green-600 font-medium">✓ Salvat</span>}
            <button onClick={save} className="flex items-center gap-1 px-2 py-1 rounded-[4px] bg-primary text-primary-foreground text-[10px] font-medium hover:opacity-90">
              <Save className="h-3 w-3" /> Salvează
            </button>
            <button onClick={logout} className="flex items-center gap-1 px-2 py-1 rounded-[4px] bg-secondary text-secondary-foreground text-[10px] hover:opacity-80">
              <LogOut className="h-3 w-3" /> Ieșire
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-3">
          {([
            { key: "ads" as const, label: "Reclame Google" },
            { key: "referrals" as const, label: "Referral Links" },
            { key: "settings" as const, label: "Setări" },
          ]).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-2.5 py-1 rounded-[4px] text-[10px] font-medium transition-colors ${
                tab === t.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:opacity-80"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Ads Tab */}
        {tab === "ads" && (
          <div className="space-y-2">
            <p className="text-[10px] text-muted-foreground mb-2">
              Adaugă coduri Google Ads în diferite poziții. Codul HTML va fi injectat automat.
            </p>
            {config.adSlots.map(slot => (
              <div key={slot.id} className="border border-border rounded-[4px] p-2 bg-card space-y-1.5">
                <div className="flex items-center gap-2">
                  <input
                    type="text" placeholder="Nume reclamă" value={slot.name}
                    onChange={e => updateAd(slot.id, "name", e.target.value)}
                    className="flex-1 h-6 rounded-[3px] border border-input bg-background px-1.5 text-[10px] outline-none focus:border-primary"
                  />
                  <select
                    value={slot.position}
                    onChange={e => updateAd(slot.id, "position", e.target.value)}
                    className="h-6 rounded-[3px] border border-input bg-background px-1 text-[10px] outline-none focus:border-primary"
                  >
                    {positions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                  <label className="flex items-center gap-1 text-[10px]">
                    <input type="checkbox" checked={slot.enabled} onChange={e => updateAd(slot.id, "enabled", e.target.checked)} className="h-3 w-3" />
                    Activ
                  </label>
                  <button onClick={() => removeAd(slot.id)} className="text-destructive hover:opacity-70">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
                {slot.position === "calculator" && (
                  <select
                    value={slot.calculatorId || ""}
                    onChange={e => updateAd(slot.id, "calculatorId", e.target.value)}
                    className="w-full h-6 rounded-[3px] border border-input bg-background px-1 text-[10px] outline-none focus:border-primary"
                  >
                    <option value="">Alege calculator...</option>
                    {allCalcIds.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                )}
                <textarea
                  placeholder="Cod HTML Google Ads (ex: <ins class='adsbygoogle'...)"
                  value={slot.code}
                  onChange={e => updateAd(slot.id, "code", e.target.value)}
                  className="w-full h-16 rounded-[3px] border border-input bg-background p-1.5 text-[9px] font-mono outline-none focus:border-primary resize-none"
                />
              </div>
            ))}
            <button onClick={addAd} className="flex items-center gap-1 px-2 py-1 rounded-[4px] border border-dashed border-primary/40 text-[10px] text-primary hover:bg-primary/5 w-full justify-center">
              <Plus className="h-3 w-3" /> Adaugă reclamă
            </button>
          </div>
        )}

        {/* Referrals Tab */}
        {tab === "referrals" && (
          <div className="space-y-2">
            <p className="text-[10px] text-muted-foreground mb-2">
              Adaugă linkuri de referral pe calculatoare sau global. Linkurile apar sub rezultate.
            </p>
            {config.referrals.map(ref => (
              <div key={ref.id} className="border border-border rounded-[4px] p-2 bg-card space-y-1.5">
                <div className="flex items-center gap-2">
                  <input
                    type="text" placeholder="Text afișat" value={ref.label}
                    onChange={e => updateRef(ref.id, "label", e.target.value)}
                    className="flex-1 h-6 rounded-[3px] border border-input bg-background px-1.5 text-[10px] outline-none focus:border-primary"
                  />
                  <label className="flex items-center gap-1 text-[10px]">
                    <input type="checkbox" checked={ref.enabled} onChange={e => updateRef(ref.id, "enabled", e.target.checked)} className="h-3 w-3" />
                    Activ
                  </label>
                  <button onClick={() => removeRef(ref.id)} className="text-destructive hover:opacity-70">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
                <input
                  type="url" placeholder="URL referral" value={ref.url}
                  onChange={e => updateRef(ref.id, "url", e.target.value)}
                  className="w-full h-6 rounded-[3px] border border-input bg-background px-1.5 text-[10px] outline-none focus:border-primary"
                />
                <select
                  value={ref.zone}
                  onChange={e => updateRef(ref.id, "zone", e.target.value)}
                  className="w-full h-6 rounded-[3px] border border-input bg-background px-1 text-[10px] outline-none focus:border-primary"
                >
                  <option value="global">Global (toate calculatoarele)</option>
                  {allCalcIds.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            ))}
            <button onClick={addReferral} className="flex items-center gap-1 px-2 py-1 rounded-[4px] border border-dashed border-primary/40 text-[10px] text-primary hover:bg-primary/5 w-full justify-center">
              <Plus className="h-3 w-3" /> Adaugă referral
            </button>
          </div>
        )}

        {/* Settings Tab */}
        {tab === "settings" && (
          <SettingsPanel />
        )}
      </div>
    </Layout>
  );
};

const SettingsPanel = () => {
  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState("");
  const [changed, setChanged] = useState(false);

  const handleChange = () => {
    if (newUser && newPass) {
      changeCredentials(newUser, newPass);
      setChanged(true);
      setTimeout(() => setChanged(false), 3000);
    }
  };

  return (
    <div className="max-w-sm space-y-3">
      <h2 className="text-xs font-display font-semibold text-foreground flex items-center gap-1">
        <Key className="h-3 w-3" /> Schimbă credențiale
      </h2>
      <div className="space-y-1.5">
        <input
          type="text" placeholder="Utilizator nou" value={newUser}
          onChange={e => setNewUser(e.target.value)}
          className="w-full h-6 rounded-[3px] border border-input bg-background px-1.5 text-[10px] outline-none focus:border-primary"
        />
        <input
          type="password" placeholder="Parolă nouă" value={newPass}
          onChange={e => setNewPass(e.target.value)}
          className="w-full h-6 rounded-[3px] border border-input bg-background px-1.5 text-[10px] outline-none focus:border-primary"
        />
        <button onClick={handleChange}
          className="h-6 px-3 rounded-[4px] bg-primary text-primary-foreground text-[10px] font-medium hover:opacity-90">
          Salvează credențiale
        </button>
        {changed && <p className="text-[10px] text-green-600">✓ Credențiale actualizate</p>}
      </div>
      <div className="border-t border-border pt-2 mt-3">
        <p className="text-[10px] text-muted-foreground">
          Datele de administrare (reclame, referral-uri, credențiale) sunt stocate local în browser (localStorage).
          Pentru o soluție persistentă pe server, activează Lovable Cloud.
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
