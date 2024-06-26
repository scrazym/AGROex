import {StyleSheet} from 'react-native';

import {Colors} from '../../../constants/Colors';

export const multipleSelect = StyleSheet.create({
  selectContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderBlockColor: Colors.GRAY_PRIMARY,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectArea: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.GRAY_PRIMARY,
  },
  iconStyle: {
    marginTop: 5,
  },
});
