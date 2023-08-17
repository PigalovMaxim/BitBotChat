import React, { useEffect, useRef } from 'react';
import styles from './chatBlock.module.scss';
import Message from '../../ui/message/message';
import { ChatBlockProps } from './chatBlock.options';
import Button from '../../ui/button/button';

const ChatBlock = ({ messages, canSendMessage, stopWrite }: ChatBlockProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scroll({ top: scrollRef.current?.scrollHeight });
  }, [messages]);

  return (
    <div className={styles.wrapper}>
      <div
        ref={scrollRef}
        className={styles.chat}
      >
        {messages.map(item => (
          <Message
            key={item.id}
            text={item.text}
            isRight={!item.isLeftMessage}
          />
        ))}
        {!canSendMessage && (
          <Button className={styles.stop} onClick={stopWrite}>
            Остановить
          </Button>
        )}
      </div>
    </div>
  );
}

export default ChatBlock;
