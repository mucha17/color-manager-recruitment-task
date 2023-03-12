import { render } from '@testing-library/react';
import ToolTip from './ToolTip';

describe('ToolTip', () => {
  it('should render the wrapper div with the correct class name', () => {
    const { container } = render(
      <>
        <ToolTip hookedElementId="test_1">
          <p>test</p>
        </ToolTip>
        <p id="test_1"></p>
      </>
    );
    const wrapperDiv = container.firstChild;

    expect(wrapperDiv).toHaveClass('components-tooltip-wrapper');
  });
});
