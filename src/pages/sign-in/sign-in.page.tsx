import React, { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router';
import { useUserSignInMutation } from '../../redux/userApi';
import { FormWrapper, TextField } from '../../ui-kit';
import { WrapperButtonType } from '../../ui-kit/formWrapper/types';

export const SignInPage: FC = () => {
  const [signInUser, { data, isError, error }] = useUserSignInMutation()
  const [loginData, setLoginData] = useState({login: '', password: ''})
  const navigate = useNavigate();


  useEffect(() => {
    if (data === 'OK') {
      navigate('/')
    }
  }, [data, navigate])

  const handleSignInUser = async () => {
    await signInUser(loginData)
  }

  const setLoginField = useCallback((name: string, value: string) => {
    setLoginData({
      ...loginData,
      [name]: value
    })
  }, [loginData, setLoginData])

  const buttons: WrapperButtonType[] = [{
    styleType: 'main',
    label: 'Авторизоватся',
    action: handleSignInUser,
  }, {
    styleType: 'secondary',
    label: 'Нет аккаунта?',
    action: () => navigate('/sign-up'),
  }]

  return <div className={cn('fullscreen', 'centered')}>
    <FormWrapper
      title="Вход"
      buttons={buttons}
      // TODO(Egor) типизировать ошибки в userApi (пока не знаю как)
      // и локализовать ошибки (пока на англ)
      // @ts-ignore
      formError={isError && error?.data?.reason}
    >
      <>
        <TextField
          name="login"
          label="Логин"
          onTextFieldChange={setLoginField}
        />

        <TextField
          name="password"
          label="Пароль"
          type='password'
          onTextFieldChange={setLoginField}
        />
      </>
    </FormWrapper>
  </div>
};
