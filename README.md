# EtymoMap — Interactive Etymological Language Map

An interactive web app for learning languages through etymology, cognates, and regional variants. Discover how words are related across Romance and Germanic languages, trace them back to Latin roots, and understand regional differences (e.g. Brazilian vs European Portuguese).

## Features

### Language Selection
- **Known languages**: Select any languages you already speak; the app will highlight cognates and connections to help you leverage what you know.
- **Target language**: Choose the language you're learning; it gets highlighted throughout the interface.
- Supports: Italian, Spanish, Portuguese, French, Romanian, Catalan, English, German, Dutch — and more can be added.

### Word Explorer
Each word entry shows:
- The word in your **target language** with IPA pronunciation
- Quick cognate preview across your **known languages**
- Latin root reference for Romance language learners

### Detailed Tabs (per word)
| Tab | What you see |
|---|---|
| **Overview** | All words in your selected languages, side by side |
| **Etymology** | Full etymology chain from Proto-Indo-European → Latin → modern languages |
| **Regional** | Differences between regional variants (e.g. BR 🇧🇷 vs PT 🇵🇹, MX 🇲🇽 vs ES 🇪🇸) |

### Toggleable Display Options
Toggle any of these on/off from the sidebar:
- 🏛️ **Etymology** — Latin roots & word history
- 💬 **Context** — Usage context & register (formal/informal/colloquial)
- 🗺️ **Regional variants** — Differences between countries/regions
- 🔊 **Pronunciation (IPA)** — Phonetic transcriptions
- 💡 **Fun facts** — Linguistic trivia about each word
- ⚠️ **False friends** — Highlights deceptive cognates (e.g. Romanian "lună" = month, not luna/moon in other Romance languages)

### Language Family Tree
A visual SVG map in the sidebar shows the Indo-European language tree with your selected languages highlighted and animated.

### Cognate Strength Indicators
Each word-language pairing is tagged:
- **identical** — exact or near-exact cognate (e.g. "amor" in Spanish/Italian/Portuguese)
- **close** — recognizable cognate with sound changes
- **distant cousin** — shared Proto-Indo-European root but diverged significantly
- **⚠️ false friend** — looks similar but means something different

## Word Categories
- Time & Nature, Elements, Body, Emotions, Daily Life, Social & Relationships, Communication, Knowledge & Culture, Family & People, Abstract, Time & Calendar

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 8** — build tool
- **Tailwind CSS v4** — styling

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

To build for production:
```bash
npm run build
npm run preview
```

## Adding More Words

Words are defined in `src/data/words.ts`. Each entry follows the `WordEntry` interface:

```ts
{
  id: 'unique-id',
  concept: 'English concept name',
  category: 'Category',
  latinRoot: 'Latin root form',
  etymology: [
    { source: 'Proto-Indo-European', word: '*root', meaning: '...' },
    { source: 'Latin', word: 'forma', meaning: '...' },
  ],
  languages: [
    {
      langCode: 'it',
      forms: [{ word: 'parola', ipa: '/pa.ˈrɔ.la/', context: '...', register: 'neutral' }],
      regional: [
        { regionCode: 'it_si', word: 'parola', notes: 'Sicilian variant...' }
      ],
      cognateStrength: 'identical' | 'close' | 'distant' | 'false-friend',
    },
    // more languages...
  ],
  semanticField: ['communication', 'language'],
  funFact: 'Interesting linguistic note...',
}
```

## Adding More Languages

Languages are defined in `src/data/languages.ts`. Add to the `LANGUAGES` array and provide position coordinates in `src/components/LanguageMap.tsx` (`LANG_POSITIONS`).

## Supported Regional Variants

| Language | Regions |
|---|---|
| Spanish | Spain 🇪🇸, Mexico 🇲🇽, Argentina 🇦🇷 |
| Portuguese | Portugal 🇵🇹, Brazil 🇧🇷 |
| French | France 🇫🇷, Canada 🇨🇦 |
| Italian | Standard 🇮🇹, Sicilian-influenced 🏝️ |
| German | Germany 🇩🇪, Austria 🇦🇹 |
| English | UK 🇬🇧, USA 🇺🇸 |

## Project Structure

```
src/
  data/
    languages.ts    # Language & region definitions
    words.ts        # Etymology & word data
  components/
    LanguageSetup.tsx    # Language selection modal
    WordCard.tsx         # Expandable word entry
    EtymologyTree.tsx    # Etymology visualization
    RegionalVariants.tsx # Regional differences panel
    LanguageMap.tsx      # SVG language family tree
    SettingsPanel.tsx    # Toggle controls
  hooks/
    useSettings.ts   # App settings state
  App.tsx
  main.tsx
  index.css
```
