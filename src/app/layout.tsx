import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SITE_URL, CONTACT_EMAIL, X_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Archeon｜あなたのビジネスの支点になるWeb制作・アプリ開発",
    template: "%s | Archeon",
  },
  description:
    "設計から実装・公開・更新まで一人で担う制作スタジオ。窓口がひとつだから話が速く、判断がぶれません。Web制作とアプリ開発、3D表現にも対応。日本全国オンライン対応、相談は無料です。",
  keywords: [
    "Web制作",
    "ホームページ制作",
    "アプリ開発",
    "Next.js",
    "LP制作",
    "コーポレートサイト",
    "3D",
    "WebGL",
    "Archeon",
    "アーキオン",
  ],
  authors: [{ name: "Archeon" }],
  openGraph: {
    title: "Archeon｜あなたのビジネスの支点になるWeb制作・アプリ開発",
    description:
      "設計から実装・公開・更新まで一人で一貫。Web制作・アプリ開発、3D/WebGL表現にも対応。日本全国オンライン対応、相談は無料です。",
    locale: "ja_JP",
    type: "website",
    url: SITE_URL,
    siteName: "Archeon（アーキオン）",
  },
  twitter: {
    card: "summary_large_image",
    title: "Archeon｜あなたのビジネスの支点に。",
    description: "Web制作・アプリ開発を一貫対応する制作スタジオ。3D/WebGL表現にも対応。相談は無料。",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Archeon（アーキオン）",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/opengraph-image`,
  description:
    "Web制作・アプリ開発を手がける個人の制作スタジオ（屋号）。設計から実装・公開・運用まで一人で一貫対応。",
  areaServed: { "@type": "Country", name: "Japan" },
  email: CONTACT_EMAIL,
  sameAs: [X_URL],
  knowsAbout: ["Web制作", "アプリ開発", "Next.js", "React", "Three.js", "WebGL", "WordPress"],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web制作" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "アプリ開発" } },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJp.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
