import React, { FC } from 'react';
import cn from 'classnames';
import styles from './button.scss';
import { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({ children, ...props }) => (
    <button {...props} type='button' className={cn(styles.button)}>
      {children}
    </button>
  );
