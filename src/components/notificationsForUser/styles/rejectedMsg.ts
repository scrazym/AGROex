import {StyleSheet} from 'react-native';

import {Colors} from '../../../constants/Colors';

export const rejectedMsgStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingRight: 25,
    paddingVertical: 3,
    minHeight: 45,
    gap: 10,
    backgroundColor: Colors.BACKGROUND_ERROR,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.RED_ERROR,
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    color: Colors.RED_ERROR,
  },
});
