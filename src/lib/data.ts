export type Sector = "food" | "pharma" | "textile" | "feed";

export const CRUSH_KG_PER_DAY = 150_000;
export const FINISHED_KG_PER_DAY = 130_500;
export const OPERATING_DAYS = 330;
export const NATIVE_ANNUAL_MT = 23_100;
export const IMPORT_2023_MT = 11_604;
export const IMPORT_2023_USD_M = 5.83;
export const TARIFF_INCIDENCE = 0.67;
export const SILO_BUFFER_MT = 33_000;
export const SILO_PRIMARY_MT = 20_000;
export const ANNUAL_CORN_INTAKE_MT = (CRUSH_KG_PER_DAY * OPERATING_DAYS) / 1000;

export const company = {
  name: "Alternate Chemical Industry Ltd.",
  short: "ACIL",
  tagline: "Agro-Industrial Ingredients & High-Yield Starch Solutions",
  headline:
    "Engineering Sustainable Agro-Industrial Chemistry from Bangladesh's Golden Harvest.",
  commissioning: "Early 2027",
  machinery: "End of 2026",
  factory: {
    label: "Habiganj factory",
    lines: [
      "Satian Road, Ratanpur, Madhobpur,",
      "Habiganj, Bangladesh",
    ],
  },
  office: {
    label: "Dhaka corporate office",
    lines: [
      "Suite 7A-7B & 15D1-15D2, Paramount Heights,",
      "65/2/1 Culvert Road, Dhaka 1000, Bangladesh",
    ],
  },
};

export const nav = [
  { href: "/company", id: "company", label: "Company" },
  { href: "/milling", id: "milling", label: "Milling Tech" },
  { href: "/products", id: "products", label: "Products" },
  { href: "/applications", id: "applications", label: "Industrial Applications" },
  { href: "/sustainability", id: "sustainability", label: "Sustainability" },
] as const;

export const siteRoutes = [
  { path: "/", title: "Home" },
  { path: "/company", title: "Company" },
  { path: "/milling", title: "Milling technology" },
  { path: "/products", title: "Products" },
  { path: "/applications", title: "Industrial applications" },
  { path: "/import-substitution", title: "Import substitution" },
  { path: "/sustainability", title: "Sustainability" },
  { path: "/procurement", title: "Procurement" },
  { path: "/request", title: "Commercial request" },
] as const;

export const sectors: {
  id: Sector;
  label: string;
  detail: string;
}[] = [
  {
    id: "food",
    label: "Food & Beverage",
    detail:
      "Thickening, stabilizing, and binding in processed foods, baked goods, and snacks.",
  },
  {
    id: "pharma",
    label: "Pharmaceuticals",
    detail:
      "Native corn starch as a tablet excipient and binder, specified against imported grades.",
  },
  {
    id: "textile",
    label: "Textiles",
    detail:
      "Yarn sizing and fabric finishing for Bangladesh’s export apparel industry.",
  },
  {
    id: "feed",
    label: "Animal Feed & Fermentation",
    detail:
      "Fiber, germ, gluten, and steep liquor for compound feed and fermentation media.",
  },
];

export type Product = {
  id: string;
  name: string;
  code: string;
  yieldKg: number;
  categories: Sector[];
  summary: string;
  line: string;
  priceUsdPerMt: number;
  purity: { label: string; value: string }[];
  properties: { label: string; value: string }[];
  applications: string[];
};

