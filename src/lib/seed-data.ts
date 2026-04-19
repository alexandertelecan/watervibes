// Placeholder Unsplash imagery — replace with branded WaterVibe photography
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
      en: "A small hot tub for two, built for quiet evenings.",
      ro: "Un jacuzzi mic pentru doi, gândit pentru serile liniștite.",
    },
    description: {
      en: "The Azure 2 is our smallest hot tub. It fits on a balcony or a tight terrace without eating the view. Fourteen hydromassage jets wrap the two contoured seats, and the pump runs quiet enough to have a conversation over.\n\nIt's the right jacuzzi for couples who want a jacuzzi at home but don't want to give up half the terrace to get one.",
      ro: "Azure 2 este cel mai mic jacuzzi din colecție. Intră pe un balcon sau pe o terasă îngustă fără să consume decorul. Paisprezece duze de hidromasaj încadrează cele două scaune ergonomice, iar pompa merge suficient de silențios ca să poți purta o conversație peste ea.\n\nEste jacuzzi-ul potrivit pentru cupluri care vor un jacuzzi acasă, dar nu vor să renunțe la jumătate de terasă ca să îl aibă.",
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
        "14 stainless hydromassage jets",
        "LED mood lighting, 6 tones",
        "Insulated thermal cover",
        "Eco-mode heat pump",
      ],
      ro: [
        "14 duze inox de hidromasaj",
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
      en: "Four seats, clean lines, a jacuzzi that stays quiet.",
      ro: "Patru locuri, linii curate, un jacuzzi care rămâne silențios.",
    },
    description: {
      en: "Azure 4 keeps the clean shape of the Azure 2 and adds room for friends. The shell is finished in a warm ivory white that holds its colour in full sun.\n\nTwo reclined seats face each other across the massage bench. You can talk across the tub and still get hydrotherapy on your lower back at the same time.",
      ro: "Azure 4 păstrează silueta curată a Azure 2 și adaugă loc pentru prieteni. Carcasa are un finisaj alb ivoire cald care își ține culoarea la soare plin.\n\nDouă scaune înclinate sunt așezate față în față, peste banca de masaj. Poți purta o conversație peste cadă și să primești în același timp hidromasaj pe zona lombară.",
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
        "28 multi-zone hydromassage jets",
        "Twin reclined seats",
        "Bluetooth audio, two speakers",
        "ABS reinforced thermal base",
        "Ozone and UV water care",
      ],
      ro: [
        "28 duze de hidromasaj multi-zonă",
        "Două scaune înclinate",
        "Audio Bluetooth, două boxe",
        "Bază termică ABS ranforsată",
        "Tratare apă cu ozon și UV",
      ],
    },
    featured: true,
    order: 20,
  },
  {
    slug: "coral-breeze",
    name: { en: "Coral Breeze", ro: "Coral Breeze" },
    tagline: {
      en: "Warm teak panels. Coastal calm for four.",
      ro: "Panouri teak calde. Calmul litoralului pentru patru.",
    },
    description: {
      en: "Coral Breeze was drawn after a week on the Adriatic coast. Teak-grain composite panels wrap the cabinet. The interior shell is a soft pebble cream that reads warmer the longer you sit in it.\n\nHeadrests come off for cleaning. The skimmer pulls twice the debris of our standard models, which matters more than the spec sheet suggests the first time you leave the cover off on a windy evening.",
      ro: "Coral Breeze s-a desenat după o săptămână pe litoralul Adriatic. Panouri compozite cu textură teak îmbracă corpul jacuzzi-ului. Carcasa interioară este într-un crem delicat care se citește mai cald pe măsură ce stai în el.\n\nTetierele se scot pentru curățare. Skimmerul colectează de două ori mai multe impurități decât modelele standard, lucru care contează mai mult decât sugerează fișa tehnică prima dată când lași capacul deschis într-o seară cu vânt.",
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
        "32 precision hydromassage jets",
        "Teak-grain composite cabinet",
        "Removable memory-foam headrests",
        "Double-capacity skimmer",
        "Smart-home ready controls",
      ],
      ro: [
        "32 duze de hidromasaj de precizie",
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
      en: "Graphite shell. Warm evenings for two.",
      ro: "Carcasă grafit. Seri calde, pentru doi.",
    },
    description: {
      en: "Pebble 2 comes out of a single continuous mould in deep graphite. The silhouette sits low and quiet. It's the kind of hot tub that disappears into a courtyard after dusk.\n\nInside, two reclining seats share a central footwell. The built-in waterfall tap works as ambient sound on evenings when you want to skip the jets.",
      ro: "Pebble 2 este turnat dintr-o singură matriță în grafit profund. Silueta e joasă și discretă. Este jacuzzi-ul care dispare într-o curte interioară la lăsarea serii.\n\nÎn interior, două scaune înclinate împart un spațiu central pentru picioare. Cascada integrată servește și ca sunet ambiental, în serile când vrei să stai fără jeturi.",
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
      en: "Graphite finish. Clean architectural lines.",
      ro: "Finisaj grafit. Linii arhitecturale curate.",
    },
    description: {
      en: "Meridian 4 is the most architectural hot tub in the range. Flat edges, sharp corners, one recessed control panel. Nothing in the design competes with the water itself.\n\nA dual-stage filter keeps maintenance down to about ten minutes a week. The water feature is magnet-mounted, so you lift it out for cleaning in one motion.",
      ro: "Meridian 4 este cel mai arhitectural jacuzzi din gamă. Muchii drepte, colțuri ferme, un singur panou de comandă încastrat. Nimic din design nu concurează cu apa.\n\nFiltrul în două etape reduce întreținerea la aproximativ zece minute pe săptămână. Elementul de apă este prins magnetic. Se scoate pentru curățare dintr-o singură mișcare.",
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
        "30 precision hydromassage jets",
        "Recessed touch control panel",
        "Magnet-mounted water feature",
        "Dual-stage filtration",
        "5-year shell warranty",
      ],
      ro: [
        "30 duze de hidromasaj de precizie",
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
      en: "Six seats, one lounger, a family jacuzzi that earns its footprint.",
      ro: "Șase locuri, o canapea, un jacuzzi de familie care își merită amprenta.",
    },
    description: {
      en: "Serenity 6 is built for a long soak with the whole family. Five seats sit around the perimeter. One full-length lounger stretches the length of the shell.\n\nThe insulation stack hits an R-16 rating. The heater barely wakes up between sessions, even in winter. This is the tub you buy when you know you'll run it two or three times a week.",
      ro: "Serenity 6 este gândit pentru o ședere lungă alături de toată familia. Cinci locuri sunt așezate pe perimetru. O canapea pe toată lungimea ocupă întregul fund al jacuzzi-ului.\n\nIzolația atinge un rating R-16. Încălzitorul abia se trezește între sesiuni, chiar și iarna. Este jacuzzi-ul pe care îl cumperi când știi că îl vei folosi de două sau trei ori pe săptămână.",
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
        "52 multi-zone hydromassage jets",
        "Full-length lounger",
        "R-16 insulation stack",
        "Quad-zone LED lighting",
        "Bluetooth audio with subwoofer",
        "Wi-Fi remote diagnostics",
      ],
      ro: [
        "52 duze de hidromasaj multi-zonă",
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
      en: "Hotel-grade jacuzzi for a full table of guests.",
      ro: "Jacuzzi de nivel hotelier pentru o masă plină de oaspeți.",
    },
    description: {
      en: "Lagoon Pro is the model our commercial partners pick for boutique hotels and larger guesthouses. Six seats with room to spare. Seven at a push. Every litre of water cycles through the filter every fifteen minutes.\n\nThe shell is pure cast acrylic in a cool arctic white, so the water reads a shade bluer than you expect on bright days.",
      ro: "Lagoon Pro este modelul pe care partenerii noștri comerciali îl aleg pentru hoteluri boutique și pensiuni mari. Șase locuri confortabile. Șapte la nevoie. Fiecare litru de apă trece prin filtru la fiecare cincisprezece minute.\n\nCarcasa este din acril turnat într-un alb arctic rece, așa că apa se citește cu o nuanță mai albastră decât te-ai aștepta în zilele însorite.",
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
        "56 commercial-grade hydromassage jets",
        "Pure cast-acrylic arctic-white shell",
        "15-minute full filtration cycle",
        "Titanium heater core",
        "Automatic water chemistry monitoring",
        "Lift-assist cover with gas struts",
      ],
      ro: [
        "56 duze de hidromasaj pentru uz comercial",
        "Carcasă din acril turnat pur, în nuanță alb arctic",
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
      ro: "Modelul nostru de top. Teak finisat manual, în interior și exterior.",
    },
    description: {
      en: "Oasis Signature is the full WaterVibe expression. Warm teak-grain surfaces run from cabinet to headrest. Every control surface, every cover handle, every footrest trim is wrapped in full-grain leather.\n\nIt ships with white-glove installation and a setup visit from one of our engineers. You're not figuring out jet pressure on your own the first night.",
      ro: "Oasis Signature este expresia completă WaterVibe. Suprafețele cu textură teak caldă curg din cabinet în tetiere. Fiecare suprafață de comandă, fiecare mâner al capacului, fiecare ornament de la sprijinul pentru picioare este îmbrăcat în piele naturală.\n\nSe livrează cu instalare premium și o vizită de configurare cu unul dintre inginerii noștri. Nu te chinui singur cu presiunea jeturilor în prima seară.",
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
        "64 signature hydromassage jets",
        "Hand-fit teak cabinet",
        "Full-grain leather trim",
        "White-glove installation included",
        "On-site setup with a WaterVibe engineer",
        "10-year shell warranty",
        "Wi-Fi remote diagnostics",
      ],
      ro: [
        "64 duze de hidromasaj signature",
        "Cabinet teak finisat manual",
        "Ornamente din piele naturală",
        "Instalare premium inclusă",
        "Configurare la fața locului cu un inginer WaterVibe",
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
      en: "The install went fine and the water's warm by the time supper's done. It's turned into our evening ritual.",
      ro: "Instalarea a mers fără probleme, iar apa e caldă până terminăm cina. A devenit ritualul nostru de seară.",
    },
    rating: 5,
    featured: true,
  },
  {
    author: "Petre S.",
    location: "București, RO",
    quote: {
      en: "The Serenity 6 is the one piece of furniture that's survived every round of my wife's redecorating. Worth every euro.",
      ro: "Serenity 6 este singura piesă de mobilier care a supraviețuit fiecărei runde de reamenajare a soției mele. Merită fiecare euro.",
    },
    rating: 5,
    featured: true,
  },
  {
    author: "Hannah K.",
    location: "Vienna, AT",
    quote: {
      en: "Quieter than I expected. The LED tones are actually tasteful. I stop checking my phone the moment I get in.",
      ro: "Mai silențios decât mă așteptam. Nuanțele LED sunt chiar elegante. Nu mai verific telefonul din momentul în care intru.",
    },
    rating: 4,
    featured: false,
  },
  {
    author: "Ioana D.",
    location: "Brașov, RO",
    quote: {
      en: "Their service team walked us through water care twice and left proper notes. That's rare in this market.",
      ro: "Echipa lor de service ne-a ghidat de două ori prin întreținerea apei și ne-a lăsat notițe clare. Este rar pe piața asta.",
    },
    rating: 5,
    featured: true,
  },
];
