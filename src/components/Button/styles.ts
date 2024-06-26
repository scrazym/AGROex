import {StyleSheet} from 'react-native';

import {Colors} from '../../constants/Colors';

export const stylesDetailBtn = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY_LIGHT,
    backgroundColor: Colors.WHITE_PRIMARY,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 16,
    marginHorizontal: 8,
    gap: 10,
  },

  buttonContainerWoutHorM: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 16,
    gap: 10,
  },
  betBtn: {
    backgroundColor: Colors.WHITE_PRIMARY,
    borderColor: Colors.TURQUOISE_PRIMARY,
    borderWidth: 1,
    paddingLeft: 23,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 2,
    width: 167,
  },
  buyBtn: {
    backgroundColor: Colors.TURQUOISE_PRIMARY,
    paddingLeft: 30,
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 2,
    width: 167,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  betText: {
    paddingLeft: 16,
  },
  buyText: {
    paddingLeft: 16,
  },
  iconManage: {
    position: 'absolute',
    zIndex: 12,
    right: 0,
  },
});
