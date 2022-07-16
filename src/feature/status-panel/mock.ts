import { ItemStatusProps } from './types';

type IdItem = number;

export const mockData: Record<IdItem, ItemStatusProps> = {
  0: {
    id: 0,
    name: 'Иван',
    avatar: '',
    status: 'checked',
    leading: true,
  },
  1: {
    id: 1,
    name: 'Дмитрий',
    avatar: '',
    status: 'pending',
    leading: false,
  },
  2: {
    id: 2,
    name: 'Сергей',
    avatar: '',
    status: 'pending',
    leading: false,
  },
};
