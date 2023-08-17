import React, { useEffect, useRef, useState } from 'react';
import styles from './message.module.scss';
import classNames from 'classnames';
import { DEFAULT_MESSAGE_CLASSES, MessageProps, TRANSITION_MESSAGE_CLASSES } from './message.options';
import BotIcon from '../../assets/bot-icon.svg';
import UserIcon from '../../assets/user-icon.svg';
import { Transition } from 'react-transition-group';

const Message = ({ isRight, text }: MessageProps) => {
  const [isEnter, setIsEnter] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsEnter(true);
  }, []);

  return (
    <Transition in={isEnter} timeout={300}>
      {state => (
        <div
          ref={nodeRef}
          className={classNames(
            styles.wrapper,
            { [styles.right]: isRight }
          )}
          style={{
            ...DEFAULT_MESSAGE_CLASSES,
            ...TRANSITION_MESSAGE_CLASSES[state],
          }}
        >
          {!isRight && (
            <div className={styles.icon}>
              <img src={BotIcon} alt="bot avatar" />
            </div>
          )}
          <article className={styles.message}>
            {text}
          </article>
          {isRight && (
            <div className={styles.icon}>
              <img src={UserIcon} alt="user avatar" />
            </div>
          )}
        </div>
      )}
    </Transition>
  );
}

export default Message;
