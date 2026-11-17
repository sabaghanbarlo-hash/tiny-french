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
  // Contact e-mail shown in the footer and on the About page. [CONTACT_EMAIL] = fill in; while it is a [PLACEHOLDER] it is not shown.
  email: "[CONTACT_EMAIL]",
  // Premium courses: lessons after the free preview are stored on the server and unlocked with an access code.
  premium: { api: "https://pwenjqeclxxpfryxygzb.supabase.co/functions/v1/premium", payUrl: "https://pay.ypaylink.com/personal-link/1537/82655c22bb05b838c3eaf6e9fbf762f92862ad5a", freeLessons: 2 },
  newsletter: { formAction: "[EMAIL_FORM_ACTION_URL]", emailField: "email", provider: "" },
  // Checkout: hosted checkout link per paid course. A [PLACEHOLDER] (or missing) link falls back to premium.payUrl above, so Buy buttons never break.
  // Never put secrets or API keys here: this file is public.
  checkout: { provider: "[CHECKOUT_PROVIDER]", heroCourse: "tiny-1000", urls: { "tiny-1000": "[FR_TINY1000_CHECKOUT_URL]" } },
  // Free download offered for signing up: a printable page built from the lesson data (see build.mjs).
  leadMagnet: { title: "50 essential French phrases (printable one-pager)", path: "/resources/50-essential-phrases/" },
  // [CONFIRM_REFUND_POLICY] Check this wording before publishing. It is shown next to Buy buttons and on the About page.
  refundPolicy: "30-day refund: if a course isn't right for you, email us within 30 days of buying and we'll refund you in full."
};
