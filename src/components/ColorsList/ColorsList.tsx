import { useCallback, useEffect, useState } from 'react';
import useLocalStorage from '../../contexts/LocalStorageContext/useLocalStorage';
import Color, { getRed, getGreen, getBlue } from '../../utils/Color';
import { getSaturation } from '../../utils/Color/Color';
import ColorCard from '../ColorCard';
import './ColorsList.scss';

interface ColorsListProps {
  selectedConditions: {
    red: boolean;
    green: boolean;
    blue: boolean;
    saturation: boolean;
  };
}

const ColorsList = ({ selectedConditions }: ColorsListProps) => {
  const { getColors } = useLocalStorage();
  const [colorsArray, setColorsArray] = useState<Color[]>([]);

  const updateColors = useCallback(() => {
    setColorsArray(getColors());
  }, [getColors]);

  useEffect(() => {
    updateColors();
  }, [updateColors]);
  return (
    <div className="components-colors-list-wrapper">
      {colorsArray.length > 0
        ? colorsArray
            .filter((color) => {
              const isRedOver50 = getRed(color) > 127;
              const isGreenOver50 = getGreen(color) > 127;
              const isBlueOver50 = getBlue(color) > 127;
              const isSaturationOver50 = getSaturation(color) > 50;

              return (
                (isRedOver50 || !selectedConditions.red) &&
                (isGreenOver50 || !selectedConditions.green) &&
                (isBlueOver50 || !selectedConditions.blue) &&
                (isSaturationOver50 || !selectedConditions.saturation)
              );
            })
            .sort((a, b) => {
              const redDiff = getRed(b) - getRed(a);
              if (redDiff !== 0) {
                return redDiff;
              }
              const greenDiff = getGreen(b) - getGreen(a);
              if (greenDiff !== 0) {
                return greenDiff;
              }
              return getBlue(b) - getBlue(a);
            })
            .map((color, index) => {
              return <ColorCard color={color} key={index} />;
            })
        : null}
    </div>
  );
};

export default ColorsList;
