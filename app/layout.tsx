import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./keyboard.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const pixel = VT323({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  ),
  title: "Ryan Santos (@ryansantosdg)",
  description: "Ouça o silêncio da mente. É de lá que vem o verdadeiro crescimento.",
};

export const viewport: Viewport = {
  themeColor: "#EEF4FB",
  viewportFit: "cover",
};

// Pula a abertura se já foi vista nesta sessão (roda antes da página aparecer)
const introGate = `try{if(sessionStorage.getItem('rs-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-seen','')}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${mono.variable} ${pixel.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGate }} />
        <noscript>
          <style>{`#intro{display:none!important}`}</style>
        </noscript>
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
