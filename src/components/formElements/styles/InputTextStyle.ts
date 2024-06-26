import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

export const TextInputStyle = StyleSheet.create({
  input: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0.2,
    color: Colors.BLACK_PRIMARY,
    borderWidth: 1,
    borderColor: Colors.GRAY_DARK,
    paddingBottom: 11,
    paddingTop: 11,
    paddingLeft: 12,
  },
  pswInputIcon: {
    position: 'absolute',
    right: 15,
    top: '35%',
  },
});
