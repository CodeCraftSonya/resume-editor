import { memo, type ReactNode } from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

type InputProps = React.ComponentPropsWithRef<'input'> & {
  label?: string;
  error?: string;
  info?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const Input = ({
  label,
  error,
  info,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) => {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}
      <div
        className={clsx(
          styles.inputContainer,
          props.type === 'search' && styles.typeSearch,
          error && styles.error
        )}
      >
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <input className={styles.input} {...props}></input>
        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
      {!error && info && <p className={styles.infoText}>{info}</p>}
    </div>
  );
};

export default memo(Input);