export const products: Product[] = [
  {
    id: "native",
    name: "Native Corn Starch",
    code: "ACIL-NS",
    yieldKg: 70_000,
    categories: ["food", "pharma", "textile"],
    summary:
      "A versatile thickener, stabilizer, and binder from the wet-milling line, graded in the on-site laboratory before packing.",
    line: "Produced on the corn wet-milling train and dried to specification.",
    priceUsdPerMt: 540,
    purity: [
      { label: "Moisture", value: "13.0% max" },
      { label: "Protein, dry basis", value: "0.40% max" },
      { label: "Ash", value: "0.20% max" },
      { label: "Whiteness", value: "92 min" },
    ],
    properties: [
      { label: "pH, 20% slurry", value: "5.0–7.0" },
      { label: "Gelatinization onset", value: "64–72°C" },
      { label: "Paste", value: "Medium-high viscosity, opaque gel on cooling" },
      { label: "Residual SO₂", value: "30 ppm max" },
      { label: "Binding", value: "Tablet excipient and yarn-size film former" },
    ],
    applications: [
      "Food and beverage processing",
      "Pharmaceutical tablet excipient and binder",
      "Yarn sizing and fabric finishing",
    ],
  },
  {
    id: "modified",
    name: "Modified Starch",
    code: "ACIL-MS",
    yieldKg: 20_000,
    categories: ["food", "textile"],
    summary:
      "Oxidized and cationic variants from the dedicated modification line, built for bakery, ready-to-eat foods, and industrial sizing.",
    line: "100 TPD line engineered by Wuhan Friendship New Tech Co.",
    priceUsdPerMt: 790,
    purity: [
      { label: "Moisture", value: "13.0% max" },
      { label: "Oxidized grade", value: "Lower viscosity, clearer paste" },
      { label: "Cationic grade", value: "Positive charge for fiber adhesion" },
      { label: "Form", value: "Dry powder, lot-graded" },
    ],
    properties: [
      { label: "pH", value: "5.5–7.5 typical" },
      { label: "Oxidized paste", value: "Reduced hot viscosity versus native" },
      { label: "Cationic function", value: "Affinity for negatively charged fiber" },
      { label: "Gel character", value: "Tuned for bakery and ready-to-eat systems" },
      { label: "Substitution", value: "Confirmed on the lot TDS" },
    ],
    applications: [
      "Stabilizer and thickener in baked goods and snacks",
      "Ready-to-eat formulations",
      "Oxidized starch for textile sizing and finishing",
    ],
  },
  {
    id: "fiber",
    name: "Corn Fiber",
    code: "ACIL-CF",
    yieldKg: 19_500,
    categories: ["feed"],
    summary:
      "Digestible fiber separated on the hydrocyclone wash, sold as a cost-effective base for livestock and poultry compound feed.",
    line: "Recovered during wet milling after germ separation.",
    priceUsdPerMt: 190,
    purity: [
      { label: "Moisture", value: "12% max" },
      { label: "Role", value: "Fiber fraction of the kernel" },
      { label: "Form", value: "Dried feed fiber" },
      { label: "Daily design yield", value: "19,500 kg" },
    ],
    properties: [
      { label: "Digestibility", value: "Feed-mill fiber supplement" },
      { label: "Binding", value: "Carrier in compound rations" },
      { label: "pH", value: "Near-neutral feed ingredient" },
      { label: "Gelatinization", value: "Not a cook-up starch; residual starch only" },
    ],
    applications: [
      "Livestock compound feed",
      "Poultry rations",
      "Cost-effective fiber base",
    ],
  },
  {
    id: "germ",
    name: "Corn Germ",
    code: "ACIL-CG",
    yieldKg: 12_000,
    categories: ["food", "feed"],
    summary:
      "Oil-bearing germ recovered early in the mill, before starch and gluten separation, for corn-oil extraction and high-energy feed.",
    line: "Separated in the degermination step of the wet mill.",
    priceUsdPerMt: 360,
    purity: [
      { label: "Fraction", value: "Oil-bearing germ" },
      { label: "Moisture", value: "Drying spec on the lot COA" },
      { label: "Daily design yield", value: "12,000 kg" },
      { label: "Position in the mill", value: "Recovered before fiber and gluten" },
    ],
    properties: [
      { label: "Energy", value: "High-energy feed after oil extraction" },
      { label: "Oil", value: "Extraction yield confirmed per lot" },
      { label: "pH", value: "Not a slurry-specified product" },
      { label: "Handling", value: "Cool, dry storage to protect the oil" },
    ],
    applications: [
      "Commercial corn-oil extraction",
      "High-energy feed ingredient after extraction",
      "Nutritional oil and germ applications",
    ],
  },
  {
    id: "gluten",
    name: "Gluten Powder",
    code: "ACIL-GP",
    yieldKg: 4_500,
    categories: ["feed"],
    summary:
      "High-protein corn gluten meal for aqua and poultry formulations, separated after fiber washing and before starch finishing.",
    line: "Gluten separation on the wet-milling train.",
    priceUsdPerMt: 710,
    purity: [
      { label: "Crude protein", value: "60% minimum" },
      { label: "Moisture", value: "10% max" },
      { label: "Form", value: "Dry gluten powder" },
      { label: "Daily design yield", value: "4,500 kg" },
    ],
    properties: [
      { label: "Protein density", value: "60%+ for aqua and poultry" },
      { label: "Binding", value: "Protein enrichment in compound feed" },
      { label: "pH", value: "Feed-grade, confirmed on COA" },
      { label: "Color", value: "Typical golden gluten meal" },
    ],
    applications: [
      "Aquaculture feed",
      "Poultry formulations",
      "Protein enrichment in compound rations",
    ],
  },
  {
    id: "steep",
    name: "Corn Steep Liquor",
    code: "ACIL-CSL",
    yieldKg: 4_500,
    categories: ["feed"],
    summary:
      "Concentrated steep water, rich in amino acids and vitamins, drawn at the steep and sold as a fermentation substrate and liquid feed.",
    line: "Evaporated from the warm-water steep. Process water becomes a product.",
    priceUsdPerMt: 150,
    purity: [
      { label: "Form", value: "Concentrated liquid" },
      { label: "Dry substance", value: "45–55% target band" },
      { label: "pH", value: "3.7–4.5" },
      { label: "Daily design yield", value: "4,500 kg" },
    ],
    properties: [
      { label: "Nutrients", value: "Amino acids, vitamins, and minerals" },
      { label: "Viscosity", value: "Pumpable concentrate" },
      { label: "Fermentation", value: "Microbial nutrient substrate" },
      { label: "Binding", value: "Not a dry binder; liquid feed additive" },
    ],
    applications: [
      "Industrial fermentation",
      "Liquid feed additive",
      "Nutrient source in microbial culture media",
    ],
  },
];

