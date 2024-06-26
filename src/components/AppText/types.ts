import {Colors} from '../../constants/Colors';

export enum TEXT_VARIANT {
  LABEL_16_400 = 'label16_400',
  LABEL_16_500 = 'label16_500',
  LABEL_24_500 = 'label24_500',
  LABEL_20_500 = 'label20_500',
  LABEL_10_500 = 'label10_500',
  LABEL_12_400 = 'label12_400',
  LABEL_10_400 = 'label10_400',
  LABEL_22_600 = 'label22_600',
  LABEL_18_500 = 'label18_500',
  LABEL_18_400 = 'label18_400',
  LABEL_24_400 = 'label24_400',
}

export type TEXT_COLOR_VARIANT =
  | Colors.AGROEX_MAIN
  | Colors.BACKGROUND_ERROR
  | Colors.BLACK_PRIMARY
  | Colors.BLUE_PRIMARY
  | Colors.BLUE_SECONDARY
  | Colors.DARK_MEDIUM
  | Colors.GRAY_PRIMARY
  | Colors.GREEN_PRIMARY
  | Colors.GREEN_SUCCSES_BACKGROUND
  | Colors.GREEN_SUCCSES_PRIMARY
  | Colors.ORANGE_PRIMARY
  | Colors.RED_ERROR
  | Colors.RED_ERROR_SECONDARY
  | Colors.RED_PRIMARY
  | Colors.TURQUOISE_PRIMARY
  | Colors.WHITE_PRIMARY
  | Colors.PURPLE_PRIMARY;
