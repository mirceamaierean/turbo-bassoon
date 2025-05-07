import { Message, FeaturedQuestion } from "./types";

export const FEATURED_QUESTIONS: FeaturedQuestion[] = [
  {
    id: 1,
    text: "Who will be the successor of Pope Francis?",
  },
  {
    id: 2,
    text: "What is the most common animal in Florida?",
  },
  { id: 3, text: "What tarrifs were imposed on the US by the EU?" },
];

export const INITIAL_CHAT_HISTORY: Message[] = [
  { id: 1, text: "Where is Elodia?" },
  { id: 2, text: "Ukrainian War" },
  { id: 3, text: "What is the capital of France?" },
];
