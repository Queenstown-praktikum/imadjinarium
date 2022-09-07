import React from 'react';
import styles from './input.scss';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = (props) => <input className={styles.input} {...props} />;
