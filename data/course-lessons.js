// All course lessons. Each lesson has the same shape as a lesson in data/lessons.js, plus `course` (a course id from data/courses.js) and `number` (its position inside that course).
import { conversationLessons } from "./course-conversations.js";
import { soundsLessons } from "./course-sounds.js";
import { everydayLessons } from "./course-everyday.js";
export const courseLessons = [...conversationLessons, ...soundsLessons, ...everydayLessons];
