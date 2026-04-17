// Placeholder Unsplash imagery — replace with branded WaterVibes photography
// before launch. Each product references specific Unsplash photo IDs so the
// URLs remain stable across dev/staging/prod. Whitelisted in next.config.ts.
const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

type BilingualText = { en: string; ro: string };
type BilingualListText = { en: string[]; ro: string[] };

type SeedProduct = {
  slug: string;
  name: BilingualText;
  tagline: BilingualText;
  description: BilingualText;
  size: "2-person" | "4-person" | "6+person";
  color: "white" | "graphite" | "teak" | "pearl" | "midnight";
  colorHex: string;
  price: number;
  images: string[];
  specs: {
    dimensions: string;
    jets: number;
    capacity: number;
    power: string;
    weightEmpty: string;
    weightFull: string;
  };
  features: BilingualListText;
  featured: boolean;
  order: number;
};

type SeedTestimonial = {
  author: string;
  location: string;
  quote: BilingualText;
  rating: 4 | 5;
  featured: boolean;
};

export const seedProducts: SeedProduct[] = [
  {
    slug: "azure-2",
    name: { en: "Azure 2", ro: "Azure 2" },
    tagline: {
      en: "A compact two-person retreat for quiet evenings.",
      ro: "Un refugiu compact pentru doi, gândit pentru serile liniștite.",
    },
    description: {
      en: "The Azure 2 is our most intimate soak — designed to slip onto a balcony or a small terrace without demanding the whole view.\n\nFourteen hydro jets ring the contoured loungers, while a whisper-quiet pump keeps the experience indulgent rather than industrial.",
      ro: "Azure 2 este cel mai intim vas din colecția noastră — proiectat să încapă pe un balcon sau pe o terasă mică, fără să răpească tot decorul.\n\nPaisprezece duze hidraulice încadrează șezlongurile ergonomice, iar pompa aproape silențioasă păstrează experiența rafinată, nu industrială.",
    },
    size: "2-person",
    color: "white",
    colorHex: "#FFFFFF",
    price: 3800,
    images: [
      img("photo-1613490493576-7fde63acd811"),
      img("photo-1584464491033-06628f3a6b7b"),
      img("photo-1564540574859-0dfb63985953"),
    ],
    specs: {
      dimensions: "1.9m × 1.5m × 0.8m",
      jets: 14,
      capacity: 2,
      power: "2.4 kW",
      weightEmpty: "180 kg",
      weightFull: "780 kg",
    },
    features: {
      en: [
        "14 stainless hydrotherapy jets",
        "LED mood lighting, 6 tones",
        "Insulated thermal cover",
        "Eco-mode heat pump",
      ],
      ro: [
        "14 duze hidroterapeutice inox",
        "Iluminare LED, 6 nuanțe",
        "Capac termic izolat",
        "Pompă de căldură mod eco",
      ],
    },
    featured: false,
    order: 10,
  },
  {
    slug: "azure-4",
    name: { en: "Azure 4", ro: "Azure 4" },
    tagline: {
      en: "Four seats, balanced lines, endlessly quiet.",
      ro: "Patru locuri, linii echilibrate, liniște nesfârșită.",
    },
    description: {
      en: "Azure 4 keeps the clean silhouette of its smaller sibling and adds room for friends. The shell is hand-finished in a warm ivory-white that refuses to turn grey in sunlight.\n\nTwo dedicated loungers face each other across the massage bench, so conversation and hydrotherapy never have to trade places.",
      ro: "Azure 4 păstrează silueta curată a modelului mai mic și adaugă loc pentru prieteni. Carcasa este finisată manual într-un alb cald care nu cenușește la soare.\n\nDouă șezlonguri pentru întins se află față în față cu banca de masaj, astfel încât conversația și hidroterapia nu trebuie niciodată să își facă loc una alteia.",
    },
    size: "4-person",
    color: "white",
    colorHex: "#FFFFFF",
    price: 6200,
    images: [
      img("photo-1571902943202-507ec2618e8f"),
      img("photo-1600585154340-be6161a56a0c"),
      img("photo-1540555700478-4be289fbecef"),
    ],
    specs: {
      dimensions: "2.1m × 2.1m × 0.9m",
      jets: 28,
      capacity: 4,
      power: "3.2 kW",
      weightEmpty: "280 kg",
      weightFull: "1,250 kg",
    },
    features: {
      en: [
        "28 multi-zone hydrotherapy jets",
        "Twin contoured loungers",
        "Bluetooth audio with twin speakers",
        "ABS reinforced thermal base",
        "Ozone + UV water care",
      ],
      ro: [
        "28 duze hidroterapeutice multi-zonă",
        "Două șezlonguri ergonomice",
        "Audio Bluetooth cu două boxe",
        "Bază termică ABS ranforsată",
        "Purificare apă cu ozon și UV",
      ],
    },
    featured: true,
    order: 20,
  },
  {
    slug: "coral-breeze",
    name: { en: "Coral Breeze", ro: "Coral Breeze" },
    tagline: {
      en: "Warm teak panels, coastal calm for four.",
      ro: "Panouri teak calde, calmul litoralului pentru patru.",
    },
    description: {
      en: "Coral Breeze was drawn after a long week by the Adriatic. Teak-grain composite panels wrap the cabinet; the shell inside is a soft pebble cream that invites you to stay until the stars take over.\n\nHeadrests are removable for easy cleaning and the skimmer pulls twice as much debris as our standard models.",
      ro: "Coral Breeze s-a născut după o săptămână lungă la Adriatica. Panouri compozite cu textură teak îmbracă corpul, iar carcasa interioară într-un crem delicat invită la rămas până când preiau stelele.\n\nTetierele sunt detașabile pentru curățare ușoară, iar skimmerul colectează de două ori mai multe impurități decât modelele standard.",
    },
    size: "4-person",
    color: "teak",
    colorHex: "#8B5E3C",
    price: 7500,
    images: [
      img("photo-1614149162883-504ce4d13909"),
      img("photo-1582719478250-c89cae4dc85b"),
      img("photo-1551989442-24a3e1bd5ee6"),
    ],
    specs: {
      dimensions: "2.2m × 2.2m × 0.92m",
      jets: 32,
      capacity: 4,
      power: "3.5 kW",
      weightEmpty: "295 kg",
      weightFull: "1,320 kg",
    },
    features: {
      en: [
        "32 precision hydrotherapy jets",
        "Teak-grain composite cabinet",
        "Removable memory-foam headrests",
        "Double-capacity skimmer",
        "Smart-home ready controls",
      ],
      ro: [
        "32 duze hidroterapeutice de precizie",
        "Cabinet compozit cu textură teak",
        "Tetiere detașabile din memory-foam",
        "Skimmer cu capacitate dublă",
        "Comenzi compatibile smart-home",
      ],
    },
    featured: true,
    order: 30,
  },
  {
    slug: "pebble-2",
    name: { en: "Pebble 2", ro: "Pebble 2" },
    tagline: {
      en: "Graphite stone, intimate warmth.",
      ro: "Grafit lucios, căldură intimă.",
    },
    description: {
      en: "Pebble 2 is cut from a single continuous mould in deep graphite. The silhouette is low and unassuming — the kind of jacuzzi that disappears into a courtyard after dusk.\n\nInside, twin recline benches share a central footwell, and the waterfall tap doubles as ambient sound.",
      ro: "Pebble 2 este turnat dintr-o singură matriță în grafit profund. Silueta joasă și discretă dispare într-o curte interioară la lăsarea serii.\n\nÎn interior, două bănci de întins împart un spațiu central pentru picioare, iar cascadele servesc și ca sunet ambiental.",
    },
    size: "2-person",
    color: "graphite",
    colorHex: "#2E2E2E",
    price: 4200,
    images: [
      img("photo-1617103996702-96ff29b1c467"),
      img("photo-1630060069395-63d0a9147715"),
      img("photo-1564540574859-0dfb63985953"),
    ],
    specs: {
      dimensions: "2.0m × 1.5m × 0.82m",
      jets: 16,
      capacity: 2,
      power: "2.6 kW",
      weightEmpty: "195 kg",
      weightFull: "820 kg",
    },
    features: {
      en: [
        "16 counter-current jets",
        "Integrated waterfall tap",
        "Low-profile monolithic shell",
        "Digital keypad with memory presets",
      ],
      ro: [
        "16 duze cu contra-curent",
        "Cascadă integrată",
        "Carcasă monolitică cu profil jos",
        "Tastatură digitală cu setări memorate",
      ],
    },
    featured: false,
    order: 40,
  },
  {
    slug: "meridian-4",
    name: { en: "Meridian 4", ro: "Meridian 4" },
    tagline: {
      en: "Graphite finish, editorial precision.",
      ro: "Finisaj grafit, precizie editorială.",
    },
    description: {
      en: "Meridian 4 is our most architectural four-seater. Flat edges, crisp corners, a single recessed control panel — nothing visually competes with the water.\n\nA dual-stage filter keeps maintenance down to ten minutes a week, and the water feature is magnet-mounted so it lifts out for cleaning in one motion.",
      ro: "Meridian 4 este cel mai arhitectural model cu patru locuri al nostru. Muchii drepte, colțuri ferme, un singur panou de comandă încastrat — nimic nu concurează vizual cu apa.\n\nFiltrul în două etape reduce întreținerea la zece minute pe săptămână, iar elementul de apă este prins magnetic, astfel încât se scoate pentru curățare dintr-o singură mișcare.",
    },
    size: "4-person",
    color: "graphite",
    colorHex: "#2E2E2E",
    price: 7800,
    images: [
      img("photo-1601928094324-21bfcd36c0d6"),
      img("photo-1540555700478-4be289fbecef"),
      img("photo-1613490493576-7fde63acd811"),
    ],
    specs: {
      dimensions: "2.1m × 2.1m × 0.95m",
      jets: 30,
      capacity: 4,
      power: "3.4 kW",
      weightEmpty: "285 kg",
      weightFull: "1,280 kg",
    },
    features: {
      en: [
        "30 precision hydrotherapy jets",
        "Recessed touch control panel",
        "Magnet-mounted water feature",
        "Dual-stage filtration",
        "5-year shell warranty",
      ],
      ro: [
        "30 duze hidroterapeutice de precizie",
        "Panou de comandă tactil încastrat",
        "Element de apă prins magnetic",
        "Filtrare în două etape",
        "Garanție carcasă 5 ani",
      ],
    },
    featured: false,
    order: 50,
  },
  {
    slug: "serenity-6",
    name: { en: "Serenity 6", ro: "Serenity 6" },
    tagline: {
      en: "Six seats, one lounger, zero compromise.",
      ro: "Șase locuri, o canapea, zero compromisuri.",
    },
    description: {
      en: "Serenity 6 is designed for a long soak with the whole family. Five seats are arranged around the perimeter with one generous lounger stretching the full length of the shell.\n\nThe insulation stack hits an R-16 rating, so the heater barely wakes up between sessions — even in winter.",
      ro: "Serenity 6 este gândit pentru o ședere lungă alături de toată familia. Cinci locuri sunt dispuse pe perimetru și o canapea amplă se întinde pe toată lungimea carcasei.\n\nIzolația atinge un rating R-16, astfel încât încălzitorul abia se trezește între sesiuni — chiar și iarna.",
    },
    size: "6+person",
    color: "graphite",
    colorHex: "#2E2E2E",
    price: 12000,
    images: [
      img("photo-1600607687939-ce8a6c25118c"),
      img("photo-1582719478250-c89cae4dc85b"),
      img("photo-1601928094324-21bfcd36c0d6"),
    ],
    specs: {
      dimensions: "2.3m × 2.3m × 0.98m",
      jets: 52,
      capacity: 6,
      power: "4.2 kW",
      weightEmpty: "380 kg",
      weightFull: "1,980 kg",
    },
    features: {
      en: [
        "52 multi-zone hydrotherapy jets",
        "Full-length lounger",
        "R-16 insulation stack",
        "Quad-zone LED lighting",
        "Bluetooth audio with subwoofer",
        "Wi-Fi remote diagnostics",
      ],
      ro: [
        "52 duze hidroterapeutice multi-zonă",
        "Canapea pe toată lungimea",
        "Izolație rating R-16",
        "Iluminare LED în patru zone",
        "Audio Bluetooth cu subwoofer",
        "Diagnosticare de la distanță prin Wi-Fi",
      ],
    },
    featured: true,
    order: 60,
  },
  {
    slug: "lagoon-pro",
    name: { en: "Lagoon Pro", ro: "Lagoon Pro" },
    tagline: {
      en: "Professional-grade soak for a full gathering.",
      ro: "Experiență profesională pentru un grup întreg.",
    },
    description: {
      en: "Lagoon Pro is the model our commercial partners specify for boutique hotels. It seats six in comfort, seven at a push, and cycles every litre of water through the filter every fifteen minutes.\n\nThe shell is pure cast acrylic in a cool arctic white, so the water always reads a shade bluer than expected.",
      ro: "Lagoon Pro este modelul pe care partenerii noștri comerciali îl aleg pentru hotelurile boutique. Oferă șase locuri confortabile, șapte la nevoie, și reciclează fiecare litru de apă prin filtru la fiecare cincisprezece minute.\n\nCarcasa este din acril turnat într-un alb arctic rece, astfel încât apa pare cu o nuanță mai albastră decât te-ai aștepta.",
    },
    size: "6+person",
    color: "white",
    colorHex: "#FFFFFF",
    price: 13500,
    images: [
      img("photo-1540555700478-4be289fbecef"),
      img("photo-1617103996702-96ff29b1c467"),
      img("photo-1600585154340-be6161a56a0c"),
    ],
    specs: {
      dimensions: "2.4m × 2.3m × 1.0m",
      jets: 56,
      capacity: 6,
      power: "4.5 kW",
      weightEmpty: "395 kg",
      weightFull: "2,050 kg",
    },
    features: {
      en: [
        "56 commercial-grade hydrotherapy jets",
        "Pure cast-acrylic arctic-white shell",
        "15-minute full filtration cycle",
        "Titanium heater core",
        "Automatic chemistry monitoring",
        "Lift-assist cover with gas struts",
      ],
      ro: [
        "56 duze hidroterapeutice comerciale",
        "Carcasă din acril turnat pur în nuanță alb arctic",
        "Ciclu de filtrare completă la 15 minute",
        "Miez încălzitor din titan",
        "Monitorizare automată a chimiei apei",
        "Capac cu asistare hidraulică",
      ],
    },
    featured: false,
    order: 70,
  },
  {
    slug: "oasis-signature",
    name: { en: "Oasis Signature", ro: "Oasis Signature" },
    tagline: {
      en: "Our flagship. Hand-fit teak, inside and out.",
      ro: "Modelul de top. Teak finisat manual, în interior și exterior.",
    },
    description: {
      en: "Oasis Signature is the full WaterVibes expression. Warm teak-grain surfaces run from cabinet to headrest, and every surface you touch — controls, cover handles, footrest trim — is wrapped in full-grain leather.\n\nIt ships with white-glove installation and a concierge setup visit from one of our engineers.",
      ro: "Oasis Signature este expresia completă WaterVibes. Suprafețele cu textură teak caldă se continuă din cabinet până la tetiere, iar fiecare suprafață pe care o atingi — comenzi, mânerele capacului, ornamente — este îmbrăcată în piele naturală.\n\nSe livrează cu instalare premium și cu o vizită de configurare concierge din partea unuia dintre inginerii noștri.",
    },
    size: "6+person",
    color: "teak",
    colorHex: "#8B5E3C",
    price: 17500,
    images: [
      img("photo-1582719478250-c89cae4dc85b"),
      img("photo-1614149162883-504ce4d13909"),
      img("photo-1630060069395-63d0a9147715"),
    ],
    specs: {
      dimensions: "2.5m × 2.4m × 1.02m",
      jets: 64,
      capacity: 7,
      power: "5.0 kW",
      weightEmpty: "420 kg",
      weightFull: "2,200 kg",
    },
    features: {
      en: [
        "64 signature hydrotherapy jets",
        "Hand-fit teak cabinet",
        "Full-grain leather appointments",
        "White-glove installation included",
        "Concierge setup by a WaterVibes engineer",
        "Ten-year shell warranty",
        "Wi-Fi remote diagnostics",
      ],
      ro: [
        "64 duze hidroterapeutice signature",
        "Cabinet teak finisat manual",
        "Detalii din piele naturală",
        "Instalare premium inclusă",
        "Configurare concierge cu un inginer WaterVibes",
        "Garanție carcasă 10 ani",
        "Diagnosticare de la distanță prin Wi-Fi",
      ],
    },
    featured: true,
    order: 80,
  },
];

