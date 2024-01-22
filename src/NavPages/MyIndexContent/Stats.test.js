// src/NavPages/MyDziennikContent/Rank.test.js
import { render, screen } from '@testing-library/react';
import Stats from './Stats';

test('renders Stats component', () => {
  render(<Stats user={{}} />);
  const statsText = screen.getByText(/Jesteś w top/i);
  expect(rankButton).toBeInTheDocument();
});