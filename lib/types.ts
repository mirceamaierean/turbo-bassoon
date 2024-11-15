// types.ts
export interface Message {
  id: number;
  text: string;
  sender?: "user" | "ai";
}

export interface FeaturedQuestion {
  id: number;
  text: string;
}
