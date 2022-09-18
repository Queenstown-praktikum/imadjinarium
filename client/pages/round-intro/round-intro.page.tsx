import React, { FC } from 'react';
import { Button } from 'ui-kit';
import styles from './round-intro.scss';
import { LeadingBlock } from '../round-results/leading-block/leading-block';
import { Cards } from '../../features/cards/cards';
import { Input } from '../../ui-kit/input/input';
import { Modal } from '../../ui-kit/modal/modal';
import { StatusPanel } from '../../features/status-panel/status-panel';
// import { DataProps, useHandOutCards } from './useHandOutCards';
import { useRound } from './useRound';
// import { useModalStatusPanel } from './useModalStatusPanel';

type RoundIntroPageProps = {
  rounds: {
    current: number;
    all: number;
  };
};

const renderBlockControl = (
  userRole: string,
  value: string,
  onChange: (e: React.FocusEvent<HTMLInputElement>) => void,
  handleClickButton: () => void,
  selectedCard: number | null,
) => {
  const idDisabled = value.length === 0 || selectedCard === null;

  switch (userRole) {
    case 'leading':
      return (
        <div className={styles['round-intro__input']}>
          <span className={styles['round-intro__label']}>Ассоциация</span>
          <div className={styles['round-intro__wrapper-input']}>
            <Input value={value} onChange={onChange} />
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

const renderModal = () => (
  // useModalStatusPanel();
  <Modal>
    <StatusPanel title='Ждем остальных игроков' />
  </Modal>
);
export const RoundIntroPage: FC<RoundIntroPageProps> = ({ rounds }) => {
  // const { usersCards, user, data, onChange, handleClickButton, showModal, handleClickButtonCard } = useHandOutCards();
  const { role, activeUser, handleClickButtonCard, association, onChange, handleClickButton, selectedCard, showModal } =
    useRound();

  if (!activeUser) return null;

  return (
    <>
      <div className={styles['round-intro']}>
        <h3 className={styles['round-intro__round-count']}>
          Ход {rounds.current}
          <span className={styles['round-intro__round-count_all']}> из {rounds.all}</span>
        </h3>
        <div className={styles['round-intro__instruction']}>{renderInstruction(role)}</div>
        <Cards data={activeUser.cards} choiceCard={handleClickButtonCard} />
        {renderBlockControl(role, association, onChange, handleClickButton, selectedCard)}
      </div>
      {showModal && renderModal()}
    </>
  );
};
