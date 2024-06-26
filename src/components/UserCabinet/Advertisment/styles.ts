import {StyleSheet} from 'react-native';

export const AdverComponentsStyles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  rowWrapper: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingHorizontal: 3,
    paddingBottom: 7,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'IBM Plex Sans',
  },
  userCardMoney: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  userCardMoneyWrap: {
    flex: 1,
  },
  userCardImg: {
    width: '100%',
    height: 160,
    paddingVertical: 15,
    marginBottom: 15,
  },
  lotWeight: {
    marginLeft: 6,
  },
  barWrapper: {
    padding: 5,
  },
});
