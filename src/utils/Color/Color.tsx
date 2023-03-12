class Color {
  hexValue: string;
  isPredefined?: boolean;

  constructor(hexValue: string, isPredefined?: boolean) {
    if (!hexValue.startsWith('#')) {
      this.hexValue = '#' + hexValue.toUpperCase();
    } else {
      this.hexValue = hexValue.toUpperCase();
    }

    if (
      isPredefined !== undefined &&
      isPredefined !== null &&
      isPredefined === true
    ) {
      this.isPredefined = true;
    } else {
      this.isPredefined = false;
    }
  }
}

export const getHSLValue = (color: Color) => {
  // calculation formula source: https://www.rapidtables.com/convert/color/rgb-to-hsl.html

  // convert RGB to HSL
  let r = getRed(color) / 255;
  let g = getGreen(color) / 255;
  let b = getBlue(color) / 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  let h = (max + min) / 2;
  let s = (max + min) / 2;
  let l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    let data = max - min;
    s = l > 0.5 ? data / (2 - max - min) : data / (max + min);
    switch (max) {
      case r:
        h = (g - b) / data + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / data + 2;
        break;
      case b:
        h = (r - g) / data + 4;
        break;
    }
    h /= 6;
  }

  // convert HSL to string format
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `hsl(${h},${s},${l})`;
};

export const getRGBValue = (color: Color) => {
  return `rgb(${getRed(color)},${getGreen(color)},${getBlue(color)})`;
};

export const getRed = (color: Color) => {
  return parseInt(color.hexValue.substring(1, 3), 16);
};

export const getGreen = (color: Color) => {
  return parseInt(color.hexValue.substring(3, 5), 16);
};

export const getBlue = (color: Color) => {
  return parseInt(color.hexValue.substring(5, 7), 16);
};

export const getSaturation = (color: Color) => {
  let r = getRed(color) / 255;
  let g = getGreen(color) / 255;
  let b = getBlue(color) / 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  let s = (max + min) / 2;
  let l = (max + min) / 2;

  if (max === min) {
    s = 0;
  } else {
    let data = max - min;
    s = l > 0.5 ? data / (2 - max - min) : data / (max + min);
  }

  return Math.round(s * 100);
};

export default Color;

// interface ColorProps {
//   hexValue: string;
//   getRBGValue: () => string;
// }

// const Color = (hexValue: string): ColorProps => {
//   const color: ColorProps = {
//     hexValue: hexValue,

//     getRBGValue: () => {
//       let r = parseInt(hexValue.substring(1, 3), 16);
//       let g = parseInt(hexValue.substring(3, 5), 16);
//       let b = parseInt(hexValue.substring(5, 7), 16);

//       return `rgb(${r},${g},${b})`;
//     },
//   };

//   return color;
// };

// export default Color;
