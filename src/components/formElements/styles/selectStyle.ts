import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

export const selectStyle = StyleSheet.create({
  dropdown: {
    borderWidth: 0,
    borderRadius: 0,
    position: 'absolute',
    top: 45,
    paddingBottom: 10,
    width: '100%',
    zIndex: 11,
    backgroundColor: '#fff',
    shadowColor: '#131314',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    overflow: 'visible',
  },
  box: {
    borderRadius: 0,
    zIndex: 4,
    borderColor: Colors.GRAY_DARK,
  },
  item: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28,
    letterSpacing: 0.4,
    color: '#131314',
  },
  inputSearch: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#131314',
  },
  selected: {
    backgroundColor: Colors.GRAY_LIGHT,
    borderRadius: 0,
    zIndex: 2,
    borderColor: Colors.GRAY_DARK,
  },
});
