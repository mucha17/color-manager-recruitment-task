import { useState } from 'react';
import './FiltersSelector.scss';

export interface SelectedConditionsType {
  red: boolean;
  green: boolean;
  blue: boolean;
  saturation: boolean;
}

interface FiltersSelectorProps {
  setSelectedConditions: React.Dispatch<
    React.SetStateAction<SelectedConditionsType>
  >;
}

const FiltersSelector = ({ setSelectedConditions }: FiltersSelectorProps) => {
  const [redChecked, setRedChecked] = useState(false);
  const [greenChecked, setGreenChecked] = useState(false);
  const [blueChecked, setBlueChecked] = useState(false);
  const [saturationChecked, setSaturationChecked] = useState(false);

  const handleRedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRedChecked(event.target.checked);
  };

  const handleGreenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGreenChecked(event.target.checked);
  };

  const handleBlueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBlueChecked(event.target.checked);
  };

  const handleSaturationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSaturationChecked(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSelectedConditions({
      red: redChecked,
      green: greenChecked,
      blue: blueChecked,
      saturation: saturationChecked,
    });
  };

  return (
    <div className="components-filters-selector-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div>
            <label htmlFor="red-checkbox">Red &gt; 50%</label>
            <input
              type="checkbox"
              id="red-checkbox"
              name="red-checkbox"
              className="input"
              checked={redChecked}
              onChange={handleRedChange}
            />
          </div>
          <div>
            <label htmlFor="green-checkbox">Green &gt; 50%</label>
            <input
              type="checkbox"
              id="green-checkbox"
              name="green-checkbox"
              className="input"
              checked={greenChecked}
              onChange={handleGreenChange}
            />
          </div>
          <div>
            <label htmlFor="blue-checkbox">Blue &gt; 50%</label>
            <input
              type="checkbox"
              id="blue-checkbox"
              name="blue-checkbox"
              className="input"
              checked={blueChecked}
              onChange={handleBlueChange}
            />
          </div>
          <div>
            <label htmlFor="saturation-checkbox">Saturation &gt; 50%</label>
            <input
              type="checkbox"
              id="saturation-checkbox"
              name="saturation-checkbox"
              className="input"
              checked={saturationChecked}
              onChange={handleSaturationChange}
            />
          </div>
        </div>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default FiltersSelector;
