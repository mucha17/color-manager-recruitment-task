import { useEffect, useRef } from 'react';
import useLocalStorage from '../../contexts/LocalStorageContext/useLocalStorage';
import Color, { getHSLValue, getRGBValue } from '../../utils/Color';
import ToolTip from '../ToolTip';
import './ColorCard.scss';

interface ColorCardProps {
  color: Color;
}

const ColorCard = ({ color }: ColorCardProps) => {
  const { deleteColor } = useLocalStorage();
  const rectangleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rectangleRef.current !== null) {
      rectangleRef.current.style.backgroundColor = color.hexValue;
    }
  }, [color]);

  return (
    <div className="components-color-card-wrapper">
      <div className="rectangle" ref={rectangleRef}></div>
      <div className="content">
        <div className="name" id={`color-card-${color.hexValue.split('#')[1]}`}>
          {color.hexValue}
        </div>
        <ToolTip hookedElementId={`color-card-${color.hexValue.split('#')[1]}`}>
          <>
            <p>{getRGBValue(color)}</p>
            <p>{getHSLValue(color)}</p>
          </>
        </ToolTip>
        <div className="removeButton">
          {color.isPredefined === true ? null : (
            <button
              onClick={() => {
                deleteColor(color.hexValue);
              }}
            >
              X
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorCard;
