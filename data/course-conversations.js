// Course 1: First Conversations. Five dialogue lessons for absolute beginners (A1).
import { D, S, V, G, mc, fill, lesson } from "./course-tools.js";
const C = "first-conversations";
export const conversationLessons = [
lesson(C, 1, {
 id: "greetings-through-the-day", title: "Greetings Through the Day", fr: "Les salutations",
 topics: ["Absolute Beginner", "Greetings and Introductions"], minutes: 6, art: { emoji: "👋" },
 description: "Say hello, ask how someone is and say goodbye at any time of day.",
 objectives: ["Greet people with bonjour, bonsoir and salut", "Ask and answer Ça va ?", "Say goodbye with au revoir, à demain and bonne nuit"],
 intro: "Marinette and Adrien meet in the morning, again in the evening, and then say goodbye. Read each line aloud, then cover the English to test yourself.",
 dialogue: [
  S("In the morning"),
  D("Marinette", "Bonjour, Adrien !", "Hello, Adrien!"),
  D("Adrien", "Bonjour, Marinette ! Ça va ?", "Hello, Marinette! How are you?"),
  D("Marinette", "Ça va bien, merci. Et toi ?", "I'm fine, thanks. And you?"),
  D("Adrien", "Ça va très bien !", "I'm doing very well!"),
  S("In the evening"),
  D("Adrien", "Bonsoir, Marinette !", "Good evening, Marinette!"),
  D("Marinette", "Bonsoir ! À demain ?", "Good evening! See you tomorrow?"),
  D("Adrien", "Oui, à demain. Bonne nuit !", "Yes, see you tomorrow. Good night!"),
  D("Marinette", "Bonne nuit, Adrien. Salut !", "Good night, Adrien. Bye!")
 ],
 vocab: [
  V("bonsoir", "good evening", "bohn-SWAHR", "Greetings", "Bonsoir, madame !", "Good evening, madam!"),
  V("salut", "hi / bye (informal)", "sah-LEW", "Greetings", "Salut, Adrien !", "Hi, Adrien!"),
  V("ça va ?", "how are you? / how's it going?", "sah VAH", "Greetings", "Salut ! Ça va ?", "Hi! How are you?"),
  V("ça va bien", "I'm fine", "sah vah BYAN", "Greetings", "Ça va bien, merci.", "I'm fine, thanks."),
  V("et toi ?", "and you? (to a friend)", "ay TWAH", "Greetings", "Ça va bien. Et toi ?", "I'm fine. And you?"),
  V("au revoir", "goodbye", "oh ruh-VWAHR", "Greetings", "Au revoir, madame !", "Goodbye, madam!"),
  V("à demain", "see you tomorrow", "ah duh-MAN", "Greetings", "Merci, à demain !", "Thanks, see you tomorrow!"),
  V("bonne nuit", "good night", "bun NWEE", "Greetings", "Bonne nuit, Marinette !", "Good night, Marinette!")
 ],
 grammar: [
  G("Bonjour, bonsoir or salut?", "Use bonjour from morning until evening, and bonsoir once it is evening. Salut is relaxed and works for both hello and goodbye, but only with friends and family. With a shopkeeper or someone older, choose bonjour and au revoir.", ["Bonjour, madame !", "Hello, madam!"], ["Salut, Adrien !", "Hi, Adrien!"]),
  G("Ça va ? — asking and answering", "Ça va ? is the everyday way to ask how someone is. Answer with ça va, ça va bien or ça va très bien, then hand the question back with et toi ?", ["Ça va ? — Ça va bien, merci.", "How are you? — I'm fine, thanks."], ["Et toi ?", "And you?"]),
  G("Toi or vous?", "Toi goes with tu, the friendly “you”. To a stranger or an older person, say et vous ? instead. The rest of the sentence stays the same.", ["Et toi ?", "And you? (friend)"], ["Et vous ?", "And you? (polite)"])
 ],
 quiz: [
  mc("You arrive at a friend's house at 8 pm. What do you say?", "Bonsoir !", ["Bonne nuit !", "Au revoir !"], "Bonsoir is “good evening”. Bonne nuit is only for going to bed."),
  mc("What does “Ça va ?” mean?", "How are you?", ["Where are you?", "What's your name?"], "Ça va ? asks how someone is."),
  fill("Complete: Au ___, Adrien !", "revoir", "“goodbye” — au re…", "Au revoir means goodbye."),
  mc("Which greeting is informal and works for both hello and goodbye?", "Salut", ["Bonsoir", "Au revoir", "Bonne nuit"], "Salut is for friends: it means both hi and bye."),
  mc("What does “À demain” mean?", "See you tomorrow", ["See you soon", "Good night", "Good morning"], "Demain means tomorrow."),
  fill("Complete: Ça va très ___, merci.", "bien", "“well”", "Ça va très bien = I'm doing very well.")
 ]
}),
lesson(C, 2, {
 id: "introducing-yourself", title: "Introducing Yourself", fr: "Se présenter",
 topics: ["Absolute Beginner", "Greetings and Introductions"], minutes: 8, art: { emoji: "🙋" },
 description: "Say your name, where you live and where you come from, and ask a new friend the same questions.",
 objectives: ["Ask and say a name with Comment tu t'appelles ?", "Say where you live with J'habite à…", "Say where you are from with Je viens de… and speak about languages"],
 intro: "Adrien and Marinette are meeting properly for the first time. You will hear the questions everyone asks at a first meeting.",
 dialogue: [
  D("Adrien", "Salut ! Comment tu t'appelles ?", "Hi! What's your name?"),
  D("Marinette", "Je m'appelle Marinette. Et toi ?", "My name is Marinette. And you?"),
  D("Adrien", "Moi, c'est Adrien. Tu es française ?", "Me, I'm Adrien. Are you French?"),
  D("Marinette", "Oui, je suis française. J'habite à Paris.", "Yes, I'm French. I live in Paris."),
  D("Marinette", "Et toi ? Tu viens d'où ?", "And you? Where are you from?"),
  D("Adrien", "Je viens du Canada, mais j'habite à Lyon.", "I come from Canada, but I live in Lyon."),
  D("Marinette", "Tu parles anglais ?", "Do you speak English?"),
  D("Adrien", "Oui ! Je parle anglais et français.", "Yes! I speak English and French."),
  D("Marinette", "Moi, je parle français et un peu anglais.", "Me, I speak French and a little English.")
 ],
 vocab: [
  V("comment tu t'appelles ?", "what's your name? (to a friend)", "koh-mahn tew tah-PEL", "Introductions", "Salut ! Comment tu t'appelles ?", "Hi! What's your name?"),
  V("moi, c'est…", "me, I'm… / I'm…", "mwah SEH", "Introductions", "Moi, c'est Adrien.", "I'm Adrien."),
  V("je suis français / française", "I am French (man / woman)", "zhuh swee frahn-SEH / frahn-SEHZ", "Introductions", "Je suis française.", "I am French."),
  V("j'habite à…", "I live in…", "zhah-BEET ah", "Introductions", "J'habite à Paris.", "I live in Paris."),
  V("tu viens d'où ?", "where are you from? (to a friend)", "tew VYAN doo", "Introductions", "Tu viens d'où, Adrien ?", "Where are you from, Adrien?"),
  V("je viens de…", "I come from…", "zhuh VYAN duh", "Introductions", "Je viens de Montréal.", "I come from Montreal."),
  V("je parle", "I speak", "zhuh PARL", "Common Verbs", "Je parle français.", "I speak French."),
  V("un peu", "a little", "uhn PUH", "Everyday Expressions", "Je parle un peu anglais.", "I speak a little English.")
 ],
 grammar: [
  G("Je suis + nationality", "Nationalities are adjectives. For a woman add an -e. Français becomes française, canadien becomes canadienne. The masculine and feminine often sound different here, because the final consonant is pronounced in the feminine.", ["Je suis français.", "I am French. (a man)"], ["Je suis française.", "I am French. (a woman)"], ["Je suis canadienne.", "I am Canadian. (a woman)"]),
  G("J'habite à… and je viens de…", "Use à with a city to say where you live, and de with a city to say where you come from. With a masculine country such as le Canada, de + le becomes du.", ["J'habite à Lyon.", "I live in Lyon."], ["Je viens de Paris.", "I come from Paris."], ["Je viens du Canada.", "I come from Canada."]),
  G("Je parle + language", "Use je parle with the name of a language, with no word for “the”. Add un peu to be modest.", ["Je parle français.", "I speak French."], ["Je parle un peu anglais.", "I speak a little English."])
 ],
 quiz: [
  mc("How do you ask a friend their name?", "Comment tu t'appelles ?", ["Tu viens d'où ?", "Tu parles anglais ?"], "Comment tu t'appelles ? literally asks how you call yourself."),
  fill("Complete: J'___ à Paris.", "habite", "“I live”", "J'habite à Paris = I live in Paris."),
  mc("Marinette is a woman. How does she say she is French?", "Je suis française", ["Je suis français", "Je suis habite"], "Add -e for a woman: française."),
  mc("What does “Tu viens d'où ?” mean?", "Where are you from?", ["Where do you live?", "What is your name?"], "D'où means “from where”."),
  fill("Complete: Je ___ du Canada.", "viens", "“I come”", "Je viens du Canada = I come from Canada."),
  mc("What does “Je parle un peu anglais” mean?", "I speak a little English", ["I speak English well", "I don't speak English"], "Un peu means a little.")
 ]
}),
lesson(C, 3, {
 id: "numbers-and-prices", title: "Numbers and Prices", fr: "Les nombres et les prix",
 topics: ["Absolute Beginner", "Numbers and Time", "Everyday French"], minutes: 9, art: { emoji: "🔢" },
 description: "Count from zero to twenty and ask how much something costs at a market stall.",
 objectives: ["Count from 0 to 20 in French", "Ask the price with C'est combien ?", "Buy fruit and say Je prends…"],
 intro: "Marinette is at the market. Listen for the numbers and for the question every shopper asks: how much is it?",
 dialogue: [
  D("Marinette", "Bonjour ! C'est combien, les pommes ?", "Hello! How much are the apples?"),
  D("Le vendeur", "Deux euros le kilo.", "Two euros a kilo."),
  D("Marinette", "Et les fraises ?", "And the strawberries?"),
  D("Le vendeur", "Quatre euros la barquette.", "Four euros a punnet."),
  D("Marinette", "Je prends deux kilos de pommes et une barquette de fraises, s'il vous plaît.", "I'll take two kilos of apples and a punnet of strawberries, please."),
  D("Le vendeur", "Très bien. Ça fait huit euros.", "Very good. That comes to eight euros."),
  D("Marinette", "Voilà dix euros.", "Here's ten euros."),
  D("Le vendeur", "Merci. Et voilà votre monnaie : deux euros.", "Thank you. And here's your change: two euros."),
  D("Marinette", "Merci, bonne journée !", "Thanks, have a nice day!"),
  D("Le vendeur", "Vous aussi !", "You too!")
 ],
 vocab: [
  V("c'est combien ?", "how much is it?", "seh kohm-BYAN", "Shopping", "C'est combien, les pommes ?", "How much are the apples?"),
  V("ça fait…", "that comes to…", "sah FEH", "Shopping", "Ça fait huit euros.", "That comes to eight euros."),
  V("je prends…", "I'll take…", "zhuh PRAHN", "Shopping", "Je prends deux kilos de pommes.", "I'll take two kilos of apples."),
  V("un euro", "a euro", "uhn uh-ROH", "Shopping", "Deux euros, s'il vous plaît.", "Two euros, please."),
  V("un kilo", "a kilo", "uhn kee-LOH", "Shopping", "Un kilo de pommes.", "A kilo of apples."),
  V("la monnaie", "the change", "lah moh-NEH", "Shopping", "Voilà votre monnaie.", "Here's your change."),
  V("deux", "two", "DUH", "Numbers", "Deux euros le kilo.", "Two euros a kilo."),
  V("huit", "eight", "WEET", "Numbers", "Ça fait huit euros.", "That comes to eight euros.")
 ],
 grammar: [
  G("Numbers 0–20", "0 zéro (zay-ROH), 1 un (uhn), 2 deux (duh), 3 trois (trwah), 4 quatre (KAHTR), 5 cinq (sank), 6 six (sees), 7 sept (set), 8 huit (weet), 9 neuf (nuhf), 10 dix (dees). Then 11 onze (ohnz), 12 douze (dooz), 13 treize (trehz), 14 quatorze (kah-TORZ), 15 quinze (kanz), 16 seize (sehz), 17 dix-sept, 18 dix-huit, 19 dix-neuf, 20 vingt (van).", ["Il y a dix pommes.", "There are ten apples."], ["Ça fait quinze euros.", "That comes to fifteen euros."]),
  G("C'est combien ? and Ça fait…", "Ask C'est combien ? for a single price, or Ça coûte combien ? for the longer version. The seller answers with the price or Ça fait + total.", ["C'est combien ?", "How much is it?"], ["Ça fait huit euros.", "That comes to eight euros."]),
  G("Quantities use de", "After a quantity such as un kilo or une barquette, the word de links it to the thing: deux kilos de pommes. De becomes d' before a vowel.", ["Un kilo de fraises.", "A kilo of strawberries."], ["Une bouteille d'eau.", "A bottle of water."])
 ],
 quiz: [
  mc("How do you ask the price of something?", "C'est combien ?", ["Ça va bien ?", "Tu viens d'où ?"], "C'est combien ? = How much is it?"),
  mc("Which number is “huit”?", "8", ["6", "10", "18"], "Huit is eight."),
  fill("Complete: Ça ___ huit euros.", "fait", "“makes / comes to”", "Ça fait + total = that comes to…"),
  mc("What does “Je prends deux kilos de pommes” mean?", "I'll take two kilos of apples", ["I want a kilo of pears", "Two apples cost one euro"], "Je prends = I'll take."),
  fill("Complete: deux kilos ___ pommes", "de", "after a quantity", "Use de after quantities: deux kilos de pommes."),
  mc("What number is “dix”?", "10", ["6", "12", "20"], "Dix is ten.")
 ]
}),
lesson(C, 4, {
 id: "ordering-at-the-cafe", title: "Ordering at the Café", fr: "Commander au café",
 topics: ["Absolute Beginner", "Food and Cafés", "Everyday French"], minutes: 8, art: { emoji: "☕" },
 description: "Order drinks and a snack politely and ask for the bill.",
 objectives: ["Order politely with Je voudrais…", "Use vous with a waiter", "Ask for the bill with L'addition, s'il vous plaît"],
 intro: "Adrien and Marinette sit down at a café. With a waiter, French uses the polite vous form, so listen for s'il vous plaît.",
 dialogue: [
  D("Le serveur", "Bonjour ! Vous désirez ?", "Hello! What would you like?"),
  D("Adrien", "Bonjour. Je voudrais un café et un croissant, s'il vous plaît.", "Hello. I'd like a coffee and a croissant, please."),
  D("Le serveur", "Très bien. Et pour madame ?", "Very good. And for the lady?"),
  D("Marinette", "Un thé au citron, s'il vous plaît.", "A lemon tea, please."),
  D("Le serveur", "Voilà ! Un café, un thé et un croissant.", "Here you are! A coffee, a tea and a croissant."),
  D("Adrien", "Merci ! L'addition, s'il vous plaît ?", "Thank you! The bill, please?"),
  D("Le serveur", "Tout de suite. Ça fait sept euros cinquante.", "Right away. That's seven euros fifty."),
  D("Adrien", "Voilà. Gardez la monnaie !", "Here you go. Keep the change!"),
  D("Le serveur", "Merci, bonne journée !", "Thank you, have a nice day!")
 ],
 vocab: [
  V("je voudrais…", "I would like…", "zhuh voo-DRAY", "Food & Drink", "Je voudrais un café.", "I would like a coffee."),
  V("vous désirez ?", "what would you like? (polite)", "voo day-zee-RAY", "Food & Drink", "Bonjour ! Vous désirez ?", "Hello! What would you like?"),
  V("un thé", "a tea", "uhn TAY", "Food & Drink", "Un thé au citron, s'il vous plaît.", "A lemon tea, please."),
  V("un jus d'orange", "an orange juice", "uhn zhew doh-RAHNZH", "Food & Drink", "Je voudrais un jus d'orange.", "I would like an orange juice."),
  V("une limonade", "a lemonade", "ewn lee-moh-NAHD", "Food & Drink", "Une limonade, s'il vous plaît.", "A lemonade, please."),
  V("l'addition", "the bill", "lah-dee-SYOHN", "Food & Drink", "L'addition, s'il vous plaît.", "The bill, please."),
  V("tout de suite", "right away", "too duh SWEET", "Everyday Expressions", "Je viens tout de suite.", "I'm coming right away."),
  V("s'il vous plaît", "please (polite)", "seel voo PLEH", "Everyday Expressions", "Un café, s'il vous plaît.", "A coffee, please.")
 ],
 grammar: [
  G("Je voudrais = I would like", "Je voudrais is the polite way to order. Je veux means “I want” and sounds too direct in a café. Add s'il vous plaît at the end.", ["Je voudrais un thé.", "I would like a tea."], ["Je voudrais l'addition.", "I would like the bill."]),
  G("Vous with a waiter", "Tu is for friends and family. With waiters, shop staff and people you do not know, use vous and s'il vous plaît. Adrien says vous to the waiter, but tu to Marinette.", ["Vous désirez ?", "What would you like?"], ["S'il vous plaît.", "Please."]),
  G("Un or une?", "French nouns are masculine or feminine. Use un for masculine and une for feminine. Learn each new word with its un or une.", ["un café, un thé, un croissant", "a coffee, a tea, a croissant"], ["une limonade", "a lemonade"])
 ],
 quiz: [
  mc("Which is the most polite way to order a coffee?", "Je voudrais un café, s'il vous plaît.", ["Je veux un café.", "Un café !"], "Je voudrais + s'il vous plaît is polite."),
  fill("Complete: Je ___ un thé.", "voudrais", "“I would like”", "Je voudrais = I would like."),
  mc("How do you ask for the bill?", "L'addition, s'il vous plaît.", ["Tout de suite !", "Vous désirez ?"], "L'addition is the bill."),
  mc("Why does Adrien say “s'il vous plaît” to the waiter?", "Vous is the polite form for strangers", ["Because the waiter is his friend", "Because it is a question"], "Use vous with people you do not know."),
  fill("Complete: L'___, s'il vous plaît.", "addition", "the bill", "L'addition = the bill."),
  mc("What does “tout de suite” mean?", "Right away", ["Thank you", "Later"], "The waiter will bring the bill right away.")
 ]
}),
lesson(C, 5, {
 id: "asking-for-directions", title: "Asking for Directions", fr: "Demander son chemin",
 topics: ["Absolute Beginner", "Travel French", "Everyday French"], minutes: 9, art: { emoji: "🧭" },
 description: "Ask where a place is and understand left, right and straight ahead.",
 objectives: ["Get attention politely with Excusez-moi", "Ask Où est… ?", "Understand tout droit, à gauche and à droite"],
 intro: "Adrien is looking for the train station. Listen for the three direction words you will hear most.",
 dialogue: [
  D("Adrien", "Excusez-moi, madame. Où est la gare, s'il vous plaît ?", "Excuse me, madam. Where is the station, please?"),
  D("La passante", "La gare ? Allez tout droit.", "The station? Go straight ahead."),
  D("La passante", "Puis tournez à gauche après la boulangerie.", "Then turn left after the bakery."),
  D("Adrien", "C'est loin ?", "Is it far?"),
  D("La passante", "Non, c'est à cinq minutes à pied.", "No, it's five minutes on foot."),
  D("Adrien", "Et la poste ?", "And the post office?"),
  D("La passante", "La poste est à côté de la gare, à droite.", "The post office is next to the station, on the right."),
  D("Adrien", "Merci beaucoup, madame !", "Thank you very much, madam!"),
  D("La passante", "De rien, bonne journée !", "You're welcome, have a nice day!")
 ],
 vocab: [
  V("excusez-moi", "excuse me", "ek-skew-zay MWAH", "Directions", "Excusez-moi, madame.", "Excuse me, madam."),
  V("où est… ?", "where is…?", "oo EH", "Directions", "Où est la gare ?", "Where is the station?"),
  V("tout droit", "straight ahead", "too DRWAH", "Directions", "Allez tout droit.", "Go straight ahead."),
  V("à gauche", "on / to the left", "ah GOHSH", "Directions", "Tournez à gauche.", "Turn left."),
  V("à droite", "on / to the right", "ah DRWAHT", "Directions", "La poste est à droite.", "The post office is on the right."),
  V("c'est loin ?", "is it far?", "seh LWAN", "Directions", "La gare, c'est loin ?", "Is the station far?"),
  V("à côté de", "next to", "ah koh-TAY duh", "Directions", "La poste est à côté de la gare.", "The post office is next to the station."),
  V("à pied", "on foot", "ah PYAY", "Directions", "C'est à cinq minutes à pied.", "It's five minutes on foot.")
 ],
 grammar: [
  G("Où est… ? and Où sont… ?", "Ask where one thing is with Où est + the place. For several things, use Où sont. Start with Excusez-moi or Pardon to be polite.", ["Où est la gare ?", "Where is the station?"], ["Où sont les toilettes ?", "Where are the toilets?"]),
  G("Directions are commands", "Directions use the vous command form: allez (go), tournez (turn), continuez (continue). Put the place after: tournez à gauche, continuez tout droit.", ["Allez tout droit.", "Go straight ahead."], ["Tournez à droite.", "Turn right."]),
  G("à côté de, devant, après", "Small place words tell you where something is. They are followed by de or by the place directly: à côté de la gare (next to the station), après la boulangerie (after the bakery).", ["La poste est à côté de la gare.", "The post office is next to the station."])
 ],
 quiz: [
  mc("What does “Où est la gare ?” mean?", "Where is the station?", ["What time is the train?", "Is the station far?"], "Où est… ? asks where something is."),
  fill("Complete: Allez tout ___.", "droit", "“straight”", "Tout droit = straight ahead."),
  mc("What does “à droite” mean?", "On the right", ["On the left", "Straight ahead"], "Droite is right, gauche is left."),
  mc("What do you say to get a stranger's attention politely?", "Excusez-moi", ["Salut", "Bonne nuit"], "Excusez-moi = excuse me."),
  mc("What does “C'est à cinq minutes à pied” mean?", "It's a five-minute walk", ["It's five kilometres away", "It's five stops by train"], "À pied means on foot."),
  fill("Complete: La poste est à ___ de la gare.", "côté", "“side”", "À côté de = next to.")
 ]
})
];
