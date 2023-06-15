export const SEND_CHAT_MESSAGE = "send_chat_message";

export interface ChatListenerEvents {
  [SEND_CHAT_MESSAGE]: (data: { message: string }) => void;
}
