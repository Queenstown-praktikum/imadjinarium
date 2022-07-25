import React, { FC } from 'react';
import cn from 'classnames';
import styles from './input-messages.scss';
import { InputMessagesProps } from './types';

export const InputMessage: FC<InputMessagesProps> = (props) => <textarea {...props} className={cn(styles['item-messages'])} />;
