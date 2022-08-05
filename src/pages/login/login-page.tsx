import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { SignInPage } from './sign-in';
import { SignUpPage } from './sign-up';
import { ProfilePage } from './profile';
import { Page404 } from '../404/404.page';
import MultiBlock from '../../ui-kit/multi-block/MultiBlock';
import styles from './login.scss'

export const LoginPage = () => <div className={styles.login}>
    <MultiBlock />
    <Routes>
      <Route path='/' element={<SignInPage />} />
      <Route path='sign-up' element={<SignUpPage />} />
      <Route path='profile' element={<ProfilePage />} />
      <Route element={<Page404 />} />
    </Routes>
  </div>
