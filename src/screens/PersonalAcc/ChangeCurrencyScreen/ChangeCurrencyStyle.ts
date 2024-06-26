import {StyleSheet} from 'react-native';

import {Colors} from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_PRIMARY,
  },
  itemContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  items: {
    marginTop: 25,
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
  },
  currencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginLeft: 10,
  },
  selectedCurrency: {
    backgroundColor: 'rgba(56, 153, 155, 0.2)',
    borderRadius: 5,
  },
});
