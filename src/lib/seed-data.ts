// Placeholder Unsplash imagery — replace with branded WaterVibe photography
// before launch. Each product references specific Unsplash photo IDs so the
// URLs remain stable across dev/staging/prod. Whitelisted in next.config.ts.
const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

const PHOTOS = [
  "photo-1729809106424-6953c0adbbca",
  "photo-1581610489819-a8034f72a62b",
  "photo-1657383543368-7d929944be6a",
  "photo-1634253539564-8887939e239f",
  "photo-1603991488459-73de26c7c4f8",
  "photo-1709035132887-20ccf1a426d8",
] as const;

// Rotate through the 6 photos so each product gets a unique cover and two
// gallery frames without any product owning the same cover as another.
const gallery = (coverIndex: number): string[] => [
  img(PHOTOS[coverIndex]!),
  img(PHOTOS[(coverIndex + 1) % PHOTOS.length]!),
  img(PHOTOS[(coverIndex + 2) % PHOTOS.length]!),
];

type SeedProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
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
  features: string[];
  featured: boolean;
  order: number;
};

type SeedTestimonial = {
  author: string;
  location: string;
  quote: string;
  rating: 4 | 5;
  featured: boolean;
};

export const seedProducts: SeedProduct[] = [
  {
    slug: "azure-4",
    name: "Azure 4",
    tagline: "Patru locuri, linii curate, un jacuzzi care rămâne silențios.",
    description:
      "Azure 4 păstrează silueta minimalistă a gamei și adaugă loc pentru prieteni. Carcasa are un finisaj alb ivoire cald care își ține culoarea la soare plin.\n\nDouă scaune înclinate sunt așezate față în față, peste banca de masaj. Puteți purta o conversație peste cadă și primi în același timp hidromasaj pe zona lombară.",
    size: "4-person",
    color: "white",
    colorHex: "#F4F1EC",
    price: 31500,
    images: gallery(0),
    specs: {
      dimensions: "2.1m × 2.1m × 0.9m",
      jets: 28,
      capacity: 4,
      power: "3.2 kW",
      weightEmpty: "280 kg",
      weightFull: "1,250 kg",
    },
    features: [
      "28 duze de hidromasaj multi-zonă",
      "Două scaune înclinate",
      "Audio Bluetooth, două boxe",
      "Bază termică ABS ranforsată",
      "Tratare apă cu ozon și UV",
    ],
    featured: true,
    order: 10,
  },
  {
    slug: "coral-breeze",
    name: "Coral Breeze",
    tagline: "Panouri teak calde. Calmul litoralului pentru patru.",
    description:
      "Coral Breeze s-a desenat după o săptămână pe litoralul Adriatic. Panouri compozite cu textură teak îmbracă corpul cazii. Carcasa interioară este într-un crem delicat care se citește mai cald pe măsură ce stați în ea.\n\nTetierele se scot pentru curățare. Skimmerul colectează de două ori mai multe impurități decât modelele standard — un detaliu care contează mai mult decât sugerează fișa tehnică prima dată când lăsați capacul deschis într-o seară cu vânt.",
    size: "4-person",
    color: "teak",
    colorHex: "#8B5E3C",
    price: 37800,
    images: gallery(1),
    specs: {
      dimensions: "2.2m × 2.2m × 0.92m",
      jets: 32,
      capacity: 4,
      power: "3.5 kW",
      weightEmpty: "295 kg",
      weightFull: "1,320 kg",
    },
    features: [
      "32 duze de hidromasaj de precizie",
      "Cabinet compozit cu textură teak",
      "Tetiere detașabile din memory-foam",
      "Skimmer cu capacitate dublă",
      "Comenzi compatibile smart-home",
    ],
    featured: true,
    order: 20,
  },
  {
    slug: "oasis-signature",
    name: "Oasis Signature",
    tagline: "Modelul nostru de top. Teak finisat manual, în interior și exterior.",
    description:
      "Oasis Signature este expresia completă WaterVibe. Suprafețele cu textură teak caldă curg din cabinet în tetiere. Fiecare suprafață de comandă, fiecare mâner al capacului, fiecare ornament de la sprijinul pentru picioare este îmbrăcat în piele naturală.\n\nSe livrează cu instalare premium și o vizită de configurare cu unul dintre inginerii noștri. Nu vă chinuiți singur cu presiunea jeturilor în prima seară.",
    size: "6+person",
    color: "teak",
    colorHex: "#8B5E3C",
    price: 86900,
    images: gallery(2),
    specs: {
      dimensions: "2.5m × 2.4m × 1.02m",
      jets: 64,
      capacity: 7,
      power: "5.0 kW",
      weightEmpty: "420 kg",
      weightFull: "2,200 kg",
    },
    features: [
      "64 duze de hidromasaj signature",
      "Cabinet teak finisat manual",
      "Ornamente din piele naturală",
      "Instalare premium inclusă",
      "Configurare la fața locului cu un inginer WaterVibe",
      "Garanție carcasă 10 ani",
      "Diagnosticare de la distanță prin Wi-Fi",
    ],
    featured: true,
    order: 30,
  },
  {
    slug: "azure-2",
    name: "Azure 2",
    tagline: "Un jacuzzi mic pentru doi, gândit pentru serile liniștite.",
    description:
      "Azure 2 este cel mai mic jacuzzi din colecție. Intră pe un balcon sau pe o terasă îngustă fără să consume decorul. Paisprezece duze de hidromasaj încadrează cele două scaune ergonomice, iar pompa merge suficient de silențios ca să purtați o conversație peste ea.\n\nEste cada cu hidromasaj potrivită pentru cupluri care vor un jacuzzi acasă, dar nu vor să renunțe la jumătate de terasă pentru asta.",
    size: "2-person",
    color: "white",
    colorHex: "#F4F1EC",
    price: 18500,
    images: gallery(3),
    specs: {
      dimensions: "1.9m × 1.5m × 0.8m",
      jets: 14,
      capacity: 2,
      power: "2.4 kW",
      weightEmpty: "180 kg",
      weightFull: "780 kg",
    },
    features: [
      "14 duze inox de hidromasaj",
      "Iluminare LED, 6 nuanțe",
      "Capac termic izolat",
      "Pompă de căldură mod eco",
    ],
    featured: false,
    order: 40,
  },
  {
    slug: "pebble-2",
    name: "Pebble 2",
    tagline: "Carcasă grafit. Seri calde, pentru doi.",
    description:
      "Pebble 2 este turnat dintr-o singură matriță în grafit profund. Silueta este joasă și discretă. Este jacuzzi-ul care dispare într-o curte interioară la lăsarea serii.\n\nÎn interior, două scaune înclinate împart un spațiu central pentru picioare. Cascada integrată servește și ca sunet ambiental, în serile în care preferați să stați fără jeturi.",
    size: "2-person",
    color: "graphite",
    colorHex: "#2E2E2E",
    price: 21900,
    images: gallery(4),
    specs: {
      dimensions: "2.0m × 1.5m × 0.82m",
      jets: 16,
      capacity: 2,
      power: "2.6 kW",
      weightEmpty: "195 kg",
      weightFull: "820 kg",
    },
    features: [
      "16 duze cu contra-curent",
      "Cascadă integrată",
      "Carcasă monolitică cu profil jos",
      "Tastatură digitală cu setări memorate",
    ],
    featured: false,
    order: 50,
  },
  {
    slug: "meridian-6",
    name: "Meridian 6",
    tagline: "Finisaj midnight. Șase locuri pentru serile lungi de familie.",
    description:
      "Meridian 6 este cel mai arhitectural jacuzzi din gamă. Muchii drepte, colțuri ferme, un singur panou de comandă încastrat în nuanță midnight profund. Nimic din design nu concurează cu apa.\n\nCinci scaune sunt așezate pe perimetru, plus o banca de masaj pe toată lungimea. Izolația atinge un rating R-16. Încălzitorul abia se trezește între sesiuni, chiar și iarna.",
    size: "6+person",
    color: "midnight",
    colorHex: "#0E1A2E",
    price: 58400,
    images: gallery(5),
    specs: {
      dimensions: "2.3m × 2.3m × 0.98m",
      jets: 52,
      capacity: 6,
      power: "4.2 kW",
      weightEmpty: "380 kg",
      weightFull: "1,980 kg",
    },
    features: [
      "52 duze de hidromasaj multi-zonă",
      "Banca de masaj pe toată lungimea",
      "Izolație rating R-16",
      "Iluminare LED în patru zone",
      "Audio Bluetooth cu subwoofer",
      "Diagnosticare de la distanță prin Wi-Fi",
    ],
    featured: false,
    order: 60,
  },
];

export const seedTestimonials: SeedTestimonial[] = [
  {
    author: "Andrea M.",
    location: "Cluj-Napoca, RO",
    quote:
      "Instalarea a mers fără probleme, iar apa e caldă până terminăm cina. A devenit ritualul nostru de seară.",
    rating: 5,
    featured: true,
  },
  {
    author: "Petre S.",
    location: "București, RO",
    quote:
      "Meridian 6 este singura piesă de mobilier care a supraviețuit fiecărei runde de reamenajare a soției mele. Merită fiecare leu.",
    rating: 5,
    featured: true,
  },
  {
    author: "Hannah K.",
    location: "Vienna, AT",
    quote:
      "Mai silențios decât mă așteptam. Nuanțele LED sunt chiar elegante. Nu mai verific telefonul din momentul în care intru.",
    rating: 4,
    featured: false,
  },
  {
    author: "Ioana D.",
    location: "Brașov, RO",
    quote:
      "Echipa lor de service ne-a ghidat de două ori prin întreținerea apei și ne-a lăsat notițe clare. Este rar pe piața asta.",
    rating: 5,
    featured: true,
  },
];
