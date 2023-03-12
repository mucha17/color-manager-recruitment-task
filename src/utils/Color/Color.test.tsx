import Color, { getHSLValue, getRGBValue } from './Color';

describe('Color', () => {
  it('should create a correct color', () => {
    const hexValue = '#FF0000';
    const color = new Color(hexValue);
    expect(color.hexValue).toEqual('#FF0000');
  });

  it('should create a predefined color', () => {
    const hexValue = '#FF0000';
    const isPredefined = true;
    const color = new Color(hexValue, isPredefined);
    expect(color.isPredefined).toEqual(true);
  });

  it('should create a non predefined color', () => {
    const hexValue = '#FF0000';
    const color = new Color(hexValue);
    expect(color.isPredefined).toEqual(false);
  });

  it('should set the correct hex value from input without # and lower case letters ', () => {
    const hexValue = '0abcde';
    const color = new Color(hexValue);
    expect(color.hexValue).toEqual('#0ABCDE');
  });

  it('should return correct RGB value', () => {
    const hexValue = '#FF0000';
    const color = new Color(hexValue);
    const rgbValue = getRGBValue(color);
    expect(rgbValue).toEqual('rgb(255,0,0)');
  });

  it('should return correct HSL value', () => {
    const hexValue = '#A354B2';
    const color = new Color(hexValue);
    const rgbValue = getHSLValue(color);
    expect(rgbValue).toEqual('hsl(290,38,51)');
  });
});
