import React from 'react';
import { InputProps } from './input.options';

const Input = ({ onChange, ...p }: InputProps) => {
  return (
    <input
      {...p}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}

export default Input;
