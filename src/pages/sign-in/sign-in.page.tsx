import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router';
import { usePostUserLogoutMutation, useUserSignInMutation } from '../../redux/userApi';

export const SignInPage: FC = () => {
  const [signInUser, { isError, isLoading, error }] = useUserSignInMutation()
  const [logoutUser, { data }] = usePostUserLogoutMutation()
  const navigate = useNavigate();

  const handleSignInUser = async () => {
    await signInUser({
      login: 'uuu',
      password: '123',
    }).unwrap()
  }

  const handleLogoutUser = async () => {
    await logoutUser({}).unwrap()
  }

  useEffect(() => {
    if (data) {
      navigate('sign-in')
    }
  }, [data, navigate])

  return <div className={cn('fullscreen', 'centered')}>
    <h2>SignInPage</h2>
    <button type='button' onClick={handleSignInUser}>try to login with default creds</button>
    <button type='button' onClick={handleLogoutUser}>logout</button>
    {/* @ts-ignore */}
    {isError && error?.data?.reason}
    {isLoading && 'Loading...'}
  </div>
};
