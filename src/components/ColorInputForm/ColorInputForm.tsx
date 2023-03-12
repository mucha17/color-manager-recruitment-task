import React, { useState } from 'react';
import useLocalStorage from '../../contexts/LocalStorageContext/useLocalStorage';
import Color from '../../utils/Color';
import './ColorInputForm.scss';

const ColorInputForm = () => {
  const [value, setValue] = useState('');
  const [errorChar, setErrorChar] = useState('');
  const [errorLength, setErrorLength] = useState('');
  const [errorHash, setErrorHash] = useState('');

  const { addColor } = useLocalStorage();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Validate the input to only allow valid hex characters and a maximum length of 7 characters
    const validHexRegex = /^#?[0-9a-fA-F]{0,6}$/;

    // Check for invalid characters
    if (!validHexRegex.test(inputValue)) {
      if (inputValue[0] !== '#' && inputValue.length <= 6) {
        setErrorChar('The character you tried to input was not valid');
      } else if (inputValue[0] === '#' && inputValue.length <= 7) {
        setErrorChar('The character you tried to input was not valid');
      } else if (inputValue[0] !== '#' && inputValue.length >= 6) {
        setErrorChar(
          'Please start with # and then enter six valid hex characters (#, 0-9, a-f, A-F)'
        );
      }
    } else {
      if (inputValue[0] !== '#' && inputValue.length === 6) {
        setErrorChar(
          'Please start with # and then enter six valid hex characters (#, 0-9, a-f, A-F)'
        );
      } else {
        setErrorChar('');
      }
    }

    // Check for input length
    if (inputValue.length > 7) {
      setErrorLength('Your input cannot exceed 7 characters');
    } else {
      setErrorLength('');
    }

    // Check for missing hash (#)
    if (inputValue[0] !== '#' && inputValue !== '' && inputValue.length < 6) {
      setErrorHash('Your must start with a #');
    } else {
      setErrorHash('');
    }

    if (inputValue.length <= 7 && validHexRegex.test(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
      addColor(new Color(value));
      setValue('');
      setErrorChar('');
      setErrorLength('');
      setErrorHash('');
    }
  };

  return (
    <div
      className="components-color-input-form-wrapper"
      data-testid="form1_wrapper"
    >
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="hex-input">Enter Hex Color Code:</label>
        <input
          type="text"
          id="hex-input"
          name="hex-input"
          className="input"
          value={value}
          onChange={handleChange}
          data-testid="form1_input"
        />
        <div className="error" data-testid="form1_validator1">
          {errorChar}
        </div>
        <div className="error" data-testid="form1_validator2">
          {errorLength}
        </div>
        <div className="error" data-testid="form1_validator3">
          {errorHash}
        </div>
        <button
          disabled={!/^#[0-9a-fA-F]{6}$/.test(value)}
          type="submit"
          data-testid="form1_submit_button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ColorInputForm;
