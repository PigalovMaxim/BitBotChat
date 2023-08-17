import React from 'react';
import { ButtonProps } from './button.options';

const Button = ({ children, ...p }: ButtonProps) => {
  return (
    <button
      {...p}
    >
      {children}
    </button>
  );
}

export default Button;
