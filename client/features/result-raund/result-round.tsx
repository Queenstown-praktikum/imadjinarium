import React from 'react';
import { Button } from 'ui-kit';
import styles from './result-round.scss';
import { useResultRound } from './useResultRound';
import { ItemResult } from './subComponents/item-result';

export const ResultRound = () => {
  const { data, handleClickButton } = useResultRound();
  console.log({ data });
  return (
    <div className={styles['result-round']}>
      <h3 className={styles['result-round__title']}>Общий результат</h3>
      {data &&
        Object.values(data).map((item) => (
          <div className={styles['result-round__item']} key={item.id}>
            <ItemResult name={item.name} count={item.count} />
          </div>
        ))}
      <Button label='К следущему ходу' onClick={handleClickButton} />
    </div>
  );
};
