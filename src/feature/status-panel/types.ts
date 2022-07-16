export type StatusProps = 'pending' | 'checked';

export interface ItemStatusProps {
  id: number;
  name: string;
  avatar: string;
  status: StatusProps;
  leading: boolean;
}
