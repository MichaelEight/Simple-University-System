// src/NavPages/MyIndexContent/MyPlan.test.js
import { render, screen } from '@testing-library/react';
import MyPlan from './MyPlan';

test('renders MyPlan component', () => {
  render(<MyPlan user={{}} />);
  const planSection = screen.getByRole('main');
  expect(planSection).toBeInTheDocument();
});
