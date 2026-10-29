// Helpers for course lessons. Same lesson shape as data/lessons.js, plus `course` (course id) and a per-course `number`.
export const D = (who, fr, en) => ({ who, fr, en });
export const S = (scene) => ({ scene });
export const V = (fr, en, say, cat, ex, exEn) => ({ fr, en, say, cat, ex, exEn });
export const G = (title, body, ...ex) => ({ title, body, examples: ex.map(([fr, en]) => ({ fr, en })) });
let n = 0;
// mc: the correct answer is inserted at a rotating position so it is not always first.
export const mc = (q, answer, wrong, explain) => { const options = [...wrong]; options.splice(n++ % (wrong.length + 1), 0, answer); return { type: "mc", q, options, answer, explain }; };
export const fill = (q, answer, hint, explain) => ({ type: "fill", q, hint, answer, explain });
export const lesson = (course, number, o) => ({ course, number, type: "Short dialogue", level: "Absolute beginner", minutes: 8, video: null, instagram: "", art: { emoji: "💬" }, ...o });
