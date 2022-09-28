import React, { FC, useCallback, useEffect, useState } from 'react';
import { useGetTokenByCodeMutation } from '../../redux/oAuthApi';
import { FormWrapper, TextField } from '../../ui-kit';
import { WrapperButtonType } from '../../ui-kit/formWrapper/types';
import styles from './login.scss'

export const YaSignInPage: FC = () => {
  const [getTokenByCode, { data, isError, error }] = useGetTokenByCodeMutation();

  const [code, setCode] = useState('')
  const handleSignInUser = useCallback(() => {
    getTokenByCode(code)
  }, [code, getTokenByCode])

  useEffect(() => {
    console.log('check result:', data, isError, error)
  }, [data, isError, error])

  const buttons: WrapperButtonType[] = [{
    styleType: 'main',
    label: 'Авторизоватся',
    action: handleSignInUser,
  }]

  return <div className={styles.login_form}>
    <FormWrapper
      title="Вход с помощью Яндекса"
      link={{
        label: 'Назад',
        to: '/'
      }}
      buttons={buttons}
    >
      <TextField
        name="code"
        label="введите код"
        onTextFieldChange={(name: string, value: string) => setCode(value)}
      />
    </FormWrapper>
  </div>
};
