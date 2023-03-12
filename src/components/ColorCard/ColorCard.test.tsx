import { render } from '@testing-library/react';
import Color from '../../utils/Color';
import ColorCard from './ColorCard';

describe('ColorCard', () => {
  it('should render the wrapper div with the correct class name', () => {
    const { container } = render(<ColorCard color={new Color('#ffffff')} />);
    const wrapperDiv = container.firstChild;

    expect(wrapperDiv).toHaveClass('components-color-card-wrapper');
  });
});
