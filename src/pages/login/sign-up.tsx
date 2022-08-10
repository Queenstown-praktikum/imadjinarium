import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormWrapper, TextField } from '../../ui-kit';
import { WrapperButtonType } from '../../ui-kit/formWrapper/types';
import { useUserSignUpMutation } from '../../redux/userApi';
import { setUserData } from '../../redux/slices/user';

export const SignUpPage: FC = () => {
  const [signUpUser, { data, isError, error }] = useUserSignUpMutation()
  const [regData, setRegData] = useState<any>({})
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data))
    }
  }, [data, dispatch])

  const setRegistrationField = useCallback((name: string, value: string) => {
    setRegData({
      ...regData,
      [name]: value
    })
  }, [regData, setRegData])

  const handleSignUpUser = useCallback(() => {
    signUpUser({
      first_name: regData.name,
      second_name: regData.surname,
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

  return <div>
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
          name="email"
          label="Почта"
          onTextFieldChange={setRegistrationField}
        />

        <TextField
          name="name"
          label="Имя"
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
