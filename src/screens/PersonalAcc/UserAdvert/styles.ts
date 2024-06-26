import {StyleSheet} from 'react-native';

import {Colors} from '../../../constants/Colors';

export const userAdvertStyles = StyleSheet.create({
  mainScreenContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE_PRIMARY,
  },
  listWrapper: {
    flex: 1,
    paddingVertical: 2,
    paddingHorizontal: 12,
  },
  listBetWrapper: {
    flex: 1,
    paddingVertical: 2,
  },
  separator: {
    marginVertical: 12,
    borderBottomColor: Colors.GRAY_DARK,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  orderListWrapper: {
    marginTop: 10,
  },
});
