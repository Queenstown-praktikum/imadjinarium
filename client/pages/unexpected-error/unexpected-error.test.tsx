import React from 'react';
import { render, screen } from '@testing-library/react';
import { UnexpectedErrorPage } from './unexpected-error.page';


describe('Testing render', () => {
  test('UnexpectedErrorPage', () => {
    render(<UnexpectedErrorPage />)
    expect(screen.getByText(/Что-то пошло не так/)).toBeInTheDocument()
  })
})