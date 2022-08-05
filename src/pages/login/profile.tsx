import React, { FC } from 'react';
import cn from 'classnames';
import { FormWrapper, TextField } from '../../ui-kit';

export const ProfilePage: FC = () => <div className={cn('fullscreen', 'centered')}>
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
          name="email"
          label="Почта"
          // onTextFieldChange={setRegistrationField}
        />

        <TextField
          name="login"
          label="Логин"
          // onTextFieldChange={setRegistrationField}
        />

        <TextField
          name="name"
          label="Имя"
          // onTextFieldChange={setRegistrationField}
        />

        <TextField
          name="surname"
          label="Фамилия"
          // onTextFieldChange={setRegistrationField}
        />

        <TextField
          name="phone"
          label="Телефон"
          // onTextFieldChange={setRegistrationField}
        />

        <TextField
          name="password"
          label="Пароль"
          type='password'
          // onTextFieldChange={setRegistrationField}
        />

        <TextField
          name="re-password"
          label="Пароль (ещё раз)"
          type='password'
          // onTextFieldChange={setRegistrationField}
        />
      </>
    </FormWrapper>
  </div>;
