export const GAME_START = "game_start";
export const GAME_END = "game_end";

export interface GameEmitterEvents {
  [GAME_START]: () => void;
  [GAME_END]: () => void;
}
