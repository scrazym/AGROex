import {faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {faPencil, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {Colors} from '../../constants/Colors';
import {AppText} from '../AppText/AppText';
import {textColorStyles} from '../AppText/styles';
import {ModalStyles} from './style';

type IconModalProp = {
  toggle: () => void;
  visible: boolean;
  pickImg: () => void;
  deleteIcon: () => void;
};
export const IconManageModal: FC<IconModalProp> = ({
  visible,
  pickImg,
  toggle,
  deleteIcon,
}) => {
  return (
    <View>
      <Modal
        isVisible={visible}
        style={ModalStyles.modalManageContainer}
        onBackdropPress={() => toggle()}>
        <View style={ModalStyles.modalManage}>
          <TouchableOpacity style={ModalStyles.manageClose}>
            <FontAwesomeIcon color={Colors.GRAY_PRIMARY} icon={faXmark} />
          </TouchableOpacity>
          <TouchableOpacity style={ModalStyles.manageBtn} onPress={pickImg}>
            <FontAwesomeIcon color={Colors.GRAY_PRIMARY} icon={faPencil} />
            <AppText variant="label18_400" style={textColorStyles['#798787']}>
              Choose a new image
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={ModalStyles.manageBtn}
            onPress={() => deleteIcon()}>
            <FontAwesomeIcon
              style={{color: Colors.RED_ERROR}}
              icon={faTrashCan}
            />
            <AppText variant="label18_400" style={textColorStyles['#D40000']}>
              Deleate image
            </AppText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
