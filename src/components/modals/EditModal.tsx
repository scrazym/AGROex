import {faPencil, faPowerOff, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {FC, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {Colors} from '../../constants/Colors';
import {UserLotManageProps} from '../../navigation/navigators/Stacks/UserStack/types';
import api from '../../services/api';
import {AppText} from '..';
import {textColorStyles} from '../AppText/styles';
import {LotProps} from '../Lot_List/types/types';
import {LoadingModal} from './LoadingModal';
import {ModalStyles} from './style';

type ManageModalProps = {
  id: string;
  isVisible: boolean;
  toggle: () => void;
  screen: string;
  status?: 'ACTIVE' | 'ON_MODERATION' | 'REJECTED' | 'INACTIVE' | 'COMPLITED';
  lot?: LotProps;
  rerender?: (a: string, b: number) => void;
};
export const ManageModal: FC<ManageModalProps> = ({
  screen,
  id,
  isVisible,
  toggle,
  status,
  lot,
  rerender,
}) => {
  const navigation = useNavigation<UserLotManageProps['navigation']>();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigateManage = () => {
    toggle();
    navigation.navigate('USER', {
      screen,
      params: {
        id: id,
      },
      initial: false,
    });
  };
  const deactivateteLot = async (id: string) => {
    setIsLoading(true);
    await api.put(`lots/${id}`, {
      ...lot,
      status: 'INACTIVE',
    });
    setIsLoading(false);
    rerender('ACTIVE', 0);
    toggle();
  };
  const activateLot = async (id: string) => {
    setIsLoading(true);
    await api.put(`lots/${id}`, {
      ...lot,
      status: 'ON_MODERATION',
    });
    setIsLoading(false);
    rerender('ON_MODERATION', 1);
    toggle();
  };
  const deleteLot = async (id: string) => {
    setIsLoading(true);
    const res = await api.delete(`lots/${id}`);
    if (res.status === 204) {
      setIsLoading(false);
      rerender('INACTIVE', 2);
      toggle();
      setTimeout(() => {
        Alert.alert('Lot deleted successfully');
      }, 300);
    }
    setIsLoading(false);
    toggle();
  };
  const handleAlertDeactivate = (id: string) => {
    Alert.alert(
      'Deactivate lot? This lot will be move to inactive page?',
      'Please, confirm your move',
      [
        {text: 'Cancel', style: 'default', onPress: () => toggle()},
        {
          text: 'Yes, deactivate!',
          style: 'destructive',
          onPress: () => deactivateteLot(id),
        },
      ],
    );
  };
  const handleAlertActivate = (id: string) => {
    Alert.alert(
      'Activate lot? This lot will be sent for moderation?',
      'Please, confirm your move',
      [
        {text: 'Cancel', style: 'destructive', onPress: () => toggle()},
        {
          text: 'Yes, activate!',
          style: 'cancel',
          onPress: () => activateLot(id),
        },
      ],
    );
  };
  const handleAlertDelete = (id: string) => {
    Alert.alert(
      'Are you sure? This lot will be remove totaly?',
      'Confirm your move',
      [
        {text: 'Cancel', style: 'cancel', onPress: () => toggle()},
        {
          text: 'Delete anyway!',
          style: 'destructive',
          onPress: () => deleteLot(id),
        },
      ],
    );
  };

  return (
    <View>
      {isLoading ? (
        <LoadingModal isLoading={true} />
      ) : (
        <Modal
          isVisible={isVisible}
          onBackdropPress={toggle}
          style={ModalStyles.modalManageContainer}>
          <View style={ModalStyles.modalManage}>
            <TouchableOpacity style={ModalStyles.manageClose} onPress={toggle}>
              <FontAwesomeIcon color={Colors.GRAY_PRIMARY} icon={faXmark} />
            </TouchableOpacity>
            <TouchableOpacity
              style={ModalStyles.manageBtn}
              onPress={() =>
                status === 'INACTIVE'
                  ? handleAlertActivate(id)
                  : handleNavigateManage()
              }>
              <FontAwesomeIcon color={Colors.GRAY_PRIMARY} icon={faPencil} />
              <AppText variant="label18_400" style={textColorStyles['#798787']}>
                {status === 'INACTIVE' ? 'Activate' : 'Edit'}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={ModalStyles.manageBtn}
              onPress={() =>
                status !== 'INACTIVE'
                  ? handleAlertDeactivate(id)
                  : handleAlertDelete(id)
              }>
              <FontAwesomeIcon
                style={{color: Colors.RED_ERROR}}
                icon={faPowerOff}
              />
              <AppText variant="label18_400" style={textColorStyles['#D40000']}>
                {status !== 'INACTIVE' ? 'Deactivate' : 'Delete'}
              </AppText>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};
