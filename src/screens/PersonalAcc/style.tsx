import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

export const userAccStyles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: Colors.WHITE_PRIMARY,
    paddingTop: 24,
  },
  userFieldWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.WHITE_MONO,
  },
  userField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notificationField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  userIconWrapper: {
    backgroundColor: Colors.ORANGE_PRIMARY,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userFieldNotification: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  notificationsWrap: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: Colors.WHITE_MONO,
    justifyContent: 'space-between',
  },
  icons: {
    color: Colors.GRAY_PRIMARY,
  },
  currencyIcons: {
    color: Colors.TURQUOISE_PRIMARY,
  },
  logOut: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
    marginTop: 55,
    paddingVertical: 6,
    alignItems: 'center',
  },
});
