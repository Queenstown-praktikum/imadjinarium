export type StatusProps = 'pending' | 'checked';
export type LeaderUserId = {
  id: number;
  name: string;
  avatar: string;
  status: StatusProps;
  leading: boolean;
};
export interface ItemStatusProps {
  id: number;
  name: string;
  avatar: string;
  status: StatusProps;
  leading: boolean;
}
