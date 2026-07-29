import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],

    sitemap:
      "https://reservationhataoandolan-chi.vercel.app/sitemap.xml",

    host: "https://reservationhataoandolan-chi.vercel.app",
  };
}
