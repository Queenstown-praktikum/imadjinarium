import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../store/userSlice';

export const SignInPage: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loginUserAction({
      login: 'xxx',
      password: '111',
    }))
  }, [dispatch])
  return <div className={cn('fullscreen', 'centered')}>
    <h2>SignInPage</h2>
  </div>
};
