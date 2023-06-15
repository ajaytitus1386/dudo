import { ChatEmitterEvents } from "./chat/chatEmitterEvents";
import { ChatListenerEvents } from "./chat/chatListenerEvents";
import { GameEmitterEvents } from "./game/gameEmitterEvents";
import { GameListenerEvents } from "./game/gameListenerEvents";
import { RoomEmitterEvents } from "./room/roomEmitterEvents";
import { RoomListenerEvents } from "./room/roomListenerEvents";

interface ServerToClientEvents
  extends RoomEmitterEvents,
    GameEmitterEvents,
    ChatEmitterEvents {
  noArg: () => void;
}

interface ClientToServerEvents
  extends RoomListenerEvents,
    GameListenerEvents,
    ChatListenerEvents {
  noArg: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {}

export {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
};
