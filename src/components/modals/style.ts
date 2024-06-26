import {StyleSheet} from 'react-native';

import {Colors} from '../../constants/Colors';

export const ModalStyles = StyleSheet.create({
  modalGoBack: {
    padding: 24,
    width: 345,
    backgroundColor: Colors.WHITE_PRIMARY,
    gap: 16,
    borderRadius: 4,
    alignSelf: 'center',
  },
  modalLoading: {
    padding: 24,
    width: 345,
    height: '20%',
    backgroundColor: Colors.WHITE_PRIMARY,
    gap: 16,
    borderRadius: 4,
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  modalManageContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalSuccess: {
    justifyContent: 'center',
  },
  modalManage: {
    padding: 24,
    width: '100%',
    backgroundColor: Colors.WHITE_PRIMARY,
    gap: 16,
    borderRadius: 4,
    alignSelf: 'center',
    paddingBottom: 30,
  },
  modalManageDelete: {
    alignItems: 'center',
    padding: 24,
    width: '100%',
    backgroundColor: Colors.WHITE_PRIMARY,
    gap: 16,
    borderRadius: 4,
    alignSelf: 'center',
    paddingBottom: 30,
  },
  manageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  manageClose: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },

  modalContainer: {
    height: '90%',
    width: '100%',
    backgroundColor: Colors.WHITE_PRIMARY,
    borderRadius: 10,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    paddingRight: 10,
    marginTop: 10,
  },
  varietyText: {
    margin: 10,
    marginLeft: 20,
    marginBottom: 20,
  },
  varietyChecbox: {
    marginLeft: 35,
    marginBottom: 5,
  },
  varietyDropdown: {
    width: 292,
    alignSelf: 'center',
    marginTop: 10,
  },
  sizeText: {
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeChange: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 5,
    marginBottom: 15,
  },
  inputContainer: {
    width: 146,
    height: 44,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnApply: {
    width: 249,
    margin: 10,
  },
  btnClear: {
    marginLeft: 10,
    alignSelf: 'flex-start',
    borderWidth: 0,
  },
  selectedUnitText: {
    color: Colors.TURQUOISE_PRIMARY,
    fontSize: 21,
  },
});
