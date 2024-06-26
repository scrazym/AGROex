import {StyleSheet} from 'react-native';

import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 16,
    paddingRight: 10,
    backgroundColor: Colors.WHITE_PRIMARY,
  },
  lotTitle: {
    marginBottom: 10,
    fontSize: 20,
  },
  lotInfo: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.BLUE_EXTRA_LIGHT,
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  icon: {
    color: Colors.BLUE_PRIMARY,
  },
  currencyIcon: {
    paddingBottom: 2,
  },
  lotID: {
    marginLeft: 6,
  },
  lotPriceSection: {
    flex: 1,
  },
  lotWeight: {
    marginLeft: 7,
  },
  lotPrice: {
    flexDirection: 'row',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  lotPriceRowCont: {
    flex: 1,
  },
  lotBed: {
    marginBottom: 4,
    fontSize: 24,
    marginRight: 20,
  },
  lotCost: {
    marginBottom: 4,
  },
  lotSectionContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  labelColumn: {
    flexDirection: 'column',
    flex: 1,
    marginRight: 8,
    marginBottom: 5,
  },
  valueColumn: {
    flex: 1,
  },
});
