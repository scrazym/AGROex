import {faThumbsUp, faXmark} from '@fortawesome/free-solid-svg-icons';
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
};
export const SuccessModal: FC<SuccsessModalProp> = ({visible, toggle}) => {
  return (
    <View>
      <Modal
        isVisible={visible}
        style={ModalStyles.modalSuccess}
        onBackdropPress={() => toggle()}>
        <View style={ModalStyles.modalManage}>
          <TouchableOpacity onPress={toggle} style={ModalStyles.manageClose}>
            <FontAwesomeIcon color={Colors.GRAY_PRIMARY} icon={faXmark} />
          </TouchableOpacity>
          <TouchableOpacity style={ModalStyles.manageBtn} onPress={toggle}>
            <FontAwesomeIcon
              size={30}
              color={Colors.GREEN_PRIMARY}
              icon={faThumbsUp}
            />
            <AppText variant="label24_500" style={textColorStyles['#009761']}>
              Change complited
            </AppText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
