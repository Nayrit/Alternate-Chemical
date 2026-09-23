import type { Metadata } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alternate Chemical Industry Ltd. | Agro-Industrial Starch",
  description:
    "Alternate Chemical Industry Ltd. (ACIL) is commissioning a UNIDO best-practice corn wet mill in Habiganj, Bangladesh: 150 TPD crushing, six fractionated streams, and a 100 TPD modified starch line.",
  keywords: [
    "Alternate Chemical Industry",
    "ACIL",
    "corn starch Bangladesh",
    "modified starch",
    "Habiganj",
    "wet milling",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${syne.variable} ${plex.variable} h-full antialiased`}>
      <body className="min-h-full bg-surface font-sans text-ink">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
