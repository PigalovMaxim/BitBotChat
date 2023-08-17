import React from 'react';
import styles from './chatTitle.module.scss';

const ChatTitle = () => {
  return (
    <div className={styles.title}>
      <h1>Bot Chat</h1>
      <h2>AI-based service</h2>
    </div>
  );
}

export default React.memo(ChatTitle);
