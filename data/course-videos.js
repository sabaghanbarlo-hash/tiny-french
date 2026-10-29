// Long-format lesson videos (1920x1080) made by the tiny-french-youtube generator and hosted on its GitHub Pages site.
// id = course lesson id. Captions live in assets/video/<stem>.vtt (converted from the generator's .srt).
const HOST = "https://sabaghanbarlo-hash.github.io/tiny-french-youtube/videos/";
const v = (stem, uploaded) => ({ src: `${HOST}${stem}.mp4`, poster: `${HOST}${stem}.thumbnail.png`, vtt: `assets/video/${stem}.vtt`, uploaded, note: "Long-format lesson video (16:9) with the story, vocabulary, grammar and a quiz. French and English subtitles." });
export const courseVideos = {
  "greetings-through-the-day": v("fc-01-greetings-through-the-day", "2026-10-29")
};
