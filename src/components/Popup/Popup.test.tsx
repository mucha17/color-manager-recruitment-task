import { render } from '@testing-library/react';
import Popup from './Popup';

describe('Popup', () => {
  it('should render the wrapper div with the correct class name', () => {
    const { container } = render(
      <Popup
        message="Are you sure if you want to delete?"
        onConfirm={() => {
          console.log('Deleted');
        }}
      />
    );
    const wrapperDiv = container.firstChild;

    expect(wrapperDiv).toHaveClass('components-popup-wrapper');
  });
});
