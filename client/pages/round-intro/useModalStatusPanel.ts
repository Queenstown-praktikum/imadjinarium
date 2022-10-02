import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { gameSelectors, setSelectedCardUser } from '../../redux/slices/game';
import { userSelectors } from '../../redux/slices/user';
import { useAppDispatch } from '../../hooks/redux';

export const useModalStatusPanel = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(userSelectors.user);
  const leaderUserId = useSelector(gameSelectors.leaderUserId);
  // const selectedCards = useSelector(gameSelectors.selectedCards);
  const dataUser = useSelector(gameSelectors.dataUser);

  useEffect(() => {
    if (user.id !== leaderUserId) return;

    Object.entries(dataUser).forEach(([key, item], idx) => {
      const keyUser = Number(key);
      if (leaderUserId && keyUser !== leaderUserId) {
        setTimeout(() => {
          dispatch(setSelectedCardUser({ idUser: keyUser, idCard: item.cards[0] }));
        }, 3000 * idx);
      }
    });
  }, [leaderUserId, dataUser, user]);
};
