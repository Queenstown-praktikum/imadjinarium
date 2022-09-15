import React from 'react';
import { render, screen } from '@testing-library/react';
import { Search } from './search';

describe('Testing render', () => {
  test('Search component', () => {
  render(<Search placeholder='Поиск по темам'/>)
  expect(screen.getByPlaceholderText(/Поиск по темам/)).toBeInTheDocument()
  })
})