export const seedTestimonials: SeedTestimonial[] = [
  {
    author: "Andrea M.",
    location: "Cluj-Napoca, RO",
    quote: {
      en: "Installation was painless and the water is warm by the time we've finished supper. It's become our evening ritual.",
      ro: "Instalarea a fost fără bătăi de cap, iar apa e caldă până terminăm cina. A devenit ritualul nostru de seară.",
    },
    rating: 5,
    featured: true,
  },
  {
    author: "Petre S.",
    location: "București, RO",
    quote: {
      en: "The Serenity 6 is the only thing that survived every round of my wife's furniture edits. Worth every euro.",
      ro: "Serenity 6 este singurul lucru care a supraviețuit tuturor rondurilor de reamenajare ale soției mele. Merită fiecare euro.",
    },
    rating: 5,
    featured: true,
  },
  {
    author: "Hannah K.",
    location: "Vienna, AT",
    quote: {
      en: "Quieter than I expected and the LED tones are genuinely tasteful. I stop checking my phone the moment I sit in it.",
      ro: "Mai silențios decât mă așteptam, iar nuanțele LED sunt cu adevărat elegante. Nu mai verific telefonul din momentul în care intru.",
    },
    rating: 4,
    featured: false,
  },
  {
    author: "Ioana D.",
    location: "Brașov, RO",
    quote: {
      en: "The service team walked us through water care twice and left proper notes. A rare thing in this market.",
      ro: "Echipa de service ne-a ghidat de două ori prin întreținerea apei și ne-a lăsat notițe clare. Un lucru rar pe piața asta.",
    },
    rating: 5,
    featured: true,
  },
];
