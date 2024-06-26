import {StyleSheet} from 'react-native';

import {Colors} from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE_PRIMARY,
    height: 800,
    zIndex: 1,
  },
  text: {
    marginTop: 30,
    marginBottom: 40,
    marginLeft: 17,
    position: 'relative',
    zIndex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT,
  },
  listWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginLeft: 17,
    marginBottom: 20,
  },
  icon: {
    color: Colors.GRAY_PRIMARY,
  },
  iconChevron: {
    marginRight: 17,
    color: Colors.GRAY_PRIMARY,
  },
});
