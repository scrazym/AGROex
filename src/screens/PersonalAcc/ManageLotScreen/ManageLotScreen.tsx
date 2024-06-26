import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {AppText, HeaderBack} from '../../../components';
import {
  textColorStyles,
  textTypographyStyles,
} from '../../../components/AppText/styles';
import {LotForm} from '../../../components/formElements/components/LotForm';
import {ModalStyles} from '../../../components/modals/style';
import {UserLotManageProps} from '../../../navigation/navigators/Stacks/UserStack/types';
import api from '../../../services/api';

export const ManageLot: FC<UserLotManageProps> = ({navigation, route}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [categor, setCategories] = useState([]);
  const {id} = route?.params;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const customGoBack = () => {
    navigation.goBack();
    setModalVisible(false);
  };

  const getCategories = async () => {
    const categories = await api.getData('categories');
    setCategories(categories.data);
  };

  useFocusEffect(
    useCallback(() => {
      getCategories();
    }, []),
  );

  return (
    <SafeAreaView>
      <HeaderBack onPress={toggleModal} text="Manage Lot" />
      <LotForm dataCategories={categor} idLot={id} />
      <View>
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={ModalStyles.modalGoBack}>
            <AppText
              style={
                (textColorStyles['#131314'], textTypographyStyles.label20_500)
              }>
              Discard edits?
            </AppText>
            <AppText
              style={
                (textColorStyles['#131314'], textTypographyStyles.label16_400)
              }>
              If you go back now, you'll lose all of your edits you've made.
            </AppText>
            <TouchableOpacity onPress={customGoBack} style={ModalStyles.button}>
              <AppText variant="label16_400" style={textColorStyles['#DC3737']}>
                Discard
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity style={ModalStyles.button} onPress={toggleModal}>
              <AppText variant="label16_400" style={textColorStyles['#38999B']}>
                Cancel
              </AppText>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
