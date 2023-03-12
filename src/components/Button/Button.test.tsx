import { render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('should render the wrapper div with the correct class name', () => {
    const { container } = render(
      <Button onClick={() => console.log('test')}>Test</Button>
    );
    const wrapperDiv = container.firstChild;

    expect(wrapperDiv).toHaveClass('components-button-wrapper');
  });
});
