export const CREATE_ROOM = "create_room";
export const HOST_ENDS_ROOM = "host_ends_room";

export const USER_JOIN_ROOM = "user_join_room";
export const USER_LEAVE_ROOM = "user_leave_room";

export const USER_READY = "user_ready";
export const USER_UNREADY = "user_unready";

/* -------------------------------------------------------------------------- */

/**
 * An interface that defines the what arguments are expected for each event
 */
export interface RoomListenerEvents {
  [CREATE_ROOM]: (data: { roomName: string; hostName: string }) => void;
}
