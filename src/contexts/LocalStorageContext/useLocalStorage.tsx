import { useContext } from 'react';
import Color from '../../utils/Color';
import { LocalStorageContext } from './LocalStorageContext';

interface UseLocalStorageReturn {
  addColor: (color: Color) => void;
  addColors: (arrayOfColors: Color[]) => void;
  getColor: (hexValue: string) => Color | undefined;
  getColors: () => Color[];
  deleteColor: (hexValue: string) => void;
  deleteAllColors: () => void;
}

const useLocalStorage = (): UseLocalStorageReturn => {
  const { colors, setColors, storageOperationInProgress } =
    useContext(LocalStorageContext);

  const addColor = async (newColor: Color) => {
    const existingColor = getColor(newColor.hexValue);
    if (!existingColor || existingColor.hexValue !== newColor.hexValue) {
      const updatedColors = [...colors, newColor];
      await new Promise<void>((resolve, reject) => {
        try {
          setColors(updatedColors);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
      while (storageOperationInProgress) {
        // Wait until the localStorage write operation is finished
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  };

  const addColors = async (newColors: Color[]) => {
    const updatedColors: Color[] = [];
    await new Promise<void>((resolve, reject) => {
      try {
        newColors.forEach((newColor) => {
          if (
            colors.find(
              (persistedColor) => persistedColor.hexValue === newColor.hexValue
            ) === undefined
          ) {
            updatedColors.push(newColor);
          }
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    setColors([...colors, ...updatedColors]);
    while (storageOperationInProgress) {
      // Wait until the localStorage write operation is finished
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  const getColor = (hexValue: string): Color | undefined => {
    return colors.find(
      (color) =>
        color.hexValue ===
        (hexValue.startsWith('#')
          ? hexValue.toUpperCase()
          : '#' + hexValue.toUpperCase())
    );
  };

  const getColors = (): Color[] => {
    return colors;
  };

  const deleteColor = (hexValue: string) => {
    //remove a color if it is not predefined
    const remainingColors = colors.filter(
      (color) =>
        color.isPredefined === true ||
        color.hexValue !==
          (hexValue.startsWith('#')
            ? hexValue.toUpperCase()
            : '#' + hexValue.toUpperCase())
    );
    setColors(remainingColors);
  };

  const deleteAllColors = () => {
    //remove all colors except for predefined
    const remainingColors = colors.filter(
      (color) => color.isPredefined === true
    );
    setColors(remainingColors);
  };

  return {
    addColor,
    addColors,
    getColor,
    getColors,
    deleteColor,
    deleteAllColors,
  };
};

export default useLocalStorage;
