// Course 2: French Sounds Starter. Five short lessons on spelling, accents and the sounds that surprise English speakers.
import { D, S, V, G, mc, fill, lesson } from "./course-tools.js";
const C = "french-sounds-starter";
const base = { topics: ["Absolute Beginner", "Vocabulary", "Listening and Conversation"] };
export const soundsLessons = [
lesson(C, 1, {
 ...base, id: "accents-and-the-alphabet", title: "Accents and the Alphabet", fr: "Les accents et l'alphabet", minutes: 8, art: { emoji: "🔤" },
 description: "Learn the letter names, spell your name aloud and recognise the five French accents.",
 objectives: ["Say the French letter names and spell a word", "Ask Comment ça s'écrit ?", "Recognise é, è, ê, ç and ë"],
 intro: "Marinette asks Adrien to spell his name. Spelling aloud is useful at hotels, on the phone and at the doctor's.",
 dialogue: [
  D("Marinette", "Comment ça s'écrit, Adrien ?", "How do you spell that, Adrien?"),
  D("Adrien", "A, D, R, I, E, N.", "A, D, R, I, E, N."),
  D("Marinette", "Et ton nom de famille ?", "And your surname?"),
  D("Adrien", "Martin. M, A, R, T, I, N.", "Martin. M, A, R, T, I, N."),
  D("Adrien", "Et toi ? Comment ça s'écrit, Marinette ?", "And you? How do you spell Marinette?"),
  D("Marinette", "M, A, R, I, N, E, T, T, E. Il y a deux T.", "M, A, R, I, N, E, T, T, E. There are two Ts."),
  D("Adrien", "Il y a un accent ?", "Is there an accent?"),
  D("Marinette", "Non. Mais « café » s'écrit avec un é : un accent aigu.", "No. But “café” is written with an é: an acute accent.")
 ],
 vocab: [
  V("comment ça s'écrit ?", "how do you spell that?", "koh-mahn sah say-KREE", "Sounds & Spelling", "Comment ça s'écrit, Adrien ?", "How do you spell that, Adrien?"),
  V("une lettre", "a letter", "ewn LEH-truh", "Sounds & Spelling", "Il y a six lettres.", "There are six letters."),
  V("l'alphabet", "the alphabet", "lahl-fah-BEH", "Sounds & Spelling", "L'alphabet a vingt-six lettres.", "The alphabet has twenty-six letters."),
  V("un accent aigu (é)", "an acute accent", "uhn ahk-SAHN eh-GEW", "Sounds & Spelling", "Café s'écrit avec un accent aigu.", "Café is written with an acute accent."),
  V("un accent grave (è, à)", "a grave accent", "uhn ahk-SAHN GRAHV", "Sounds & Spelling", "Très a un accent grave.", "Très has a grave accent."),
  V("un accent circonflexe (ê)", "a circumflex accent", "uhn ahk-SAHN seer-kohn-FLEX", "Sounds & Spelling", "Fête a un accent circonflexe.", "Fête has a circumflex accent."),
  V("une cédille (ç)", "a cedilla", "ewn say-DEEY", "Sounds & Spelling", "Garçon s'écrit avec une cédille.", "Garçon is written with a cedilla."),
  V("un nom de famille", "a surname", "uhn nohm duh fah-MEEY", "Introductions", "Mon nom de famille est Martin.", "My surname is Martin.")
 ],
 grammar: [
  G("The French letter names", "A (ah), B (bay), C (say), D (day), E (uh), F (eff), G (zhay), H (ash), I (ee), J (zhee), K (kah), L (ell), M (emm), N (enn), O (oh), P (pay), Q (kew), R (air), S (ess), T (tay), U (ew), V (vay), W (doo-bluh-VAY), X (eeks), Y (ee-GREK), Z (zed). Practise by spelling your own name.", ["A, D, R, I, E, N", "ah, day, air, ee, uh, enn"]),
  G("What accents do", "Accents change how a letter sounds. É sounds like “ay” (café). È and ê sound like “eh” (très, fête). Ç sounds like “s” before a, o or u (garçon). The accent on à only separates words: a (has) and à (to) sound the same, as do ou (or) and où (where).", ["un café", "a coffee — say “kah-FAY”"], ["un garçon", "a boy — say “gar-SOHN”"]),
  G("Double letters", "When spelling, say deux before a double letter: deux T. The doubled consonant is still pronounced just once in normal speech.", ["Il y a deux T.", "There are two Ts."])
 ],
 quiz: [
  mc("Which symbol is a “cédille”?", "ç", ["é", "ë", "ê"], "The cedilla is the small hook under the c."),
  mc("How is “é” pronounced?", "Like “ay” in “day”", ["Like “ee” in “see”", "Like “uh” in “cut”"], "É is a closed “ay” sound."),
  fill("Complete: Comment ça s'___ ?", "écrit", "“is written”", "Comment ça s'écrit ? = How do you spell that?"),
  mc("The letter ç sounds like…", "s", ["k", "ch", "z"], "Garçon is “gar-SOHN”."),
  mc("What does “Il y a deux T” mean?", "There are two Ts", ["It has two accents", "It has two letters"], "Deux T = two Ts.")
 ]
}),
lesson(C, 2, {
 ...base, id: "silent-letters-and-liaison", title: "Silent Letters and Liaison", fr: "Les lettres muettes et la liaison", minutes: 8, art: { emoji: "🤫" },
 description: "Learn why many final letters are silent and how liaison links words together.",
 objectives: ["Know that most final consonants are silent", "Remember the exceptions: c, r, f, l", "Hear liaison in les amis and vous avez"],
 intro: "Three friends arrive at a restaurant. Their short conversation is full of silent letters and liaison.",
 dialogue: [
  D("Marinette", "Bonjour ! Vous êtes combien ?", "Hello! How many are you?"),
  D("Adrien", "Nous sommes trois amis.", "There are three of us friends."),
  D("Marinette", "Entrez, les amis ! Il y a une table ici.", "Come in, friends! There's a table here."),
  D("Adrien", "Merci. Nous avons très faim !", "Thanks. We're very hungry!"),
  D("Marinette", "Vous avez de la chance. La cuisine est ouverte.", "You're lucky. The kitchen is open.")
 ],
 vocab: [
  V("les amis", "the friends", "lay zah-MEE", "Sounds & Spelling", "Entrez, les amis !", "Come in, friends!"),
  V("trois amis", "three friends", "trwah zah-MEE", "Sounds & Spelling", "Nous sommes trois amis.", "There are three of us friends."),
  V("vous avez", "you have", "voo zah-VAY", "Common Verbs", "Vous avez de la chance.", "You're lucky."),
  V("nous avons", "we have", "noo zah-VOHN", "Common Verbs", "Nous avons très faim.", "We're very hungry."),
  V("petit", "small", "puh-TEE", "Sounds & Spelling", "Un petit café, s'il vous plaît.", "A small coffee, please."),
  V("beaucoup", "a lot / very much", "boh-KOO", "Everyday Expressions", "Merci beaucoup !", "Thank you very much!"),
  V("très", "very", "TREH", "Everyday Expressions", "C'est très bon !", "It's very good!"),
  V("un hôtel", "a hotel", "uhn oh-TEL", "Travel", "Il y a un hôtel ici.", "There is a hotel here.")
 ],
 grammar: [
  G("Final consonants are usually silent", "In French the last consonant of a word is often not pronounced: petit, grand, beaucoup, très, vous, trop. Read the word without that last letter and you are usually right.", ["petit", "say “puh-TEE”, not “puh-TEET”"], ["très", "say “TREH”"]),
  G("The exceptions: c, r, f, l", "The letters in the word CaReFuL are often pronounced at the end of a word: sac, bonjour, neuf, hôtel. This is a handy rule of thumb, not a law, so keep listening to real French.", ["bonjour", "the r is pronounced"], ["un hôtel", "the l is pronounced"]),
  G("Liaison", "A silent final consonant can come back when the next word starts with a vowel sound. That link is called liaison. S and x sound like z (les amis), n stays n (un ami) and t stays t (petit ami).", ["les amis", "lay zah-MEE"], ["vous avez", "voo zah-VAY"])
 ],
 quiz: [
  mc("Is the final t in “petit” pronounced?", "No, it is silent", ["Yes, always", "Only before a vowel"], "Petit is “puh-TEE”."),
  mc("Which word ends with a pronounced consonant?", "bonjour", ["petit", "très", "beaucoup"], "R is one of the CaReFuL letters."),
  mc("Which letters are easy to remember with the word CaReFuL?", "c, r, f, l", ["a, e, i, o", "b, d, p, t"], "Final c, r, f and l are often pronounced."),
  fill("In “vous avez”, the s sounds like the letter ___.", "z", "a buzzing sound", "Liaison turns s into z: voo-zah-VAY."),
  mc("Liaison happens before…", "a word that starts with a vowel sound", ["any word", "a word that starts with c"], "The silent consonant comes back before a vowel sound.")
 ]
}),
lesson(C, 3, {
 ...base, id: "nasal-vowels", title: "Nasal Vowels", fr: "Les voyelles nasales", minutes: 8, art: { emoji: "👃" },
 description: "Master the three nasal vowel sounds you hear in pain, bon and enfant.",
 objectives: ["Explain what a nasal vowel is", "Say an/en, on and in/ain correctly", "Tell bon from bonne"],
 intro: "At the bakery, nearly every word has a nasal vowel. Say each line aloud and let some air go through your nose.",
 dialogue: [
  D("Marinette", "Bonjour ! Un pain, s'il vous plaît.", "Hello! A loaf of bread, please."),
  D("Le boulanger", "Bonjour ! Un grand pain ou un petit ?", "Hello! A big loaf or a small one?"),
  D("Marinette", "Un pain blanc, s'il vous plaît.", "A white loaf, please."),
  D("Le boulanger", "Et avec ça ?", "And with that?"),
  D("Marinette", "Un croissant et un flan.", "A croissant and a flan."),
  D("Adrien", "Mmm, c'est bon !", "Mmm, it's good!"),
  D("Le boulanger", "Voilà. Ça fait cinq euros vingt.", "Here you go. That's five euros twenty.")
 ],
 vocab: [
  V("un pain", "a loaf of bread", "uhn PAN", "Food & Drink", "Un pain, s'il vous plaît.", "A loaf of bread, please."),
  V("blanc", "white", "BLAHN", "Food & Drink", "Un pain blanc.", "A white loaf."),
  V("bon", "good", "BOHN", "Everyday Expressions", "C'est bon !", "It's good!"),
  V("un croissant", "a croissant", "uhn krwah-SAHN", "Food & Drink", "Un croissant, s'il vous plaît.", "A croissant, please."),
  V("un flan", "a custard tart", "uhn FLAHN", "Food & Drink", "Un flan, s'il vous plaît.", "A custard tart, please."),
  V("vingt", "twenty", "VAN", "Numbers", "Ça fait vingt euros.", "That's twenty euros."),
  V("cinq", "five", "SANK", "Numbers", "Cinq euros vingt.", "Five euros twenty."),
  V("maintenant", "now", "man-tuh-NAHN", "Everyday Expressions", "Maintenant, un café !", "Now, a coffee!")
 ],
 grammar: [
  G("What is a nasal vowel?", "In a nasal vowel the air goes through your nose and your mouth at the same time. The letter n or m after the vowel is not pronounced as a separate n. Say “bon” and the n disappears: you only hear a nasal “oh”.", ["bon", "nasal “oh” — BOHN"], ["pain", "nasal “a” — PAN"]),
  G("Three main sounds", "An and en sound like a nasal “ah” (enfant, croissant). On sounds like a nasal “oh” (bon, maison). In, ain and ein sound like a nasal “a” as in “can” (pain, vingt, demain). Un is close to in.", ["un enfant", "a child"], ["demain", "tomorrow"], ["un garçon", "a boy"]),
  G("When the n is NOT nasal", "If the n is doubled or followed by a vowel, the vowel is not nasal and the n is pronounced: bon (BOHN) but bonne (BUN); un (uhn) but une (ewn). That difference often marks masculine and feminine.", ["bon / bonne", "BOHN / BUN"], ["un / une", "uhn / ewn"])
 ],
 quiz: [
  mc("In “pain”, what happens to the n?", "It nasalises the vowel and is not pronounced", ["It is pronounced strongly", "It is pronounced like m"], "The n only makes the vowel nasal."),
  mc("Which word has a nasal vowel?", "bon", ["bonne", "une", "banane"], "Bonne has a doubled n, so the vowel is not nasal."),
  mc("Roughly how is “vingt” pronounced?", "van", ["vingt, with a hard t", "veent"], "Vingt is a nasal “van”, with no t."),
  fill("In “bonne”, the vowel is NOT ___.", "nasal", "it is the opposite of oral", "The doubled n keeps the vowel oral."),
  mc("Which spelling gives the nasal “ah” sound?", "an / en", ["on", "in"], "Croissant and enfant both have it.")
 ]
}),
lesson(C, 4, {
 ...base, id: "the-french-u-and-r", title: "The French U and R", fr: "Le u et le r", minutes: 8, art: { emoji: "👄" },
 description: "Practise two sounds that English does not have: the French u and the French r.",
 objectives: ["Tell u (tu) from ou (tout)", "Make the French r at the back of the throat", "Use the commands écoute, dis and répète"],
 intro: "Adrien struggles with “tu” and “rue”. Marinette coaches him step by step.",
 dialogue: [
  D("Marinette", "Écoute : tu.", "Listen: tu."),
  D("Adrien", "Tou ?", "Too?"),
  D("Marinette", "Non, pas « tou ». Dis « i » avec les lèvres rondes : tu.", "No, not “too”. Say “ee” with rounded lips: tu."),
  D("Adrien", "Tu. Tu. C'est mieux ?", "Tu. Tu. Is that better?"),
  D("Marinette", "Oui ! Maintenant, la rue.", "Yes! Now, la rue."),
  D("Adrien", "La rue… Le r, c'est difficile !", "La rue… The r is difficult!"),
  D("Marinette", "Le r est dans la gorge. Répète : rouge, merci, très bien.", "The r is in the throat. Repeat: rouge, merci, très bien."),
  D("Adrien", "Rouge. Merci. Très bien !", "Rouge. Merci. Très bien!")
 ],
 vocab: [
  V("tu", "you (to a friend)", "TEW", "Sounds & Spelling", "Tu parles français.", "You speak French."),
  V("tout", "all / everything", "TOO", "Sounds & Spelling", "Tout est bon.", "Everything is good."),
  V("une rue", "a street", "ewn REW", "Directions", "La rue est petite.", "The street is small."),
  V("une roue", "a wheel", "ewn ROO", "Sounds & Spelling", "La roue est rouge.", "The wheel is red."),
  V("rouge", "red", "ROOZH", "Sounds & Spelling", "Une rue rouge.", "A red street."),
  V("salut", "hi / bye (informal)", "sah-LEW", "Greetings", "Salut, Marinette !", "Hi, Marinette!"),
  V("la gorge", "the throat", "lah GORZH", "Sounds & Spelling", "Le r est dans la gorge.", "The r is in the throat."),
  V("difficile", "difficult", "dee-fee-SEEL", "Everyday Expressions", "Le r est difficile.", "The r is difficult.")
 ],
 grammar: [
  G("u is not ou", "French has two different sounds. U is made by saying “ee” and rounding your lips as if for “oo”: tu, rue, salut. Ou is the plain English “oo”: tout, rouge, bonjour. The difference changes the meaning: rue (street) and roue (wheel).", ["tu / tout", "TEW / TOO"], ["rue / roue", "REW / ROO"]),
  G("The French r", "The French r is made at the back of your throat, like a soft gargle. Start by saying “k” or “g” and then relax the movement so air still passes. Do not roll it with your tongue.", ["rouge", "red"], ["merci", "thank you"]),
  G("Short commands for learners", "To tell a friend to do something, use the tu command: écoute (listen), dis (say), répète (repeat). They are very useful when practising.", ["Écoute !", "Listen!"], ["Répète : tu.", "Repeat: tu."])
 ],
 quiz: [
  mc("Which spelling makes the “ew” sound (lips rounded, tongue forward)?", "u", ["ou", "o"], "U is the rounded “ee” sound."),
  mc("What does “une roue” mean?", "A wheel", ["A street", "A red car"], "Rue is a street, roue is a wheel."),
  mc("Where is the French r made?", "At the back of the throat", ["With the tip of the tongue", "With the lips"], "It is a throat sound."),
  fill("tu sounds like “ew”, but ___ sounds like “oo”.", "ou", "two letters", "Ou is the “oo” sound: tout, rouge."),
  mc("Which command means “repeat”?", "Répète", ["Écoute", "Dis"], "Répète = repeat.")
 ]
}),
lesson(C, 5, {
 ...base, id: "reading-signs-and-menus", title: "Reading Signs and Menus", fr: "Lire les panneaux et les menus", minutes: 9, art: { emoji: "🪧" },
 description: "Use everything you know about French sounds to read signs and a short menu.",
 objectives: ["Read ouvert, fermé, poussez, tirez and sortie", "Read a short menu aloud", "Apply the spelling rules from this course"],
 intro: "Adrien and Marinette walk down a street. You can read along with them using the rules from the first four lessons.",
 dialogue: [
  D("Adrien", "Regarde : « Boulangerie ». On entre ?", "Look: “Boulangerie”. Shall we go in?"),
  D("Marinette", "Non, c'est fermé. Regarde le panneau : « Ouvert à huit heures ».", "No, it's closed. Look at the sign: “Open at eight o'clock”."),
  D("Adrien", "Alors, le café en face. La porte : « Poussez » ou « Tirez » ?", "Then the café opposite. The door: “Push” or “Pull”?"),
  D("Marinette", "Poussez !", "Push!"),
  D("Adrien", "Au menu : « soupe du jour », « fromage », « tarte aux pommes ».", "On the menu: “soup of the day”, “cheese”, “apple tart”."),
  D("Marinette", "Je prends la soupe du jour. Et toi ?", "I'll have the soup of the day. And you?"),
  D("Adrien", "Moi, la tarte aux pommes. Où sont les toilettes ?", "Me, the apple tart. Where are the toilets?"),
  D("Marinette", "Au fond, à gauche. Regarde : « Toilettes ».", "At the back, on the left. Look: “Toilettes”.")
 ],
 vocab: [
  V("ouvert", "open", "oo-VEHR", "Travel", "Le café est ouvert.", "The café is open."),
  V("fermé", "closed", "fehr-MAY", "Travel", "La boulangerie est fermée.", "The bakery is closed."),
  V("poussez", "push", "poo-SAY", "Travel", "Poussez la porte.", "Push the door."),
  V("tirez", "pull", "tee-RAY", "Travel", "Tirez, s'il vous plaît.", "Pull, please."),
  V("la sortie", "the exit", "lah sor-TEE", "Travel", "La sortie est à gauche.", "The exit is on the left."),
  V("l'entrée", "the entrance / the starter", "lahn-TRAY", "Travel", "L'entrée est à droite.", "The entrance is on the right."),
  V("les toilettes", "the toilets", "lay twah-LET", "Travel", "Où sont les toilettes ?", "Where are the toilets?"),
  V("la soupe du jour", "the soup of the day", "lah SOOP dew ZHOOR", "Food & Drink", "Je prends la soupe du jour.", "I'll have the soup of the day.")
 ],
 grammar: [
  G("Read by the rules", "Put the rules together. In poussez, ou is “oo” and the final z is silent, so you say poo-SAY. In fermé, the é is “ay” and the m is pronounced: fehr-MAY. In sortie, the final e is silent: sor-TEE. Silent endings, accents and nasal vowels do most of the work.", ["poussez", "poo-SAY"], ["fermé", "fehr-MAY"]),
  G("Words that look like English", "Many French words look like English: restaurant, hôtel, musée, information, menu. Their meaning is easy to guess, but say them the French way: hôtel is oh-TEL, musée is mew-ZAY.", ["un restaurant", "a restaurant"], ["un musée", "a museum"]),
  G("Signs speak to you with vous", "Signs and notices often use the vous command form: poussez, tirez, entrez, attendez. Recognise the -ez ending and you will understand many instructions.", ["Entrez !", "Come in!"], ["Poussez.", "Push."])
 ],
 quiz: [
  mc("What does “fermé” mean?", "Closed", ["Open", "Exit"], "Fermé = closed, ouvert = open."),
  mc("How do you read “poussez”?", "poo-SAY", ["poo-SEZ", "pows-ZEZ"], "Ou is “oo” and the final z is silent."),
  mc("A sign over a door says “Sortie”. What is it?", "The exit", ["The entrance", "The toilets"], "Sortie = exit."),
  fill("Ouvert is the opposite of ___.", "fermé", "closed", "Ouvert (open) and fermé (closed)."),
  mc("Which word means “pull”?", "Tirez", ["Poussez", "Entrez"], "Tirez = pull, poussez = push.")
 ]
})
];
