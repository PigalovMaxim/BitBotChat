import React, { useCallback, useEffect, useState } from 'react';
import styles from './chat.module.scss';
import ChatTitle from '../../ui/chatTitle/chatTitle';
import ChatInput from '../../components/chatInput/chatInput';
import ChatBlock from '../../components/chatBlock/chatBlock';
import ChatService from '../../services/chat/chat.service';
import { Message, MessageChunk } from '../../services/chat/chat.service.options';
import randomKey from '../../helpers/randomKey';
import Toast from '../../ui/toast/toast';
import useToast from '../../hooks/useToast';
import { createPortal } from 'react-dom';

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [canSendMessage, setCanSendMessage] = useState(true);
  const [isServerErrorModal, enableServerErrorModal] = useToast();
  let currentLetters: MessageChunk[] = [];
  let isWriteStopped = false

  const stopWrite = useCallback(() => {
    isWriteStopped = true;
  }, [])

  const onSendHandler = useCallback(async (message: string) => {
    // Сначала устанавливаем уже готовые сообщения перед запросом, так как React воспринимает несколько setMessages как один
    setMessages(old => (
      [
        ...old,
        { isLeftMessage: false, text: message, id: randomKey(10) },
        { isLeftMessage: true, text: 'Идёт обработка сообщения, пожалуйста, подождите...', id: randomKey(10) },
      ]
    ));
    setCanSendMessage(false);
    const letters = await ChatService.sendMessage(message);
    if (!letters) return enableServerErrorModal();
    setMessages(old => {
      old[old.length - 1] = { ...old[old.length - 1], text: letters[0].value || '' };
      return old;
    });
    currentLetters = letters;
    requestAnimationFrame(() => fillMessage(1));
  }, []);

  const fillMessage = (index: number) => {
    if (index === currentLetters.length - 1 || isWriteStopped) {
      currentLetters = [];
      setCanSendMessage(true);
      isWriteStopped = false;
      return;
    }
    setMessages(old => {
      const newMessages = structuredClone(old);
      const last = newMessages[newMessages.length - 1];
      newMessages[newMessages.length - 1] = { ...last, text: last.text + currentLetters[index].value || '' };
      return newMessages;
    });

    requestAnimationFrame(() => fillMessage(index + 1));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        {isServerErrorModal && (
          createPortal(
            <Toast text="Произошла ошибка с сервером, пожалуйста, обновите страницу и попробуйте ещё раз" />,
            document.body
          )
        )}
        <ChatTitle />
        <ChatBlock
          messages={messages}
          stopWrite={stopWrite}
          canSendMessage={canSendMessage}
        />
        <ChatInput
          canSendMessage={canSendMessage}
          onSend={onSendHandler}
        />
      </div>
    </div>
  );
}

export default Chat;
