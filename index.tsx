import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LandingPage } from './src/pages/landing/landing.page';
import { Page404 } from './src/pages/404/404.page';
import { Layout } from './src/pages/layout/layout';

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
