import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { websiteSchema } from "./schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reservationhataoandolan-chi.vercel.app"),

  title: {
    default: "Reservation Hatao Andolan | Information Platform",
    template: "%s | Reservation Hatao Andolan",
  },

  description:
    "An information platform presenting the Reservation Hatao Andolan movement, its objectives, campaigns, public awareness initiatives, and research-based discussions on reservation reform in India.",

  verification: {
    google: "ba_pgnx_MycxSiVCQfRoiv0MupE29wZToZaQp-ua1lk",
  },

  keywords: [
    "Reservation Hatao Andolan",
    "Reservation Hatao Movement",
    "Reservation Reform India",
    "Reservation Policy",
    "Equal Opportunity",
    "Merit Based Opportunity",
    "Constitutional Reform",
    "Public Awareness",
    "Reservation Awareness",
    "India",
    "RHA Movement",
  ],

  authors: [
    {
      name: "Krishna Kumar",
    },
  ],

  creator: "Krishna Kumar",

  publisher: "Reservation Hatao Andolan",

  category: "Social Movement",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Reservation Hatao Andolan | Information Platform",

    description:
      "An information platform presenting the Reservation Hatao Andolan movement, its campaigns, objectives, and public awareness initiatives.",

    url: "https://reservationhataoandolan-chi.vercel.app",

    siteName: "Reservation Hatao Andolan",

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Reservation Hatao Andolan | Information Platform",

    description:
      "An information platform presenting the Reservation Hatao Andolan movement and its public awareness initiatives.",

    creator: "@RHAreforms",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}
