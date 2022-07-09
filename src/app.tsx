import './style.scss';
import React from 'react';

function Title() {
  return <div className='title'>TITLE</div>;
}

export const App = () => {
  const f = { sd: 3 };
  console.log(f);
  return (
    <>
      <Title />
      <div>Hello word</div>
    </>
  );
};
