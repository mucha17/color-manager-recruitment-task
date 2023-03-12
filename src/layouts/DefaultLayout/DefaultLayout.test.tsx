import { render } from '@testing-library/react';
import DefaultLayout from './DefaultLayout';

describe('DefaultLayout', () => {
  it('should render the wrapper div with the correct class name', () => {
    const { container } = render(<DefaultLayout />);
    const wrapperDiv = container.firstChild;

    expect(wrapperDiv).toHaveClass('layouts-default-layout-wrapper');
  });

  it('should have 4 children', () => {
    const { container } = render(<DefaultLayout />);
    const childrenCount = container.firstChild?.childNodes.length;

    expect(childrenCount).toEqual(4);
  });
});
