export type Sender = "user" | "ai";
export interface Message {
  id: number;
  text: string;
  sender?: Sender;
}

export interface FeaturedQuestion {
  id: number;
  text: string;
}
