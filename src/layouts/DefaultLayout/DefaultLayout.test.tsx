import { getByTestId, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import DefaultLayout from './DefaultLayout';

describe('DefaultLayout', () => {
  it('should render the wrapper div with the correct class name', async () => {
    await act(async () => {
      render(<DefaultLayout />);
    });
    const wrapperDiv = getByTestId(document.body, 'layout-wrapper');

    expect(wrapperDiv).toHaveClass('layouts-default-layout-wrapper');
  });

  it('should have 4 children', async () => {
    await act(async () => {
      render(<DefaultLayout />);
    });
    const childrenCount = getByTestId(document.body, 'layout-wrapper')
      .childNodes.length;

    expect(childrenCount).toEqual(4);
  });
});
