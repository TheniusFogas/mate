export interface AdSlot {
  id: string;
  name: string;
  position: 'header' | 'between-sections' | 'sidebar' | 'footer' | 'calculator';
  code: string;
  enabled: boolean;
  calculatorId?: string;
}

export interface ReferralLink {
  id: string;
  label: string;
  url: string;
  zone: string; // 'global' or calculator ID
  enabled: boolean;
}

export interface AdminConfig {
  adSlots: AdSlot[];
  referrals: ReferralLink[];
}

const CONFIG_KEY = 'calc_admin_config';
const CREDS_KEY = 'calc_admin_creds';

const defaultConfig: AdminConfig = { adSlots: [], referrals: [] };

export const getAdminConfig = (): AdminConfig => {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return { ...defaultConfig };
    return { ...defaultConfig, ...JSON.parse(raw) };
  } catch {
    return { ...defaultConfig };
  }
};

export const saveAdminConfig = (config: AdminConfig) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
};

export const checkCredentials = (user: string, pass: string): boolean => {
  const stored = localStorage.getItem(CREDS_KEY);
  if (!stored) {
    if (user === 'admin' && pass === 'admin123') {
      localStorage.setItem(CREDS_KEY, JSON.stringify({ user: 'admin', pass: 'admin123' }));
      return true;
    }
    return false;
  }
  try {
    const creds = JSON.parse(stored);
    return creds.user === user && creds.pass === pass;
  } catch {
    return false;
  }
};

export const changeCredentials = (newUser: string, newPass: string) => {
  localStorage.setItem(CREDS_KEY, JSON.stringify({ user: newUser, pass: newPass }));
};

export const getAdsForPosition = (position: string, calculatorId?: string): AdSlot[] => {
  const config = getAdminConfig();
  return config.adSlots.filter(s =>
    s.enabled && (
      s.position === position ||
      (s.position === 'calculator' && s.calculatorId === calculatorId)
    )
  );
};

export const getReferralsForZone = (zone: string): ReferralLink[] => {
  const config = getAdminConfig();
  return config.referrals.filter(r => r.enabled && (r.zone === 'global' || r.zone === zone));
};

export const generateId = () => Math.random().toString(36).slice(2, 10);
