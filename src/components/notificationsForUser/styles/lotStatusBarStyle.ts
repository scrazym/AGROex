import {Dimensions, StyleSheet} from 'react-native';

import {Colors} from '../../../constants/Colors';

const screenWidth = Dimensions.get('window').width;
export const LotStatusBarStyle = StyleSheet.create({
  wrapperModeration: {
    maxWidth: screenWidth * 0.3,
    height: 25,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.BLUE_PRIMARY,
    backgroundColor: Colors.BLUE_EXTRA_LIGHT,
    paddingVertical: 3,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  wrapperAuction: {
    maxWidth: screenWidth * 0.3,
    height: 25,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.ORANGE_PRIMARY,
    backgroundColor: Colors.BLUE_EXTRA_LIGHT,
    paddingVertical: 3,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  wrapperNonAuction: {
    maxWidth: screenWidth * 0.3,
    height: 25,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PURPLE_PRIMARY,
    backgroundColor: Colors.BLUE_EXTRA_LIGHT,
    paddingVertical: 3,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  wrapperComlited: {
    maxWidth: screenWidth * 0.3,
    height: 25,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GREEN_SUCCSES_PRIMARY,
    backgroundColor: Colors.GREEN_SECOND_BACKGROUND,
    paddingVertical: 3,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  wrapperRejected: {
    maxWidth: screenWidth * 0.3,
    height: 25,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.RED_PRIMARY,
    backgroundColor: Colors.BACKGROUND_ERROR,
    paddingVertical: 3,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
});
