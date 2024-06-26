import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
export const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE_PRIMARY,
  },
  text: {
    fontSize: 24,
    color: Colors.GREEN_PRIMARY,
    lineHeight: 60,
  },
});
