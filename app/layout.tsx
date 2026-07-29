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
    default: "Reservation Hatao Andolan | Official Information Platform",
    template: "%s | Reservation Hatao Andolan",
  },

  description:
    "Reservation Hatao Andolan is a citizen-led movement promoting public awareness, informed dialogue, constitutional participation, and policy discussions on reservation reform in India.",

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
    title: "Reservation Hatao Andolan | Official Information Platform",

    description:
      "Official information platform for Reservation Hatao Andolan. Learn about the movement, current campaigns, public awareness initiatives, research, and updates.",

    url: "https://reservationhataoandolan-chi.vercel.app",

    siteName: "Reservation Hatao Andolan",

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Reservation Hatao Andolan | Official Information Platform",

    description:
      "Official information platform for Reservation Hatao Andolan.",

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
