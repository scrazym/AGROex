import React, {FC, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {AppText, HeaderBack, Loading} from '../../components';
import {
  textColorStyles,
  textTypographyStyles,
} from '../../components/AppText/styles';
import {LotForm} from '../../components/formElements/components/LotForm';
import {FormStyles} from '../../components/formElements/styles/formStyles';
import {ModalStyles} from '../../components/modals/style';
import {Colors} from '../../constants/Colors';
import {NewAddScreenProps} from '../../navigation/navigators/Stacks/NewAddStack/types';
import api from '../../services/api';

export const NewAd: FC<NewAddScreenProps> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [categor, setCategories] = useState([]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleGoBack = () => {
    navigation.goBack();
    setModalVisible(false);
  };
  const getCategories = async () => {
    setIsLoading(true);
    const categories = await api.getData('categories');
    setCategories(categories.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={FormStyles.mainWrapper}>
      <HeaderBack onPress={toggleModal} text="GO BACK" />
      <LotForm dataCategories={categor} idLot="" />
      <View>
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={ModalStyles.modalGoBack}>
            <AppText
              style={[
                textColorStyles[Colors.BLACK_PRIMARY],
                textTypographyStyles.label20_500,
              ]}>
              Discard edits?
            </AppText>
            <AppText
              style={
                (textColorStyles[Colors.BLACK_PRIMARY],
                textTypographyStyles.label16_400)
              }>
              If you go back now, you'll lose all of your edits you've made.
            </AppText>
            <TouchableOpacity onPress={handleGoBack} style={ModalStyles.button}>
              <AppText
                variant="label16_400"
                style={textColorStyles[Colors.RED_ERROR_SECONDARY]}>
                Discard
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity style={ModalStyles.button} onPress={toggleModal}>
              <AppText
                variant="label16_400"
                style={textColorStyles[Colors.TURQUOISE_PRIMARY]}>
                Cancel
              </AppText>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};
