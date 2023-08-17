import { MessageChunk, MessageChunkStatuses } from "./chat.service.options";
import config from '../../configs/config.json';

export default abstract class ChatService {
  public static sendMessage = async (message: string) => {
    try {
      const response = await fetch(
        `${config.BASE_URL}/chat/send-message`,
        {
          method: 'POST',
          body: JSON.stringify({ message }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const reader = response.body?.getReader();
      const chunks: MessageChunk[] = []
      const readChunk = async () => {
        const answer = await reader?.read();
        if (!answer) return;
        if (answer.done) return;
        // Декодируем Uint8Array и достаём из него объекты
        new TextDecoder("utf-8").decode(answer.value).split('}').filter(Boolean).forEach(item => {
          const chunk: MessageChunk = JSON.parse(item + '}');
          if (chunk.status === MessageChunkStatuses.CONTENT) {
            chunks.push(chunk)
          }
        });
        await readChunk();
      }
  
      await readChunk();
      return chunks;
    } catch (e) {
      return null;
    }
  }
}