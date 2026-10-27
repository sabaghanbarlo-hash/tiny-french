// Roadmap, numbers sheet and pronunciation guide content. Roadmap `lessons` are lesson numbers that already exist.
export const roadmap = [
 { title: "First French Words", text: "Hello, thank you, please.", status: "available", lessons: [1, 2, 3] },
 { title: "Introductions and Greetings", text: "Say your name and ask how someone is.", status: "available", lessons: [1, 4] },
 { title: "Numbers, Dates, and Time", text: "Count, say prices and tell the time.", status: "planned", note: "Numbers 0–10 are in the vocabulary library and the Numbers 0–20 cheat sheet." },
 { title: "Everyday Questions", text: "Ask how, where and what.", status: "partial", lessons: [4, 7] },
 { title: "Food and Café Conversations", text: "Order like a local.", status: "available", lessons: [2, 3, 5] },
 { title: "Shopping and Directions", text: "Buy things and find your way.", status: "partial", lessons: [6] },
 { title: "Daily Routines", text: "Talk about your day.", status: "planned" },
 { title: "Beginner Grammar", text: "Verbs, gender and sentence building.", status: "partial", lessons: [1, 6], note: "Grammar notes appear inside each lesson." },
 { title: "Real-Life Conversations", text: "Longer, natural dialogues.", status: "planned" }
];
export const numbers = [
 [0, "zéro", "zay-ROH"], [1, "un", "uhn"], [2, "deux", "duh"], [3, "trois", "trwah"], [4, "quatre", "KAH-truh"], [5, "cinq", "sank"],
 [6, "six", "sees"], [7, "sept", "set"], [8, "huit", "weet"], [9, "neuf", "nuf"], [10, "dix", "dees"], [11, "onze", "ohnz"],
 [12, "douze", "dooz"], [13, "treize", "trehz"], [14, "quatorze", "kah-TORZ"], [15, "quinze", "kanz"], [16, "seize", "sehz"],
 [17, "dix-sept", "dee-SET"], [18, "dix-huit", "dee-ZWEET"], [19, "dix-neuf", "deez-NUF"], [20, "vingt", "van"]
];
export const sounds = [
 { t: "Silent final letters", b: "Most final consonants are not pronounced: petit, vous, Paris, trop. The common exceptions are c, r, f and l (as in “careful”).", e: "vous → “voo”, Paris → “pah-REE”" },
 { t: "Accents change the vowel", b: "é sounds like “ay” in “day”, è and ê like “eh” in “bed”. The cedilla in ç makes a soft “s”. Accents never change which syllable is stressed, only the vowel sound.", e: "café, très, ça va" },
 { t: "Nasal vowels", b: "In an, en, on, in and un, the vowel is breathed through the nose and the n is not pronounced as a separate sound.", e: "bon, croissant, pain, un" },
 { t: "The French R", b: "R comes from the back of the throat, a little like a soft gargle. Do not roll it with your tongue.", e: "rien, merci, Paris" },
 { t: "The sound “u”", b: "Say “ee” and round your lips as if saying “oo”. English has no exact equivalent.", e: "tu, rue, du jus" },
 { t: "Liaison", b: "A normally silent final consonant is sometimes pronounced when the next word starts with a vowel, linking the words together.", e: "vous allez → “voo zah-lay”" },
 { t: "Rhythm", b: "French has almost no stressed syllables. Give every syllable about the same length, with a slight lift on the last syllable of a phrase.", e: "bon-JOUR, mer-CI" }
];
