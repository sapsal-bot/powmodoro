

export enum TimerStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED'
}

export interface CatImage {
  id: string;
  url: string;
}

export interface AppState {
  sessionCount: number;
  timerStatus: TimerStatus;
  currentTime: number; // in seconds
  initialTime: number; // in seconds
}

declare global {
  // AIStudio interface and window.aistudio declaration are removed
  // as Gemini API key selection is no longer used for praise generation.
}
