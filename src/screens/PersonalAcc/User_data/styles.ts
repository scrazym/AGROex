import {StyleSheet} from 'react-native';

import {Colors} from '../../../constants/Colors';

export const UserDataStyles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: Colors.WHITE_PRIMARY,
  },
  userInfoWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  passwordWrapper: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 16,
    gap: 25,
  },
  userIconBgWrapper: {
    marginTop: 24,
    width: 80,
    height: 80,
    backgroundColor: Colors.ORANGE_PRIMARY,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  changeIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.WHITE_PRIMARY,
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Colors.GRAY_DARK,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    zIndex: 10,
  },
  fieldsWrapper: {
    marginTop: 40,
  },
  inputWrapperMt20: {
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.GRAY_DARK,
  },
  label: {
    backgroundColor: Colors.WHITE_PRIMARY,
    position: 'absolute',
    top: -6,
    left: 16,
    paddingHorizontal: 7,
  },
  btnWrapperMt: {
    marginBottom: 40,
    marginTop: 20,
  },
  wrapperFlEnd: {
    marginTop: 30,
    justifyContent: 'flex-end',
  },
});
