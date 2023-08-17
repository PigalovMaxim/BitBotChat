import React, { useState } from 'react';
import styles from './chatInput.module.scss';
import Input from '../../ui/input/input';
import Button from '../../ui/button/button';
import SendIcon from '../../assets/send-icon.svg';
import { ChatInputProps } from './chatInput.options';
import { createPortal } from 'react-dom';
import Toast from '../../ui/toast/toast';
import useToast from '../../hooks/useToast';

const ChatInput = ({ onSend, canSendMessage }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isSendError, enableSendError] = useToast();

  const onSendClickHandler = () => {
    if (!canSendMessage) return enableSendError();
    onSend(inputValue);
    setInputValue('');
  }

  return (
    <div className={styles.wrapper}>
      {isSendError && (
        createPortal(
          <Toast text="На данный момент происходит получение сообщения, пожалуйста, дождитесь конца загрузки" />,
          document.body
        )
      )}
      <Input
        placeholder="Start typing here..."
        className={styles.input}
        value={inputValue}
        onChange={setInputValue}
      />
      <Button
        className={styles.button}
        onClick={onSendClickHandler}
      >
        <img src={SendIcon} alt="send" />
      </Button>
    </div>
  );
}

export default React.memo(ChatInput);
