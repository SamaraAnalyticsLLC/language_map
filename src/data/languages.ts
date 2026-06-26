export interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  family: string
  branch: string
  color: string
}

export interface Region {
  code: string
  name: string
  country: string
  flag: string
  parentLanguage: string
}

export const LANGUAGES: Language[] = [
  { code: 'la', name: 'Latin', nativeName: 'Latina', flag: '🏛️', family: 'Indo-European', branch: 'Italic', color: '#8B7355' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', family: 'Indo-European', branch: 'Germanic', color: '#3B82F6' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', family: 'Indo-European', branch: 'Romance', color: '#EF4444' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', family: 'Indo-European', branch: 'Romance', color: '#10B981' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', family: 'Indo-European', branch: 'Romance', color: '#F59E0B' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', family: 'Indo-European', branch: 'Romance', color: '#6366F1' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', family: 'Indo-European', branch: 'Romance', color: '#EC4899' },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', flag: '🏴', family: 'Indo-European', branch: 'Romance', color: '#F97316' },
  { code: 'gl', name: 'Galician', nativeName: 'Galego', flag: '🌊', family: 'Indo-European', branch: 'Romance', color: '#0EA5E9' },
  { code: 'oc', name: 'Occitan', nativeName: 'Occitan', flag: '🌹', family: 'Indo-European', branch: 'Romance', color: '#D946EF' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', family: 'Indo-European', branch: 'Germanic', color: '#84CC16' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', family: 'Indo-European', branch: 'Germanic', color: '#06B6D4' },
]

export const REGIONS: Region[] = [
  { code: 'es_es', name: 'Castilian Spanish', country: 'Spain', flag: '🇪🇸', parentLanguage: 'es' },
  { code: 'es_mx', name: 'Mexican Spanish', country: 'Mexico', flag: '🇲🇽', parentLanguage: 'es' },
  { code: 'es_ar', name: 'Rioplatense Spanish', country: 'Argentina', flag: '🇦🇷', parentLanguage: 'es' },
  { code: 'pt_pt', name: 'European Portuguese', country: 'Portugal', flag: '🇵🇹', parentLanguage: 'pt' },
  { code: 'pt_br', name: 'Brazilian Portuguese', country: 'Brazil', flag: '🇧🇷', parentLanguage: 'pt' },
  { code: 'en_gb', name: 'British English', country: 'United Kingdom', flag: '🇬🇧', parentLanguage: 'en' },
  { code: 'en_us', name: 'American English', country: 'United States', flag: '🇺🇸', parentLanguage: 'en' },
  { code: 'fr_fr', name: 'Metropolitan French', country: 'France', flag: '🇫🇷', parentLanguage: 'fr' },
  { code: 'fr_ca', name: 'Canadian French', country: 'Canada', flag: '🇨🇦', parentLanguage: 'fr' },
  { code: 'it_it', name: 'Standard Italian', country: 'Italy', flag: '🇮🇹', parentLanguage: 'it' },
  { code: 'it_si', name: 'Sicilian-influenced', country: 'Sicily', flag: '🏝️', parentLanguage: 'it' },
  { code: 'de_de', name: 'Standard German', country: 'Germany', flag: '🇩🇪', parentLanguage: 'de' },
  { code: 'de_at', name: 'Austrian German', country: 'Austria', flag: '🇦🇹', parentLanguage: 'de' },
  { code: 'gl_es', name: 'Galician', country: 'Galicia, Spain', flag: '🌊', parentLanguage: 'gl' },
  { code: 'ca_es', name: 'Valencian / Catalan', country: 'Catalonia & Valencia', flag: '🏴', parentLanguage: 'ca' },
]

export const LEARNABLE_LANGUAGES = LANGUAGES.filter(l => l.code !== 'la')
export const KNOWN_LANGUAGES = LANGUAGES.filter(l => l.code !== 'la')
