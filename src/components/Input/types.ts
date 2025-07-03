import type { ReactNode } from 'react';

export type InputProps = React.ComponentPropsWithRef<'input'> & {
  label?: string;
  error?: string;
  info?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};
