import { render, screen } from '@testing-library/react';
import App from './App';

test('Test if all link work or not', () => {
  render(<App />);
  const linkLink = screen.getByText(/film/i);
  const linkPeople = screen.getByText(/people/i);
  expect(linkLink).toBeInTheDocument();
  expect(linkPeople).toBeInTheDocument();
}
,10000);

test('Test if it render or not',()=>{
  render(<App />);


})
