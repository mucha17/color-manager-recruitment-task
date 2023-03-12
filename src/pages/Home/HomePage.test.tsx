import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('renders home page title', () => {
  it('should render the home page with a title', () => {
    render(<HomePage />);
    const linkElement = screen.getByText(/welcome to home page/i).parentElement;
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('pages-home-page-wrapper');
  });
});
