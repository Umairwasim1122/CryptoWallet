import {Dimensions, PixelRatio, Platform} from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('window').width;

export const DEVICE_HEIGHT = Dimensions.get('window').height;

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const MODAL_HEIGHT = DEVICE_HEIGHT / 1.2;

export const CONTENT_WIDTH = DEVICE_WIDTH - 30;
export const CONTENT_OFFSET = 15;

export const WIDTH_BASE_RATIO = value => {
  const DESIGN_WIDTH = 390;
  const WINDOW_WIDTH = DEVICE_WIDTH;
  const VALUE_IN_SCREEN_WDITH_RATIO = (WINDOW_WIDTH * value) / DESIGN_WIDTH;
  return VALUE_IN_SCREEN_WDITH_RATIO;
};

export const HEIGHT_BASE_RATIO = value => {
  const DESIGN_HEIGHT = 844;
  const WINDOW_HEIGHT = DEVICE_HEIGHT;
  const VALUE_IN_SCREEN_HEIGHT_RATIO = (WINDOW_HEIGHT * value) / DESIGN_HEIGHT;
  return VALUE_IN_SCREEN_HEIGHT_RATIO;
};

export const wp = widthPercent => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((DEVICE_WIDTH * elemWidth) / 100);
};

export const hp = heightPercent => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((DEVICE_HEIGHT * elemHeight) / 100);
};

const scale = DEVICE_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

export const FONT_SIZE = value => {
  return HEIGHT_BASE_RATIO(value);
};

// export const PhoneNumberValidate = (phone_number) => {
//   const number = phone_number.substring(1);

//   phone_number = `+92${number}`;

//   return phone_number;
// };

export const PhoneNumberValidate = phone_number => {
  const prefixMap = {
    '03': '+923',
    '0092': '+92',
    92: '+92',
    3: '+923',
  };
  for (const [prefix, value] of Object.entries(prefixMap)) {
    if (phone_number.startsWith(prefix)) {
      return value + phone_number.substring(prefix.length);
    }
  }
  return phone_number;
};
