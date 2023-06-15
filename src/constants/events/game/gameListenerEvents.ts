export const HOST_STARTS_GAME = "host_starts_game";
export const HOST_ENDS_GAME = "host_ends_game";

export interface GameListenerEvents {
  [HOST_STARTS_GAME]: () => void;
  [HOST_ENDS_GAME]: () => void;
}
