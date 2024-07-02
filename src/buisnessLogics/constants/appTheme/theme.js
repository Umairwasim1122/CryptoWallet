import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
import {FONT_SIZE} from '../../utils/helpers';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const COLORS = {
  primary: '#ECECEC',
  secondary: '#FFFFFF',
  WHITE: '#FFFFFF',
  BLACK: '#161A1D',
  LIGHT_TEXT: '#A0A0A0',
  LIGHT_BLACK: '#242527',
  LIGHT_SILEVR: '#F8F8F8',
  LIGHT_BLUE: '#F7F8FA',
  GRAY: '#DCDCDC',
  DARK_GRAY: '#8A8C8E',
  SEMI_WHITE: '#EEEEEE',
  BLUE: '#008AFB',
  RED: '#F00028',
  LIGHT_RED: '#FFE7EB',
  GREEN: '#149100',
  LIGHT_GREEN: '#E8F8E5',
  LIGHT_ORANGE: '#FFF3E5',
  ORANGE: '#FF8A00',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  logowidth: 176,
  logoheight: 51,
  paddingH: width * 0.086,
  paddingH: width * 0.086,
  iconWidth: width / 30 + 13,
  iconHeight: height / 40 + 13,

  // shadow

  shadowANDROID: {
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.1,
    elevation: 10,
    zIndex: 999,
  },
  PinkshadowANDROID: {
    shadowColor: '#fe3f6c',
    shadowOffset: {width: 5, height: 5},

    shadowOpacity: 0.1,
    elevation: -3,
    zIndex: 66,
  },

  shadow_ios_android: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    elevation: 4,
    backgroundColor: 'white',
  },
  lightShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.41,

    elevation: 1,
  },

  shadowIOS: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
  },

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  Raleway_Black_700_32: {
    fontSize: FONT_SIZE(32),
    fontFamily: 'Raleway-Bold',
    color: COLORS.BLACK,
  },
  Raleway_Black_700_20: {
    fontSize: FONT_SIZE(20),
    fontFamily: 'Raleway-Bold',
    color: COLORS.BLACK,
  },
  Raleway_White_500_16: {
    fontSize: FONT_SIZE(16),
    fontFamily: 'Raleway-Regular',
    color: COLORS.WHITE,
  },
  Raleway_Black_500_14: {
    fontSize: FONT_SIZE(14),
    fontFamily: 'Raleway-Regular',
    color: COLORS.BLACK,
  },
  Raleway_White_600_14: {
    fontSize: FONT_SIZE(14),
    fontFamily: 'Raleway-Medium',
    color: COLORS.WHITE,
  },
  Raleway_RED_600_16: {
    fontSize: FONT_SIZE(16),
    fontFamily: 'Raleway-Medium',
    color: COLORS.RED,
  },

  Raleway_White_400_14: {
    fontSize: FONT_SIZE(14),
    fontFamily: 'Raleway-Light',
    color: COLORS.GRAY,
  },
  Nunito_Black_400_12: {
    fontSize: FONT_SIZE(12),
    fontFamily: 'NunitoSans_7pt_Condensed-Light',
    color: COLORS.BLACK,
  },

  Nunito_Green_400_12: {
    fontSize: FONT_SIZE(12),
    fontFamily: 'NunitoSans_7pt_Condensed-Light',
    color: COLORS.GREEN,
  },
  Nunito_Orange_400_12: {
    fontSize: FONT_SIZE(12),
    fontFamily: 'NunitoSans_7pt_Condensed-Light',
    color: COLORS.ORANGE,
  },
  Nunito_Black_400_14: {
    fontSize: FONT_SIZE(14),
    fontFamily: 'NunitoSans_7pt_Condensed-Light',
    color: COLORS.BLACK,
  },
  Nunito_Gray_400_12: {
    fontSize: FONT_SIZE(12),
    fontFamily: 'NunitoSans_7pt_Condensed-Light',
    color: COLORS.DARK_GRAY,
  },
  Nunito_DARK_GRAY_400_14: {
    fontSize: FONT_SIZE(14),
    fontFamily: 'NunitoSans_7pt_Condensed-Light',
    color: COLORS.DARK_GRAY,
  },
  Nunito_DARK_GRAY_400_12: {
    fontSize: FONT_SIZE(12),
    fontFamily: 'NunitoSans_7pt_Condensed-Light',
    color: COLORS.DARK_GRAY,
  },
  Nunito_Black_500_12: {
    fontSize: FONT_SIZE(12),
    fontFamily: 'NunitoSans_7pt_Condensed-Regular',
    color: COLORS.BLACK,
  },
  Nunito_Black_400_16: {
    fontSize: FONT_SIZE(16),
    fontFamily: 'NunitoSans_7pt_Condensed-Light',
    color: COLORS.BLACK,
  },
  Nunito_Red_600_12: {
    fontSize: FONT_SIZE(12),
    fontFamily: 'NunitoSans_7pt_Condensed-Regular',
    color: COLORS.RED,
  },
  Nunito_Black_600_12: {
    fontSize: FONT_SIZE(12),
    fontFamily: 'NunitoSans_7pt_Condensed-Medium',
    color: COLORS.BLACK,
  },
  Nunito_Black_700_14: {
    fontSize: FONT_SIZE(14),
    fontFamily: 'NunitoSans_7pt_Condensed-Bold',
    color: COLORS.BLACK,
  },
  Nunito_White_700_14: {
    fontSize: FONT_SIZE(14),
    fontFamily: 'NunitoSans_7pt_Condensed-Bold',
    color: COLORS.WHITE,
  },
  Nunito_Red_700_16: {
    fontSize: FONT_SIZE(16),
    fontFamily: 'NunitoSans_7pt_Condensed-Bold',
    color: COLORS.RED,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
