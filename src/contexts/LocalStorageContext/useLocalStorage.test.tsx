import { act, fireEvent, render, screen } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';
import Color from '../../utils/Color';
import { LocalStorageProvider } from './LocalStorageContext';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should seed the local storage with predefined colors', async () => {
    const predefinedColors = [
      new Color('#db0000', true),
      new Color('#000000', true),
      new Color('#ffffff', true),
      new Color('#564d4d', true),
      new Color('#831010', true),
    ];
    const TestComponent = () => {
      const { addColors } = useLocalStorage();

      return (
        <div data-testid="test-component">
          <button
            onClick={() => {
              addColors(predefinedColors);
            }}
          >
            Test
          </button>
        </div>
      );
    };

    await act(async () => {
      await render(
        <LocalStorageProvider>
          <TestComponent />
        </LocalStorageProvider>
      );
    });

    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(button);
    });

    const storedColors: Color[] = JSON.parse(
      localStorage.getItem('colors') || '[]'
    );

    expect(storedColors.length).toEqual(5);
    expect(storedColors).toEqual(predefinedColors);
  });

  it('should add color and save it to local storage', async () => {
    const colorToAdd = new Color('#abcdef');
    let testVariable: Color | undefined;
    const TestComponent = () => {
      const { addColor, getColor } = useLocalStorage();

      return (
        <div data-testid="test-component">
          <button
            data-testid="test-button-add"
            onClick={() => {
              addColor(colorToAdd);
            }}
          >
            Test
          </button>
          <button
            data-testid="test-button-get"
            onClick={() => {
              testVariable = getColor('#abcdef');
            }}
          >
            Test
          </button>
          <span data-testid="test-component-span"></span>
        </div>
      );
    };
    await act(async () => {
      await render(
        <LocalStorageProvider>
          <TestComponent />
        </LocalStorageProvider>
      );
    });

    const buttonAdd = screen.getByTestId('test-button-add');
    await act(async () => {
      fireEvent.click(buttonAdd);
    });

    const buttonGet = screen.getByTestId('test-button-get');
    await act(async () => {
      fireEvent.click(buttonGet);
    });

    const storedColors: Color[] = JSON.parse(
      localStorage.getItem('colors') || '[]'
    );

    expect(testVariable?.hexValue).toEqual(colorToAdd.hexValue);
    expect(
      storedColors.filter((color) => color.hexValue === colorToAdd.hexValue)
        .length
    ).toBe(1);
  });

  it('should not allow adding a duplicate', async () => {
    const TestComponent = () => {
      const { addColor } = useLocalStorage();

      return (
        <div data-testid="test-component">
          <button
            onClick={() => {
              addColor(new Color('#abcdef'));
            }}
          >
            Test
          </button>
        </div>
      );
    };

    await act(async () => {
      await render(
        <LocalStorageProvider>
          <TestComponent />
        </LocalStorageProvider>
      );
    });

    const button = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(button);
      fireEvent.click(button);
    });

    const storedColors: Color[] = JSON.parse(
      localStorage.getItem('colors') || '[]'
    );

    expect(storedColors.length).toEqual(1);
    expect(storedColors[0].hexValue).toBe('#ABCDEF');
  });

  it('should delete all colors except predefined', async () => {
    const testColors = [
      new Color('#db0000', true),
      new Color('#000000', true),
      new Color('#ffffff', false),
      new Color('#564d4d', false),
      new Color('#831010', true),
    ];
    const TestComponent = () => {
      const { addColors, deleteAllColors } = useLocalStorage();

      return (
        <div data-testid="test-component">
          <button
            data-testid="test-button-add"
            onClick={() => {
              addColors(testColors);
            }}
          >
            Test
          </button>
          <button
            data-testid="test-button-delete-all"
            onClick={() => {
              deleteAllColors();
            }}
          >
            Test
          </button>
        </div>
      );
    };

    await act(async () => {
      await render(
        <LocalStorageProvider>
          <TestComponent />
        </LocalStorageProvider>
      );
    });

    const buttonAdd = screen.getByTestId('test-button-add');
    await act(async () => {
      fireEvent.click(buttonAdd);
    });

    const buttonDeleteAll = screen.getByTestId('test-button-delete-all');
    await act(async () => {
      fireEvent.click(buttonDeleteAll);
    });

    const storedColors: Color[] = JSON.parse(
      localStorage.getItem('colors') || '[]'
    );

    expect(storedColors.length).toEqual(3);
  });

  it('should delete color only if not predefined', async () => {
    const testColors = [
      new Color('#db0000', true),
      new Color('#000000', true),
      new Color('#ffffff', false),
      new Color('#564d4d', false),
      new Color('#831010', true),
    ];
    const TestComponent = () => {
      const { addColors, deleteColor } = useLocalStorage();

      return (
        <div data-testid="test-component">
          <button
            data-testid="test-button-add"
            onClick={() => {
              addColors(testColors);
            }}
          >
            Test
          </button>
          <button
            data-testid="test-button-delete-all"
            onClick={() => {
              // this color should not be removed
              deleteColor('#000000');
              // this color should be removed
              deleteColor('#ffffff');
            }}
          >
            Test
          </button>
        </div>
      );
    };

    await act(async () => {
      await render(
        <LocalStorageProvider>
          <TestComponent />
        </LocalStorageProvider>
      );
    });

    const buttonAdd = screen.getByTestId('test-button-add');
    await act(async () => {
      fireEvent.click(buttonAdd);
    });

    const buttonDeleteAll = screen.getByTestId('test-button-delete-all');
    await act(async () => {
      fireEvent.click(buttonDeleteAll);
    });

    const storedColors: Color[] = JSON.parse(
      localStorage.getItem('colors') || '[]'
    );

    expect(storedColors.length).toEqual(4);
    expect(
      storedColors.filter((color) => color.hexValue === '#ffffff').length
    ).toEqual(0);
    expect(
      storedColors.filter((color) => color.hexValue === '#000000').length
    ).toEqual(1);
  });
});
