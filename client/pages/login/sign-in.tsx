import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userSelectors } from '../../redux/slices/user';
import { useUserSignInMutation } from '../../redux/userApi';
import { FormWrapper, TextField } from '../../ui-kit';
import { WrapperButtonType } from '../../ui-kit/formWrapper/types';
import styles from './login.scss'

const CLIENT_ID = 'efbd80d3b54741c8bb58dea7f4455561'

export const SignInPage: FC = () => {
  const user = useSelector(userSelectors.user);
  const [signInUser, { data, isError, error }] = useUserSignInMutation()
  const [loginData, setLoginData] = useState({login: '', password: ''})
  const navigate = useNavigate();

  useEffect(() => {
    if (data === 'OK' || user.id) {
      navigate('/')
    }
  }, [data, navigate, user])

  const handleSignInUser = async () => {
    await signInUser(loginData)
  }

  const handleYaSingInUser = useCallback(() => {
    navigate('/login/ya-sign-in')

    if (window) {
      window.open(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${CLIENT_ID}`, 'blank')
    }
  }, [navigate])

  const setLoginField = useCallback((name: string, value: string) => {
    setLoginData({
      ...loginData,
      [name]: value
    })
  }, [loginData, setLoginData])

  const buttons: WrapperButtonType[] = [{
    styleType: 'main',
    label: 'Войти',
    action: handleSignInUser,
  }, {
    label: 'Вход с помощью Яндекса',
    action: handleYaSingInUser,
    buttonClass: styles.authYa,
  }]

  return <div className={styles.login_form}>
    <FormWrapper
      title="Вход в аккаунт"
      link={{
        label: 'Зарегистрироваться',
        to: '/login/sign-up'
      }}
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
