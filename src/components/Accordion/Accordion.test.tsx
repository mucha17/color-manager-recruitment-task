import { render, fireEvent } from '@testing-library/react';
import Accordion from './Accordion';

describe('Accordion', () => {
  it('should render the wrapper div with the correct class name', () => {
    const { container } = render(
      <Accordion title="Test title">
        <p>test</p>
      </Accordion>
    );
    const wrapperDiv = container.firstChild;

    expect(wrapperDiv).toHaveClass('components-accordion-wrapper');
  });

  it('should have title and should have a single child', () => {
    const { container } = render(
      <Accordion title="Test title">
        <p>test</p>
      </Accordion>
    );
    const title = container.getElementsByClassName('title')[0];
    expect(title.innerHTML).toEqual('Test title');

    // accordion should be hidden by default
    let visibility = container.getElementsByClassName('content').length === 0;
    expect(visibility).toEqual(true);
    // accordion should be visible after clicking on title
    fireEvent.click(title);
    visibility = container.getElementsByClassName('content').length === 1;
    expect(visibility).toEqual(true);
  });
});
