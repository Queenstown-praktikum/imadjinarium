import React, { FC } from 'react';
import { Button } from 'ui-kit';
import styles from './round-intro.scss';
import { LeadingBlock } from '../round-results/leading-block/leading-block';
import { Cards } from '../../features/cards/cards';
import { Input } from '../../ui-kit/input/input';
import { Modal } from '../../ui-kit/modal/modal';
import { StatusPanel } from '../../features/status-panel/status-panel';
import { DataProps, useHandOutCards } from '../player-selection/useHandOutCards';

type RoundIntroPageProps = {
  rounds: {
    current: number;
    all: number;
  };
  userRole: 'leading' | 'player';
};

const renderBlockControl = (
  userRole: string,
  data: DataProps,
  onChange: (e: React.FocusEvent<HTMLInputElement>) => void,
  handleClickButton: () => void,
) => {
  const idDisabled = data.value.length === 0 || data.id === null;

  switch (userRole) {
    case 'leading':
      return (
        <div className={styles['round-intro__input']}>
          <span className={styles['round-intro__label']}>Ассоциация</span>
          <div className={styles['round-intro__wrapper-input']}>
            <Input value={data.value} onChange={onChange} />
            <Button label='Готово' disabled={idDisabled} onClick={handleClickButton} />
          </div>
        </div>
      );
    case 'player':
      return (
        <div className={styles['round-intro__input']}>
          <div className={styles['round-intro__block-control']}>
            <div className={styles['round-intro__wrapper-button']}>
              <Button label='Готово' onClick={() => {}} />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const renderInstruction = (userRole: string) => {
  switch (userRole) {
    case 'leading':
      return (
        <>
          <span>Сейчас вы ведущий</span>
          <span className={styles['round-intro__desc']}>Выберите карту и загадайте к ней свою ассоциацию</span>
        </>
      );
    case 'player':
      return (
        <>
          <span>Подберите карту к ассоциации ведущего</span>
          <div className={styles['instruction__leading-block']}>
            <LeadingBlock name='Аркадий' association={{ displayType: 'narrow', text: 'выхухоль' }} avatar='' />
          </div>
        </>
      );
    default:
      return null;
  }
};

export const RoundIntroPage: FC<RoundIntroPageProps> = ({ rounds, userRole }) => {
  const { usersCards, user, data, onChange, handleClickButton, showModal, handleClickButtonCard } = useHandOutCards();

  return (
    <>
      <div className={styles['round-intro']}>
        <h3 className={styles['round-intro__round-count']}>
          Ход {rounds.current}
          <span className={styles['round-intro__round-count_all']}> из {rounds.all}</span>
        </h3>
        <div className={styles['round-intro__instruction']}>{renderInstruction(userRole)}</div>
        <Cards data={usersCards} user={user} choiceCard={handleClickButtonCard} />
        {renderBlockControl(userRole, data, onChange, handleClickButton)}
      </div>
      {showModal && (
        <Modal>
          <StatusPanel title='Ждем остальных игроков' />
        </Modal>
      )}
    </>
  );
};
