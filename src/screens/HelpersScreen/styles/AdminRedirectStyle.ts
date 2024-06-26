import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

export const adminRedirectStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    gap: 40,
    backgroundColor: Colors.WHITE_PRIMARY,
    padding: 20,
  },
  image: {
    width: '50%',
    height: '40%',
  },
  btn: {
    width: '80%',
  },
});
