// Long-format lesson videos (1920x1080, about 7 minutes) made by the tiny-french-youtube generator and hosted on its GitHub Pages site.
// Key = course lesson id. Captions live in assets/video/<stem>.vtt (converted from the generator's .srt).
// To add a video: render the lesson in tiny-french-youtube, copy its .srt to assets/video/<stem>.vtt (WebVTT), then add a line here.
const HOST = "https://sabaghanbarlo-hash.github.io/tiny-french-youtube/videos/";
const v = (stem) => ({ src: `${HOST}${stem}.mp4`, poster: `${HOST}${stem}.thumbnail.png`, vtt: `assets/video/${stem}.vtt`, uploaded: "2026-10-29", note: "Long-format lesson video (16:9) with the story, vocabulary, grammar and a quiz. French and English subtitles." });
export const courseVideos = {
  "days-and-today": v("ef-01-days-and-today"),
  "telling-the-time": v("ef-02-telling-the-time"),
  "likes-and-dislikes": v("ef-03-likes-and-dislikes"),
  "making-plans": v("ef-04-making-plans"),
  "asking-for-help": v("ef-05-asking-for-help"),
  "weather-and-seasons": v("ef-06-weather-and-seasons"),
  "at-the-hotel": v("ef-07-at-the-hotel"),
  "greetings-through-the-day": v("fc-01-greetings-through-the-day"),
  "introducing-yourself": v("fc-02-introducing-yourself"),
  "numbers-and-prices": v("fc-03-numbers-and-prices"),
  "ordering-at-the-cafe": v("fc-04-ordering-at-the-cafe"),
  "asking-for-directions": v("fc-05-asking-for-directions"),
  "family-and-friends": v("fc-06-family-and-friends"),
  "buying-a-train-ticket": v("fc-07-buying-a-train-ticket"),
  "accents-and-the-alphabet": v("fs-01-accents-and-the-alphabet"),
  "silent-letters-and-liaison": v("fs-02-silent-letters-and-liaison"),
  "nasal-vowels": v("fs-03-nasal-vowels"),
  "the-french-u-and-r": v("fs-04-the-french-u-and-r"),
  "reading-signs-and-menus": v("fs-05-reading-signs-and-menus"),
  "vowel-combinations": v("fs-06-vowel-combinations"),
  "rhythm-and-questions": v("fs-07-rhythm-and-questions")
};
