import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

const TestApp: FC = () => (
  <Routes>
    <Route path='/' element={<div>Index</div>} />
    <Route path='/home' element={<div>Home</div>} />
  </Routes>
);

export default TestApp;
