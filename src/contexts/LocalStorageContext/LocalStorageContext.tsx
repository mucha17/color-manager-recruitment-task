import { useEffect, useState } from 'react';
import { createContext } from 'react';
import Color from '../../utils/Color';

export const LocalStorageContext = createContext<{
  colors: Color[];
  setColors: (colors: Color[]) => void;
  storageOperationInProgress: boolean;
}>({
  colors: [],
  setColors: () => {},
  storageOperationInProgress: false,
});

interface LocalStorageProviderProps {
  children: JSX.Element;
}

export const LocalStorageProvider = ({
  children,
}: LocalStorageProviderProps) => {
  const [storageOperationInProgress, setStorageOperationInProgress] =
    useState(false);
  // const [colors, setColors] = useState<Color[]>([]);
  const [colors, setColors] = useState<Color[]>(
    JSON.parse(localStorage.getItem('colors') || '[]')
  );

  // parse array from storage to type Color
  // which will allow using methods from Color class
  // useEffect(() => {
  //   setStorageOperationInProgress(true);
  //   new Promise<void>((resolve, reject) => {
  //     try {
  //       const storageArray = JSON.parse(localStorage.getItem('colors') || '[]');
  //       const parsedColors: Color[] = [];
  //       (storageArray as Color[]).forEach((color) => {
  //         parsedColors.push(new Color(color.hexValue, color.isPredefined));
  //       });
  //       setColors(parsedColors);
  //       resolve();
  //     } catch (error) {
  //       reject(error);
  //     }
  //   }).then(() => {
  //     setStorageOperationInProgress(false);
  //   });
  //   JSON.parse(localStorage.getItem('colors') || '[]');
  // }, []);

  useEffect(() => {
    setStorageOperationInProgress(true);
    new Promise<void>((resolve, reject) => {
      try {
        localStorage.setItem('colors', JSON.stringify(colors));
        resolve();
      } catch (error) {
        reject(error);
      }
    }).then(() => {
      setStorageOperationInProgress(false);
    });
  }, [colors]);

  return (
    <LocalStorageContext.Provider
      value={{ colors, setColors, storageOperationInProgress }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
