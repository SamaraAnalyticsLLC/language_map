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
      { langCode: 'it', forms: [{ word: 'notte', ipa: '/ˈnɔt.te/', context: 'Everyday word', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'noche', ipa: '/ˈno.tʃe/', context: 'Everyday word', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'noite', ipa: '/ˈnoj.tɨ/', context: 'Everyday word', register: 'neutral' }], regional: [
        { regionCode: 'pt_pt', word: 'noite', ipa: '/ˈnoj.tɨ/', notes: 'Final vowel more reduced' },
        { regionCode: 'pt_br', word: 'noite', ipa: '/ˈnoj.tʃi/', notes: 'Final vowel more open, /tʃ/ palatalization' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'nuit', ipa: '/nɥi/', context: 'Everyday word', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'noapte', ipa: '/ˈnoap.te/', context: 'Everyday word', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'night', ipa: '/naɪt/', context: 'From Germanic, not Latin', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Nacht', ipa: '/naxt/', context: 'From Proto-Germanic', register: 'neutral' }], cognateStrength: 'distant' },
    ],
    semanticField: ['time', 'nature', 'daily-life'],
    funFact: 'The word "nocturnal" in English comes directly from Latin *nocturnalis*, showing how Latin roots persist in scientific vocabulary across languages.',
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
      { langCode: 'la', forms: [{ word: 'aqua', ipa: '/ˈa.kʷa/', context: 'Classical Latin' }] },
      { langCode: 'it', forms: [{ word: 'acqua', ipa: '/ˈak.kwa/', context: 'Direct from Latin', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'agua', ipa: '/ˈa.ɣwa/', context: 'Direct from Latin', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'água', ipa: '/ˈa.ɡwɐ/', context: 'Direct from Latin', register: 'neutral' }], regional: [
        { regionCode: 'pt_pt', word: 'água', ipa: '/ˈa.ɡwɐ/', notes: 'Unstressed vowels more reduced' },
        { regionCode: 'pt_br', word: 'água', ipa: '/ˈa.ɡwa/', notes: 'Vowels more open and clear' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'eau', ipa: '/o/', context: 'Heavily reduced from Latin', register: 'neutral', notes: 'Pronounced just /o/ — dramatic sound change!' }], cognateStrength: 'distant' },
      { langCode: 'ro', forms: [{ word: 'apă', ipa: '/ˈa.pə/', context: 'From Latin', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'water', ipa: '/ˈwɔː.tər/', context: 'From Proto-Germanic', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Wasser', ipa: '/ˈvas.ɐ/', context: 'From Proto-Germanic', register: 'neutral' }], cognateStrength: 'distant' },
    ],
    semanticField: ['nature', 'elements', 'daily-life'],
    funFact: 'French "eau" (water) descended from Latin "aqua" through an incredible journey: *aqua → *aiga → *eaue → eau. The spelling "eau" preserves the medieval pronunciation!',
  },
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
      { langCode: 'la', forms: [{ word: 'amicus / amica', ipa: '/aˈmi.kus/', context: 'Classical Latin (m/f)' }] },
      { langCode: 'it', forms: [
        { word: 'amico / amica', ipa: '/aˈmi.ko/', context: 'Standard', register: 'neutral' },
        { word: 'amico', context: 'Also used as "mate/buddy" informally', register: 'informal' },
      ], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'amigo / amiga', ipa: '/aˈmi.ɣo/', context: 'Standard', register: 'neutral' }], regional: [
        { regionCode: 'es_ar', word: 'amigo', notes: 'Colloq. "boludo" used among close friends (vulgar)' },
        { regionCode: 'es_mx', word: 'amigo', notes: 'Colloq. "cuate" or "carnal" also used' },
      ], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'amigo / amiga', ipa: '/ɐˈmi.ɡu/', context: 'Standard', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'amigo', notes: 'Colloq. "chegado" or "parceiro" also common' },
        { regionCode: 'pt_pt', word: 'amigo', notes: 'More formal; "colega" used for acquaintances' },
      ], cognateStrength: 'identical' },
      { langCode: 'fr', forms: [{ word: 'ami / amie', ipa: '/a.mi/', context: 'Standard', register: 'neutral' }], regional: [
        { regionCode: 'fr_ca', word: 'ami', notes: 'Colloq. "chum" also used (from English)' },
      ], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'prieten / prietenă', ipa: '/ˈpri.e.ten/', context: 'From Slavic influence, not Latin!', register: 'neutral' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'friend', ipa: '/frɛnd/', context: 'From Proto-Germanic *frijōndz', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Freund / Freundin', ipa: '/frɔʏnt/', context: 'From Proto-Germanic', register: 'neutral' }], cognateStrength: 'distant' },
    ],
    semanticField: ['social', 'relationships', 'people'],
    funFact: 'Romanian uses "prieten" (from Slavic), not a Latin-derived word, showing how Romanian absorbed significant Slavic vocabulary despite being a Romance language.',
  },
  {
    id: 'speak',
    concept: 'To Speak',
    category: 'Communication',
    latinRoot: 'fabulare / loqui / parabolare',
    etymology: [
      { source: 'Latin', word: 'parabola', meaning: 'parable, speech', period: 'Late Latin' },
      { source: 'Latin', word: 'fabulare', meaning: 'to talk, tell stories' },
      { source: 'Latin', word: 'loqui', meaning: 'to speak (classical)' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'loqui / fabulari', ipa: '/ˈlo.kʷi/', context: 'Classical; fabulari in Vulgar Latin' }] },
      { langCode: 'it', forms: [{ word: 'parlare', ipa: '/parˈla.re/', context: 'From Latin parabolare', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [
        { word: 'hablar', ipa: '/aˈβ̞laɾ/', context: 'From Latin fabulare', register: 'neutral' },
      ], regional: [
        { regionCode: 'es_ar', word: 'hablar', notes: '"Hablar" standard, but "charlar" for chat' },
      ], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'falar', ipa: '/fɐˈlaɾ/', context: 'From Latin fabulare', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'falar', ipa: '/faˈla(ɾ)/', notes: 'Final -r often dropped in speech' },
        { regionCode: 'pt_pt', word: 'falar', ipa: '/fɐˈlaɾ/', notes: 'Final -r more pronounced' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'parler', ipa: '/paʁ.le/', context: 'From Latin parabolare', register: 'neutral' }], regional: [
        { regionCode: 'fr_ca', word: 'parler', notes: '"Jaser" used colloquially for chatting' },
      ], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'a vorbi', ipa: '/a vorˈbi/', context: 'From Slavic *vorbiti', register: 'neutral', notes: 'Uses Slavic root, not Latin!' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'to speak', ipa: '/spiːk/', context: 'From Old English specan', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'sprechen', ipa: '/ˈʃpʁɛ.çən/', context: 'From Proto-Germanic', register: 'neutral' }], cognateStrength: 'distant' },
    ],
    semanticField: ['communication', 'action', 'language'],
    funFact: 'Spanish "hablar" and Portuguese "falar" both descend from Latin "fabulare" (to tell fables). Italian and French instead use "parabolare" as their base. These two paths split early in the Romance world!',
  },
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
      { langCode: 'it', forms: [{ word: 'cuore', ipa: '/ˈkwɔ.re/', context: 'Body part and emotions', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'corazón', ipa: '/ko.ɾaˈθon/', context: 'Body part and emotions', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'coração', ipa: '/ko.ɾɐˈsɐ̃w̃/', context: 'Body part and emotions', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'coração', ipa: '/ko.ɾaˈsɐ̃w/', notes: 'Nasalization slightly different' },
        { regionCode: 'pt_pt', word: 'coração', ipa: '/ku.ɾɐˈsɐ̃w̃/', notes: 'Unstressed /o/ → /u/' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'cœur', ipa: '/kœʁ/', context: 'Body part and emotions', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'inimă', ipa: '/ˈi.ni.mə/', context: 'From Latin *anima (soul/breath)!', register: 'neutral', notes: 'Romanian uses a different Latin root' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'heart', ipa: '/hɑːrt/', context: 'From Proto-Germanic *hertô', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Herz', ipa: '/hɛrts/', context: 'From Proto-Germanic *hertô', register: 'neutral' }], cognateStrength: 'distant' },
    ],
    semanticField: ['body', 'emotions', 'anatomy'],
    funFact: '"Cordial," "accord," "discord," and "courage" all come from Latin *cor/cordis*. In French, *coeur* lives on in "par coeur" (by heart = memorized).',
  },
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
      { langCode: 'it', forms: [{ word: 'casa', ipa: '/ˈka.sa/', context: 'From Vulgar Latin casa', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'casa', ipa: '/ˈka.sa/', context: 'From Vulgar Latin casa', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'casa', ipa: '/ˈka.zɐ/', context: 'From Vulgar Latin casa', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'casa', ipa: '/ˈka.zɐ/', notes: 'Also "lar" for home (emotional)' },
        { regionCode: 'pt_pt', word: 'casa', notes: 'Same; intervocalic /s/ → /z/' },
      ], cognateStrength: 'identical' },
      { langCode: 'fr', forms: [{ word: 'maison', ipa: '/mɛ.zɔ̃/', context: 'From Latin mansio (dwelling)', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'ro', forms: [{ word: 'casă', ipa: '/ˈka.sə/', context: 'From Latin casa', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'en', forms: [{ word: 'house', ipa: '/haʊs/', context: 'From Proto-Germanic *hūsą', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Haus', ipa: '/haʊs/', context: 'From Proto-Germanic *hūsą', register: 'neutral' }], cognateStrength: 'distant' },
    ],
    semanticField: ['home', 'architecture', 'daily-life'],
    funFact: 'French chose "maison" (from Latin *mansio*, a staying-place) while all other major Romance languages stuck with *casa*. This is why a French real-estate agent might confuse an Italian: "maison" looks nothing like "casa"!',
  },
  {
    id: 'eat',
    concept: 'To Eat',
    category: 'Daily Life',
    latinRoot: 'comedere / manducare',
    etymology: [
      { source: 'Latin', word: 'edere / comedere', meaning: 'to eat (classical)' },
      { source: 'Latin', word: 'manducare', meaning: 'to chew, to eat (Vulgar Latin)' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'edere / comedere', ipa: '/ˈe.de.re/', context: 'Classical; manducare in Vulgar Latin' }] },
      { langCode: 'it', forms: [{ word: 'mangiare', ipa: '/manˈdʒa.re/', context: 'From manducare via French influence', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'comer', ipa: '/koˈmeɾ/', context: 'From comedere', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'comer', ipa: '/koˈmeɾ/', context: 'From comedere', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'comer', notes: 'Informal: "dar um trato" or "comer bem"' },
        { regionCode: 'pt_pt', word: 'comer', notes: 'Same word; different pronunciation of unstressed vowels' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'manger', ipa: '/mɑ̃.ʒe/', context: 'From manducare', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'a mânca', ipa: '/a mɨnˈka/', context: 'From manducare', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'to eat', ipa: '/iːt/', context: 'From Proto-Germanic *etaną', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'essen', ipa: '/ˈɛs.ən/', context: 'From Proto-Germanic *etaną', register: 'neutral' }], cognateStrength: 'distant' },
    ],
    semanticField: ['food', 'action', 'daily-life'],
    funFact: 'The vulgar Latin *manducare* gave us "mangiare", "manger", "mânca" — and also the English word "munch"! Meanwhile Spanish and Portuguese kept the more classical *comedere*.',
  },
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
      { langCode: 'it', forms: [
        { word: 'tempo', ipa: '/ˈtɛm.po/', context: 'Means BOTH "time" AND "weather"!', register: 'neutral' },
      ], cognateStrength: 'identical' },
      { langCode: 'es', forms: [
        { word: 'tiempo', ipa: '/ˈtjem.po/', context: 'Means BOTH "time" AND "weather"!', register: 'neutral' },
      ], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [
        { word: 'tempo', ipa: '/ˈtẽ.pu/', context: 'Means BOTH "time" AND "weather"!', register: 'neutral' },
      ], regional: [
        { regionCode: 'pt_br', word: 'tempo', notes: '"Que tempo faz?" = What is the weather? / "Que horas são?" for clock time' },
        { regionCode: 'pt_pt', word: 'tempo', notes: 'Same dual meaning preserved' },
      ], cognateStrength: 'identical' },
      { langCode: 'fr', forms: [
        { word: 'temps', ipa: '/tɑ̃/', context: 'Means BOTH "time" AND "weather"!', register: 'neutral' },
      ], regional: [
        { regionCode: 'fr_ca', word: 'temps', notes: 'Same dual meaning; "météo" for weather forecast' },
      ], cognateStrength: 'identical' },
      { langCode: 'ro', forms: [{ word: 'timp', ipa: '/timp/', context: 'Time only; "vreme" for weather', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'time', ipa: '/taɪm/', context: 'From Old English tīma', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Zeit', ipa: '/tsaɪt/', context: 'From Proto-Germanic *tīdiz', register: 'neutral' }], cognateStrength: 'distant' },
    ],
    semanticField: ['time', 'abstract', 'weather'],
    funFact: 'In Italian, Spanish, Portuguese, and French, the same word means both "time" and "weather" — a fascinating polysemy inherited from Latin *tempus*. Ask a Spanish speaker "¿Qué tiempo hace?" and they will tell you the weather, not the hour!',
  },
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
      { langCode: 'it', forms: [{ word: 'libro', ipa: '/ˈli.bro/', context: 'Direct from Latin liber', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'libro', ipa: '/ˈli.bɾo/', context: 'Direct from Latin liber', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'livro', ipa: '/ˈli.vɾu/', context: 'From Latin liber', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'livre', ipa: '/livʁ/', context: 'From Latin liber', register: 'neutral', notes: 'Also means "pound" (unit) — homonym!' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'carte', ipa: '/ˈkar.te/', context: 'From Latin charta (paper/card)!', register: 'neutral' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'book', ipa: '/bʊk/', context: 'From Proto-Germanic *bōks (beech tree)', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Buch', ipa: '/buːx/', context: 'From Proto-Germanic *bōks (beech tree)', register: 'neutral' }], cognateStrength: 'distant' },
    ],
    semanticField: ['knowledge', 'culture', 'objects'],
    funFact: '"Book" in English and German literally means "beech tree" — ancient Germanic peoples carved writing onto beech bark tablets! Meanwhile, Romance languages kept the Latin *liber* (possibly from *libra*, the inner bark of a tree).',
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
      { langCode: 'la', forms: [{ word: 'amor', ipa: '/ˈa.mor/', context: 'Love, passion, desire' }] },
      { langCode: 'it', forms: [{ word: 'amore', ipa: '/aˈmo.re/', context: 'Love (romantic and general)', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'es', forms: [{ word: 'amor', ipa: '/aˈmoɾ/', context: 'Love (romantic and general)', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'pt', forms: [{ word: 'amor', ipa: '/ɐˈmoɾ/', context: 'Love (romantic and general)', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'amor', notes: 'Used as term of endearment "meu amor"' },
        { regionCode: 'pt_pt', word: 'amor', notes: 'Same; slightly different intonation patterns' },
      ], cognateStrength: 'identical' },
      { langCode: 'fr', forms: [{ word: 'amour', ipa: '/a.muʁ/', context: 'Love (romantic and general)', register: 'neutral' }], cognateStrength: 'identical' },
      { langCode: 'ro', forms: [{ word: 'dragoste', ipa: '/ˈdra.ɡos.te/', context: 'From Slavic *dragostь!', register: 'neutral', notes: 'Uses Slavic root for love' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'love', ipa: '/lʌv/', context: 'From Proto-Germanic *lubō', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Liebe', ipa: '/ˈliː.bə/', context: 'From Proto-Germanic *lubō', register: 'neutral' }], cognateStrength: 'distant' },
    ],
    semanticField: ['emotions', 'relationships', 'abstract'],
    funFact: 'Romanian "dragoste" (love) is Slavic, while all other Romance languages kept the Latin "amor". Yet Romanian still uses "a iubi" (to love) from Slavic *ljubiti*. Latin "amor" does survive in Romanian poetry and formal contexts.',
  },
  {
    id: 'month',
    concept: 'Month',
    category: 'Time & Calendar',
    latinRoot: 'mensis',
    protoIndoEuropean: '*mḗh₁n̥s',
    etymology: [
      { source: 'Proto-Indo-European', word: '*mḗh₁n̥s', meaning: 'moon, month' },
      { source: 'Latin', word: 'mensis', meaning: 'month' },
      { source: 'Latin', word: 'luna', meaning: 'moon (separate word)' },
    ],
    languages: [
      { langCode: 'la', forms: [{ word: 'mensis', ipa: '/ˈmen.sis/', context: 'Month; related to moon' }] },
      { langCode: 'it', forms: [{ word: 'mese', ipa: '/ˈme.ze/', context: 'Month', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'es', forms: [{ word: 'mes', ipa: '/mes/', context: 'Month', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'pt', forms: [{ word: 'mês', ipa: '/meʃ/', context: 'Month', register: 'neutral' }], regional: [
        { regionCode: 'pt_br', word: 'mês', ipa: '/mes/', notes: 'Final /ʃ/ less prominent in BR' },
        { regionCode: 'pt_pt', word: 'mês', ipa: '/meʃ/', notes: 'Final /ʃ/ more audible' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [{ word: 'mois', ipa: '/mwa/', context: 'Month', register: 'neutral' }], cognateStrength: 'close' },
      { langCode: 'ro', forms: [{ word: 'lună', ipa: '/ˈlu.nə/', context: 'From Latin luna (MOON)! Means both moon and month!', register: 'neutral' }], cognateStrength: 'false-friend' },
      { langCode: 'en', forms: [{ word: 'month', ipa: '/mʌnθ/', context: 'From Proto-Germanic *mānōþs (related to moon)', register: 'neutral' }], cognateStrength: 'distant' },
      { langCode: 'de', forms: [{ word: 'Monat', ipa: '/ˈmoː.nat/', context: 'From Proto-Germanic *mānōþs', register: 'neutral' }], cognateStrength: 'distant' },
    ],
    semanticField: ['time', 'calendar', 'astronomy'],
    funFact: 'Romanian "lună" means BOTH "moon" AND "month" — the same duality exists in many languages. In English: "month" and "moon" are related! In French: "lune" (moon) and "mois" (month) split into two words.',
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
        { word: 'chico / chica', context: 'Kid, informal', register: 'informal' },
      ], regional: [
        { regionCode: 'es_ar', word: 'pibe / piba', notes: 'Rioplatense slang for kid' },
        { regionCode: 'es_mx', word: 'chamaco/a', notes: 'Mexican informal for kid' },
      ], cognateStrength: 'close' },
      { langCode: 'pt', forms: [
        { word: 'criança', ipa: '/kɾiˈɐ̃.sɐ/', context: 'Child (general)', register: 'neutral' },
        { word: 'filho / filha', ipa: '/ˈfi.ʎu/', context: 'Son/daughter (from filius)', register: 'neutral' },
      ], regional: [
        { regionCode: 'pt_br', word: 'criança', notes: 'Also "moleque" (boy, playful), "garoto/a"' },
        { regionCode: 'pt_pt', word: 'criança', notes: 'Miúdo/a also used informally in Portugal' },
      ], cognateStrength: 'close' },
      { langCode: 'fr', forms: [
        { word: 'enfant', ipa: '/ɑ̃.fɑ̃/', context: 'Child (from infans)', register: 'neutral' },
        { word: 'fils / fille', ipa: '/fis/', context: 'Son/daughter (from filius)', register: 'neutral' },
        { word: 'gosse', context: 'Kid, colloquial', register: 'colloquial' },
      ], regional: [
        { regionCode: 'fr_ca', word: 'enfant', notes: '"Kid" used informally (from English)' },
      ], cognateStrength: 'close' },
      { langCode: 'en', forms: [{ word: 'child', ipa: '/tʃaɪld/', context: 'From Old English cild', register: 'neutral' }], cognateStrength: 'distant' },
    ],
    semanticField: ['family', 'people', 'age'],
    funFact: 'French kept the Latin "infans" → "enfant", while Spanish and Italian developed new words (niño, bambino). The word "infant" in English is a Latin borrowing, showing how English often has both a Germanic word and a Latin-derived formal synonym.',
  },
]

export const CATEGORIES = [...new Set(WORD_ENTRIES.map(w => w.category))]
export const SEMANTIC_FIELDS = [...new Set(WORD_ENTRIES.flatMap(w => w.semanticField))]
