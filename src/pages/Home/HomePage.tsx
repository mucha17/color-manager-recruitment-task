import { useEffect } from 'react';
import Accordion from '../../components/Accordion';
import ColorInputForm from '../../components/ColorInputForm';
import useLocalStorage from '../../contexts/LocalStorageContext/useLocalStorage';
import Color from '../../utils/Color';
import './HomePage.scss';

const HomePage = () => {
  const { addColors } = useLocalStorage();

  // seed the local storage with predefined colors
  useEffect(() => {
    const predefinedColors = [
      new Color('#db0000', true),
      new Color('#000000', true),
      new Color('#ffffff', true),
      new Color('#564d4d', true),
      new Color('#831010', true),
    ];

    addColors(predefinedColors);
  }, []);

  return (
    <div className="pages-home-page-wrapper">
      <h1>Welcome to Color Manager</h1>
      <div className="container">
        <div className="add-color-form">
          <Accordion title="Add color">
            <ColorInputForm />
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
