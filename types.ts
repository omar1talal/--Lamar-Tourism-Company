export interface Destination {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  duration: string;
}

export interface Service {
  id: number;
  title: string;
  icon: string;
  description: string;
}

export interface User {
  username: string;
  email: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum AuthMode {
  LOGIN,
  SIGNUP
}
