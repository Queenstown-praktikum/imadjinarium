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
import { ItemDataUserProps } from '../../redux/slices/game';
import { RoundsProps } from '../../core/routing/routing';
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
  handleClickButton: (data?: number) => () => void,
  selectedCard: number | null,
  rounds: RoundsProps,
) => {
  const idDisabled = value.length === 0 || selectedCard === null;

  switch (userRole) {
    case 'leading':
      return (
        <div className={styles['round-intro__input']}>
          <span className={styles['round-intro__label']}>Ассоциация</span>
          <div className={styles['round-intro__wrapper-input']}>
            <Input value={value} onChange={onChange} />
            <Button label='Готово' disabled={idDisabled} onClick={handleClickButton()} />
          </div>
        </div>
      );
    case 'player':
      return (
        <div className={styles['round-intro__input']}>
          <div className={styles['round-intro__block-control']}>
            <div className={styles['round-intro__wrapper-button']}>
              <Button label='Готово' disabled={idDisabled} onClick={handleClickButton(rounds.current)} />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const renderInstruction = (userRole: string, association: string, leadUser: ItemDataUserProps, rounds: RoundsProps) => {
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
          {rounds.current > 1 ? (
            <span>Угадайте какую карту загадал ведущий</span>
          ) : (
            <span>Подберите карту к ассоциации ведущего</span>
          )}

          <div className={styles['instruction__leading-block']}>
            <LeadingBlock
              name={leadUser?.name}
              association={{ displayType: 'narrow', text: `${association}` }}
              avatar=''
            />
          </div>
        </>
      );
    default:
      return null;
  }
};

const renderContentModalChoice = () => (
    <div className={styles['modal-choice']}>
      <h3 className={styles['modal-choice__title']}>Подождите пока ведущий выберет ассоциацию</h3>
    </div>
  );

export const RoundIntroPage: FC<RoundIntroPageProps> = ({ rounds }) => {
  const {
    mode,
    role,
    activeUser,
    handleClickButtonCard,
    association,
    onChange,
    handleClickButton,
    selectedCard,
    showModal,
    setShowModal,
    showModalChoice,
    leadUser,
    selectedCards,
  } = useRound();

  if (!activeUser) return null;

  const cardsData = () => rounds.current > 1 ? selectedCards : activeUser.cards;

  return (
    <>
      <div className={styles['round-intro']}>
        <h3 className={styles['round-intro__round-count']}>
          Ход {rounds.current}
          <span className={styles['round-intro__round-count_all']}> из {rounds.all}</span>
        </h3>
        <div className={styles['round-intro__instruction']}>
          {renderInstruction(role, association, leadUser, rounds)}
        </div>
        <Cards data={cardsData()} choiceCard={handleClickButtonCard} />
        {renderBlockControl(role, association, onChange, handleClickButton, selectedCard, rounds)}
      </div>
      {showModal && (
        <Modal>
          <StatusPanel title='Ждем остальных игроков' close={() => setShowModal(false)} mode={mode} />
        </Modal>
      )}
      {showModalChoice && <Modal>{renderContentModalChoice()}</Modal>}
    </>
  );
};
