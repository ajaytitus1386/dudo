import Room from "../../models/room";

export const START_ROOM = "start_room";
export const END_ROOM = "end_room";

export const ROOM_ALREADY_EXISTS = "room_already_exists";

export const USER_JOINED_ROOM = "user_joined_room";
export const USER_LEFT_ROOM = "user_left_room";

export interface RoomEmitterEvents {
  [START_ROOM]: (data: { newRoom: Room }) => void;
  [END_ROOM]: () => void;
  [ROOM_ALREADY_EXISTS]: () => void;
}
