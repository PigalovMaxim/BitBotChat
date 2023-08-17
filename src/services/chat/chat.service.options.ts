export type MessageChunk = {
  status: MessageChunkStatuses
  value: string | null
}

export type Message = {
  text: string
  id: string
  isLeftMessage: boolean
}

export enum MessageChunkStatuses {
  CONTENT = 'content',
  DONE = 'done',
}