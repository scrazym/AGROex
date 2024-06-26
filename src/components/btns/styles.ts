import {StyleSheet} from 'react-native';

import {Colors} from '../../constants/Colors';
import {textColorStyles} from '../AppText/styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: Colors.TURQUOISE_PRIMARY,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.TURQUOISE_PRIMARY,
    paddingVertical: 10,
    marginTop: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  iconFill: {
    color: Colors.WHITE_PRIMARY,
  },
  iconTransperent: {
    color: Colors.TURQUOISE_PRIMARY,
  },
  btnFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    color: Colors.WHITE_PRIMARY,
    backgroundColor: Colors.TURQUOISE_PRIMARY,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.TURQUOISE_PRIMARY,
    paddingVertical: 8,
    minHeight: 45,
    maxHeight: 45,
  },
  btnFillConfirm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    color: Colors.WHITE_PRIMARY,
    backgroundColor: Colors.GREEN_SUCCSES_BACKGROUND,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.TURQUOISE_PRIMARY,
    paddingVertical: 8,
    minHeight: 45,
  },
  btnTransperent: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    color: Colors.TURQUOISE_PRIMARY,
    backgroundColor: Colors.WHITE_PRIMARY,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.TURQUOISE_PRIMARY,
    paddingVertical: 8,
    minHeight: 45,
    maxHeight: 45,
  },
  btnTrBord0: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    color: Colors.TURQUOISE_PRIMARY,
    backgroundColor: Colors.WHITE_PRIMARY,
    borderRadius: 4,
    paddingVertical: 1,
    minHeight: 30,
    maxHeight: 45,
  },
  btnDisabled: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE_MONO,
    minHeight: 45,
  },
  textWhite: {
    alignSelf: 'center',
    color: Colors.WHITE_PRIMARY,
  },
  textTurq: {
    color: Colors.TURQUOISE_PRIMARY,
  },
});

export const btnStyle = (disabled: boolean, style: string) => {
  return disabled
    ? styles.btnDisabled
    : style === 'fill'
      ? styles.btnFill
      : style === 'fillConfirm'
        ? styles.btnFillConfirm
        : style === 'borderNone'
          ? styles.btnTrBord0
          : styles.btnTransperent;
};

export const textStyle = (disabled: boolean, style: string) => {
  return disabled
    ? textColorStyles['#798787']
    : style === 'fill' || style === 'fillConfirm'
      ? textColorStyles['#FFFFFF']
      : textColorStyles['#38999B'];
};
