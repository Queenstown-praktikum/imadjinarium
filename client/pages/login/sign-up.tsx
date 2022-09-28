import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { FormWrapper, TextField } from '../../ui-kit';
import { WrapperButtonType } from '../../ui-kit/formWrapper/types';
import { useGetUserQuery, useUserSignUpMutation } from '../../redux/userApi';
import { setUserData } from '../../redux/slices/user';
import styles from './login.scss';

export const SignUpPage: FC = () => {
  const [signUpUser, { data, isError, error }] = useUserSignUpMutation();
  const { data: dataUser } = useGetUserQuery({});
  const [regData, setRegData] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log('dataUser', dataUser)

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data));
    }
    if (dataUser) {
      dispatch(setUserData(dataUser))
    }
  }, [data, dataUser, dispatch]);

  useEffect(() => {
    if (data === 'OK') {
      navigate('/')
    }
  }, [data, navigate])

  const setRegistrationField = useCallback(
    (name: string, value: string) => {
      setRegData({
        ...regData,
        [name]: value,
      });
    },
    [regData, setRegData],
  );

  const handleSignUpUser = useCallback(() => {
    // TODO(Egor) add check pass and re-pass
    signUpUser({
      first_name: regData.login,
      second_name: regData.login,
      login: regData.login,
      email: regData.email,
      password: regData.password,
      phone: regData.phone,
    });
  }, [signUpUser, regData]);

  const buttons: WrapperButtonType[] = [
    {
      styleType: 'main',
      label: 'Зарегистрироватся',
      action: handleSignUpUser,
    },
  ];

  return (
    <div className={styles.login_form}>
      <FormWrapper
        title='Регистрация'
        link={{
          label: 'У меня есть аккаунт',
          to: '/login',
        }}
        buttons={buttons}
        // TODO(Egor) типизировать ошибки в userApi (пока не знаю как)
        // и локализовать ошибки (пока на англ)
        // @ts-ignore
        formError={isError && error?.data?.reason}
      >
        <>
          <TextField name='login' label='Логин' onTextFieldChange={setRegistrationField} />

          <TextField name='email' label='Почта' onTextFieldChange={setRegistrationField} />

          <TextField name='phone' label='Телефон' onTextFieldChange={setRegistrationField} />

          <TextField name='password' label='Пароль' type='password' onTextFieldChange={setRegistrationField} />

          <TextField
            name='re-password'
            label='Подтверждение пароля'
            type='password'
            onTextFieldChange={setRegistrationField}
          />
        </>
      </FormWrapper>
    </div>
  );
};
