import React, { FC } from 'react';
import cn from 'classnames';
import styles from './unexpected-error.scss';

export const UnexpectedErrorPage: FC = () => (
  <div className={cn(styles['unexpected-error'], 'fullscreen', 'centered')}>
    <h1 className={styles['unexpected-error__title']}>Упс... Что-то пошло не так :(</h1>
    <h3 className={styles['unexpected-error__subtitle']}>Мы уже знаем о проблеме и скоро ее починим</h3>
  </div>
);