export const sectorLeadProduct: Record<Sector, string> = {
  food: "native",
  pharma: "native",
  textile: "native",
  feed: "fiber",
};

export type LaneId = "habiganj" | "dhaka" | "chittagong";

export const lanes: {
  id: LaneId;
  label: string;
  detail: string;
  freightUsdPerMt: number;
  sampleFreightUsd: number;
}[] = [
  {
    id: "habiganj",
    label: "Habiganj ex-factory",
    detail: "Collected from the plant on Satian Road, Ratanpur, Madhobpur.",
    freightUsdPerMt: 0,
    sampleFreightUsd: 0,
  },
  {
    id: "dhaka",
    label: "Dhaka direct",
    detail: "Road delivery toward Dhaka mills, plants, and the corporate corridor.",
    freightUsdPerMt: 24,
    sampleFreightUsd: 25,
  },
  {
    id: "chittagong",
    label: "Chittagong",
    detail: "Moved toward Chittagong for port-side or coastal-mill delivery.",
    freightUsdPerMt: 31,
    sampleFreightUsd: 35,
  },
];

export const SAMPLE_FEE_USD = 40;

export const processSteps = [
  {
    id: "intake",
    index: "01",
    title: "Intake & silo storage",
    output: "33,000 MT buffer",
    yieldKg: null as number | null,
    yieldNote: "20,000 MT primary battery inside a 33,000 MT silo buffer.",
    application:
      "Holds locally grown corn through the off-season so the mill can run when the harvest is not.",
    specs: [
      { label: "Total buffer", value: "33,000 MT" },
      { label: "Primary battery", value: "20,000 MT" },
      { label: "Raw material", value: "Locally grown corn" },
      { label: "Corn import duty", value: "Zero" },
    ],
  },
  {
    id: "steep",
    index: "02",
    title: "Warm-water steeping",
    output: "Corn steep liquor · 4,500 kg",
    yieldKg: 4_500,
    yieldNote: "Kernels soften in warm water. The steep is concentrated and sold.",
    application:
      "Fermentation nutrient substrate and liquid feed, rich in amino acids and vitamins.",
    specs: [
      { label: "Product", value: "Corn steep liquor" },
      { label: "Design yield", value: "4,500 kg/day" },
      { label: "Dry substance", value: "45–55% target band" },
      { label: "pH", value: "3.7–4.5" },
    ],
  },
  {
    id: "germ",
    index: "03",
    title: "Wet milling & germ separation",
    output: "Corn germ · 12,000 kg",
    yieldKg: 12_000,
    yieldNote: "Germ is recovered before fiber and gluten leave the slurry.",
    application:
      "Commercial corn-oil extraction, then a high-energy feed ingredient.",
    specs: [
      { label: "Product", value: "Corn germ" },
      { label: "Design yield", value: "12,000 kg/day" },
      { label: "Fraction", value: "Oil-bearing germ" },
      { label: "Mill position", value: "Early separation" },
    ],
  },
  {
    id: "fiber",
    index: "04",
    title: "Hydrocyclone fiber washing",
    output: "Corn fiber · 19,500 kg",
    yieldKg: 19_500,
    yieldNote: "Fiber is washed out of the mill starch stream and dried for feed.",
    application: "Livestock and poultry compound feed. Poultry dominates Bangladesh’s commercial feed output.",
    specs: [
      { label: "Product", value: "Corn fiber" },
      { label: "Design yield", value: "19,500 kg/day" },
      { label: "Moisture", value: "12% max" },
      { label: "Duty", value: "Digestible fiber base" },
    ],
  },
  {
    id: "gluten",
    index: "05",
    title: "Gluten separation",
    output: "Gluten powder · 4,500 kg",
    yieldKg: 4_500,
    yieldNote: "Protein is split from the starch slurry and dried to a powder.",
    application: "High-protein aqua and poultry formulations at 60%+ crude protein.",
    specs: [
      { label: "Product", value: "Gluten powder" },
      { label: "Design yield", value: "4,500 kg/day" },
      { label: "Crude protein", value: "60% minimum" },
      { label: "Moisture", value: "10% max" },
    ],
  },
  {
    id: "starch",
    index: "06",
    title: "Starch refining & modification",
    output: "Native 70,000 kg · Modified 20,000 kg",
    yieldKg: 90_000,
    yieldNote:
      "Refined native starch is dried at 70,000 kg/day. A dedicated line converts 20,000 kg/day into oxidized and cationic grades.",
    application:
      "Food, pharmaceutical excipients, textile sizing, bakery, and ready-to-eat systems.",
    specs: [
      { label: "Native starch", value: "70,000 kg/day" },
      { label: "Modified starch", value: "20,000 kg/day" },
      { label: "Modification line", value: "100 TPD · Wuhan Friendship New Tech Co." },
      { label: "Variants", value: "Oxidized and cationic" },
    ],
  },
];

