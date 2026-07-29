export const websiteSchema = {
  "@context": "https://schema.org",

  "@type": "WebSite",

  name: "Reservation Hatao Andolan",

  alternateName: "RHA",

  url: "https://reservationhataoandolan-chi.vercel.app",

  description:
    "Reservation Hatao Andolan is a citizen-led movement promoting awareness, constitutional participation, public dialogue, and research-based discussion on reservation reform in India.",

  inLanguage: "en-IN",

  publisher: {
    "@type": "Organization",

    name: "Reservation Hatao Andolan",

    url: "https://reservationhataoandolan-chi.vercel.app",

    logo: {
      "@type": "ImageObject",

      url: "https://reservationhataoandolan-chi.vercel.app/logo.jpg",
    },

    sameAs: [
      "https://www.instagram.com/reservationhataomovement/",
      "https://x.com/RHAreforms",
    ],
  },

  potentialAction: {
    "@type": "SearchAction",

    target:
      "https://reservationhataoandolan-chi.vercel.app/?search={search_term_string}",

    "query-input": "required name=search_term_string",
  },
};
