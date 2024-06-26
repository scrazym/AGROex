import {StyleSheet} from 'react-native';

import {Colors} from '../../../../constants/Colors';

export const ImgStyles = StyleSheet.create({
  emptyImg: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.GRAY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    color: Colors.GRAY_PRIMARY,
  },
  newImgContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  newImg: {
    width: 120,
    height: 100,
    backgroundColor: Colors.GRAY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.TURQUOISE_PRIMARY,
  },
  imgContainer: {
    position: 'relative',
    objectFit: 'contain',
    width: 120,
    height: 100,
    zIndex: 2,
  },
  deleteWrapper: {
    position: 'absolute',
    backgroundColor: Colors.GRAY_LIGHT,
    opacity: 0.7,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 11,
    top: -7,
    right: -7,
  },
});
