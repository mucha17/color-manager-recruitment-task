import { render } from '@testing-library/react';
import DefaultLayoutHeader from './DefaultLayoutHeader';

describe('DefaultLayoutHeader', () => {
  it('should render the wrapper div with the correct class name', () => {
    const { container } = render(<DefaultLayoutHeader />);
    const wrapperDiv = container.firstChild;

    expect(wrapperDiv).toHaveClass('layouts-default-layout-header-wrapper');
  });
});
