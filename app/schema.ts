export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Movement',
  url: 'https://movement.example.com',
  description: 'A premium movement platform for dignity, care, and civic participation.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://movement.example.com',
    'query-input': 'required name=search_term_string',
  },
};
