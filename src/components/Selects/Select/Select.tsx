import React, { memo } from 'react';
import clsx from 'clsx';
import styles from './Select.module.css';

type Option =
  | { value: string; label: string }
  | { label: string; options: { value: string; label: string }[] };

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  info?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  options: Option[];
}

const Select = ({
  id,
  label,
  error,
  info,
  leftIcon,
  rightIcon,
  options,
  ...props
}: SelectProps) => {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={clsx(styles.selectContainer, error && styles.error)}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

        <select required id={id} className={styles.select} {...props}>
          {options.map((opt) =>
            'options' in opt ? (
              <optgroup key={opt.label} label={opt.label}>
                {opt.options.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
            ) : (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            )
          )}
        </select>

        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
      {!error && info && <p className={styles.infoText}>{info}</p>}
    </div>
  );
};

export default memo(Select);
