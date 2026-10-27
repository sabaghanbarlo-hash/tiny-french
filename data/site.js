// Site-wide settings. Edit this file to connect your domain, social accounts, newsletter and payments.
export const SITE = {
  name: "Tiny French",
  tagline: "Learn French one tiny story at a time",
  // Production origin used for canonical URLs, the sitemap and social previews.
  // Override at build time with the SITE_URL environment variable. Leave empty to build without canonical URLs / sitemap.
  url: "https://sabaghanbarlo-hash.github.io/tiny-french",
  // Folder the site is served from. "/tiny-french" for a GitHub project page, "" for a custom domain.
  // Override at build time with BASE_PATH.
  basePath: "/tiny-french",
  instagramUrl: "https://www.instagram.com/tiny.french/",
  instagramHandle: "@tiny.french",
  youtubeUrl: "",          // fill in when the channel exists
  email: "",               // optional public contact e-mail
  // Newsletter: leave formAction empty until you have a real provider (Buttondown, MailerLite, Brevo, Kit...).
  // Paste the provider's hosted form POST URL here and the signup box appears automatically.
  newsletter: { formAction: "", emailField: "email", provider: "" }
};
