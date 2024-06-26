import {Colors} from '../../../constants/Colors';
import {StyleSheet} from 'react-native';

export const submitBtnStyles = StyleSheet.create({
  submit: {
    borderWidth: 1,
    borderColor: Colors.TURQUOISE_PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    borderRadius: 4,
    color: Colors.DARK_MEDIUM,
    backgroundColor: Colors.TURQUOISE_PRIMARY,
  },
  disable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE_MONO,
  },
  disableText: {
    color: Colors.GRAY_DARK,
  },
  submitText: {
    color: Colors.WHITE_PRIMARY,
  },
});
