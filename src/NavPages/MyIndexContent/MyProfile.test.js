// src/NavPages/MyDziennikContent/MyProfile.test.js
import { render, screen } from '@testing-library/react';
import MyProfile from './MyProfile';

test('renders MyProfile component', () => {
  render(<MyProfile user={{}} />);
  const profileSection = screen.getByRole('main');
  expect(profileSection).toBeInTheDocument();
});