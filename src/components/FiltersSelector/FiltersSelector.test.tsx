import { render } from '@testing-library/react';
import FiltersSelector from './FiltersSelector';

describe('FiltersSelector', () => {
  it('should render the wrapper div with the correct class name', () => {
    const { container } = render(
      <FiltersSelector setSelectedConditions={() => {}} />
    );
    const wrapperDiv = container.firstChild;

    expect(wrapperDiv).toHaveClass('components-filters-selector-wrapper');
  });
});
