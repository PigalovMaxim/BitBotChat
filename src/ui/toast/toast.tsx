import React from 'react';
import styles from './toast.module.scss';

const Toast = ({ text }: { text: string }) => {
  return (
    <div className={styles.toast}>
      {text}
    </div>
  );
}

export default Toast;
