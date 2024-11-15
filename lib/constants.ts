import { Message, FeaturedQuestion } from "./types";

export const FEATURED_QUESTIONS: FeaturedQuestion[] = [
  {
    id: 1,
    text: "Did Romania secretly win World War II and forget to tell everyone?",
  },
  {
    id: 2,
    text: "Are the potholes in Bucharest part of a new urban art project?",
  },
  { id: 3, text: "Did the politicians forget the password to progress?" },
];

export const INITIAL_CHAT_HISTORY: Message[] = [
  { id: 1, text: "Where is Elodia?" },
  { id: 2, text: "Did Romania win WW2?" },
  { id: 3, text: "Was Geoana in PSD?" },
];
