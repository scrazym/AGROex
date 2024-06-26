import {faGear} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {Colors} from '../../constants/Colors';
import {ManageModal} from '..';
import {LotProps} from '../Lot_List/types/types';
import {stylesDetailBtn} from './styles';

export const ManageTouchIcon: FC<ManageTouchIcon> = ({
  id,
  isVisible,
  screen,
  toggleModal,
  lot,
  rerender,
}) => {
  return (
    <View style={stylesDetailBtn.iconManage}>
      <TouchableOpacity onPress={toggleModal}>
        <FontAwesomeIcon color={Colors.GREEN_PRIMARY} icon={faGear} />
      </TouchableOpacity>
      <ManageModal
        lot={lot}
        id={id}
        isVisible={isVisible}
        screen={screen}
        toggle={toggleModal}
        rerender={rerender}
      />
    </View>
  );
};

type ManageTouchIcon = {
  lot: LotProps;
  id: string;
  isVisible: boolean;
  screen: string;
  toggleModal: () => void;
  rerender: () => void;
};
