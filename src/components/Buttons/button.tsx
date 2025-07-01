import { forwardRef, memo } from 'react';
import styles from './button.module.css';
import type { ButtonProps } from './types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'primary',
      onClick,
      className = '',
      htmlType = 'button',
      disabled = false,
      children
    },
    ref
  ) => {
    return (
      <button
        type={htmlType}
        className={`${styles[type]} ${className}`}
        onClick={onClick}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default memo(Button);
