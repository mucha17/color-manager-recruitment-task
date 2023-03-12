import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import ColorInputForm from './ColorInputForm';

describe('ColorInputForm', () => {
  it('should render the wrapper div with the correct class name', async () => {
    await act(async () => {
      await render(<ColorInputForm />);
    });

    const wrapperDiv = screen.getByTestId('form1_wrapper');

    expect(wrapperDiv).toHaveClass('components-color-input-form-wrapper');
  });
  it('validation message "Please start with..." should only appear when not started with # and has 6 characters', async () => {
    const { getByTestId } = render(<ColorInputForm />);
    const input = getByTestId('form1_input');
    const validator = getByTestId('form1_validator1');

    // this message should appear when user typed 6 characters but didn't start with a #
    fireEvent.change(input, { target: { value: 'abcdef' } });
    await waitFor(() =>
      expect(validator).toHaveTextContent(
        'Please start with # and then enter six valid hex characters (#, 0-9, a-f, A-F)'
      )
    );
    // this message shouldn't be visible when user still types
    fireEvent.change(input, { target: { value: 'abcde' } });
    await waitFor(() =>
      expect(validator).not.toHaveTextContent(
        'Please start with # and then enter six valid hex characters (#, 0-9, a-f, A-F)'
      )
    );
    // to long input shouldn't show this message if input started with '#'
    fireEvent.change(input, { target: { value: '#abcdeff' } });
    await waitFor(() =>
      expect(validator).not.toHaveTextContent(
        'Please start with # and then enter six valid hex characters (#, 0-9, a-f, A-F)'
      )
    );
    // this message should not be visible when input is valid
    fireEvent.change(input, { target: { value: '#abcdef' } });
    await waitFor(() =>
      expect(validator).not.toHaveTextContent(
        'Please start with # and then enter six valid hex characters (#, 0-9, a-f, A-F)'
      )
    );
  });

  it('validation message "Yourn input cannot exceed..." should appear when input length > 7', async () => {
    const { getByTestId } = render(<ColorInputForm />);
    const input = getByTestId('form1_input');
    const validator = getByTestId('form1_validator2');

    // this message should appear when user typed more than 7 characters
    fireEvent.change(input, { target: { value: '#abcdeff' } });
    await waitFor(() =>
      expect(validator).toHaveTextContent(
        'Your input cannot exceed 7 characters'
      )
    );
    // this message shouldn't be visible when user still types
    fireEvent.change(input, { target: { value: '#abcde' } });
    await waitFor(() =>
      expect(validator).not.toHaveTextContent(
        'Your input cannot exceed 7 characters'
      )
    );
    // this message should not be visible when input is valid
    fireEvent.change(input, { target: { value: '#abcdef' } });
    await waitFor(() =>
      expect(validator).not.toHaveTextContent(
        'Your input cannot exceed 7 characters'
      )
    );
  });

  it('validation message "Your must start..." should appear when input does not start and input length < 6', async () => {
    const { getByTestId } = render(<ColorInputForm />);
    const input = getByTestId('form1_input');
    const validator = getByTestId('form1_validator3');

    // this message should appear when user typed less than 6 characters but didn't start with a #
    fireEvent.change(input, { target: { value: 'abcd' } });
    await waitFor(() =>
      expect(validator).toHaveTextContent('Your must start with a #')
    );
    // this message shouldn't be visible when input length >=6
    fireEvent.change(input, { target: { value: 'abcdef' } });
    await waitFor(() =>
      expect(validator).not.toHaveTextContent('Your must start with a #')
    );
    // this message should not be visible when input is valid
    fireEvent.change(input, { target: { value: '#abcdef' } });
    await waitFor(() =>
      expect(validator).not.toHaveTextContent('Your must start with a #')
    );
  });

  it('button should be disabled when button invalid and should clear input on click', async () => {
    const { getByTestId } = render(<ColorInputForm />);
    const input = getByTestId('form1_input');
    const button = getByTestId('form1_submit_button');

    // button should be disabled when input is invalid
    fireEvent.change(input, { target: { value: 'abcdef' } });
    await waitFor(() => expect(button).toHaveProperty('disabled', true));
    // button should not be disabled when input is valid
    fireEvent.change(input, { target: { value: '#abcdef' } });
    await waitFor(() => expect(button).toHaveProperty('disabled', false));
    // button should clear the input when clicked and input is valid
    fireEvent.change(input, { target: { value: '#abcdef' } });
    fireEvent.click(button);
    await waitFor(() => expect(input).toHaveProperty('value', ''));
    // button should not clear the input when clicked and input is invalid
    fireEvent.change(input, { target: { value: '#abcd' } });
    fireEvent.click(button);
    await waitFor(() => expect(input).not.toHaveProperty('value', ''));
  });
});
