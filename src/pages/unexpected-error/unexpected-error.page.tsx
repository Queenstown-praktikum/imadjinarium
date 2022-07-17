import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import styles from './unexpected-error.scss';

export const UnexpectedErrorPage: FC = () => {
  const handleGoToLanding = useCallback(() => {
    window.location.pathname = '/';
  }, []);

  return (
    <div className={cn(styles['unexpected-error'], 'fullscreen', 'centered')}>
      <h1 className={styles['unexpected-error__title']}>Упс... Что-то пошло не так :(</h1>
      <button type='button' onClick={handleGoToLanding} className={styles['unexpected-error__button']}>
        Вернуться на главную страницу
      </button>
    </div>
  );
};
