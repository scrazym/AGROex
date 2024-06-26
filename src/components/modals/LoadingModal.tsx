import {FC} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';

import {Loading} from '..';
import {ModalStyles} from './style';

export const LoadingModal: FC<LoadingModal> = ({isLoading}) => {
  return (
    <View>
      <Modal isVisible={isLoading}>
        <View style={ModalStyles.modalLoading}>
          <Loading />
        </View>
      </Modal>
    </View>
  );
};

type LoadingModal = {
  isLoading: boolean;
};
