import { render } from '@testing-library/react';
import ColorsList from './ColorsList';

describe('ColorsList', () => {
  it('should render the wrapper div with the correct class name', () => {
    const selectedConditions = {
      red: false,
      green: false,
      blue: false,
      saturation: false,
    };

    const { container } = render(
      <ColorsList selectedConditions={selectedConditions} />
    );
    const wrapperDiv = container.firstChild;

    expect(wrapperDiv).toHaveClass('components-colors-list-wrapper');
  });
});
