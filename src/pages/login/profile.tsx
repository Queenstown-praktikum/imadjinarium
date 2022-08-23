import React, { FC } from 'react';
import { FormWrapper, TextField } from 'ui-kit';
import Avatar from './avatar';
import styles from './login.scss'

export const ProfilePage: FC = () => <div className={styles.login_form}>
    <Avatar />
    <FormWrapper
      title="Профиль"
      buttons={[]}
      // TODO(Egor) типизировать ошибки в userApi (пока не знаю как)
      // и локализовать ошибки (пока на англ)
      // @ts-ignore
      // formError={isError && error?.data?.reason}
    >
      <>
        <TextField
          name="login"
          label="Логин"
          // onTextFieldChange={setRegistrationField}
        />
        
        <TextField
          name="email"
          label="Почта"
          // onTextFieldChange={setRegistrationField}
        />

        <TextField
          name="phone"
          label="Телефон"
          // onTextFieldChange={setRegistrationField}
        />
      </>
    </FormWrapper>
  </div>;
