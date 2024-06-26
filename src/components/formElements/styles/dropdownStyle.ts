import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

export const dropdownStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE_PRIMARY,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.GRAY_DARK,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingLeft: 12,
  },
  placeholderStyle: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: Colors.BLACK_PRIMARY,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selected: {
    backgroundColor: Colors.GRAY_LIGHT,
    borderRadius: 0,
    zIndex: 2,
    borderColor: Colors.GRAY_DARK,
  },
});
