// Courses and products. status: "available" (content exists) | "planned" (not built yet; shown as upcoming only).
// To sell a course later set `price`, `currency` and `checkoutUrl` (a HOSTED checkout link from a provider that works in your country).
// Never put API keys or secrets in this repo. The site is static; see README "Selling courses".
export const courses = [
 {
  id: "free-lessons", title: "Tiny French Free Lessons", kind: "Free course", status: "available",
  level: "Absolute beginner to A1", free: true, price: null, currency: "USD", checkoutUrl: "", art: "story-cafe",
  summary: "Every lesson on this website is free. Short dialogues with Marinette and Adrien, vocabulary, simple grammar and quizzes.",
  outcomes: ["Greet people and introduce yourself", "Order food and drinks politely", "Understand and use your first 50+ phrases"],
  modules: [{ title: "All published lessons", status: "available", note: "Start with Lesson 1 and work through in order." }],
  cta: { label: "Start learning free", href: "/start/" }
 },
 {
  id: "from-zero-to-first-conversations", title: "Tiny French: From Zero to Your First Conversations", kind: "Paid beginner course", status: "planned",
  level: "Absolute beginner (A1)", free: false, price: null, currency: "USD", checkoutUrl: "", art: "story-bakery",
  summary: "A structured, step-by-step beginner course that builds on the free lessons. Still in planning: nothing here is for sale yet.",
  outcomes: ["Read and pronounce French confidently", "Hold short everyday conversations", "Build simple sentences and ask questions"],
  modules: [
   { title: "Module 1: French Sounds and Pronunciation", status: "planned" },
   { title: "Module 2: Greetings and Introductions", status: "planned", note: "Lessons 1–2 of the free course are a preview." },
   { title: "Module 3: Numbers, Dates, and Time", status: "planned" },
   { title: "Module 4: Essential Everyday Vocabulary", status: "planned" },
   { title: "Module 5: Building Simple Sentences", status: "planned" },
   { title: "Module 6: Questions and Answers", status: "planned" },
   { title: "Module 7: Ordering Food and Café Conversations", status: "planned", note: "Lessons 3 and 5 of the free course are a preview." },
   { title: "Module 8: Everyday Conversations and Revision", status: "planned" }
  ],
  cta: { label: "Follow for launch news", href: "instagram" }
 }
];
// Product ideas shown as “future” cards. Nothing here is for sale.
export const futureProducts = [
 { title: "Downloadable workbooks", text: "Printable exercises that go with each module." },
 { title: "Premium lesson bundles", text: "Extra stories, audio and quizzes for committed learners." },
 { title: "Speaking and listening practice", text: "Guided practice packs to train your ear and your voice." }
];
