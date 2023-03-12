import { render } from '@testing-library/react';
import DefaultLayoutSidebar from './DefaultLayoutSidebar';

describe('DefaultLayoutSidebar', () => {
  it('should render the wrapper div with the correct class name', () => {
    const { container } = render(<DefaultLayoutSidebar />);
    const wrapperDiv = container.firstChild;

    expect(wrapperDiv).toHaveClass('layouts-default-layout-sidebar-wrapper');
  });
});
