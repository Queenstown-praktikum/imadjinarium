import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationState } from '../store';
import { PlayerMapType } from './players';

type IdUser = number;
export type UserDataProps = Record<IdUser, number[]>;

export type ItemDataUserProps = {
  id: number;
  name: string;
  avatar: string;
  cards: number[];
};

export type DataUserProps = Record<number, ItemDataUserProps>;

export type DataUserResultPage = {
  id: number;
  idCard: number;
  name: string;
  votedId: number[];
};

export type DataUserGameProps = {
  id: number;
  name: string;
  count: number;
};

type StateType = {
  dataUser: DataUserProps; // данные игроков после инициализации
  leaderUserId: number | null; // id ведущего
  associationText: string; // текст ассоциации
  selectedCards: Record<number, number>; // выбранные карты
  votedCards: Record<number, number | null>; // выбранные карты
  playersId: number[]; // тут лежат id всех игроков
  dataResultPage: DataUserResultPage[]; // тут данные страницы result-round
  dataResultGame: DataUserGameProps[];
  round: number;

  selectedCardId: Record<number, number>;
  votedCardId: Record<number, number>;
  playersRound: PlayerMapType;
};

const initialState: StateType = {
  dataUser: {},
  leaderUserId: null,
  associationText: '',
  selectedCards: {},
  votedCards: {},
  dataResultPage: [],
  round: 1,
  playersId: [],
  dataResultGame: [],

  selectedCardId: {},
  votedCardId: {},
  playersRound: {},
};
/* eslint-disable no-param-reassign */
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateDataResultGame: (state: StateType, action: PayloadAction<{ data: DataUserGameProps[] }>) => {
      state.dataResultGame = action.payload.data;
    },
    setDataUser: (state: StateType, action: PayloadAction<{ data: DataUserProps }>) => {
      state.dataUser = action.payload.data;
    },
    updateLeaderUserId: (state: StateType, action: PayloadAction<{ id: number | null }>) => {
      state.leaderUserId = action.payload.id;
      if (action.payload.id !== null) {
        state.playersId = state.playersId.filter((item) => item !== action.payload.id);
      }
    },
    updateAssociationText: (state: StateType, action: PayloadAction<{ text: string }>) => {
      state.associationText = action.payload.text;
    },
    setSelectedCardUser: (state: StateType, action: PayloadAction<{ idUser: number; idCard: number }>) => {
      state.selectedCards[action.payload.idUser] = action.payload.idCard;
    },
    resetSelectedCardUser: (state: StateType) => {
      state.selectedCards = {};
    },
    setVotedCardUser: (state: StateType, action: PayloadAction<{ idUser: number; idCard: number | null }>) => {
      state.votedCards[action.payload.idUser] = action.payload.idCard;
    },
    resetVotedCardUser: (state: StateType) => {
      state.votedCards = {};
    },
    setDataResultPage: (state: StateType, action: PayloadAction<{ data: DataUserResultPage[] }>) => {
      state.dataResultPage = action.payload.data;
    },
    resetDataResultPage: (state: StateType) => {
      state.dataResultPage = [];
    },
    setPlayers: (state: StateType, action: PayloadAction<{ data: number[] }>) => {
      state.playersId = action.payload.data;
    },

    updateRound: (state: StateType, action: PayloadAction<{ round: number }>) => {
      state.round = action.payload.round;
    },

    filtersCardUsers: (state: StateType, action: PayloadAction<{ data: Record<number, number> }>) => {
      Object.entries(action.payload.data).forEach(([key, item]) => {
        const keyUser = Number(key);
        state.dataUser[keyUser] = {
          ...state.dataUser[keyUser],
          cards: state.dataUser[keyUser].cards.filter((i) => i !== item),
        };
      });
    },

    addSelectedId: (state: StateType, action: PayloadAction<{ id: number; value: number }>) => {
      state.selectedCardId = {
        ...state.selectedCardId,
        [action.payload.id]: action.payload.value,
      };
    },
    addVotedId: (state: StateType, action: PayloadAction<{ id: number; value: number }>) => {
      state.votedCardId = {
        ...state.votedCardId,
        [action.payload.id]: action.payload.value,
      };
    },
    updatePlayersRound: (state: StateType, action: PayloadAction<PlayerMapType>) => {
      /* eslint-disable no-param-reassign */
      state.playersRound = action.payload;
    },
  },
});

const {
  reducer: gameReducer,
  actions: {
    updateLeaderUserId,
    updateAssociationText,
    setSelectedCardUser,
    resetSelectedCardUser,
    updateRound,
    addSelectedId,
    addVotedId,
    updatePlayersRound,
    setPlayers,
    setDataUser,
    setVotedCardUser,
    resetVotedCardUser,
    setDataResultPage,
    resetDataResultPage,
    filtersCardUsers,
    updateDataResultGame,
  },
} = gameSlice;

export {
  gameReducer,
  updateLeaderUserId,
  updateAssociationText,
  setSelectedCardUser,
  resetSelectedCardUser,
  updateRound,
  addSelectedId,
  addVotedId,
  updatePlayersRound,
  setPlayers,
  setDataUser,
  setVotedCardUser,
  resetVotedCardUser,
  setDataResultPage,
  resetDataResultPage,
  filtersCardUsers,
  updateDataResultGame,
};

export const gameSelectors = {
  dataUser: (s: ApplicationState) => s.game.dataUser,
  game: (s: ApplicationState) => s.game,
  leaderUserId: (s: ApplicationState) => s.game.leaderUserId,
  associationText: (s: ApplicationState) => s.game.associationText,
  selectedCards: (s: ApplicationState) => s.game.selectedCards,
  votedCards: (s: ApplicationState) => s.game.votedCards,
  dataResultPage: (s: ApplicationState) => s.game.dataResultPage,
  round: (s: ApplicationState) => s.game.round,
  dataUserGame: (s: ApplicationState) => s.game.dataResultGame,

  selectedCardId: (s: ApplicationState) => s.game.selectedCardId,
  votedCardId: (s: ApplicationState) => s.game.votedCardId,
  playersRound: (s: ApplicationState) => s.game.playersRound,
  playersId: (s: ApplicationState) => s.game.playersId,
};
