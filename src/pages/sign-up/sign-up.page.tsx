import React, { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { FormWrapper, TextField } from '../../ui-kit';
import { WrapperButtonType } from '../../ui-kit/formWrapper/types';
import { useUserSignUpMutation } from '../../redux/userApi';
import { setUserData } from '../../redux/slices/user';

export const SignUpPage: FC = () => {
  const [signUpUser, { data, isError, error }] = useUserSignUpMutation()
  const [regData, setRegData] = useState<any>({})
  const navigate = useNavigate();
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
  }, {
    styleType: 'secondary',
    label: 'Войти',
    action: () => navigate('/sign-up'),
  }]

  return <div className={cn('fullscreen', 'centered')}>
    <FormWrapper
      title="Регистрация"
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
          name="login"
          label="Логин"
          onTextFieldChange={setRegistrationField}
        />

        <TextField
          name="name"
          label="Имя"
          onTextFieldChange={setRegistrationField}
        />

        <TextField
          name="surname"
          label="Фамилия"
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
          label="Пароль (ещё раз)"
          type='password'
          onTextFieldChange={setRegistrationField}
        />
      </>
    </FormWrapper>
  </div>
};
