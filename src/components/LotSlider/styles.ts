import {StyleSheet} from 'react-native';

import {Colors} from '../../constants/Colors';

export const stylesSlider = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: 300,
    objectFit: 'scale-down',
  },
  buttonText: {
    color: Colors.WHITE_PRIMARY,
    alignContent: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 25,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(0 0 0 / 0.2)',
    backgroundColor: 'rgba(0 0 0 / 0.2)',
  },
  wrapper: {
    height: 300,
  },
  activeDot: {
    backgroundColor: Colors.TURQUOISE_PRIMARY,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});
