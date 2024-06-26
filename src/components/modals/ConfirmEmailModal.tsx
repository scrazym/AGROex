import {faUserSecret, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  confirmUserAttribute,
  ConfirmUserAttributeInput,
} from 'aws-amplify/auth';
import React, {FC, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {Colors} from '../../constants/Colors';
import {MyTextInput} from '..';
import {AppText} from '../AppText/AppText';
import {textColorStyles} from '../AppText/styles';
import {ModalStyles} from './style';

type SuccsessModalProp = {
  toggle: () => void;
  visible: boolean;
};
export const ConfirmEmailModal: FC<SuccsessModalProp> = ({visible, toggle}) => {
  const [code, setCode] = useState('');
  const handleSetCode = (value: string) => {
    setCode(value);
  };

  async function handleConfirmUserAttribute({
    userAttributeKey,
    confirmationCode,
  }: ConfirmUserAttributeInput) {
    try {
      await confirmUserAttribute({userAttributeKey, confirmationCode});
      await toggle();
    } catch (err: any) {
      Alert.alert(err.message || err.errorMessage);
    }
    Alert.alert('Email changed successfully');
  }

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

          <AppText variant="label18_500" style={textColorStyles['#2978B8']}>
            Enter your code from email
          </AppText>
          <MyTextInput
            keyboard="numeric"
            onChangeText={e => handleSetCode(e)}
            value={code}
          />
          <TouchableOpacity
            style={ModalStyles.manageBtn}
            onPress={() =>
              handleConfirmUserAttribute({
                userAttributeKey: 'email',
                confirmationCode: code,
              })
            }>
            <FontAwesomeIcon
              size={20}
              color={Colors.BLUE_PRIMARY}
              icon={faUserSecret}
            />
            <AppText variant="label18_500" style={textColorStyles['#2978B8']}>
              Confirm
            </AppText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
