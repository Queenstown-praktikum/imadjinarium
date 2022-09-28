import React, { useEffect, useState } from 'react';
import { Button } from 'ui-kit';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import styles from './result-round.scss';
import { useResultRound } from './useResultRound';
import { ItemResult } from './subComponents/item-result';
import { DataUserGameProps } from '../../redux/slices/game';
import { ItemFinish } from './subComponents/item-finish';
import { useLeaderboardSetScoreMutation } from '../../redux/leaderboardApi';
import { userSelectors } from '../../redux/slices/user';

type ResultRoundProps = {};

export const ResultRound: React.FC<ResultRoundProps> = () => {
  const { showModalFinish, data, handleClickButton, playersId } = useResultRound();
  const currentUser = useSelector(userSelectors.user);

  const [setScore] = useLeaderboardSetScoreMutation();
  const [dataLead, setDataLead] = useState<DataUserGameProps[]>([]);
  const navigate = useNavigate();
  const showTextButton = () => {
    if (showModalFinish) {
      return 'Новая игра';
    }
    return playersId?.length ? 'К следущему ходу' : 'Показать итоги игры';
  };

  const showTextModal = () => (showModalFinish ? 'Победитель(и)' : 'Общий результат');

  useEffect(() => {
    if (!showModalFinish) return;
    const countLeader = data[0].count;

    const dataLeaders = data.filter((item) => item.count === countLeader);

    setDataLead(dataLeaders);

    const scoreData = data.find((item) => item.id === currentUser.id);
    setScore({
      id: currentUser.id,
      login: currentUser.login,
      avatar: currentUser.avatar,
      score: scoreData?.count || 0,
    })
  }, [showModalFinish, currentUser, setScore, data]);

  const handleFinishButton = () => {
    navigate('/');
  };

  return (
    <div className={styles['result-round']}>
      <h3 className={styles['result-round__title']}>{showTextModal()}</h3>
      {dataLead.length
        ? dataLead.map((item) => (
            <div className={styles['result-round__item']} key={item.id}>
              <ItemFinish name={item.name} />
            </div>
          ))
        : null}

      {data.length
        ? data.map((item) => (
            <div className={styles['result-round__item']} key={item.id}>
              <ItemResult finish={showModalFinish} name={item.name} count={item.count} />
            </div>
          ))
        : null}
      <Button label={showTextButton()} onClick={handleClickButton} />
      {showModalFinish ? (
        <div className={styles['result-round__button']}>
          <Button label='Завершить игру' onClick={handleFinishButton} />
        </div>
      ) : null}
    </div>
  );
};
