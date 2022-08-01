import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './leader-board.scss';
import { DataLeaderBoard } from './mock';
import { Row } from './sub-components/row/row';
import { RowProps } from './sub-components/row/types';

export const LeaderBoard: FC = () => {
  const [data, setData] = useState<RowProps[]>([]);

  useEffect(() => {
    const sortData = Object.values(DataLeaderBoard).sort((a, b) => b.score - a.score);
    setData(sortData);
  }, []);

  return (
    <div className={cn(styles['leader-board'], 'fullscreen', 'centered')}>
      <div className={cn(styles['leader-board__header'])}>
        <div className={styles['leader-board__header_title']}>Логин</div>
        <div className={styles['leader-board__header_title']}>Кол-во очков</div>
      </div>
      {data.length ? (
        data.length &&
        data.map((item) => <Row key={item.id} data={item} />)
      ) : (
        <div className={styles['leader-board__info']}>Пока не произошло ни одной игры</div>
      )}
    </div>
  );
};
