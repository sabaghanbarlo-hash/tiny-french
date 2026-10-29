// All course lessons. Each lesson has the same shape as a lesson in data/lessons.js, plus `course` (a course id from data/courses.js) and `number` (its position inside that course).
// Videos are added from data/course-videos.js by lesson id.
import { conversationLessons } from "./course-conversations.js";
import { soundsLessons } from "./course-sounds.js";
import { everydayLessons } from "./course-everyday.js";
import { courseVideos } from "./course-videos.js";
export const courseLessons = [...conversationLessons, ...soundsLessons, ...everydayLessons].map((l) => ({ ...l, video: courseVideos[l.id] || l.video || null }));
