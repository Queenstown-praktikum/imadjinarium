import React, { FC } from 'react';
import cn from 'classnames';
import styles from './button.scss';
import { ButtonProps } from './types';

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const {
    primary = true,
    size = 'medium',
    backgroundColor,
    label,
    buttonClass,
    ...otherProps
  } = props
  const mode = primary ? styles.btn__primary : styles.btn__secondary;
  return <button
    type="button"
    className={cn(styles.btn, mode, styles[`btn__${size}`], buttonClass)}
    style={{ backgroundColor }}
    {...otherProps}
  >
    {label}
  </button>
};

export default Button
