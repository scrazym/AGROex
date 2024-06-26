import {Platform, StyleSheet} from 'react-native';

import {Colors} from '../../../constants/Colors';

export const LotDetailsStyle = StyleSheet.create({
  scrollContainerIOS: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE_PRIMARY,
  },
  scrollContainerAndroid: {
    flexShrink: 1,
  },
  safeArea: {
    flex: 1,
  },
  expiresWrapper: {
    marginLeft: 12,
  },
  modal: {
    justifyContent: 'center',
    marginHorizontal: 0,
  },
  modalWrapper: {
    top: Platform.OS === 'android' ? 170 : '6%',
    padding: 15,
    width: '100%',
    height: 195,
    backgroundColor: '#fff',
    gap: 16,
    borderRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalInput: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'IBMPlexSans-Regular',
    color: '#131314',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#131314',
  },
  modalBtnWrap: {
    height: '35%',
  },
  modalInputIcon: {
    position: 'absolute',
    top: '35%',
    left: 10,
  },
});
