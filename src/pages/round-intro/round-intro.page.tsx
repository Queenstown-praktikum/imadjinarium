import React, { FC, useCallback } from 'react';
import styles from './round-intro.scss';
import { LeadingBlock } from '../round-results/leading-block/leading-block';

type RoundIntroPageProps = {
  rounds: {
    current: number;
    all: number;
  };
  userRole: 'leading' | 'player';
};

export const RoundIntroPage: FC<RoundIntroPageProps> = ({ rounds, userRole }) => {
  const renderInstruction = useCallback(() => {
    switch (userRole) {
      case 'leading':
        return (
          <>
            <span>Сейчас вы ведущий</span>
            <span>Выберите карту и загадайте к ней свою ассоциацию</span>
          </>
        );
      case 'player':
        return (
          <>
            <span>Подберите карту к ассоциации ведущего</span>
            <div className={styles['instruction__leading-block']}>
              <LeadingBlock name='Аркадий' association={{ displayType: 'narrow', text: 'выхухоль' }} />
            </div>
          </>
        );
      default:
        return null;
    }
  }, [userRole]);

  return (
    <div className={styles['round-intro']}>
      <h3 className={styles['round-intro__round-count']}>
        Ход {rounds.current}
        <span className={styles['round-intro__round-count_all']}> из {rounds.all}</span>
      </h3>
      <div className={styles['round-intro__instruction']}>{renderInstruction()}</div>
      <button className={styles['round-intro__button']} type='button'>
        Погнали
      </button>
    </div>
  );
};
