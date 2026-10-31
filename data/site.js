// Site-wide settings. Edit this file to connect your domain, social accounts, newsletter and payments.
export const SITE = {
  name: "Tiny French",
  tagline: "Learn French one tiny story at a time",
  // Production origin used for canonical URLs, the sitemap and social previews.
  // Override at build time with the SITE_URL environment variable. Leave empty to build without canonical URLs / sitemap.
  url: "https://sabaghanbarlo-hash.github.io/tiny-french",
  // Default to root hosting (Cloudflare Workers, custom domains, local preview).
  // GitHub Pages sets BASE_PATH=/tiny-french in its workflow.
  // Override at build time with BASE_PATH.
  basePath: "",
  instagramUrl: "https://www.instagram.com/tiny.french/",
  instagramHandle: "@tiny.french",
  youtubeUrl: "https://www.youtube.com/@tinyfrench9",
  youtubeHandle: "@tinyfrench9",
  email: "",
  newsletter: { formAction: "", emailField: "email", provider: "" }
};
