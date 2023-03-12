import { render } from '@testing-library/react';
import DefaultLayoutFooter from './DefaultLayoutFooter';

describe('DefaultLayoutFooter', () => {
  it('should render the wrapper div with the correct class name', () => {
    const { container } = render(<DefaultLayoutFooter />);
    const wrapperDiv = container.firstChild;

    expect(wrapperDiv).toHaveClass('layouts-default-layout-footer-wrapper');
  });
});
