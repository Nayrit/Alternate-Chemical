const FALLBACK_SITE_URL = "http://localhost:3000";

function configuredOrigin() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit;
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  if (!vercel) return "";
  return /^https?:\/\//i.test(vercel) ? vercel : `https://${vercel}`;
}

function readSiteUrl() {
  const raw = configuredOrigin();
  if (!raw) return FALLBACK_SITE_URL;
  try {
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const url = new URL(withProtocol);
    if (url.protocol !== "https:" && url.protocol !== "http:") return FALLBACK_SITE_URL;
    if (url.username || url.password || url.search || url.hash) return FALLBACK_SITE_URL;
    return url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_URL = readSiteUrl();

export const SITE_NAME = "Alternate Chemical Industry Ltd.";

export const SITE_DESCRIPTION =
  "Alternate Chemical Industry Ltd. (ACIL) designs a UNIDO best-practice corn wet mill in Habiganj, Bangladesh: 150 TPD crushing, six product streams, and a 100 TPD modified starch line for food, pharmaceutical, textile, and feed.";

export const SITE_KEYWORDS = [
  "Alternate Chemical Industry Ltd",
  "ACIL",
  "corn starch Bangladesh",
  "native corn starch",
  "modified starch",
  "oxidized starch",
  "cationic starch",
  "corn wet milling",
  "Habiganj starch plant",
  "Madhobpur",
  "corn fiber",
  "corn gluten meal",
  "corn steep liquor",
  "textile sizing starch",
  "pharmaceutical excipient starch",
  "import substitution Bangladesh",
];
