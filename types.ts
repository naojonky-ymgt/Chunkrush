
export enum GameStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  PLAYING_FLASHCARD = 'PLAYING_FLASHCARD',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR'
}

export interface ChunkPair {
  id: string;
  japanese: string;
  english: string;
}

export interface CardItem {
  id: string;
  text: string;
  lang: 'ja' | 'en';
  pairId: string;
  isMatched: boolean;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  progress: number; // 0 to 100%
  isBot: boolean;
  avatarColor: string;
}
