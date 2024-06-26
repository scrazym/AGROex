import {Colors} from '../../../constants/Colors';

export const backgroundColors = (
  fieldVal: string,
  optVal: string,
  defaultValue: string,
) => {
  return fieldVal === optVal
    ? Colors.TURQUOISE_PRIMARY
    : fieldVal === '' && optVal === defaultValue
      ? Colors.TURQUOISE_PRIMARY
      : Colors.WHITE_PRIMARY;
};
