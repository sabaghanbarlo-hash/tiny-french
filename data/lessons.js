// One object per lesson. Add a lesson = copy an object, give it a new id + number, run `npm run build`.
// Dialogue lines come from the real Tiny French scripts (tiny-french-story repo). Only lessons with a `video` have a video.
// art: { img: "story-cafe" } uses assets/img/story-cafe.jpg, or { emoji: "✈️" } draws a tile.
export const lessons = [
{
 id: "meeting-for-the-first-time", number: 1, title: "Meeting for the First Time", fr: "Faire connaissance",
 type: "Short dialogue", level: "Absolute beginner", topics: ["Absolute Beginner", "Greetings and Introductions", "Listening and Conversation"],
 minutes: 6, art: { img: "tiny-french-characters", ext: "svg", alt: "Tiny French café scene" },
 description: "Say hello, tell someone your name and offer a coffee in your very first French conversation.",
 objectives: ["Greet someone with “Bonjour”", "Say “My name is…” with Je m'appelle", "Be polite with s'il te plaît and merci beaucoup"],
 intro: "Marinette and Adrien meet in a café. It is the shortest, friendliest first conversation you can have in French.",
 video: { src: "assets/video/meeting-for-the-first-time.mp4", poster: "assets/img/story-cafe.jpg", duration: "PT25S", uploaded: "2026-10-27", note: "Vertical 9:16 lesson video with French audio and subtitles." },
 instagram: "",
 dialogue: [
  { who: "Adrien", fr: "Bonjour !", en: "Hello!" },
  { who: "Marinette", fr: "Bonjour ! Je m'appelle Marinette.", en: "Hello! My name is Marinette." },
  { who: "Adrien", fr: "Enchanté ! Je m'appelle Adrien.", en: "Nice to meet you! My name is Adrien." },
  { who: "Marinette", fr: "Enchantée ! Tu veux un café ?", en: "Nice to meet you! Do you want a coffee?" },
  { who: "Adrien", fr: "Oui, un café, s'il te plaît.", en: "Yes, a coffee, please." },
  { who: "Marinette", fr: "Voilà !", en: "Here you go!" },
  { who: "Adrien", fr: "Merci beaucoup !", en: "Thank you very much!" }
 ],
 vocab: [
  { fr: "bonjour", en: "hello / good day", say: "bohn-ZHOOR", cat: "Greetings", ex: "Bonjour ! Je m'appelle Marinette.", exEn: "Hello! My name is Marinette." },
  { fr: "je m'appelle", en: "my name is (literally “I call myself”)", say: "zhuh mah-PEL", cat: "Introductions", ex: "Je m'appelle Adrien.", exEn: "My name is Adrien." },
  { fr: "enchanté / enchantée", en: "nice to meet you", say: "ahn-shahn-TAY", cat: "Introductions", ex: "Enchanté ! Je m'appelle Adrien.", exEn: "Nice to meet you! My name is Adrien." },
  { fr: "tu veux… ?", en: "do you want…? (to a friend)", say: "tew VUH", cat: "Everyday Expressions", ex: "Tu veux un café ?", exEn: "Do you want a coffee?" },
  { fr: "un café", en: "a coffee", say: "uhn kah-FAY", cat: "Food & Drink", ex: "Oui, un café, s'il te plaît.", exEn: "Yes, a coffee, please." },
  { fr: "s'il te plaît", en: "please (to a friend)", say: "seel tuh PLEH", cat: "Everyday Expressions", ex: "Un café, s'il te plaît.", exEn: "A coffee, please." },
  { fr: "voilà", en: "here you go / there it is", say: "vwah-LAH", cat: "Everyday Expressions", ex: "Voilà ! Un café pour toi.", exEn: "Here you go! A coffee for you." },
  { fr: "merci beaucoup", en: "thank you very much", say: "mehr-SEE boh-KOO", cat: "Everyday Expressions", ex: "Merci beaucoup !", exEn: "Thank you very much!" }
 ],
 grammar: [
  { title: "Je m'appelle + name", body: "To say your name, use je m'appelle followed by the name. It literally means “I call myself”, but French speakers use it exactly like “My name is…”. Je becomes j' before a vowel, and me becomes m' before the a of appelle.", examples: [{ fr: "Je m'appelle Marinette.", en: "My name is Marinette." }, { fr: "Je m'appelle Adrien.", en: "My name is Adrien." }] },
  { title: "Enchanté or enchantée?", body: "Many French adjectives change spelling for a female speaker: she adds an -e. Adrien says enchanté and Marinette says enchantée. The two sound exactly the same, so you only need to remember the spelling when you write.", examples: [{ fr: "Enchanté !", en: "Nice to meet you! (said by a man)" }, { fr: "Enchantée !", en: "Nice to meet you! (said by a woman)" }] },
  { title: "Tu veux… ? — asking a friend", body: "Tu veux… ? means “Do you want…?”. Tu is the informal “you”, used with friends, family and people your age. In French you can turn a statement into a question just by raising your voice at the end.", examples: [{ fr: "Tu veux un café ?", en: "Do you want a coffee?" }, { fr: "Tu veux un croissant ?", en: "Do you want a croissant?" }] }
 ],
 quiz: [
  { type: "mc", q: "What does “Je m'appelle Adrien” mean?", options: ["My name is Adrien", "I like Adrien", "I am hungry, Adrien", "Hello, Adrien"], answer: "My name is Adrien", explain: "Je m'appelle is the everyday way to say “My name is…”." },
  { type: "mc", q: "How do you say “thank you very much”?", options: ["Merci beaucoup", "S'il te plaît", "Enchanté", "Voilà"], answer: "Merci beaucoup", explain: "Merci is “thank you” and beaucoup means “very much”." },
  { type: "fill", q: "Complete the sentence: Je ___ Marinette.", hint: "“my name is” — two words become one: m'…", answer: "m'appelle", explain: "Je m'appelle Marinette = My name is Marinette." },
  { type: "mc", q: "Marinette says “Enchantée” but Adrien says “Enchanté”. Why?", options: ["A woman adds -e in writing; the sound stays the same", "Marinette is older than Adrien", "They are saying two different words", "One of them made a mistake"], answer: "A woman adds -e in writing; the sound stays the same", explain: "Enchanté (man) and enchantée (woman) are pronounced the same." },
  { type: "mc", q: "Marinette hands Adrien his coffee and says “Voilà !”. What does that mean?", options: ["Here you go!", "Goodbye!", "I'm sorry.", "Please."], answer: "Here you go!", explain: "Voilà is what you say when you hand something over." },
  { type: "mc", q: "What does “Tu veux un café ?” mean?", options: ["Do you want a coffee?", "I want a coffee.", "Here is a coffee.", "A coffee, please."], answer: "Do you want a coffee?", explain: "Tu veux… ? asks a friend what they want." }
 ]
},
{
 id: "a-la-boulangerie", number: 2, title: "At the Bakery", fr: "Marinette et Adrien à la boulangerie",
 type: "Story", level: "Absolute beginner", topics: ["Absolute Beginner", "Everyday French", "Food and Cafés"],
 minutes: 6, art: { img: "tiny-french-characters", ext: "svg", alt: "Tiny French bakery scene" },
 description: "Offer a croissant, accept it politely and say thank you — the three phrases you will use in every French bakery.",
 objectives: ["Offer something with Tu veux… ?", "Accept with Oui, s'il te plaît", "Say thank you and you're welcome (merci, de rien)"],
 intro: "Marinette buys a croissant for Adrien. Watch how polite French is built from a few small words.",
 video: null, instagram: "",
 dialogue: [
  { who: "Marinette", fr: "Bonjour ! Tu veux un croissant ?", en: "Hello! Do you want a croissant?" },
  { who: "Adrien", fr: "Oui, s'il te plaît !", en: "Yes, please!" },
  { who: "Marinette", fr: "Voilà !", en: "Here you go!" },
  { who: "Adrien", fr: "Merci beaucoup !", en: "Thank you very much!" },
  { who: "Marinette", fr: "De rien !", en: "You're welcome!" }
 ],
 vocab: [
  { fr: "bonjour", en: "hello / good day", say: "bohn-ZHOOR", cat: "Greetings", ex: "Bonjour, Marinette !", exEn: "Hello, Marinette!" },
  { fr: "un croissant", en: "a croissant", say: "uhn krwah-SAHN", cat: "Food & Drink", ex: "Tu veux un croissant ?", exEn: "Do you want a croissant?" },
  { fr: "oui", en: "yes", say: "wee", cat: "Everyday Expressions", ex: "Oui, s'il te plaît !", exEn: "Yes, please!" },
  { fr: "merci", en: "thank you", say: "mehr-SEE", cat: "Everyday Expressions", ex: "Merci, Marinette !", exEn: "Thank you, Marinette!" },
  { fr: "de rien", en: "you're welcome (literally “of nothing”)", say: "duh ree-AHN", cat: "Everyday Expressions", ex: "Merci ! — De rien !", exEn: "Thank you! — You're welcome!" },
  { fr: "s'il te plaît", en: "please (to a friend)", say: "seel tuh PLEH", cat: "Everyday Expressions", ex: "Un croissant, s'il te plaît.", exEn: "A croissant, please." }
 ],
 grammar: [
  { title: "Tu veux… ? — Do you want…?", body: "Offer something to a friend with Tu veux… ? and the thing you are offering. Un is the word for “a” in front of masculine nouns, and croissant is masculine.", examples: [{ fr: "Tu veux un café ?", en: "Do you want a coffee?" }, { fr: "Tu veux un croissant ?", en: "Do you want a croissant?" }] },
  { title: "Being polite: merci, de rien", body: "Merci means “thank you” and merci beaucoup means “thank you very much”. The natural reply is de rien, “you're welcome”.", examples: [{ fr: "Merci beaucoup !", en: "Thank you very much!" }, { fr: "De rien !", en: "You're welcome!" }] }
 ],
 quiz: [
  { type: "mc", q: "What does “bonjour” mean?", options: ["Goodbye", "Hello", "Sorry", "Please"], answer: "Hello", explain: "Bonjour means “hello” or “good day”." },
  { type: "fill", q: "Complete the question: Tu ___ un croissant ?", hint: "“want” — tu ___", answer: "veux", explain: "Tu veux un croissant ? = Do you want a croissant?" },
  { type: "mc", q: "How do you say “You're welcome”?", options: ["De rien", "Bonjour", "Oui", "S'il te plaît"], answer: "De rien", explain: "De rien is the standard reply to merci." },
  { type: "mc", q: "What does “Oui, s'il te plaît !” mean?", options: ["Yes, please!", "No, thank you!", "Hello, please!", "Yes, thank you!"], answer: "Yes, please!", explain: "Oui = yes, s'il te plaît = please." }
 ]
},
{
 id: "un-croissant-pour-adrien", number: 3, title: "A Croissant for Adrien", fr: "Un croissant pour Adrien",
 type: "Story", level: "Absolute beginner", topics: ["Absolute Beginner", "Everyday French", "Food and Cafés", "Listening and Conversation"],
 minutes: 8, art: { img: "tiny-french-characters", ext: "svg", alt: "Tiny French lesson cover: Croissant Time" },
 description: "The last croissant is gone! Learn to order politely, say you are hungry and share with a friend.",
 objectives: ["Order politely with s'il vous plaît", "Say “there is no more…” with Il n'y a plus de…", "Tell tu (friends) and vous (shops) apart"],
 intro: "Adrien arrives at the bakery just too late. Marinette shares her croissant, and you learn how polite French sounds in a real shop.",
 video: null, instagram: "",
 dialogue: [
  { who: "Marinette", fr: "Bonjour ! Un croissant, s'il vous plaît.", en: "Hello! A croissant, please." },
  { who: "Adrien", fr: "Moi aussi ! Un croissant, s'il vous plaît.", en: "Me too! A croissant, please." },
  { who: "Adrien", fr: "Oh non ! Il n'y a plus de croissants.", en: "Oh no! There are no more croissants." },
  { who: "Marinette", fr: "Ça va, Adrien ?", en: "Are you OK, Adrien?" },
  { who: "Adrien", fr: "J'ai faim !", en: "I'm hungry!" },
  { who: "Marinette", fr: "Tiens ! Un croissant pour toi.", en: "Here you go! A croissant for you." },
  { who: "Adrien", fr: "Merci beaucoup, Marinette !", en: "Thank you very much, Marinette!" },
  { who: "Adrien", fr: "Mmm, il est délicieux !", en: "Mmm, it's delicious!" },
  { who: "Marinette", fr: "De rien ! À demain !", en: "You're welcome! See you tomorrow!" }
 ],
 vocab: [
  { fr: "s'il vous plaît", en: "please (polite, to a shop assistant or stranger)", say: "seel voo PLEH", cat: "Everyday Expressions", ex: "Un croissant, s'il vous plaît.", exEn: "A croissant, please." },
  { fr: "il n'y a plus de…", en: "there is no more…", say: "eel nee ah plew duh", cat: "Everyday Expressions", ex: "Il n'y a plus de croissants.", exEn: "There are no more croissants." },
  { fr: "j'ai faim", en: "I'm hungry (literally “I have hunger”)", say: "zhay FAN", cat: "Everyday Expressions", ex: "J'ai faim !", exEn: "I'm hungry!" },
  { fr: "tiens", en: "here you go (to a friend)", say: "tee-AN", cat: "Everyday Expressions", ex: "Tiens ! Un croissant pour toi.", exEn: "Here you go! A croissant for you." },
  { fr: "délicieux", en: "delicious", say: "day-lee-SYUH", cat: "Food & Drink", ex: "Il est délicieux !", exEn: "It's delicious!" },
  { fr: "merci beaucoup", en: "thank you very much", say: "mehr-SEE boh-KOO", cat: "Everyday Expressions", ex: "Merci beaucoup, Marinette !", exEn: "Thank you very much, Marinette!" },
  { fr: "à demain", en: "see you tomorrow", say: "ah duh-MAN", cat: "Greetings", ex: "De rien ! À demain !", exEn: "You're welcome! See you tomorrow!" }
 ],
 grammar: [
  { title: "Il n'y a plus de + noun — there is no more…", body: "Use Il n'y a plus de… when something has run out. After plus, the word de (or d' before a vowel) replaces un/une/des, and the noun stays as it is.", examples: [{ fr: "Il n'y a plus de croissants.", en: "There are no more croissants." }, { fr: "Il n'y a plus de café.", en: "There is no more coffee." }] },
  { title: "Tu or vous?", body: "French has two ways to say “you”. Use tu with friends, family and children. Use vous with people you don't know, shop assistants and anyone you want to address respectfully. That is why Marinette says s'il vous plaît to the baker but tiens ! … pour toi to her friend Adrien.", examples: [{ fr: "Un croissant, s'il vous plaît.", en: "A croissant, please. (to the baker)" }, { fr: "Un croissant pour toi.", en: "A croissant for you. (to a friend)" }] }
 ],
 quiz: [
  { type: "mc", q: "What does “Il n'y a plus de croissants” mean?", options: ["There are no more croissants.", "There are many croissants.", "I want a croissant.", "The croissants are delicious."], answer: "There are no more croissants.", explain: "Il n'y a plus de… means “there is no more…”: the shop has run out." },
  { type: "mc", q: "Marinette says “s'il vous plaît” to the baker. Why “vous” and not “tu”?", options: ["The baker is someone she doesn't know, so she is polite", "The baker is a child", "Vous means “two croissants”", "Because it is faster"], answer: "The baker is someone she doesn't know, so she is polite", explain: "Vous is the polite “you”, used with shop staff and strangers." },
  { type: "fill", q: "Adrien says he is hungry: J'ai ___ !", hint: "hungry (literally “hunger”)", answer: "faim", explain: "J'ai faim = I'm hungry (literally “I have hunger”)." },
  { type: "mc", q: "How do you say “delicious”?", options: ["Délicieux", "Désolé", "Demain", "De rien"], answer: "Délicieux", explain: "Délicieux = delicious. Marinette's croissant is délicieux!" },
  { type: "fill", q: "Complete the sentence: Il n'y a plus ___ café.", hint: "the little word for “of” after plus", answer: "de", explain: "After plus we use de: Il n'y a plus de café." },
  { type: "mc", q: "What does “À demain !” mean?", options: ["See you tomorrow!", "Good night!", "Thank you!", "Good morning!"], answer: "See you tomorrow!", explain: "À demain literally means “until tomorrow”." }
 ]
},
{
 id: "une-journee-a-paris", number: 4, title: "A Day in Paris", fr: "Une journée à Paris",
 type: "Story", level: "Beginner (A1)", topics: ["Everyday French", "Travel French", "Food and Cafés", "Listening and Conversation"],
 minutes: 10, art: { img: "tiny-french-characters", ext: "svg", alt: "Tiny French Paris street scene" },
 description: "Follow Marinette and Adrien from a Paris street to the bakery, a café and the park. Greet a friend, order food and say goodbye.",
 objectives: ["Ask “How are you?” with Ça va ?", "Order with Je voudrais… and s'il vous plaît", "Point things out with Il y a… and Regarde !"],
 intro: "Four places, one friendly day. This longer story shows how the phrases from earlier lessons work together.",
 video: null, instagram: "",
 dialogue: [
  { scene: "In the street" },
  { who: "Marinette", fr: "Salut, Adrien !", en: "Hi, Adrien!" },
  { who: "Adrien", fr: "Salut, Marinette ! Ça va ?", en: "Hi, Marinette! How are you?" },
  { who: "Marinette", fr: "Ça va bien, merci !", en: "I'm fine, thank you!" },
  { who: "Adrien", fr: "J'ai faim. Allons à la boulangerie !", en: "I'm hungry. Let's go to the bakery!" },
  { scene: "At the bakery" },
  { who: "Adrien", fr: "Regarde ! Il y a des croissants.", en: "Look! There are croissants." },
  { who: "Marinette", fr: "Un croissant, s'il vous plaît.", en: "A croissant, please." },
  { who: "Adrien", fr: "Et un macaron, s'il vous plaît.", en: "And a macaron, please." },
  { who: "Adrien", fr: "Miam ! C'est délicieux.", en: "Yum! It's delicious." },
  { scene: "At the café" },
  { who: "Adrien", fr: "Je voudrais un café, s'il vous plaît.", en: "I would like a coffee, please." },
  { who: "Marinette", fr: "Merci !", en: "Thank you!" },
  { who: "Marinette", fr: "C'est très bon !", en: "It's very good!" },
  { scene: "In the park" },
  { who: "Marinette", fr: "Quelle belle journée !", en: "What a beautiful day!" },
  { who: "Adrien", fr: "À demain, Marinette !", en: "See you tomorrow, Marinette!" }
 ],
 vocab: [
  { fr: "salut", en: "hi / bye (informal)", say: "sah-LEW", cat: "Greetings", ex: "Salut, Adrien !", exEn: "Hi, Adrien!" },
  { fr: "ça va ?", en: "how are you? / is everything OK?", say: "sah VAH", cat: "Greetings", ex: "Salut, Marinette ! Ça va ?", exEn: "Hi, Marinette! How are you?" },
  { fr: "ça va bien", en: "I'm fine / I'm doing well", say: "sah vah BYAN", cat: "Greetings", ex: "Ça va bien, merci !", exEn: "I'm fine, thank you!" },
  { fr: "la boulangerie", en: "the bakery", say: "lah boo-lahn-zhuh-REE", cat: "Food & Drink", ex: "Allons à la boulangerie !", exEn: "Let's go to the bakery!" },
  { fr: "allons…", en: "let's go…", say: "ah-LOHN", cat: "Travel", ex: "Allons à la boulangerie !", exEn: "Let's go to the bakery!" },
  { fr: "il y a", en: "there is / there are", say: "eel ee AH", cat: "Everyday Expressions", ex: "Il y a des croissants.", exEn: "There are croissants." },
  { fr: "regarde !", en: "look! (to a friend)", say: "ruh-GARD", cat: "Everyday Expressions", ex: "Regarde ! Il y a des croissants.", exEn: "Look! There are croissants." },
  { fr: "je voudrais", en: "I would like", say: "zhuh voo-DREH", cat: "Everyday Expressions", ex: "Je voudrais un café.", exEn: "I would like a coffee." },
  { fr: "c'est très bon", en: "it's very good", say: "seh treh BOHN", cat: "Everyday Expressions", ex: "C'est très bon !", exEn: "It's very good!" },
  { fr: "quelle belle journée !", en: "what a beautiful day!", say: "kel bel zhoor-NAY", cat: "Everyday Expressions", ex: "Quelle belle journée !", exEn: "What a beautiful day!" },
  { fr: "à demain", en: "see you tomorrow", say: "ah duh-MAN", cat: "Greetings", ex: "À demain, Marinette !", exEn: "See you tomorrow, Marinette!" },
  { fr: "j'ai faim", en: "I'm hungry (literally “I have hunger”)", say: "zhay FAN", cat: "Everyday Expressions", ex: "J'ai faim. Allons à la boulangerie !", exEn: "I'm hungry. Let's go to the bakery!" }
 ],
 grammar: [
  { title: "Je voudrais + noun — I would like…", body: "Je voudrais is a softer, more polite way to ask for something than je veux (“I want”). It is the best phrase to use when you order in a café or shop. Add the thing you would like, then s'il vous plaît.", examples: [{ fr: "Je voudrais un café.", en: "I would like a coffee." }, { fr: "Je voudrais un croissant.", en: "I would like a croissant." }] },
  { title: "Il y a — there is / there are", body: "Il y a works for one thing or many things. Use des before a plural noun to mean “some”. You will hear Il y a… all the time when people describe a place.", examples: [{ fr: "Il y a des croissants.", en: "There are (some) croissants." }, { fr: "Il y a un café.", en: "There is a café." }] }
 ],
 quiz: [
  { type: "mc", q: "How do you politely ask for a coffee in a café?", options: ["Je voudrais un café, s'il vous plaît.", "Au revoir, un café.", "Bonjour, c'est un café.", "Tu veux un café, merci."], answer: "Je voudrais un café, s'il vous plaît.", explain: "Je voudrais means “I would like” and is the polite way to order." },
  { type: "mc", q: "Which phrase asks a friend “How are you?”", options: ["Ça va ?", "À demain !", "Regarde !", "C'est très bon !"], answer: "Ça va ?", explain: "Ça va ? is the everyday way to ask how someone is." },
  { type: "mc", q: "What does “Quelle belle journée !” mean?", options: ["What a beautiful day!", "What a good coffee!", "See you tomorrow!", "It's very good!"], answer: "What a beautiful day!", explain: "Journée means “day” and belle means “beautiful”." },
  { type: "fill", q: "Complete the goodbye: À ___, Marinette !", hint: "see you … (not today!)", answer: "demain", explain: "À demain = see you tomorrow." },
  { type: "mc", q: "What does “Il y a des croissants” mean?", options: ["There are croissants.", "I want croissants.", "The croissants are hot.", "Where are the croissants?"], answer: "There are croissants.", explain: "Il y a means “there is / there are”." },
  { type: "mc", q: "How do you say “Let's go to the bakery!”?", options: ["Allons à la boulangerie !", "Je voudrais la boulangerie !", "Regarde la boulangerie !", "Bonjour, boulangerie !"], answer: "Allons à la boulangerie !", explain: "Allons à… means “let's go to…”." }
 ]
},
{
 id: "at-the-restaurant", number: 5, title: "At the Restaurant", fr: "Au restaurant",
 type: "Short dialogue", level: "Beginner (A1)", topics: ["Food and Cafés", "Everyday French", "Travel French", "Listening and Conversation"],
 minutes: 7, art: { emoji: "🍽️", alt: "Restaurant lesson illustration" },
 description: "Ask for the menu, order soup and tea, and request the bill — a full restaurant visit in six lines.",
 objectives: ["Order food and drink with Je voudrais…", "Understand Et comme boisson ?", "Ask for the bill: L'addition, s'il vous plaît"],
 intro: "Adrien is the waiter and Marinette is the guest. Every line is something you can say in a real French restaurant.",
 video: null, instagram: "",
 dialogue: [
  { who: "Adrien", fr: "Bonjour ! Voici le menu.", en: "Hello! Here is the menu." },
  { who: "Marinette", fr: "Merci ! Je voudrais une soupe, s'il vous plaît.", en: "Thank you! I would like a soup, please." },
  { who: "Adrien", fr: "Et comme boisson ?", en: "And to drink?" },
  { who: "Marinette", fr: "Un thé, s'il vous plaît.", en: "A tea, please." },
  { who: "Adrien", fr: "Voilà ! Bon appétit !", en: "Here you go! Enjoy your meal!" },
  { who: "Marinette", fr: "Merci ! L'addition, s'il vous plaît !", en: "Thank you! The bill, please!" }
 ],
 vocab: [
  { fr: "le menu", en: "the menu", say: "luh muh-NEW", cat: "Food & Drink", ex: "Voici le menu.", exEn: "Here is the menu." },
  { fr: "voici", en: "here is / here are", say: "vwah-SEE", cat: "Everyday Expressions", ex: "Voici le menu.", exEn: "Here is the menu." },
  { fr: "je voudrais", en: "I would like", say: "zhuh voo-DREH", cat: "Everyday Expressions", ex: "Je voudrais une soupe.", exEn: "I would like a soup." },
  { fr: "une soupe", en: "a soup", say: "ewn SOOP", cat: "Food & Drink", ex: "Je voudrais une soupe, s'il vous plaît.", exEn: "I would like a soup, please." },
  { fr: "un thé", en: "a tea", say: "uhn TAY", cat: "Food & Drink", ex: "Un thé, s'il vous plaît.", exEn: "A tea, please." },
  { fr: "et comme boisson ?", en: "and to drink? (literally “and as a drink?”)", say: "ay kom bwah-SOHN", cat: "Food & Drink", ex: "Et comme boisson ?", exEn: "And to drink?" },
  { fr: "bon appétit", en: "enjoy your meal", say: "bohn ah-pay-TEE", cat: "Food & Drink", ex: "Voilà ! Bon appétit !", exEn: "Here you go! Enjoy your meal!" },
  { fr: "l'addition", en: "the bill", say: "lah-dee-SYOHN", cat: "Food & Drink", ex: "L'addition, s'il vous plaît !", exEn: "The bill, please!" },
  { fr: "s'il vous plaît", en: "please (polite)", say: "seel voo PLEH", cat: "Everyday Expressions", ex: "Un thé, s'il vous plaît.", exEn: "A tea, please." }
 ],
 grammar: [
  { title: "Ordering: Je voudrais + noun + s'il vous plaît", body: "This three-part pattern is the safest way to order anywhere in France. In a restaurant the waiter is a stranger, so you use the polite s'il vous plaît.", examples: [{ fr: "Je voudrais une soupe, s'il vous plaît.", en: "I would like a soup, please." }, { fr: "Je voudrais un thé, s'il vous plaît.", en: "I would like a tea, please." }] },
  { title: "Voici and voilà", body: "Voici means “here is” and is used when you present something. Voilà is similar, and also means “there you go” when you hand something over or finish a job.", examples: [{ fr: "Voici le menu.", en: "Here is the menu." }, { fr: "Voilà !", en: "Here you go!" }] }
 ],
 quiz: [
  { type: "mc", q: "What does “L'addition, s'il vous plaît !” mean?", options: ["The bill, please!", "The menu, please!", "A soup, please!", "Enjoy your meal!"], answer: "The bill, please!", explain: "L'addition is the bill you pay at the end of a meal." },
  { type: "mc", q: "How do you say “enjoy your meal”?", options: ["Bon appétit !", "Bon voyage !", "Bonne nuit !", "Bonjour !"], answer: "Bon appétit !", explain: "Bon appétit is said before a meal starts." },
  { type: "fill", q: "Complete the order: Je ___ une soupe, s'il vous plaît.", hint: "“I would like”", answer: "voudrais", explain: "Je voudrais = I would like." },
  { type: "mc", q: "The waiter asks “Et comme boisson ?”. What is he asking?", options: ["What would you like to drink?", "What would you like to eat?", "Would you like the bill?", "Are you hungry?"], answer: "What would you like to drink?", explain: "Une boisson is a drink." },
  { type: "mc", q: "What is “un thé”?", options: ["A tea", "A coffee", "A soup", "A menu"], answer: "A tea", explain: "Un thé = a tea." }
 ]
},
{
 id: "au-supermarche", number: 6, title: "At the Supermarket", fr: "Au supermarché avec Adrien",
 type: "Story", level: "Beginner (A1)", topics: ["Everyday French", "Travel French", "French Culture", "Vocabulary"],
 minutes: 8, art: { emoji: "🛒", alt: "Supermarket lesson illustration" },
 description: "Shop for a baguette and juice, then spot the Eiffel Tower. Learn je veux, du jus and why French says elle est belle for a tower.",
 objectives: ["Say what you want with Je veux…", "Check out with C'est tout ?", "Notice masculine and feminine words (un/une, il/elle)"],
 intro: "Marinette and Adrien go shopping, then enjoy their snack with a view of the Eiffel Tower.",
 video: null, instagram: "",
 dialogue: [
  { scene: "At the supermarket" },
  { who: "Marinette", fr: "Bonjour, Adrien ! On fait les courses ?", en: "Hello, Adrien! Shall we do the shopping?" },
  { who: "Adrien", fr: "Oui ! Je veux une baguette.", en: "Yes! I want a baguette." },
  { who: "Marinette", fr: "Moi, je veux du jus.", en: "Me, I want some juice." },
  { who: "Adrien", fr: "Voilà ! C'est tout ?", en: "There you go! Is that all?" },
  { who: "Marinette", fr: "Oui, c'est tout. Merci !", en: "Yes, that's all. Thank you!" },
  { scene: "At the Eiffel Tower" },
  { who: "Adrien", fr: "Regarde ! La tour Eiffel !", en: "Look! The Eiffel Tower!" },
  { who: "Marinette", fr: "Elle est belle !", en: "It's beautiful!" }
 ],
 vocab: [
  { fr: "les courses", en: "the shopping / errands", say: "lay KOORS", cat: "Shopping", ex: "On fait les courses ?", exEn: "Shall we do the shopping?" },
  { fr: "on fait les courses ?", en: "shall we do the shopping?", say: "ohn feh lay KOORS", cat: "Shopping", ex: "On fait les courses ?", exEn: "Shall we do the shopping?" },
  { fr: "je veux", en: "I want", say: "zhuh VUH", cat: "Everyday Expressions", ex: "Je veux une baguette.", exEn: "I want a baguette." },
  { fr: "une baguette", en: "a baguette", say: "ewn bah-GET", cat: "Food & Drink", ex: "Je veux une baguette.", exEn: "I want a baguette." },
  { fr: "du jus", en: "some juice", say: "dew ZHEW", cat: "Food & Drink", ex: "Moi, je veux du jus.", exEn: "Me, I want some juice." },
  { fr: "c'est tout ?", en: "is that all?", say: "seh TOO", cat: "Shopping", ex: "Voilà ! C'est tout ?", exEn: "There you go! Is that all?" },
  { fr: "la tour Eiffel", en: "the Eiffel Tower", say: "lah toor eh-FEL", cat: "Travel", ex: "Regarde ! La tour Eiffel !", exEn: "Look! The Eiffel Tower!" },
  { fr: "elle est belle", en: "it's beautiful (for a feminine thing)", say: "el eh BEL", cat: "Everyday Expressions", ex: "La tour Eiffel ? Elle est belle !", exEn: "The Eiffel Tower? It's beautiful!" },
  { fr: "regarde !", en: "look! (to a friend)", say: "ruh-GARD", cat: "Everyday Expressions", ex: "Regarde ! La tour Eiffel !", exEn: "Look! The Eiffel Tower!" }
 ],
 grammar: [
  { title: "Je veux… — I want…", body: "Je veux is direct and friendly, so it is perfect between friends. In a shop or restaurant with someone you don't know, the softer je voudrais (“I would like”) is more polite.", examples: [{ fr: "Je veux une baguette.", en: "I want a baguette." }, { fr: "Je veux du jus.", en: "I want some juice." }] },
  { title: "Masculine and feminine: un/une, il/elle", body: "Every French noun is masculine or feminine. A croissant is masculine (un croissant), but a baguette is feminine (une baguette). The Eiffel Tower, la tour, is feminine, so Marinette says elle est belle. A masculine thing would be il est beau.", examples: [{ fr: "Une baguette. Elle est bonne.", en: "A baguette. It is good." }, { fr: "Un croissant. Il est bon.", en: "A croissant. It is good." }] },
  { title: "du — “some” for things you can't count", body: "Use du before a masculine word you can't count one by one, like juice, bread or cheese. It means “some”.", examples: [{ fr: "Je veux du jus.", en: "I want some juice." }, { fr: "Je voudrais du pain.", en: "I would like some bread." }] }
 ],
 quiz: [
  { type: "mc", q: "What does “Je veux” mean?", options: ["I want", "I have", "I see", "I am"], answer: "I want", explain: "Je veux = I want." },
  { type: "fill", q: "Complete the sentence: Je veux ___ baguette.", hint: "a (a baguette is feminine)", answer: "une", explain: "Baguette is feminine, so we say une baguette." },
  { type: "mc", q: "At the checkout, “C'est tout ?” means…", options: ["Is that all?", "How much is it?", "Where is it?", "Do you want a bag?"], answer: "Is that all?", explain: "C'est tout ? = Is that everything?" },
  { type: "mc", q: "What does “Regarde ! La tour Eiffel !” mean?", options: ["Look! The Eiffel Tower!", "Hello! The Eiffel Tower!", "Where is the Eiffel Tower?", "I want the Eiffel Tower!"], answer: "Look! The Eiffel Tower!", explain: "Regarde ! means “Look!”." },
  { type: "mc", q: "Why does Marinette say “Elle est belle” about the tower?", options: ["La tour is a feminine word, so it is elle", "Marinette is a girl", "Elle means “tower”", "It is a mistake — it should be il"], answer: "La tour is a feminine word, so it is elle", explain: "Elle replaces a feminine noun; il replaces a masculine one." },
  { type: "mc", q: "How do you say “I want some juice”?", options: ["Je veux du jus", "Je veux un jus", "Je vais du jus", "Je suis du jus"], answer: "Je veux du jus", explain: "Du jus = some juice." }
 ]
},
{
 id: "at-the-airport", number: 7, title: "At the Airport", fr: "À l'aéroport",
 type: "Short dialogue", level: "Beginner (A1)", topics: ["Travel French", "Everyday French", "Listening and Conversation"],
 minutes: 7, art: { emoji: "✈️", alt: "Airport lesson illustration" },
 description: "Show your passport, say where you are going and wish someone a good trip — the French you need at an airport.",
 objectives: ["Understand Vous allez où ?", "Say “I'm going to…” with Je vais à…", "Use bon voyage and au revoir"],
 intro: "Adrien is the airport officer and Marinette is on her way to Paris.",
 video: null, instagram: "",
 dialogue: [
  { who: "Adrien", fr: "Bonjour ! Votre passeport, s'il vous plaît.", en: "Hello! Your passport, please." },
  { who: "Marinette", fr: "Voilà mon passeport.", en: "Here is my passport." },
  { who: "Adrien", fr: "Vous allez où ?", en: "Where are you going?" },
  { who: "Marinette", fr: "Je vais à Paris !", en: "I'm going to Paris!" },
  { who: "Adrien", fr: "Bon voyage !", en: "Have a good trip!" },
  { who: "Marinette", fr: "Merci ! Au revoir !", en: "Thank you! Goodbye!" }
 ],
 vocab: [
  { fr: "un passeport", en: "a passport", say: "uhn pahs-POR", cat: "Travel", ex: "Voilà mon passeport.", exEn: "Here is my passport." },
  { fr: "votre", en: "your (polite, or for several people)", say: "VOH-truh", cat: "Everyday Expressions", ex: "Votre passeport, s'il vous plaît.", exEn: "Your passport, please." },
  { fr: "vous allez où ?", en: "where are you going? (polite)", say: "voo zah-lay OO", cat: "Travel", ex: "Vous allez où ?", exEn: "Where are you going?" },
  { fr: "je vais à…", en: "I'm going to…", say: "zhuh veh ah", cat: "Travel", ex: "Je vais à Paris !", exEn: "I'm going to Paris!" },
  { fr: "bon voyage !", en: "have a good trip!", say: "bohn vwah-YAZH", cat: "Travel", ex: "Bon voyage !", exEn: "Have a good trip!" },
  { fr: "au revoir", en: "goodbye", say: "oh ruh-VWAHR", cat: "Greetings", ex: "Merci ! Au revoir !", exEn: "Thank you! Goodbye!" },
  { fr: "voilà", en: "here you go / here is", say: "vwah-LAH", cat: "Everyday Expressions", ex: "Voilà mon passeport.", exEn: "Here is my passport." }
 ],
 grammar: [
  { title: "Je vais à + place — I'm going to…", body: "Je vais comes from the verb aller (“to go”). Add à and the name of a city or place. Aller is irregular, so it is worth learning je vais as one block.", examples: [{ fr: "Je vais à Paris.", en: "I'm going to Paris." }, { fr: "Je vais à la boulangerie.", en: "I'm going to the bakery." }] },
  { title: "Vous allez où ? — a polite question", body: "Vous allez où ? is natural, spoken French for “Where are you going?”. The airport officer says vous because he is speaking formally to a traveller. Your answer uses je.", examples: [{ fr: "Vous allez où ?", en: "Where are you going?" }, { fr: "Je vais à Paris.", en: "I'm going to Paris." }] }
 ],
 quiz: [
  { type: "mc", q: "What does “Vous allez où ?” mean?", options: ["Where are you going?", "Who are you?", "How are you?", "What do you want?"], answer: "Where are you going?", explain: "Aller = to go, and où = where." },
  { type: "mc", q: "How do you say “Have a good trip!”?", options: ["Bon voyage !", "Bon appétit !", "Bonne nuit !", "Bonjour !"], answer: "Bon voyage !", explain: "Voyage = trip/journey." },
  { type: "fill", q: "Complete the sentence: Je ___ à Paris !", hint: "“I'm going” — from the verb aller", answer: "vais", explain: "Je vais à Paris = I'm going to Paris." },
  { type: "mc", q: "What does “Votre passeport, s'il vous plaît” mean?", options: ["Your passport, please.", "My passport, please.", "Where is my passport?", "A passport, thank you."], answer: "Your passport, please.", explain: "Votre = your (polite)." },
  { type: "mc", q: "What does “Au revoir” mean?", options: ["Goodbye", "Hello", "Thank you", "Please"], answer: "Goodbye", explain: "Au revoir is the standard French goodbye." }
 ]
}
];
