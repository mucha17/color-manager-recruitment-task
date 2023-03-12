import { render, screen, act } from '@testing-library/react';
import HomePage from './HomePage';

describe('renders home page title', () => {
  it('should render the home page with a title', async () => {
    await act(async () => {
      await render(<HomePage />);
    });

    const title = screen.getByText('Welcome to Color Manager');
    expect(title).toBeInTheDocument();
  });
  it('should have form for allowing adding a color', async () => {
    await act(async () => {
      await render(<HomePage />);
    });

    const accordion = screen.getByText('Add color');
    expect(accordion).toBeInTheDocument();
  });
});