export const industryUses: {
  id: Sector;
  industry: string;
  products: string;
  fn: string;
}[] = [
  {
    id: "food",
    industry: "Food & Beverage",
    products: "Native corn starch, modified starch",
    fn: "Thickening, stabilizing, and binding in processed foods, baked goods, and snacks.",
  },
  {
    id: "pharma",
    industry: "Pharmaceutical",
    products: "Native corn starch",
    fn: "Excipient and binder in tablet manufacturing, in place of imported material.",
  },
  {
    id: "textile",
    industry: "Textile",
    products: "Native corn starch, oxidized starch",
    fn: "Yarn sizing and fabric finishing, the largest single use of corn starch in Bangladesh.",
  },
  {
    id: "feed",
    industry: "Feed & Fermentation",
    products: "Corn fiber, germ, gluten powder, steep liquor",
    fn: "Protein and fiber for livestock, poultry, and aquaculture, plus fermentation substrate.",
  },
];

export const starchImports = [
  { origin: "India", tonnes: 8493, value: 3.72 },
  { origin: "Pakistan", tonnes: 1930, value: 1.19 },
  { origin: "Republic of Korea", tonnes: 824, value: 0.64 },
  { origin: "European Union", tonnes: 357, value: 0.28 },
];

export const glance = [
  {
    figure: "150 TPD",
    label: "Corn wet milling",
    detail: "Primary separation so every fraction of the kernel reaches a market.",
  },
  {
    figure: "100 TPD",
    label: "Modified starch line",
    detail: "Dedicated capacity for oxidized and cationic variants.",
  },
  {
    figure: "33,000 MT",
    label: "Silo storage",
    detail: "Raw corn held through the off-season to steady cost and supply.",
  },
  {
    figure: "10,000 kg/hr",
    label: "Thermax steam",
    detail: "High-efficiency boiler serving both processing lines continuously.",
  },
];

