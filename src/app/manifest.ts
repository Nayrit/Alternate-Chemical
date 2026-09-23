import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "ACIL",
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F8FAF8",
    theme_color: "#006837",
    lang: "en",
    icons: [
      {
        src: "/images/logo.png",
        sizes: "3043x643",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
