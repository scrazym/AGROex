import {StyleSheet} from 'react-native';

import {Colors} from '../../constants/Colors';

export const CustomHeaderStyles = StyleSheet.create({
  barBack: {
    backgroundColor: Colors.WHITE_PRIMARY,
    paddingLeft: 16,
    paddingRight: 40,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.WHITE_MONO,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 0,
    backgroundColor: Colors.WHITE_PRIMARY,
    borderBottomColor: Colors.GRAY_LIGHT,
    borderBottomWidth: 1,
    zIndex: 30,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 40,
    paddingBottom: 18,
  },
});
