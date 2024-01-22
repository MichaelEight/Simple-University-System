// src/NavPages/MyIndexContent/Grades.test.js
import { render, screen } from '@testing-library/react';
import Grades from './Grades';

test('renders grades list', async () => {
  // Mock user data
  const mockedUser = { token: 'mockedToken' };

  render(<Grades user={mockedUser} />);
  const gradesList = await screen.findByRole('list');
  expect(gradesList).toBeInTheDocument();
});
