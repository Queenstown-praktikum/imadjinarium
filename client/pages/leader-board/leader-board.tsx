import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './leader-board.scss';
import { Row } from './sub-components/row/row';
import { DataProps } from './sub-components/row/types';
import { useGetLeaderboardMutation } from '../../redux/leaderboardApi';

export const LeaderBoard: FC = () => {
  const [data, setData] = useState<DataProps[]>([]);
  const [getLeaderboard, { data: leaderboardData }] = useGetLeaderboardMutation()

  useEffect(() => {
    getLeaderboard({})
  }, [getLeaderboard]);

  useEffect(() => {
    setData(leaderboardData || [])
  }, [leaderboardData])

  return (
    <div className={cn(styles['leader-board'], 'fullscreen', 'centered')}>
      <div className={cn(styles['leader-board__header'])}>
        <div className={styles['leader-board__header-title']}>Логин</div>
        <div className={styles['leader-board__header-title']}>Кол-во очков</div>
      </div>
      {data.length ? (
        data.map((item) => <Row key={item.data.id} data={item.data} />)
      ) : (
        <div className={styles['leader-board__info']}>Пока не произошло ни одной игры</div>
      )}
    </div>
  );
};
