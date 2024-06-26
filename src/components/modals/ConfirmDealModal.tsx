import {faChampagneGlasses, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {Colors} from '../../constants/Colors';
import {AppText} from '../AppText/AppText';
import {textColorStyles} from '../AppText/styles';
import {ModalStyles} from './style';

type SuccsessModalProp = {
  toggle: () => void;
  visible: boolean;
  confirmDeal: () => void;
  title: string;
};
export const ConfirmDealModal: FC<SuccsessModalProp> = ({
  confirmDeal,
  visible,
  toggle,
  title,
}) => {
  return (
    <View>
      <Modal
        isVisible={visible}
        style={ModalStyles.modalSuccess}
        onBackdropPress={() => toggle()}>
        <View style={ModalStyles.modalManageDelete}>
          <TouchableOpacity onPress={toggle} style={ModalStyles.manageClose}>
            <FontAwesomeIcon color={Colors.GRAY_PRIMARY} icon={faXmark} />
          </TouchableOpacity>

          <AppText variant="label18_500" style={textColorStyles['#183C48']}>
            {title}
          </AppText>
          <TouchableOpacity style={ModalStyles.manageBtn} onPress={confirmDeal}>
            <FontAwesomeIcon
              size={20}
              color={Colors.GREEN_PRIMARY}
              icon={faChampagneGlasses}
            />
            <AppText variant="label18_500" style={textColorStyles['#51ACAE']}>
              Yes, confirm
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity style={ModalStyles.manageBtn} onPress={toggle}>
            <FontAwesomeIcon
              size={20}
              color={Colors.RED_ERROR}
              icon={faXmark}
            />
            <AppText variant="label18_500" style={textColorStyles['#D40000']}>
              Cancel
            </AppText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
