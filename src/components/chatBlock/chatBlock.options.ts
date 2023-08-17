import { Message } from "../../services/chat/chat.service.options"

export type ChatBlockProps = {
  messages: Message[]
  stopWrite: () => void
  canSendMessage: boolean
}