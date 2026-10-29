// Course 3: Everyday French: Time and Plans. Five dialogue lessons that move beyond the first conversations (A1).
import { D, S, V, G, mc, fill, lesson } from "./course-tools.js";
const C = "everyday-french";
const base = { topics: ["Everyday French", "Numbers and Time", "Listening and Conversation"] };
export const everydayLessons = [
lesson(C, 1, {
 ...base, id: "days-and-today", title: "Days of the Week", fr: "Les jours de la semaine", minutes: 7, art: { emoji: "📅" },
 description: "Name the seven days and say today, tomorrow and yesterday.",
 objectives: ["Say the seven days of the week", "Ask Quel jour sommes-nous ?", "Use aujourd'hui, demain and hier"],
 intro: "Adrien and Marinette check what day it is and talk about the weekend.",
 dialogue: [
  D("Adrien", "Quel jour sommes-nous aujourd'hui ?", "What day is it today?"),
  D("Marinette", "Nous sommes jeudi.", "It's Thursday."),
  D("Adrien", "Et demain ?", "And tomorrow?"),
  D("Marinette", "Demain, c'est vendredi. Hier, c'était mercredi.", "Tomorrow is Friday. Yesterday was Wednesday."),
  D("Adrien", "Tu travailles le samedi ?", "Do you work on Saturdays?"),
  D("Marinette", "Non, le samedi, je ne travaille pas.", "No, on Saturdays I don't work."),
  D("Adrien", "Et le dimanche ?", "And on Sundays?"),
  D("Marinette", "Le dimanche, je dors !", "On Sundays I sleep!")
 ],
 vocab: [
  V("lundi", "Monday", "luhn-DEE", "Time & Days", "Lundi, je travaille.", "On Monday I work."),
  V("mardi", "Tuesday", "mar-DEE", "Time & Days", "Mardi, j'ai un cours.", "On Tuesday I have a class."),
  V("mercredi", "Wednesday", "mehr-kruh-DEE", "Time & Days", "Hier, c'était mercredi.", "Yesterday was Wednesday."),
  V("jeudi", "Thursday", "zhuh-DEE", "Time & Days", "Nous sommes jeudi.", "It's Thursday."),
  V("vendredi", "Friday", "vahn-druh-DEE", "Time & Days", "Demain, c'est vendredi.", "Tomorrow is Friday."),
  V("samedi", "Saturday", "sahm-DEE", "Time & Days", "Samedi, on va au cinéma.", "On Saturday we're going to the cinema."),
  V("dimanche", "Sunday", "dee-MAHNSH", "Time & Days", "Le dimanche, je dors.", "On Sundays I sleep."),
  V("aujourd'hui", "today", "oh-zhoor-DWEE", "Time & Days", "Aujourd'hui, c'est jeudi.", "Today is Thursday."),
  V("demain", "tomorrow", "duh-MAN", "Time & Days", "À demain !", "See you tomorrow!"),
  V("hier", "yesterday", "YEHR", "Time & Days", "Hier, j'étais à Paris.", "Yesterday I was in Paris.")
 ],
 grammar: [
  G("No capital letters", "Days of the week are masculine and are written with a small letter in French: lundi, mardi, jeudi. The week starts on Monday on French calendars.", ["lundi, mardi, mercredi", "Monday, Tuesday, Wednesday"]),
  G("Samedi or le samedi?", "A day on its own means this coming day: samedi, on va au cinéma (this Saturday). With le it means every week: le samedi, je dors (on Saturdays).", ["Samedi, je travaille.", "This Saturday I'm working."], ["Le samedi, je ne travaille pas.", "On Saturdays I don't work."]),
  G("Quel jour sommes-nous ?", "Ask Quel jour sommes-nous ? or Quel jour est-ce ? and answer Nous sommes + day, or simply C'est + day. Hier c'était means “yesterday it was”.", ["Nous sommes jeudi.", "It's Thursday."], ["Hier, c'était mercredi.", "Yesterday was Wednesday."])
 ],
 quiz: [
  mc("Which day is “jeudi”?", "Thursday", ["Tuesday", "Friday", "Sunday"], "Jeudi = Thursday."),
  mc("What does “demain” mean?", "Tomorrow", ["Today", "Yesterday"], "Demain = tomorrow."),
  fill("Complete: ___, c'était mercredi.", "hier", "“yesterday”", "Hier = yesterday."),
  mc("What does “Le samedi, je dors” mean?", "On Saturdays I sleep", ["This Saturday I'm sleeping", "I slept on Saturday"], "Le + day means every week."),
  mc("How are days of the week written in French?", "With a small letter", ["With a capital letter", "Always in capitals"], "Lundi, mardi… are not capitalised."),
  fill("Complete: Nous sommes ___. (today is Friday)", "vendredi", "the day before Saturday", "Nous sommes + day.")
 ]
}),
lesson(C, 2, {
 ...base, id: "telling-the-time", title: "Telling the Time", fr: "Dire l'heure", minutes: 9, art: { emoji: "⏰" },
 description: "Ask the time and say o'clock, half past, quarter past and quarter to.",
 objectives: ["Ask Quelle heure est-il ?", "Say the time with Il est… heures", "Say et demie, et quart and moins le quart"],
 intro: "Marinette and Adrien are running late for the cinema, so the clock matters.",
 dialogue: [
  D("Marinette", "Excuse-moi, tu as l'heure ?", "Excuse me, do you have the time?"),
  D("Adrien", "Oui, il est trois heures et demie.", "Yes, it's half past three."),
  D("Marinette", "Oh non ! Le film commence à quatre heures moins le quart !", "Oh no! The film starts at quarter to four!"),
  D("Adrien", "Pas de panique, on a encore un quart d'heure.", "Don't panic, we still have a quarter of an hour."),
  D("Marinette", "À quelle heure finit le film ?", "What time does the film end?"),
  D("Adrien", "À cinq heures et quart.", "At quarter past five."),
  D("Marinette", "Parfait. On mange à sept heures ?", "Perfect. Shall we eat at seven?"),
  D("Adrien", "Oui, à sept heures !", "Yes, at seven!")
 ],
 vocab: [
  V("quelle heure est-il ?", "what time is it?", "kehl UHR eh-TEEL", "Time & Days", "Quelle heure est-il ?", "What time is it?"),
  V("il est… heures", "it is … o'clock", "eel eh … UHR", "Time & Days", "Il est trois heures.", "It's three o'clock."),
  V("et demie", "and a half (half past)", "ay duh-MEE", "Time & Days", "Il est trois heures et demie.", "It's half past three."),
  V("et quart", "and a quarter (quarter past)", "ay KAR", "Time & Days", "Il est cinq heures et quart.", "It's quarter past five."),
  V("moins le quart", "minus a quarter (quarter to)", "mwan luh KAR", "Time & Days", "Quatre heures moins le quart.", "Quarter to four."),
  V("midi", "noon", "mee-DEE", "Time & Days", "On mange à midi.", "We eat at noon."),
  V("minuit", "midnight", "mee-NWEE", "Time & Days", "Il est minuit.", "It's midnight."),
  V("à quelle heure ?", "at what time?", "ah kehl UHR", "Time & Days", "À quelle heure est le film ?", "What time is the film?")
 ],
 grammar: [
  G("Il est + number + heure(s)", "The time always starts with il est. Use heure for one o'clock (une heure) and heures for the rest. The h is silent, so there is liaison: trois heures sounds like “trwah-ZUHR”.", ["Il est une heure.", "It's one o'clock."], ["Il est sept heures.", "It's seven o'clock."]),
  G("Half, quarter and “to”", "Add et demie for half past and et quart for quarter past. For quarter to, subtract: moins le quart. For minutes to the hour use moins cinq, moins dix. Midi and minuit take et demi without the final -e.", ["Il est deux heures et demie.", "It's half past two."], ["Il est trois heures moins le quart.", "It's quarter to three."]),
  G("À + time for “at”", "To say when something happens, use à + the time: à sept heures, à midi, à quatre heures moins le quart.", ["Le film est à huit heures.", "The film is at eight o'clock."])
 ],
 quiz: [
  mc("What time is “Il est trois heures et demie”?", "3:30", ["3:15", "2:30", "3:45"], "Et demie = half past."),
  mc("What does “À quelle heure ?” ask?", "At what time?", ["What day is it?", "How much is it?"], "Heure = hour / time."),
  fill("Complete: Il est quatre heures moins le ___.", "quart", "a quarter", "Moins le quart = quarter to."),
  mc("“Midi” means…", "Noon", ["Midnight", "Morning"], "Midi = 12 noon, minuit = midnight."),
  fill("Complete: Il est une ___. (1 o'clock)", "heure", "singular for one o'clock", "Une heure for one o'clock."),
  mc("What time is “quatre heures moins le quart”?", "3:45", ["4:15", "4:45", "3:15"], "Quatre heures moins le quart = quarter to four.")
 ]
}),
lesson(C, 3, {
 ...base, id: "likes-and-dislikes", title: "Likes and Dislikes", fr: "J'aime, je n'aime pas", minutes: 8, art: { emoji: "❤️" },
 description: "Say what you like, love, prefer and dislike, and agree or disagree.",
 objectives: ["Say J'aime, j'adore, je déteste and je préfère", "Make a sentence negative with ne … pas", "Say moi aussi and moi non plus"],
 intro: "Adrien and Marinette compare their tastes in drinks, music and sport.",
 dialogue: [
  D("Adrien", "Tu aimes le café, Marinette ?", "Do you like coffee, Marinette?"),
  D("Marinette", "Oui, j'adore le café ! Et toi ?", "Yes, I love coffee! And you?"),
  D("Adrien", "Moi, je préfère le thé.", "Me, I prefer tea."),
  D("Marinette", "Tu aimes la musique ?", "Do you like music?"),
  D("Adrien", "Oui, j'aime beaucoup la musique. Surtout le jazz.", "Yes, I like music a lot. Especially jazz."),
  D("Marinette", "Moi, je n'aime pas le jazz. Je préfère le rock.", "Me, I don't like jazz. I prefer rock."),
  D("Adrien", "Et le football ? Tu aimes ça ?", "And football? Do you like it?"),
  D("Marinette", "Non, je déteste le football !", "No, I hate football!"),
  D("Adrien", "Moi aussi, je déteste ça !", "Me too, I hate it!")
 ],
 vocab: [
  V("j'aime", "I like / I love", "zhem", "Common Verbs", "J'aime le chocolat.", "I like chocolate."),
  V("j'adore", "I love", "zhah-DOR", "Common Verbs", "J'adore le café !", "I love coffee!"),
  V("je n'aime pas", "I don't like", "zhuh nem PAH", "Common Verbs", "Je n'aime pas le jazz.", "I don't like jazz."),
  V("je déteste", "I hate", "zhuh day-TEST", "Common Verbs", "Je déteste le football.", "I hate football."),
  V("je préfère", "I prefer", "zhuh pray-FEHR", "Common Verbs", "Je préfère le thé.", "I prefer tea."),
  V("beaucoup", "a lot", "boh-KOO", "Everyday Expressions", "J'aime beaucoup la musique.", "I like music a lot."),
  V("surtout", "especially", "sewr-TOO", "Everyday Expressions", "J'aime le sport, surtout le tennis.", "I like sport, especially tennis."),
  V("moi aussi", "me too", "mwah oh-SEE", "Everyday Expressions", "Moi aussi, j'aime le thé.", "Me too, I like tea.")
 ],
 grammar: [
  G("Aimer + le, la, les", "In French, add the word for “the” when you talk about things you like in general: j'aime le café (I like coffee), j'aime la musique, j'aime les films. Le is for masculine words, la for feminine words and les for plurals.", ["J'aime le café.", "I like coffee."], ["J'aime la musique.", "I like music."]),
  G("Saying no: ne … pas", "Wrap ne and pas around the verb: je n'aime pas le jazz. Ne becomes n' before a vowel. In everyday speech people often skip the ne, but write it in full while you learn.", ["Je n'aime pas le jazz.", "I don't like jazz."], ["Je ne mange pas de viande.", "I don't eat meat."]),
  G("Moi aussi / moi non plus", "To agree with a positive sentence say moi aussi (me too). To agree with a negative sentence say moi non plus (me neither).", ["J'aime le thé. — Moi aussi !", "I like tea. — Me too!"], ["Je n'aime pas le jazz. — Moi non plus.", "I don't like jazz. — Me neither."])
 ],
 quiz: [
  mc("What does “J'aime le café” mean?", "I like coffee", ["I make coffee", "I want a coffee"], "J'aime = I like."),
  fill("Complete: Je n'aime ___ le jazz.", "pas", "ne … ___", "Ne … pas makes a sentence negative."),
  mc("Which phrase expresses the strongest dislike?", "Je déteste", ["Je préfère", "J'aime beaucoup"], "Je déteste = I hate."),
  mc("Why does French say “J'aime le café”, not “J'aime café”?", "French uses the article for things you like in general", ["Café is plural", "It's a polite form"], "Le, la and les are used in general statements."),
  mc("What does “Moi aussi” mean?", "Me too", ["Me neither", "Not me"], "Moi aussi = me too."),
  fill("Complete: Moi, je ___ le rock. (I prefer)", "préfère", "“I prefer”", "Je préfère = I prefer.")
 ]
}),
lesson(C, 4, {
 ...base, id: "making-plans", title: "Making Plans", fr: "Faire des projets", minutes: 9, art: { emoji: "🎬" },
 description: "Invite a friend, agree a time and place and use the verb aller.",
 objectives: ["Invite someone with Tu es libre ? and On va… ?", "Agree with D'accord and bonne idée", "Use aller: je vais, tu vas, on va"],
 intro: "Marinette invites Adrien to the cinema. Listen for how they fix the day, the time and the meeting place.",
 dialogue: [
  D("Marinette", "Tu es libre samedi ?", "Are you free on Saturday?"),
  D("Adrien", "Oui, pourquoi ?", "Yes, why?"),
  D("Marinette", "On va au cinéma ?", "Shall we go to the cinema?"),
  D("Adrien", "Bonne idée ! À quelle heure ?", "Good idea! At what time?"),
  D("Marinette", "À sept heures.", "At seven."),
  D("Adrien", "D'accord. On se retrouve où ?", "OK. Where shall we meet?"),
  D("Marinette", "Devant le cinéma.", "In front of the cinema."),
  D("Adrien", "Parfait. Je vais acheter les billets.", "Perfect. I'll buy the tickets."),
  D("Marinette", "Super ! À samedi !", "Great! See you Saturday!")
 ],
 vocab: [
  V("tu es libre ?", "are you free?", "tew eh LEE-bruh", "Everyday Expressions", "Tu es libre samedi ?", "Are you free on Saturday?"),
  V("on va…", "shall we go…? / we're going…", "ohn VAH", "Common Verbs", "On va au cinéma ?", "Shall we go to the cinema?"),
  V("au cinéma", "to the cinema", "oh see-nay-MAH", "Travel", "Je vais au cinéma.", "I'm going to the cinema."),
  V("bonne idée", "good idea", "bun ee-DAY", "Everyday Expressions", "On mange ensemble ? Bonne idée !", "Shall we eat together? Good idea!"),
  V("d'accord", "OK / agreed", "dah-KOR", "Everyday Expressions", "D'accord, à sept heures.", "OK, at seven."),
  V("devant", "in front of", "duh-VAHN", "Directions", "Devant le cinéma.", "In front of the cinema."),
  V("je vais", "I'm going / I'm going to", "zhuh VEH", "Common Verbs", "Je vais acheter les billets.", "I'm going to buy the tickets."),
  V("à samedi", "see you Saturday", "ah sahm-DEE", "Time & Days", "Super, à samedi !", "Great, see you Saturday!")
 ],
 grammar: [
  G("The verb aller (to go)", "Aller is irregular, so learn it by heart: je vais, tu vas, il / elle / on va, nous allons, vous allez, ils / elles vont. On is the everyday word for “we” and uses the same form as il.", ["Je vais au cinéma.", "I'm going to the cinema."], ["Tu vas à Paris.", "You're going to Paris."], ["On va au café.", "We're going to the café."]),
  G("à + le = au", "Use à to mean “to” or “at”. With le it becomes au: au cinéma, au café. With la it stays à la: à la plage. With les it becomes aux.", ["au cinéma", "to the cinema"], ["à la plage", "to the beach"]),
  G("Aller + infinitive = near future", "Je vais + another verb means “I'm going to…”. It is the easiest way to talk about the future: je vais acheter, on va manger.", ["Je vais acheter les billets.", "I'm going to buy the tickets."], ["On va manger à sept heures.", "We're going to eat at seven."])
 ],
 quiz: [
  mc("What does “On va au cinéma ?” mean?", "Shall we go to the cinema?", ["Are you at the cinema?", "I love the cinema."], "On va… ? suggests going somewhere together."),
  fill("Complete: Je ___ acheter les billets.", "vais", "from aller, “I go”", "Je vais + infinitive = I'm going to…"),
  mc("Which word means “OK”?", "D'accord", ["Devant", "Surtout"], "D'accord = OK / agreed."),
  mc("What does “devant” mean?", "In front of", ["Next to", "Behind"], "Devant le cinéma = in front of the cinema."),
  fill("Complete: Tu ___ libre samedi ?", "es", "from être, “you are”", "Tu es = you are."),
  mc("à + le becomes…", "au", ["al", "à le"], "Au cinéma, au café.")
 ]
}),
lesson(C, 5, {
 ...base, id: "asking-for-help", title: "Asking for Help", fr: "Demander de l'aide", minutes: 8, art: { emoji: "🆘" },
 description: "Say you don't understand, ask someone to repeat or slow down and ask for help politely.",
 objectives: ["Say Je ne comprends pas", "Ask Pouvez-vous répéter ? and Plus lentement, s'il vous plaît", "Ask Vous parlez anglais ?"],
 intro: "Adrien is at the train station and needs help. Learn the phrases that save every conversation when you get lost in French.",
 dialogue: [
  D("Adrien", "Excusez-moi, madame. Vous parlez anglais ?", "Excuse me, madam. Do you speak English?"),
  D("L'employée", "Un peu. Je peux vous aider ?", "A little. Can I help you?"),
  D("Adrien", "Oui, s'il vous plaît. Je cherche le train pour Lyon.", "Yes, please. I'm looking for the train to Lyon."),
  D("L'employée", "Le train part à quatorze heures, quai trois.", "The train leaves at two p.m., platform three."),
  D("Adrien", "Pardon, je ne comprends pas. Pouvez-vous répéter, plus lentement ?", "Sorry, I don't understand. Can you repeat, more slowly?"),
  D("L'employée", "Bien sûr. Quai trois, à quatorze heures.", "Of course. Platform three, at 2 p.m."),
  D("Adrien", "Ah, quai trois ! Merci beaucoup pour votre aide.", "Ah, platform three! Thank you very much for your help.")
 ],
 vocab: [
  V("je ne comprends pas", "I don't understand", "zhuh nuh kohm-PRAHN pah", "Everyday Expressions", "Pardon, je ne comprends pas.", "Sorry, I don't understand."),
  V("pouvez-vous répéter ?", "can you repeat? (polite)", "poo-vay-VOO ray-pay-TAY", "Everyday Expressions", "Pouvez-vous répéter, s'il vous plaît ?", "Can you repeat, please?"),
  V("plus lentement", "more slowly", "plew lahnt-MAHN", "Everyday Expressions", "Plus lentement, s'il vous plaît.", "More slowly, please."),
  V("vous parlez anglais ?", "do you speak English? (polite)", "voo par-lay ahn-GLEH", "Everyday Expressions", "Excusez-moi, vous parlez anglais ?", "Excuse me, do you speak English?"),
  V("je cherche…", "I'm looking for…", "zhuh SHEHRSH", "Common Verbs", "Je cherche la gare.", "I'm looking for the station."),
  V("je peux vous aider ?", "can I help you?", "zhuh puh voo zeh-DAY", "Everyday Expressions", "Bonjour, je peux vous aider ?", "Hello, can I help you?"),
  V("bien sûr", "of course", "byan SEWR", "Everyday Expressions", "Bien sûr, madame.", "Of course, madam."),
  V("pardon", "sorry / excuse me", "par-DOHN", "Everyday Expressions", "Pardon, madame.", "Sorry, madam.")
 ],
 grammar: [
  G("Je ne comprends pas", "This is your most useful sentence. Ne … pas goes around the verb: je ne comprends pas. Add pardon or excusez-moi first to sound polite.", ["Pardon, je ne comprends pas.", "Sorry, I don't understand."]),
  G("Pouvez-vous + infinitive", "Pouvez-vous is the polite way to ask “can you…?”. Add the verb in its basic form: répéter (repeat), parler (speak), m'aider (help me).", ["Pouvez-vous répéter ?", "Can you repeat?"], ["Pouvez-vous parler plus lentement ?", "Can you speak more slowly?"]),
  G("Je cherche + thing", "Je cherche means “I'm looking for”. It needs no extra word for “for”: je cherche le train, je cherche la gare.", ["Je cherche le train pour Lyon.", "I'm looking for the train to Lyon."])
 ],
 quiz: [
  mc("What does “Je ne comprends pas” mean?", "I don't understand", ["I don't know you", "I don't speak English"], "Comprendre = to understand."),
  mc("How do you ask someone politely to repeat?", "Pouvez-vous répéter ?", ["Je cherche le train.", "Bien sûr."], "Pouvez-vous + infinitive = can you…?"),
  fill("Complete: Vous parlez ___ ?", "anglais", "the language of England", "Vous parlez anglais ? = Do you speak English?"),
  mc("What does “plus lentement” mean?", "More slowly", ["More loudly", "Later"], "Lentement = slowly."),
  mc("What does “Bien sûr” mean?", "Of course", ["I'm sorry", "No problem, thanks"], "Bien sûr = of course."),
  fill("Complete: Je ___ le train pour Lyon.", "cherche", "“I look for”", "Je cherche = I'm looking for.")
 ]
})
];
