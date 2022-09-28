import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, userSelectors } from '../../redux/slices/user';
import { useGetUserQuery } from '../../redux/userApi';
import { FormWrapper } from '../../ui-kit';
import Avatar from './avatar';
import styles from './login.scss';

export const ProfilePage: FC = () => {
  const { data: dataUser } = useGetUserQuery({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataUser) {
      dispatch(setUserData(dataUser))
    }
  }, [dataUser, dispatch]);

  const user = useSelector(userSelectors.user);
  return <div className={styles.login_form}>
    <Avatar />
    <FormWrapper
      title='Профиль'
      buttons={[]}
    >
      <>
        <div className={styles.profile_line}>
          <span>Логин</span>
          <span>{user.login}</span>
        </div>
        <div className={styles.profile_line}>
          <span>Почта</span>
          <span>{user.email}</span>
        </div>
        <div className={styles.profile_line}>
          <span>Телефон</span>
          <span>{user.phone}</span>
        </div>
      </>
    </FormWrapper>
  </div>
};
