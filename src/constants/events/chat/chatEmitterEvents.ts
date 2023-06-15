export const CHAT_MESSAGE = "chat_message";

export interface ChatEmitterEvents {
  [CHAT_MESSAGE]: (data: { message: string }) => void;
}
