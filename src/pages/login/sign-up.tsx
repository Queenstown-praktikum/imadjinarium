import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormWrapper, TextField } from '../../ui-kit';
import { WrapperButtonType } from '../../ui-kit/formWrapper/types';
import { useUserSignUpMutation } from '../../redux/userApi';
import { setUserData } from '../../redux/slices/user';
import styles from './login.scss'
import useCheckUser from './hooks/useCheckUser';

export const SignUpPage: FC = () => {
  const [signUpUser, { data, isError, error }] = useUserSignUpMutation()
  const [regData, setRegData] = useState<any>({})
  const dispatch = useDispatch()
  
  useCheckUser()
  useEffect(() => {
    if (data) {
      dispatch(setUserData(data))
    }
  }, [data, dispatch])

  const setRegistrationField = useCallback((name: string, value: string) => {

    setRegData({
      ...regData,
      [name]: value,
    })
  }, [regData, setRegData])

  const handleSignUpUser = useCallback(() => {
    console.log(regData)
    // TODO(Egor) add check pass and re-pass
    signUpUser({
      first_name: regData.login,
      second_name: regData.login,
      login: regData.login,
      email: regData.email,
      password: regData.password,
      phone: regData.phone,
    })
  }, [signUpUser, regData])

  const buttons: WrapperButtonType[] = [{
    styleType: 'main',
    label: 'Зарегистрироватся',
    action: handleSignUpUser,
  }]

  return <div className={styles.login_form}>
    <FormWrapper
      title="Регистрация"
      link={{
        label: 'У меня есть аккаунт',
        to: '/login'
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
          onTextFieldChange={setRegistrationField}
        />
        
        <TextField
          name="email"
          label="Почта"
          onTextFieldChange={setRegistrationField}
        />


        <TextField
          name="phone"
          label="Телефон"
          onTextFieldChange={setRegistrationField}
        />

        <TextField
          name="password"
          label="Пароль"
          type='password'
          onTextFieldChange={setRegistrationField}
        />

        <TextField
          name="re-password"
          label="Подтверждение пароля"
          type='password'
          onTextFieldChange={setRegistrationField}
        />
      </>
    </FormWrapper>
  </div>
};
