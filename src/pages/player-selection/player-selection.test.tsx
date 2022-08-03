import React from 'react';
import { render, screen } from '@testing-library/react';
import {PlayerSelectionPage} from './player-selection.page';

describe('Testing render', () => {
  test('UnexpectedErrorPage', () => {
    render(<PlayerSelectionPage />)
    expect(screen.getByText(/Ваша карта/)).toBeInTheDocument()
  })
})