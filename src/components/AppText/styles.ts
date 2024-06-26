import {Platform, StyleSheet, TextStyle} from 'react-native';

import {Colors} from '../../constants/Colors';
import {TEXT_COLOR_VARIANT, TEXT_VARIANT} from './types';

const regularFont =
  Platform.OS === 'android' ? 'IBMPlexSans-Regular' : 'IBMPlexSans-Regular';
const MediumFont =
  Platform.OS === 'android' ? 'IBMPlexSans-Medium' : 'IBMPlexSans-Medium';
const BoldFont =
  Platform.OS === 'android' ? 'IBMPlexSans-Bold' : 'IBMPlexSans-Bold';

export const textTypographyStyles = StyleSheet.create<{
  [key in TEXT_VARIANT]: TextStyle;
}>({
  [TEXT_VARIANT.LABEL_16_400]: {
    fontFamily: regularFont,
    fontWeight: '400',
    lineHeight: 24,
    fontSize: 16,
    alignItems: 'center',
  },
  [TEXT_VARIANT.LABEL_16_500]: {
    fontFamily: regularFont,
    fontWeight: '400',
    lineHeight: 24,
    fontSize: 16,
    alignItems: 'center',
  },
  [TEXT_VARIANT.LABEL_20_500]: {
    fontFamily: MediumFont,
    fontWeight: '500',
    lineHeight: 25,
    fontSize: 20,
    alignItems: 'center',
  },
  [TEXT_VARIANT.LABEL_10_500]: {
    fontFamily: MediumFont,
    fontWeight: '500',
    lineHeight: 26,
    fontSize: 10,
  },
  [TEXT_VARIANT.LABEL_10_400]: {
    fontFamily: regularFont,
    fontWeight: '400',
    lineHeight: 12,
    fontSize: 10,
    alignItems: 'center',
  },
  [TEXT_VARIANT.LABEL_22_600]: {
    fontFamily: BoldFont,
    fontWeight: '600',
    lineHeight: 32,
    fontSize: 32,
    alignItems: 'center',
  },
  [TEXT_VARIANT.LABEL_18_500]: {
    fontFamily: MediumFont,
    fontWeight: '500',
    lineHeight: 28,
    fontSize: 18,
  },
  [TEXT_VARIANT.LABEL_12_400]: {
    fontFamily: BoldFont,
    fontWeight: '400',
    lineHeight: 16,
    fontSize: 12,
  },
  [TEXT_VARIANT.LABEL_18_400]: {
    fontFamily: regularFont,
    fontWeight: '400',
    fontSize: 18,
  },
  [TEXT_VARIANT.LABEL_24_400]: {
    fontFamily: regularFont,
    fontWeight: '400',
    lineHeight: 32,
    fontSize: 24,
  },
  [TEXT_VARIANT.LABEL_24_500]: {
    fontFamily: BoldFont,
    fontWeight: '500',
    lineHeight: 32,
    fontSize: 24,
  },
});

export const textColorStyles = StyleSheet.create<{
  [key in TEXT_COLOR_VARIANT]: TextStyle;
}>({
  [Colors.AGROEX_MAIN]: {color: Colors.AGROEX_MAIN},
  [Colors.BACKGROUND_ERROR]: {color: Colors.BACKGROUND_ERROR},
  [Colors.BLACK_PRIMARY]: {color: Colors.BLACK_PRIMARY},
  [Colors.BLUE_PRIMARY]: {color: Colors.BLUE_PRIMARY},
  [Colors.BLUE_SECONDARY]: {color: Colors.BLUE_SECONDARY},
  [Colors.DARK_MEDIUM]: {color: Colors.DARK_MEDIUM},
  [Colors.GRAY_DARK]: {color: Colors.GRAY_DARK},
  [Colors.GRAY_PRIMARY]: {color: Colors.GRAY_PRIMARY},
  [Colors.GREEN_PRIMARY]: {color: Colors.GREEN_PRIMARY},
  [Colors.GREEN_SUCCSES_BACKGROUND]: {color: Colors.GREEN_SUCCSES_BACKGROUND},
  [Colors.GREEN_SUCCSES_PRIMARY]: {color: Colors.GREEN_SUCCSES_PRIMARY},
  [Colors.ORANGE_PRIMARY]: {color: Colors.ORANGE_PRIMARY},
  [Colors.RED_ERROR]: {color: Colors.RED_ERROR},
  [Colors.RED_ERROR_SECONDARY]: {color: Colors.RED_ERROR_SECONDARY},
  [Colors.RED_PRIMARY]: {color: Colors.RED_PRIMARY},
  [Colors.TURQUOISE_PRIMARY]: {color: Colors.TURQUOISE_PRIMARY},
  [Colors.WHITE_PRIMARY]: {color: Colors.WHITE_PRIMARY},
});
