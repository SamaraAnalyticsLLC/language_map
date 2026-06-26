export interface WordForm {
  word: string
  ipa?: string
  context?: string
  register?: 'formal' | 'informal' | 'neutral' | 'archaic' | 'colloquial'
  notes?: string
}

export interface RegionalVariant {
  regionCode: string
  word: string
  ipa?: string
  notes?: string
}

export interface LanguageEntry {
  langCode: string
  forms: WordForm[]
  regional?: RegionalVariant[]
  cognateStrength?: 'identical' | 'close' | 'distant' | 'false-friend'
}

export interface EtymologyNode {
  source: string
  word: string
  meaning?: string
  period?: string
}

export interface WordEntry {
  id: string
  concept: string
  category: string
  latinRoot?: string
  protoIndoEuropean?: string
  etymology: EtymologyNode[]
  languages: LanguageEntry[]
  semanticField: string[]
  funFact?: string
}

export const WORD_ENTRIES: WordEntry[] = [
  // ── TIME & NATURE ─────────────────────────────────────────────────────────
  {
    id: 'night',
    concept: 'Night',
    category: 'Time & Nature',
    latinRoot: 'nox, noctis',
    protoIndoEuropean: '*nókʷts',
    etymology: [
      { source: 'Proto-Indo-European', word: '*nókʷts', meaning: 'night' },
      { source: 'Latin', word: 'nox / noctis', meaning: 'night' },
      { source: 'Old English', word: 'niht', meaning: 'night' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'nox / noctis', ipa: '/nɔks/', context: 'Classical Latin' }] },
      { langCode: 'it', forms: [{ word: 'notte', ipa: '/ˈnɔt.te/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'noche', ipa: '/ˈno.tʃe/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'noite', ipa: '/ˈnoj.tɨ/', register: 'neutral' }], regional: [
        { regionCode: 'pt_pt', word: 'noite', ipa: '/ˈnoj.tɨ/', notes: 'Final vowel more reduced' },
        { regionCode: 'pt_br', word: 'noite', ipa: '/ˈnoj.tʃi/', notes: 'Final vowel more open, /tʃ/ palatalization' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'nuit', ipa: '/nɥi/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'noapte', ipa: '/ˈnoap.te/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'night', ipa: '/naɪt/', context: 'From Germanic, not Latin', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Nacht', ipa: '/naxt/', register: 'neutral' }], cognateStrength: 'distant' },
    ],
    semanticField: ['time', 'nature', 'daily-life'],
    funFact: 'The word "nocturnal" in English comes directly from Latin *nocturnalis*, showing how Latin roots persist in scientific vocabulary across languages.',
  },
  {
    id: 'day',
    concept: 'Day',
    category: 'Time & Nature',
    latinRoot: 'dies',
    protoIndoEuropean: '*dyew-',
    etymology: [
      { source: 'Proto-Indo-European', word: '*dyew-', meaning: 'sky, shine' },
      { source: 'Latin', word: 'dies', meaning: 'day' },
      { source: 'Proto-Germanic', word: '*dagaz', meaning: 'day' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'dies', ipa: '/ˈdi.es/', context: 'Also: time, period' }] },
      { langCode: 'it', forms: [{ word: 'giorno', ipa: '/ˈdʒor.no/', context: 'From Latin diurnum (daily)' }, { word: 'dì', ipa: '/di/', context: 'Poetic/archaic', register: 'archaic' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'día', ipa: '/ˈdi.a/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'dia', ipa: '/ˈdi.ɐ/', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'dia', ipa: '/ˈdʒi.ɐ/', notes: '/d/ before /i/ becomes /dʒ/ in BR' },
        { regionCode: 'pt_pt', word: 'dia', ipa: '/ˈdi.ɐ/', notes: 'Dental /d/ retained' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'jour', ipa: '/ʒuʁ/', context: 'From Latin diurnum' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'zi', ipa: '/zi/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'day', ipa: '/deɪ/', context: 'From Proto-Germanic *dagaz' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Tag', ipa: '/taːk/', context: 'From Proto-Germanic *dagaz' }], cognateStrength: 'distant' },
    ],
    semanticField: ['time', 'nature', 'daily-life'],
    funFact: 'Spanish "día" and Italian "giorno" both come from Latin "dies", but via different paths. Italian took the adjective form "diurnum" → "giorno", while Spanish kept the root directly.',
  },
  {
    id: 'sun',
    concept: 'Sun',
    category: 'Time & Nature',
    latinRoot: 'sol',
    protoIndoEuropean: '*sóh₂wl̥',
    etymology: [
      { source: 'Proto-Indo-European', word: '*sóh₂wl̥', meaning: 'sun' },
      { source: 'Latin', word: 'sol', meaning: 'sun' },
      { source: 'Proto-Germanic', word: '*sunnō', meaning: 'sun' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'sol', ipa: '/sɔl/' }] },
      { langCode: 'it', forms: [{ word: 'sole', ipa: '/ˈso.le/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'sol', ipa: '/sol/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'sol', ipa: '/sɔl/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'fr', forms: [{ word: 'soleil', ipa: '/so.lɛj/', context: 'Diminutive form: little sun', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'soare', ipa: '/ˈso̯a.re/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'sun', ipa: '/sʌn/', context: 'From Proto-Germanic *sunnō' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Sonne', ipa: '/ˈzɔ.nə/', context: 'From Proto-Germanic *sunnō' }], cognateStrength: 'distant' },
    ],
    semanticField: ['nature', 'astronomy', 'weather'],
    funFact: 'French "soleil" is a diminutive — it literally meant "little sun." Solar, solstice, parasol — all from the same Latin root *sol*.',
  },
  {
    id: 'moon',
    concept: 'Moon',
    category: 'Time & Nature',
    latinRoot: 'luna',
    etymology: [
      { source: 'Proto-Indo-European', word: '*lówksneh₂', meaning: 'light, glow' },
      { source: 'Latin', word: 'luna', meaning: 'moon' },
      { source: 'Proto-Germanic', word: '*mēnô', meaning: 'moon' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'luna', ipa: '/ˈlu.na/' }] },
      { langCode: 'it', forms: [{ word: 'luna', ipa: '/ˈlu.na/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'luna', ipa: '/ˈlu.na/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'lua', ipa: '/ˈlu.ɐ/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'lune', ipa: '/lyn/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'lună', ipa: '/ˈlu.nə/', context: 'Also means "month"!', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'moon', ipa: '/muːn/', context: 'From Proto-Germanic *mēnô' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Mond', ipa: '/mɔnt/', context: 'From Proto-Germanic *mēnô' }], cognateStrength: 'distant' },
    ],
    semanticField: ['nature', 'astronomy', 'time'],
    funFact: '"Lunatic," "lunacy," and "lunar" all come from Latin *luna* — the ancients believed the moon influenced the mind. Romanian *lună* uniquely means both moon and month.',
  },
  {
    id: 'water',
    concept: 'Water',
    category: 'Elements & Nature',
    latinRoot: 'aqua',
    protoIndoEuropean: '*h₂ekʷeh₂',
    etymology: [
      { source: 'Proto-Indo-European', word: '*h₂ekʷeh₂', meaning: 'water' },
      { source: 'Latin', word: 'aqua', meaning: 'water' },
      { source: 'Proto-Germanic', word: '*watō', meaning: 'water' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'aqua', ipa: '/ˈa.kʷa/' }] },
      { langCode: 'it', forms: [{ word: 'acqua', ipa: '/ˈak.kwa/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'agua', ipa: '/ˈa.ɣwa/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'água', ipa: '/ˈa.ɡwɐ/', register: 'neutral' }], regional: [
        { regionCode: 'pt_pt', word: 'água', ipa: '/ˈa.ɡwɐ/', notes: 'Unstressed vowels more reduced' },
        { regionCode: 'pt_br', word: 'água', ipa: '/ˈa.ɡwa/', notes: 'Vowels more open and clear' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'eau', ipa: '/o/', context: 'Heavily reduced from Latin', notes: 'Dramatic sound change: aqua → eau!' }], cognateStrength: 'distant' },
      { langCode: 'ro', forms: [{ word: 'apă', ipa: '/ˈa.pə/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'water', ipa: '/ˈwɔː.tər/', context: 'From Proto-Germanic' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Wasser', ipa: '/ˈvas.ɐ/', context: 'From Proto-Germanic' }], cognateStrength: 'distant' },
    ],
    semanticField: ['nature', 'elements', 'daily-life'],
    funFact: 'French "eau" descended from Latin "aqua" through: *aqua → aiga → eaue → eau*. The spelling "eau" preserves the medieval pronunciation!',
  },
  {
    id: 'fire',
    concept: 'Fire',
    category: 'Elements & Nature',
    latinRoot: 'focus / ignis',
    etymology: [
      { source: 'Latin', word: 'focus', meaning: 'hearth, fireplace' },
      { source: 'Latin', word: 'ignis', meaning: 'fire (classical)' },
      { source: 'Proto-Germanic', word: '*fōr', meaning: 'fire' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'focus / ignis', ipa: '/ˈfo.kus/', context: 'focus = hearth; ignis = flame' }] },
      { langCode: 'it', forms: [{ word: 'fuoco', ipa: '/ˈfwɔ.ko/', context: 'From focus (hearth)', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'fuego', ipa: '/ˈfwe.ɣo/', context: 'From focus (hearth)', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'fogo', ipa: '/ˈfo.ɡu/', context: 'From focus (hearth)', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'feu', ipa: '/fø/', context: 'From focus (hearth)', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'foc', ipa: '/fok/', context: 'From focus', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'fire', ipa: '/faɪər/', context: 'From Proto-Germanic *fōr' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Feuer', ipa: '/ˈfɔʏ.ɐ/', context: 'From Proto-Germanic *fōr' }], cognateStrength: 'distant' },
    ],
    semanticField: ['nature', 'elements', 'daily-life'],
    funFact: 'All Romance languages chose Latin *focus* (hearth/fireplace) over the classical *ignis* (fire) — a domestic word beat the poetic one. English "focus" is a learned borrowing from Latin, originally meaning "hearth."',
  },

  // ── BODY ──────────────────────────────────────────────────────────────────
  {
    id: 'heart',
    concept: 'Heart',
    category: 'Body',
    latinRoot: 'cor, cordis',
    protoIndoEuropean: '*ḱḗr',
    etymology: [
      { source: 'Proto-Indo-European', word: '*ḱḗr', meaning: 'heart' },
      { source: 'Latin', word: 'cor / cordis', meaning: 'heart; center; mind' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'cor / cordis', ipa: '/kɔr/', context: 'Also metaphorically: mind, soul' }] },
      { langCode: 'it', forms: [{ word: 'cuore', ipa: '/ˈkwɔ.re/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'corazón', ipa: '/ko.ɾaˈθon/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'coração', ipa: '/ko.ɾɐˈsɐ̃w̃/', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'coração', ipa: '/ko.ɾaˈsɐ̃w/', notes: 'Nasalization slightly different' },
        { regionCode: 'pt_pt', word: 'coração', ipa: '/ku.ɾɐˈsɐ̃w̃/', notes: 'Unstressed /o/ → /u/' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'cœur', ipa: '/kœʁ/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'inimă', ipa: '/ˈi.ni.mə/', context: 'From Latin *anima (soul/breath)!', notes: 'Romanian uses a different Latin root' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'heart', ipa: '/hɑːrt/', context: 'From Proto-Germanic *hertô' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Herz', ipa: '/hɛrts/', context: 'From Proto-Germanic *hertô' }], cognateStrength: 'distant' },
    ],
    semanticField: ['body', 'emotions', 'anatomy'],
    funFact: '"Cordial," "accord," "discord," and "courage" all come from Latin *cor/cordis*. In French, *coeur* lives on in "par coeur" (by heart = memorized).',
  },
  {
    id: 'hand',
    concept: 'Hand',
    category: 'Body',
    latinRoot: 'manus',
    etymology: [
      { source: 'Proto-Indo-European', word: '*man-', meaning: 'hand' },
      { source: 'Latin', word: 'manus', meaning: 'hand' },
      { source: 'Proto-Germanic', word: '*handuz', meaning: 'hand' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'manus', ipa: '/ˈma.nus/' }] },
      { langCode: 'it', forms: [{ word: 'mano', ipa: '/ˈma.no/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'mano', ipa: '/ˈma.no/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'mão', ipa: '/mɐ̃w̃/', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'mão', ipa: '/mɐ̃w/', notes: 'Strong nasalization' },
        { regionCode: 'pt_pt', word: 'mão', ipa: '/mɐ̃w̃/', notes: 'Same, slightly different nasalization' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'main', ipa: '/mɛ̃/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'mână', ipa: '/ˈmɨ.nə/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'hand', ipa: '/hænd/', context: 'From Proto-Germanic *handuz' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Hand', ipa: '/hant/', context: 'From Proto-Germanic *handuz' }], cognateStrength: 'distant' },
    ],
    semanticField: ['body', 'anatomy'],
    funFact: 'Latin *manus* gave us: manual, manuscript, manufacture, manipulate, manicure, mandate — and the Italian greeting "ciao" likely has roots in *schiavo* (slave, servant) meaning "I am your servant," not from *manus* itself.',
  },
  {
    id: 'eye',
    concept: 'Eye',
    category: 'Body',
    latinRoot: 'oculus',
    etymology: [
      { source: 'Proto-Indo-European', word: '*h₃ekʷ-', meaning: 'eye, to see' },
      { source: 'Latin', word: 'oculus', meaning: 'eye' },
      { source: 'Proto-Germanic', word: '*augô', meaning: 'eye' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'oculus', ipa: '/ˈo.ku.lus/' }] },
      { langCode: 'it', forms: [{ word: 'occhio', ipa: '/ˈok.kjo/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'ojo', ipa: '/ˈo.xo/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'olho', ipa: '/ˈo.ʎu/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'œil', ipa: '/œj/', context: 'Plural: yeux /jø/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'ochi', ipa: '/okʲ/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'eye', ipa: '/aɪ/', context: 'From Proto-Germanic *augô' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Auge', ipa: '/ˈaʊ.ɡə/', context: 'From Proto-Germanic *augô' }], cognateStrength: 'distant' },
    ],
    semanticField: ['body', 'anatomy', 'senses'],
    funFact: 'French has a unique irregular plural: *œil* (eye) → *yeux* (eyes) — completely different stems! This is called suppletion, the same phenomenon as English "go/went."',
  },
  {
    id: 'mouth',
    concept: 'Mouth',
    category: 'Body',
    latinRoot: 'bucca / os, oris',
    etymology: [
      { source: 'Latin', word: 'bucca', meaning: 'cheek, puffed cheek (Vulgar Latin for mouth)' },
      { source: 'Latin', word: 'os / oris', meaning: 'mouth (classical)' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'os / oris', ipa: '/ɔs/', context: 'Classical; bucca in Vulgar Latin' }] },
      { langCode: 'it', forms: [{ word: 'bocca', ipa: '/ˈbok.ka/', context: 'From bucca (cheek)', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'boca', ipa: '/ˈbo.ka/', context: 'From bucca', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'boca', ipa: '/ˈbo.kɐ/', context: 'From bucca', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'bouche', ipa: '/buʃ/', context: 'From bucca', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'gură', ipa: '/ˈɡu.rə/', context: 'From Latin gula (throat/gullet)', register: 'neutral' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'mouth', ipa: '/maʊθ/', context: 'From Proto-Germanic *munþaz' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Mund', ipa: '/mʊnt/', context: 'From Proto-Germanic *munþaz' }], cognateStrength: 'distant' },
    ],
    semanticField: ['body', 'anatomy', 'senses'],
    funFact: 'All main Romance languages replaced the classical Latin *os/oris* (mouth) with the vulgar *bucca* (puffed cheek). English "oral" and "orifice" preserve the classical root.',
  },

  // ── NUMBERS ───────────────────────────────────────────────────────────────
  {
    id: 'one',
    concept: 'One',
    category: 'Numbers',
    latinRoot: 'unus',
    etymology: [
      { source: 'Proto-Indo-European', word: '*óynos', meaning: 'one' },
      { source: 'Latin', word: 'unus', meaning: 'one' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'unus / una', ipa: '/ˈu.nus/' }] },
      { langCode: 'it', forms: [{ word: 'uno / una', ipa: '/ˈu.no/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'uno / una', ipa: '/ˈu.no/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'um / uma', ipa: '/ũ/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'un / une', ipa: '/œ̃/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'un / o', ipa: '/un/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'one', ipa: '/wʌn/', context: 'From Proto-Germanic *ainaz' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'ein / eine', ipa: '/aɪn/', context: 'From Proto-Germanic *ainaz' }], cognateStrength: 'distant' },
    ],
    semanticField: ['numbers', 'abstract'],
    funFact: '"Unique," "union," "universe," "unanimous" — all from Latin *unus*. English "one" and German "ein" are cousins through Proto-Germanic *ainaz.',
  },
  {
    id: 'two',
    concept: 'Two',
    category: 'Numbers',
    latinRoot: 'duo',
    protoIndoEuropean: '*dwóh₁',
    etymology: [
      { source: 'Proto-Indo-European', word: '*dwóh₁', meaning: 'two' },
      { source: 'Latin', word: 'duo / duae', meaning: 'two' },
      { source: 'Proto-Germanic', word: '*twai', meaning: 'two' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'duo / duae', ipa: '/ˈdu.o/' }] },
      { langCode: 'it', forms: [{ word: 'due', ipa: '/ˈdu.e/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'dos', ipa: '/dos/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'dois / duas', ipa: '/dojʃ/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'deux', ipa: '/dø/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'doi / două', ipa: '/doj/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'two', ipa: '/tuː/', context: 'From Proto-Germanic *twai' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'zwei', ipa: '/tsvaɪ/', context: 'From Proto-Germanic *twai' }], cognateStrength: 'distant' },
    ],
    semanticField: ['numbers', 'abstract'],
    funFact: '"Duo," "dual," "double," "doubt" (< Latin *dubitare*, to have two minds), "duel," "dozen" (< *duodecim*, twelve) — all from Latin *duo*.',
  },
  {
    id: 'three',
    concept: 'Three',
    category: 'Numbers',
    latinRoot: 'tres',
    protoIndoEuropean: '*tréyes',
    etymology: [
      { source: 'Proto-Indo-European', word: '*tréyes', meaning: 'three' },
      { source: 'Latin', word: 'tres / tria', meaning: 'three' },
      { source: 'Proto-Germanic', word: '*þrīz', meaning: 'three' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'tres / tria', ipa: '/treːs/' }] },
      { langCode: 'it', forms: [{ word: 'tre', ipa: '/tre/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'tres', ipa: '/tres/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'três', ipa: '/tɾeʃ/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'fr', forms: [{ word: 'trois', ipa: '/tʁwa/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'trei', ipa: '/trej/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'three', ipa: '/θriː/', context: 'From Proto-Germanic *þrīz' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'drei', ipa: '/dʁaɪ/', context: 'From Proto-Germanic *þrīz' }], cognateStrength: 'distant' },
    ],
    semanticField: ['numbers', 'abstract'],
    funFact: 'Numbers are uniquely resistant to borrowing — they often show the clearest Indo-European connections. Italian *tre*, French *trois*, English *three*, German *drei*, Sanskrit *trīṇi* — all cousins.',
  },

  // ── COLORS ────────────────────────────────────────────────────────────────
  {
    id: 'red',
    concept: 'Red',
    category: 'Colors',
    latinRoot: 'rubeus / ruffus',
    etymology: [
      { source: 'Proto-Indo-European', word: '*h₁rewdʰ-', meaning: 'red' },
      { source: 'Latin', word: 'rubeus / rufus', meaning: 'red' },
      { source: 'Proto-Germanic', word: '*raudaz', meaning: 'red' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'rubeus / rufus', ipa: '/ˈru.be.us/', context: 'rubeus = deep red; rufus = reddish' }] },
      { langCode: 'it', forms: [{ word: 'rosso', ipa: '/ˈros.so/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'rojo', ipa: '/ˈro.xo/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'vermelho', ipa: '/veɾˈme.ʎu/', context: 'From Latin vermiculus (little worm — red dye!)', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'rouge', ipa: '/ʁuʒ/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'roșu', ipa: '/ˈro.ʃu/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'red', ipa: '/rɛd/', context: 'From Proto-Germanic *raudaz' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'rot', ipa: '/roːt/', context: 'From Proto-Germanic *raudaz' }], cognateStrength: 'distant' },
    ],
    semanticField: ['colors', 'abstract'],
    funFact: 'Portuguese "vermelho" (red) comes from Latin *vermiculus*, meaning "little worm" — specifically the kermes insect used to make crimson dye. English "vermilion" comes from the same root!',
  },
  {
    id: 'white',
    concept: 'White',
    category: 'Colors',
    latinRoot: 'albus / candidus / blancus',
    etymology: [
      { source: 'Latin', word: 'albus', meaning: 'white (matte, dull)' },
      { source: 'Latin', word: 'candidus', meaning: 'white (bright, shining)' },
      { source: 'Germanic', word: '*blankaz', meaning: 'white, bright (borrowed into Romance)' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'albus / candidus', ipa: '/ˈal.bus/', context: 'Two different whites: dull vs bright' }] },
      { langCode: 'it', forms: [{ word: 'bianco', ipa: '/ˈbjan.ko/', context: 'From Germanic *blankaz', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'blanco', ipa: '/ˈblaŋ.ko/', context: 'From Germanic *blankaz', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'branco', ipa: '/ˈbɾɐ̃.ku/', context: 'From Germanic *blankaz', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'blanc', ipa: '/blɑ̃/', context: 'From Germanic *blankaz', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'alb', ipa: '/alb/', context: 'Kept the classical Latin albus!', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'en', forms: [{ word: 'white', ipa: '/waɪt/', context: 'From Proto-Germanic *hwītaz' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'weiß', ipa: '/vaɪs/', context: 'From Proto-Germanic *hwītaz' }], cognateStrength: 'distant' },
    ],
    semanticField: ['colors', 'abstract'],
    funFact: 'Romance languages replaced the classical Latin *albus* with a Germanic loanword *blankaz* — yet Romanian kept *alb*. "Album" (white tablet), "albino," and "albumen" preserve the Latin root in English.',
  },
  {
    id: 'black',
    concept: 'Black',
    category: 'Colors',
    latinRoot: 'niger / ater',
    etymology: [
      { source: 'Latin', word: 'niger', meaning: 'black (shiny)' },
      { source: 'Latin', word: 'ater', meaning: 'black (matte, gloomy)' },
      { source: 'Proto-Germanic', word: '*swartaz', meaning: 'black, dark' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'niger / ater', ipa: '/ˈni.ɡer/', context: 'niger = shiny black; ater = dark/gloomy black' }] },
      { langCode: 'it', forms: [{ word: 'nero', ipa: '/ˈne.ro/', context: 'From niger', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'negro', ipa: '/ˈne.ɣɾo/', context: 'From niger', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'negro / preto', ipa: '/ˈne.ɡɾu/', context: 'negro (formal/literary); preto (everyday)', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'preto', notes: '"Preto" strongly preferred in everyday speech in Brazil' },
        { regionCode: 'pt_pt', word: 'negro / preto', notes: 'Both used; "negro" not taboo in Portugal' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'noir', ipa: '/nwaʁ/', context: 'From niger', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'negru', ipa: '/ˈne.ɡru/', context: 'From niger', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'black', ipa: '/blæk/', context: 'From Proto-Germanic *blakaz' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'schwarz', ipa: '/ʃvaʁts/', context: 'From Proto-Germanic *swartaz' }], cognateStrength: 'distant' },
    ],
    semanticField: ['colors', 'abstract'],
    funFact: 'Latin had two blacks: *niger* (shiny, like polished stone) gave us "Negro," "noir," "nero." The other, *ater* (dull, gloomy), gave us "atrocious" — a word that started meaning merely "black."',
  },

  // ── FOOD & DRINK ──────────────────────────────────────────────────────────
  {
    id: 'bread',
    concept: 'Bread',
    category: 'Food & Drink',
    latinRoot: 'panis',
    etymology: [
      { source: 'Latin', word: 'panis', meaning: 'bread' },
      { source: 'Proto-Germanic', word: '*braudą', meaning: 'bread (baked/brewed)' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'panis', ipa: '/ˈpa.nis/' }] },
      { langCode: 'it', forms: [{ word: 'pane', ipa: '/ˈpa.ne/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'pan', ipa: '/pan/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'pão', ipa: '/pɐ̃w̃/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'pain', ipa: '/pɛ̃/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'pâine', ipa: '/ˈpɨj.ne/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'bread', ipa: '/brɛd/', context: 'From Proto-Germanic *braudą' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Brot', ipa: '/broːt/', context: 'From Proto-Germanic *braudą' }], cognateStrength: 'distant' },
    ],
    semanticField: ['food', 'daily-life'],
    funFact: '"Company" comes from Latin *com* + *panis* — literally "with-bread," those you share bread with. A "companion" is your bread-sharer. "Pantry" also comes from *panis*.',
  },
  {
    id: 'wine',
    concept: 'Wine',
    category: 'Food & Drink',
    latinRoot: 'vinum',
    etymology: [
      { source: 'Proto-Indo-European', word: '*wóyh₁nom', meaning: 'wine' },
      { source: 'Latin', word: 'vinum', meaning: 'wine' },
      { source: 'Proto-Germanic', word: '*wīną', meaning: 'wine (borrowed from Latin)' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'vinum', ipa: '/ˈwi.num/' }] },
      { langCode: 'it', forms: [{ word: 'vino', ipa: '/ˈvi.no/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'vino', ipa: '/ˈbi.no/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'vinho', ipa: '/ˈvi.ɲu/', register: 'neutral' }], regional: [
        { regionCode: 'pt_pt', word: 'vinho', notes: 'Port wine = "vinho do Porto"' },
        { regionCode: 'pt_br', word: 'vinho', notes: 'Same word; Brazil more of a cachaça culture' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'vin', ipa: '/vɛ̃/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'vin', ipa: '/vin/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'wine', ipa: '/waɪn/', context: 'From Proto-Germanic *wīną (borrowed from Latin)' }], cognateStrength: 'close' },
      { langCode: 'de', forms: [{ word: 'Wein', ipa: '/vaɪn/', context: 'From Proto-Germanic *wīną (borrowed from Latin)' }], cognateStrength: 'close' },
    ],
    semanticField: ['food', 'drinks', 'culture'],
    funFact: 'Unlike most words, "wine" / "Wein" in Germanic languages are actually Latin loans — the Romans spread viticulture northward, and the word came with the drink.',
  },
  {
    id: 'fish',
    concept: 'Fish',
    category: 'Food & Drink',
    latinRoot: 'piscis',
    etymology: [
      { source: 'Proto-Indo-European', word: '*peysḱ-', meaning: 'fish' },
      { source: 'Latin', word: 'piscis', meaning: 'fish' },
      { source: 'Proto-Germanic', word: '*fiskaz', meaning: 'fish' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'piscis', ipa: '/ˈpis.kis/' }] },
      { langCode: 'it', forms: [{ word: 'pesce', ipa: '/ˈpeʃ.ʃe/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'pez / pescado', ipa: '/peθ/', context: 'pez = live fish; pescado = caught/cooked fish', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'peixe', ipa: '/ˈpej.ʃɨ/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'poisson', ipa: '/pwa.sɔ̃/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'pește', ipa: '/ˈpeʃ.te/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'fish', ipa: '/fɪʃ/', context: 'From Proto-Germanic *fiskaz' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Fisch', ipa: '/fɪʃ/', context: 'From Proto-Germanic *fiskaz' }], cognateStrength: 'distant' },
    ],
    semanticField: ['food', 'nature', 'animals'],
    funFact: 'Spanish uniquely distinguishes *pez* (a living fish in the water) from *pescado* (a fish out of the water, caught or cooked). This live/dead distinction doesn\'t exist in other Romance languages.',
  },

  // ── VERBS ─────────────────────────────────────────────────────────────────
  {
    id: 'eat',
    concept: 'To Eat',
    category: 'Verbs',
    latinRoot: 'comedere / manducare',
    etymology: [
      { source: 'Latin', word: 'edere / comedere', meaning: 'to eat (classical)' },
      { source: 'Latin', word: 'manducare', meaning: 'to chew, to eat (Vulgar Latin)' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'edere / comedere', ipa: '/ˈe.de.re/', context: 'Classical; manducare in Vulgar Latin' }] },
      { langCode: 'it', forms: [{ word: 'mangiare', ipa: '/manˈdʒa.re/', context: 'From manducare', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'comer', ipa: '/koˈmeɾ/', context: 'From comedere', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'comer', ipa: '/koˈmeɾ/', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'comer', notes: 'Final -r often dropped in casual speech' },
        { regionCode: 'pt_pt', word: 'comer', notes: 'Final -r more pronounced' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'manger', ipa: '/mɑ̃.ʒe/', context: 'From manducare', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'a mânca', ipa: '/a mɨnˈka/', context: 'From manducare', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'to eat', ipa: '/iːt/', context: 'From Proto-Germanic *etaną' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'essen', ipa: '/ˈɛs.ən/', context: 'From Proto-Germanic *etaną' }], cognateStrength: 'distant' },
    ],
    semanticField: ['food', 'action', 'daily-life'],
    funFact: 'The vulgar Latin *manducare* gave us "mangiare", "manger", "mânca" — and also the English word "munch"! Spanish and Portuguese kept the more classical *comedere*.',
  },
  {
    id: 'speak',
    concept: 'To Speak',
    category: 'Verbs',
    latinRoot: 'fabulare / loqui / parabolare',
    etymology: [
      { source: 'Latin', word: 'parabola', meaning: 'parable, speech', period: 'Late Latin' },
      { source: 'Latin', word: 'fabulare', meaning: 'to talk, tell stories' },
      { source: 'Latin', word: 'loqui', meaning: 'to speak (classical)' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'loqui / fabulari', ipa: '/ˈlo.kʷi/', context: 'Classical; fabulari in Vulgar Latin' }] },
      { langCode: 'it', forms: [{ word: 'parlare', ipa: '/parˈla.re/', context: 'From Latin parabolare', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'hablar', ipa: '/aˈβ̞laɾ/', context: 'From Latin fabulare', register: 'neutral' }], regional: [
        { regionCode: 'es_ar', word: 'hablar', notes: '"Hablar" standard; "charlar" for chatting' },
      ], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'falar', ipa: '/fɐˈlaɾ/', context: 'From Latin fabulare', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'falar', ipa: '/faˈla(ɾ)/', notes: 'Final -r often dropped in speech' },
        { regionCode: 'pt_pt', word: 'falar', ipa: '/fɐˈlaɾ/', notes: 'Final -r more pronounced' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'parler', ipa: '/paʁ.le/', context: 'From Latin parabolare', register: 'neutral' }], regional: [
        { regionCode: 'fr_ca', word: 'parler', notes: '"Jaser" used colloquially for chatting' },
      ], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'a vorbi', ipa: '/a vorˈbi/', context: 'From Slavic *vorbiti — not Latin!', register: 'neutral' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'to speak', ipa: '/spiːk/', context: 'From Old English specan' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'sprechen', ipa: '/ˈʃpʁɛ.çən/', context: 'From Proto-Germanic' }], cognateStrength: 'distant' },
    ],
    semanticField: ['communication', 'action', 'language'],
    funFact: 'Spanish "hablar" and Portuguese "falar" both descend from Latin "fabulare" (to tell fables). Italian and French use "parabolare" as their base. These two paths split early in the Romance world!',
  },
  {
    id: 'go',
    concept: 'To Go',
    category: 'Verbs',
    latinRoot: 'ire / vadere / ambulare',
    etymology: [
      { source: 'Latin', word: 'ire', meaning: 'to go (classical, suppletive)' },
      { source: 'Latin', word: 'vadere', meaning: 'to go, to advance' },
      { source: 'Latin', word: 'ambulare', meaning: 'to walk' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'ire / vadere', ipa: '/ˈi.re/', context: 'Multiple verbs merged in Vulgar Latin' }] },
      { langCode: 'it', forms: [{ word: 'andare', ipa: '/anˈda.re/', context: 'Origin uncertain; possibly from ambulare', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'es', forms: [{ word: 'ir', ipa: '/iɾ/', context: 'From Latin ire; suppletive with "voy" from vadere', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'ir', ipa: '/iɾ/', context: 'From Latin ire', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'ir', notes: '"Vou" (I go) from vadere; common in speech' },
        { regionCode: 'pt_pt', word: 'ir', notes: 'Same suppletive paradigm' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'aller', ipa: '/a.le/', context: 'From Latin ambulare (to walk)! Suppletive: je vais, nous allons', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'ro', forms: [{ word: 'a merge', ipa: '/a ˈmer.dʒe/', context: 'From Latin mergere (to plunge)!', register: 'neutral' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'to go', ipa: '/ɡoʊ/', context: 'From Proto-Germanic; "went" from wander (suppletive)' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'gehen', ipa: '/ˈɡeː.ən/', context: 'From Proto-Germanic *gangan' }], cognateStrength: 'distant' },
    ],
    semanticField: ['action', 'movement'],
    funFact: '"To go" is notoriously irregular across all languages because multiple verbs merged. French *aller* comes from *ambulare* (to walk), yet "I go" = *je vais* from *vadere*. English "went" is actually the past tense of a completely different word (*wander*).',
  },
  {
    id: 'give',
    concept: 'To Give',
    category: 'Verbs',
    latinRoot: 'dare',
    protoIndoEuropean: '*deh₃-',
    etymology: [
      { source: 'Proto-Indo-European', word: '*deh₃-', meaning: 'to give' },
      { source: 'Latin', word: 'dare', meaning: 'to give' },
      { source: 'Proto-Germanic', word: '*gebaną', meaning: 'to give' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'dare', ipa: '/ˈda.re/' }] },
      { langCode: 'it', forms: [{ word: 'dare', ipa: '/ˈda.re/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'dar', ipa: '/daɾ/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'dar', ipa: '/daɾ/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'fr', forms: [{ word: 'donner', ipa: '/dɔ.ne/', context: 'From Latin donare (to donate/gift)', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'a da', ipa: '/a da/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'en', forms: [{ word: 'to give', ipa: '/ɡɪv/', context: 'From Proto-Germanic *gebaną' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'geben', ipa: '/ˈɡeː.bən/', context: 'From Proto-Germanic *gebaną' }], cognateStrength: 'distant' },
    ],
    semanticField: ['action', 'social'],
    funFact: '"Data" literally means "things given" (neuter plural of Latin *datum*). "Date" (a time) comes from the same root — medieval letters began "datum Romae" (given at Rome) to mark when they were written.',
  },
  {
    id: 'see',
    concept: 'To See',
    category: 'Verbs',
    latinRoot: 'videre',
    etymology: [
      { source: 'Proto-Indo-European', word: '*weyd-', meaning: 'to see, to know' },
      { source: 'Latin', word: 'videre', meaning: 'to see' },
      { source: 'Proto-Germanic', word: '*sehwaną', meaning: 'to see' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'videre', ipa: '/wiˈde.re/' }] },
      { langCode: 'it', forms: [{ word: 'vedere', ipa: '/veˈde.re/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'ver', ipa: '/beɾ/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'ver', ipa: '/veɾ/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'voir', ipa: '/vwaʁ/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'a vedea', ipa: '/a veˈde.a/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'to see', ipa: '/siː/', context: 'From Proto-Germanic *sehwaną' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'sehen', ipa: '/ˈzeː.ən/', context: 'From Proto-Germanic *sehwaną' }], cognateStrength: 'distant' },
    ],
    semanticField: ['action', 'senses'],
    funFact: '"Video," "vision," "evident," "provide," "survey," "view" — all from Latin *videre*. Even "wit" and "wise" in English share the same Proto-Indo-European root *weyd-* (to see = to know).',
  },
  {
    id: 'know',
    concept: 'To Know',
    category: 'Verbs',
    latinRoot: 'scire / sapere / cognoscere',
    etymology: [
      { source: 'Latin', word: 'scire', meaning: 'to know (facts)' },
      { source: 'Latin', word: 'sapere', meaning: 'to know (by taste/wisdom)' },
      { source: 'Latin', word: 'cognoscere', meaning: 'to get to know, recognize' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'scire / sapere', ipa: '/ˈski.re/', context: 'scire = factual; sapere = by wisdom' }] },
      { langCode: 'it', forms: [
        { word: 'sapere', ipa: '/saˈpe.re/', context: 'Know facts/how to', register: 'neutral' },
        { word: 'conoscere', ipa: '/koˈnoʃ.ʃe.re/', context: 'Know people/places', register: 'neutral' },
      ], cognateStrength: 'identical' },
      { langCode: 'es', forms: [
        { word: 'saber', ipa: '/saˈβeɾ/', context: 'Know facts/how to', register: 'neutral' },
        { word: 'conocer', ipa: '/konoˈθeɾ/', context: 'Know people/places', register: 'neutral' },
      ], cognateStrength: 'close' },
      { langCode: 'pt', forms: [
        { word: 'saber', ipa: '/saˈbeɾ/', context: 'Know facts/how to', register: 'neutral' },
        { word: 'conhecer', ipa: '/koɲeˈseɾ/', context: 'Know people/places', register: 'neutral' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [
        { word: 'savoir', ipa: '/sa.vwaʁ/', context: 'Know facts/how to', register: 'neutral' },
        { word: 'connaître', ipa: '/kɔ.nɛtʁ/', context: 'Know people/places', register: 'neutral' },
      ], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'a ști', ipa: '/a ʃti/', context: 'From Latin scire', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'to know', ipa: '/noʊ/', context: 'From Proto-Germanic *knāwaną' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'wissen / kennen', ipa: '/ˈvɪ.sən/', context: 'wissen = facts; kennen = acquaintance' }], cognateStrength: 'distant' },
    ],
    semanticField: ['action', 'knowledge', 'abstract'],
    funFact: 'Italian, Spanish, Portuguese, French, AND German all split "to know" into two verbs: one for facts (*saber/savoir/wissen*) and one for people/places (*conocer/connaître/kennen*). English merged them into one word — a rare simplification.',
  },

  // ── SOCIAL & RELATIONSHIPS ────────────────────────────────────────────────
  {
    id: 'friend',
    concept: 'Friend',
    category: 'Social & Relationships',
    latinRoot: 'amicus',
    etymology: [
      { source: 'Latin', word: 'amicus', meaning: 'friend, beloved' },
      { source: 'Latin', word: 'amare', meaning: 'to love' },
      { source: 'Proto-Germanic', word: '*frijōndz', meaning: 'lover, friend' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'amicus / amica', ipa: '/aˈmi.kus/' }] },
      { langCode: 'it', forms: [{ word: 'amico / amica', ipa: '/aˈmi.ko/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'amigo / amiga', ipa: '/aˈmi.ɣo/', register: 'neutral' }], regional: [
        { regionCode: 'es_ar', word: 'amigo', notes: 'Colloq. "boludo" used among close friends (vulgar)' },
        { regionCode: 'es_mx', word: 'amigo', notes: 'Colloq. "cuate" or "carnal" also used' },
      ], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'amigo / amiga', ipa: '/ɐˈmi.ɡu/', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'amigo', notes: 'Colloq. "chegado" or "parceiro" also common' },
        { regionCode: 'pt_pt', word: 'amigo', notes: 'More formal; "colega" for acquaintances' },
      ], cognateStrength: 'identical' },
      { langCode: 'fr', forms: [{ word: 'ami / amie', ipa: '/a.mi/', register: 'neutral' }], regional: [
        { regionCode: 'fr_ca', word: 'ami', notes: 'Colloq. "chum" also used (from English)' },
      ], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'prieten / prietenă', ipa: '/ˈpri.e.ten/', context: 'From Slavic! Not Latin-derived.' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'friend', ipa: '/frɛnd/', context: 'From Proto-Germanic *frijōndz' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Freund / Freundin', ipa: '/frɔʏnt/', context: 'From Proto-Germanic' }], cognateStrength: 'distant' },
    ],
    semanticField: ['social', 'relationships', 'people'],
    funFact: 'Romanian uses "prieten" (from Slavic), not a Latin-derived word, showing how Romanian absorbed significant Slavic vocabulary despite being a Romance language.',
  },
  {
    id: 'mother',
    concept: 'Mother',
    category: 'Family & People',
    latinRoot: 'mater',
    protoIndoEuropean: '*méh₂tēr',
    etymology: [
      { source: 'Proto-Indo-European', word: '*méh₂tēr', meaning: 'mother' },
      { source: 'Latin', word: 'mater', meaning: 'mother' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'mater', ipa: '/ˈma.ter/' }] },
      { langCode: 'it', forms: [
        { word: 'madre', ipa: '/ˈma.dre/', context: 'Formal/literary', register: 'formal' },
        { word: 'mamma', ipa: '/ˈmam.ma/', context: 'Everyday, affectionate', register: 'informal' },
      ], cognateStrength: 'identical' },
      { langCode: 'es', forms: [
        { word: 'madre', ipa: '/ˈma.ðɾe/', context: 'Formal/standard', register: 'neutral' },
        { word: 'mamá', ipa: '/maˈma/', context: 'Affectionate', register: 'informal' },
      ], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [
        { word: 'mãe', ipa: '/mɐ̃j̃/', context: 'Standard everyday word', register: 'neutral' },
        { word: 'mamãe', ipa: '/mɐˈmɐ̃j̃/', context: 'Affectionate', register: 'informal' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [
        { word: 'mère', ipa: '/mɛʁ/', context: 'Standard', register: 'neutral' },
        { word: 'maman', ipa: '/ma.mɑ̃/', context: 'Affectionate', register: 'informal' },
      ], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'mamă', ipa: '/ˈma.mə/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'mother', ipa: '/ˈmʌð.ər/', context: 'From Proto-Germanic *mōdēr' }], cognateStrength: 'close' },
      { langCode: 'de', forms: [{ word: 'Mutter', ipa: '/ˈmʊ.tɐ/', context: 'From Proto-Germanic *mōdēr' }], cognateStrength: 'close' },
    ],
    semanticField: ['family', 'people', 'relationships'],
    funFact: '"Mother," "mutter," "madre," "mère," "mãe," "mater" — one of the most universally shared roots in Indo-European. Even the childlike "mama" (reduplication of *ma*) appears in virtually every language on Earth.',
  },
  {
    id: 'child',
    concept: 'Child',
    category: 'Family & People',
    latinRoot: 'filius / infans / puer',
    etymology: [
      { source: 'Latin', word: 'infans', meaning: 'unable to speak, infant' },
      { source: 'Latin', word: 'puer', meaning: 'boy, child' },
      { source: 'Latin', word: 'filius', meaning: 'son' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'puer / infans / filius', ipa: '/ˈpu.er/', context: 'Multiple words for child/boy/infant' }] },
      { langCode: 'it', forms: [
        { word: 'bambino / bambina', ipa: '/bamˈbi.no/', context: 'Small child (affectionate)', register: 'neutral' },
        { word: 'figlio / figlia', ipa: '/ˈfiʎ.ʎo/', context: 'Son/daughter (from filius)', register: 'neutral' },
      ], cognateStrength: 'close' },
      { langCode: 'es', forms: [
        { word: 'niño / niña', ipa: '/ˈni.ɲo/', context: 'Child (general)', register: 'neutral' },
        { word: 'hijo / hija', ipa: '/ˈi.xo/', context: 'Son/daughter (from filius)', register: 'neutral' },
      ], regional: [
        { regionCode: 'es_ar', word: 'pibe / piba', notes: 'Rioplatense slang for kid' },
        { regionCode: 'es_mx', word: 'chamaco/a', notes: 'Mexican informal for kid' },
      ], cognateStrength: 'close' },
      { langCode: 'pt', forms: [
        { word: 'criança', ipa: '/kɾiˈɐ̃.sɐ/', context: 'Child (general)', register: 'neutral' },
        { word: 'filho / filha', ipa: '/ˈfi.ʎu/', context: 'Son/daughter (from filius)', register: 'neutral' },
      ], regional: [
        { regionCode: 'pt_br', word: 'criança', notes: 'Also "garoto/a" (kid, informal)' },
        { regionCode: 'pt_pt', word: 'miúdo/a', notes: 'Common informal word in Portugal' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [
        { word: 'enfant', ipa: '/ɑ̃.fɑ̃/', context: 'Child (from infans)', register: 'neutral' },
        { word: 'fils / fille', ipa: '/fis/', context: 'Son/daughter (from filius)', register: 'neutral' },
      ], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'child', ipa: '/tʃaɪld/', context: 'From Old English cild' }], cognateStrength: 'distant' },
    ],
    semanticField: ['family', 'people', 'age'],
    funFact: 'French kept the Latin "infans" → "enfant", while Spanish and Italian developed new words (niño, bambino). "Infant" in English is a Latin borrowing — showing how English often has both a Germanic word and a Latin formal synonym.',
  },

  // ── ABSTRACT ──────────────────────────────────────────────────────────────
  {
    id: 'time',
    concept: 'Time',
    category: 'Abstract',
    latinRoot: 'tempus',
    etymology: [
      { source: 'Proto-Indo-European', word: '*tempos', meaning: 'stretch, period' },
      { source: 'Latin', word: 'tempus', meaning: 'time, period, weather' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'tempus / temporis', ipa: '/ˈtem.pus/', context: 'Also means "weather" in some contexts' }] },
      { langCode: 'it', forms: [{ word: 'tempo', ipa: '/ˈtɛm.po/', context: 'Means BOTH "time" AND "weather"!' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'tiempo', ipa: '/ˈtjem.po/', context: 'Means BOTH "time" AND "weather"!' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'tempo', ipa: '/ˈtẽ.pu/', context: 'Means BOTH "time" AND "weather"!' }], regional: [
        { regionCode: 'pt_br', word: 'tempo', notes: '"Que tempo faz?" = What is the weather?' },
        { regionCode: 'pt_pt', word: 'tempo', notes: 'Same dual meaning preserved' },
      ], cognateStrength: 'identical' },
      { langCode: 'fr', forms: [{ word: 'temps', ipa: '/tɑ̃/', context: 'Means BOTH "time" AND "weather"!' }], regional: [
        { regionCode: 'fr_ca', word: 'temps', notes: '"Météo" used for weather forecast specifically' },
      ], cognateStrength: 'identical' },
      { langCode: 'ro', forms: [{ word: 'timp', ipa: '/timp/', context: 'Time only; "vreme" for weather' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'time', ipa: '/taɪm/', context: 'From Old English tīma' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Zeit', ipa: '/tsaɪt/', context: 'From Proto-Germanic *tīdiz' }], cognateStrength: 'distant' },
    ],
    semanticField: ['time', 'abstract', 'weather'],
    funFact: 'In Italian, Spanish, Portuguese, and French, the same word means both "time" and "weather" — a fascinating polysemy from Latin *tempus*. Ask a Spanish speaker "¿Qué tiempo hace?" and they\'ll tell you the weather, not the hour!',
  },
  {
    id: 'love',
    concept: 'Love',
    category: 'Emotions',
    latinRoot: 'amor',
    etymology: [
      { source: 'Latin', word: 'amor', meaning: 'love' },
      { source: 'Latin', word: 'amare', meaning: 'to love' },
      { source: 'Proto-Germanic', word: '*lubō', meaning: 'love' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'amor', ipa: '/ˈa.mor/' }] },
      { langCode: 'it', forms: [{ word: 'amore', ipa: '/aˈmo.re/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'amor', ipa: '/aˈmoɾ/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'amor', ipa: '/ɐˈmoɾ/', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'amor', notes: 'Used as term of endearment "meu amor"' },
        { regionCode: 'pt_pt', word: 'amor', notes: 'Same; slightly different intonation' },
      ], cognateStrength: 'identical' },
      { langCode: 'fr', forms: [{ word: 'amour', ipa: '/a.muʁ/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'ro', forms: [{ word: 'dragoste', ipa: '/ˈdra.ɡos.te/', context: 'From Slavic *dragostь!', notes: 'Uses Slavic root for love' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'love', ipa: '/lʌv/', context: 'From Proto-Germanic *lubō' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Liebe', ipa: '/ˈliː.bə/', context: 'From Proto-Germanic *lubō' }], cognateStrength: 'distant' },
    ],
    semanticField: ['emotions', 'relationships', 'abstract'],
    funFact: 'Romanian "dragoste" (love) is Slavic, while all other Romance languages kept the Latin "amor". Yet Romanian still uses "a iubi" (to love) from Slavic *ljubiti*.',
  },

  // ── KNOWLEDGE & CULTURE ───────────────────────────────────────────────────
  {
    id: 'book',
    concept: 'Book',
    category: 'Knowledge & Culture',
    latinRoot: 'liber',
    etymology: [
      { source: 'Latin', word: 'liber', meaning: 'book (also: free)', period: 'Classical Latin' },
      { source: 'Proto-Germanic', word: '*bōks', meaning: 'beech tree, writing tablet' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'liber', ipa: '/ˈli.ber/', context: 'Also means "free" — separate etymology' }] },
      { langCode: 'it', forms: [{ word: 'libro', ipa: '/ˈli.bro/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'libro', ipa: '/ˈli.bɾo/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'livro', ipa: '/ˈli.vɾu/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'livre', ipa: '/livʁ/', context: 'Also means "pound" (unit) — homonym!', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'carte', ipa: '/ˈkar.te/', context: 'From Latin charta (paper/card)!' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'book', ipa: '/bʊk/', context: 'From Proto-Germanic *bōks (beech tree)' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Buch', ipa: '/buːx/', context: 'From Proto-Germanic *bōks (beech tree)' }], cognateStrength: 'distant' },
    ],
    semanticField: ['knowledge', 'culture', 'objects'],
    funFact: '"Book" in English and German literally means "beech tree" — ancient Germanic peoples carved writing onto beech bark tablets! Meanwhile, Romance languages kept the Latin *liber* (possibly from the inner bark of a tree).',
  },
  {
    id: 'school',
    concept: 'School',
    category: 'Knowledge & Culture',
    latinRoot: 'schola',
    etymology: [
      { source: 'Greek', word: 'σχολή (skholḗ)', meaning: 'leisure, rest, then: learned discussion' },
      { source: 'Latin', word: 'schola', meaning: 'school (borrowed from Greek)' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'schola', ipa: '/ˈsko.la/', context: 'Borrowed from Greek σχολή' }] },
      { langCode: 'it', forms: [{ word: 'scuola', ipa: '/ˈskwɔ.la/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'escuela', ipa: '/esˈkwe.la/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'escola', ipa: '/ɨsˈkɔ.lɐ/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'école', ipa: '/e.kɔl/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'școală', ipa: '/ˈʃko̯a.lə/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'school', ipa: '/skuːl/', context: 'Also from Latin schola via Old English' }], cognateStrength: 'close' },
      { langCode: 'de', forms: [{ word: 'Schule', ipa: '/ˈʃuː.lə/', context: 'Also from Latin schola' }], cognateStrength: 'close' },
    ],
    semanticField: ['knowledge', 'culture', 'education'],
    funFact: 'The Greek *σχολή* originally meant "leisure" or "free time" — school was what educated people did with their free time! The concept of school as a place of learning came later.',
  },

  // ── HOUSE & DAILY LIFE ────────────────────────────────────────────────────
  {
    id: 'house',
    concept: 'House / Home',
    category: 'Daily Life',
    latinRoot: 'domus / casa',
    etymology: [
      { source: 'Latin', word: 'domus', meaning: 'house, home (formal)' },
      { source: 'Latin', word: 'casa', meaning: 'hut, cottage (Vulgar Latin → house)' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'domus / casa', ipa: '/ˈdo.mus/', context: 'domus = formal; casa = humble dwelling' }] },
      { langCode: 'it', forms: [{ word: 'casa', ipa: '/ˈka.sa/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'casa', ipa: '/ˈka.sa/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'casa', ipa: '/ˈka.zɐ/', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'casa', notes: 'Also "lar" for home (emotional)' },
        { regionCode: 'pt_pt', word: 'casa', notes: 'Intervocalic /s/ → /z/' },
      ], cognateStrength: 'identical' },
      { langCode: 'fr', forms: [{ word: 'maison', ipa: '/mɛ.zɔ̃/', context: 'From Latin mansio (dwelling)' }], cognateStrength: 'distant' },
      { langCode: 'ro', forms: [{ word: 'casă', ipa: '/ˈka.sə/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'en', forms: [{ word: 'house', ipa: '/haʊs/', context: 'From Proto-Germanic *hūsą' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Haus', ipa: '/haʊs/', context: 'From Proto-Germanic *hūsą' }], cognateStrength: 'distant' },
    ],
    semanticField: ['home', 'architecture', 'daily-life'],
    funFact: 'French chose "maison" (from Latin *mansio*, a staying-place) while all other major Romance languages stuck with *casa*. This is why a French real-estate agent might confuse an Italian!',
  },
  {
    id: 'door',
    concept: 'Door',
    category: 'Daily Life',
    latinRoot: 'porta / ianua',
    etymology: [
      { source: 'Proto-Indo-European', word: '*dʰwer-', meaning: 'door, gate' },
      { source: 'Latin', word: 'porta', meaning: 'gate, city door' },
      { source: 'Latin', word: 'ianua', meaning: 'house door' },
      { source: 'Proto-Germanic', word: '*durō', meaning: 'door' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'porta / ianua', ipa: '/ˈpor.ta/', context: 'porta = large gate; ianua = house door' }] },
      { langCode: 'it', forms: [{ word: 'porta', ipa: '/ˈpor.ta/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'puerta', ipa: '/ˈpweɾ.ta/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'porta', ipa: '/ˈpɔɾ.tɐ/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'fr', forms: [{ word: 'porte', ipa: '/pɔʁt/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'ușă', ipa: '/ˈu.ʃə/', context: 'From Latin ostium (door frame)!', register: 'neutral' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'door', ipa: '/dɔːr/', context: 'From Proto-Germanic *durō' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Tür', ipa: '/tyːɐ̯/', context: 'From Proto-Germanic *durō' }], cognateStrength: 'distant' },
    ],
    semanticField: ['home', 'architecture', 'daily-life'],
    funFact: 'January (*Ianuarius*) is named after Janus, the Roman god of doors and beginnings — *ianua* (house door) was his symbol. He looked both ways: the old year and the new.',
  },

  // ── CALENDAR ──────────────────────────────────────────────────────────────
  {
    id: 'month',
    concept: 'Month',
    category: 'Time & Calendar',
    latinRoot: 'mensis',
    protoIndoEuropean: '*mḗh₁n̥s',
    etymology: [
      { source: 'Proto-Indo-European', word: '*mḗh₁n̥s', meaning: 'moon, month' },
      { source: 'Latin', word: 'mensis', meaning: 'month' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'mensis', ipa: '/ˈmen.sis/', context: 'Month; related to moon' }] },
      { langCode: 'it', forms: [{ word: 'mese', ipa: '/ˈme.ze/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'mes', ipa: '/mes/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'mês', ipa: '/meʃ/', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'mês', ipa: '/mes/', notes: 'Final /ʃ/ less prominent' },
        { regionCode: 'pt_pt', word: 'mês', ipa: '/meʃ/', notes: 'Final /ʃ/ more audible' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'mois', ipa: '/mwa/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'lună', ipa: '/ˈlu.nə/', context: 'From Latin luna (MOON)! Means both moon and month!' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'month', ipa: '/mʌnθ/', context: 'From Proto-Germanic *mānōþs (related to moon)' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Monat', ipa: '/ˈmoː.nat/', context: 'From Proto-Germanic *mānōþs' }], cognateStrength: 'distant' },
    ],
    semanticField: ['time', 'calendar', 'astronomy'],
    funFact: 'Romanian "lună" means BOTH "moon" AND "month." In English, "month" and "moon" are related. In French, "lune" (moon) and "mois" (month) split into two words.',
  },
  {
    id: 'year',
    concept: 'Year',
    category: 'Time & Calendar',
    latinRoot: 'annus',
    etymology: [
      { source: 'Proto-Indo-European', word: '*h₂et-no-', meaning: 'year, going (of time)' },
      { source: 'Latin', word: 'annus', meaning: 'year, ring' },
      { source: 'Proto-Germanic', word: '*jēran', meaning: 'year' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'annus', ipa: '/ˈan.nus/' }] },
      { langCode: 'it', forms: [{ word: 'anno', ipa: '/ˈan.no/', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'año', ipa: '/ˈa.ɲo/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'ano', ipa: '/ˈɐ.nu/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'an / année', ipa: '/ɑ̃/', context: '"an" = counted; "année" = experienced duration', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'an', ipa: '/an/', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'year', ipa: '/jɪər/', context: 'From Proto-Germanic *jēran' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Jahr', ipa: '/jaːɐ̯/', context: 'From Proto-Germanic *jēran' }], cognateStrength: 'distant' },
    ],
    semanticField: ['time', 'calendar'],
    funFact: 'French uses two words for year: *an* (a counted year: "Il a 30 ans") and *année* (a lived year: "Bonne année!"). Spanish used to have the same distinction (*año* vs *año*) but merged them.',
  },
]

export const CATEGORIES = [...new Set(WORD_ENTRIES.map(w => w.category))]
export const SEMANTIC_FIELDS = [...new Set(WORD_ENTRIES.flatMap(w => w.semanticField))]
