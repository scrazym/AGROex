import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
export const successStyles = StyleSheet.create({
  success: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 112,
    justifyContent: 'space-around',
    backgroundColor: Colors.WHITE_PRIMARY,
  },
  successText: {
    alignItems: 'center',
  },
  successIcon: {
    width: '90%',
    height: 260,
  },
});
