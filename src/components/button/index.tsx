import React, { FC } from 'react';
import cn from 'classnames';
import styles from './button.scss';
import { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({ children, type = 'button', ...props }) => (
  <button {...props} type={type === 'button' ? 'button' : 'submit'} className={cn(styles.button)}>
    {children}
  </button>
);