export const plantZones = [
  {
    id: "intake",
    code: "01",
    label: "Intake",
    svg: "Intake & weighbridge",
    x: 36,
    y: 36,
    w: 180,
    h: 150,
    detail:
      "Cleaned, graded corn crosses the weighbridge. The mill is sited within reach of the northern and north-western growing districts.",
    metric: "Local corn · zero grain duty",
  },
  {
    id: "silo",
    code: "02",
    label: "Silo battery",
    svg: "Silo battery",
    x: 232,
    y: 36,
    w: 300,
    h: 170,
    detail:
      "Primary silo battery of 20,000 MT inside a 33,000 MT site buffer, holding the crop through the off-season.",
    metric: "20,000 MT primary · 33,000 MT buffer",
  },
  {
    id: "steep",
    code: "03",
    label: "Steeping house",
    svg: "Steeping house",
    x: 548,
    y: 36,
    w: 200,
    h: 150,
    detail:
      "Warm-water steep softens the kernel and yields corn steep liquor at 4,500 kg/day once concentrated.",
    metric: "Steep liquor 4,500 kg/day",
  },
  {
    id: "mill",
    code: "04",
    label: "Milling hall",
    svg: "Milling hall",
    x: 764,
    y: 36,
    w: 200,
    h: 170,
    detail:
      "Wet-milling hall marked 50 TPD on the facility plan. Germ is split here at a design yield of 12,000 kg/day. Daily crush for the plant is 150,000 kg.",
    metric: "50 TPD hall · 12,000 kg germ",
  },
  {
    id: "drying",
    code: "05",
    label: "Starch drying",
    svg: "Starch drying",
    x: 36,
    y: 230,
    w: 250,
    h: 160,
    detail:
      "Refined starch slurry is washed and dried to the native grade: 70,000 kg/day at full design output.",
    metric: "Native starch 70,000 kg/day",
  },
  {
    id: "modified",
    code: "06",
    label: "Modified starch",
    svg: "Modified starch",
    x: 302,
    y: 230,
    w: 420,
    h: 160,
    detail:
      "Dedicated 100 TPD modification line engineered by Wuhan Friendship New Tech Co. Design output is 20,000 kg/day of oxidized and cationic starch.",
    metric: "100 TPD · Wuhan Friendship New Tech Co.",
  },
  {
    id: "packing",
    code: "07",
    label: "Packing",
    svg: "Packing & warehouse",
    x: 738,
    y: 250,
    w: 226,
    h: 140,
    detail:
      "Finished goods are laboratory-graded and packed for food, pharmaceutical, textile, and feed dispatch.",
    metric: "Every batch graded on site",
  },
  {
    id: "boiler",
    code: "08",
    label: "Boiler house",
    svg: "Thermax boiler",
    x: 36,
    y: 430,
    w: 230,
    h: 190,
    detail:
      "Thermax high-efficiency boiler delivering 10,000 kg/hr of continuous steam to the wet mill and the modification line.",
    metric: "10,000 kg/hr steam",
  },
  {
    id: "lab",
    code: "09",
    label: "Laboratory",
    svg: "Laboratory",
    x: 282,
    y: 430,
    w: 180,
    h: 190,
    detail:
      "On-site laboratory. FAO- and ISO-aligned checks at intake, in process, and at final grading, before any lot is released.",
    metric: "Intake · process · final grade",
  },
  {
    id: "etp",
    code: "10",
    label: "ETP",
    svg: "Zero-discharge ETP",
    x: 478,
    y: 430,
    w: 250,
    h: 190,
    detail:
      "Zero-discharge effluent treatment plant. Process water is treated on site, within regulatory limits, beside agricultural land.",
    metric: "Zero discharge by design",
  },
  {
    id: "solar",
    code: "11",
    label: "Solar array",
    svg: "Rooftop solar",
    x: 744,
    y: 430,
    w: 220,
    h: 190,
    detail:
      "Rooftop solar generation to reduce grid dependence and the energy cost carried by each tonne of finished product. Array capacity is fixed at commissioning.",
    metric: "On-site generation",
  },
];

export const esg = {
  waterLitresPerDay: 150 * 2.5 * 1000,
  carbonTonnesPerYear: Math.round((400 * 4.2 * 365 * 0.8 * 0.6) / 1000),
};

export const kpis = [
  { value: 150000, suffix: " kg", label: "Daily crushing capacity", display: "150,000 kg" },
  { value: 6, suffix: "", label: "Fractionated product streams", display: "6" },
  { value: 0, suffix: "%", label: "Waste · 100% of kernel biomass sold", display: "0%" },
  { value: null, suffix: "", label: "Best-practice plant design", display: "UNIDO" },
] as const;
