import {useNavigation} from '@react-navigation/native';
import {FC} from 'react';
import {View} from 'react-native';

import {ButtonStyled, ManageModal} from '..';
import {ButtonStyledProps} from '../btns/BtnWithIcon';
import {LotCardProps} from '../Lot_List/types/types';
import {stylesDetailBtn} from './styles';

export const UserLotBtns: FC<UserLotBtnsProps> = ({
  titleFirst,
  titleSecond,
  id,
  isVisible,
  toggleModal,
  screen,
  iconLeft,
  iconRight,
  handleConfirm,
  lot,
  isCompleted,
}) => {
  const navigation = useNavigation();
  return (
    <View style={stylesDetailBtn.container}>
      <View style={stylesDetailBtn.buttonContainer}>
        {isCompleted && (
          <ButtonStyled
            onPress={handleConfirm}
            icon={iconLeft}
            title={titleFirst}
            style="fillConfirm"
          />
        )}
        <ButtonStyled
          title={titleSecond}
          style="transparent"
          onPress={toggleModal}
          icon={iconRight}
        />
        <ManageModal
          lot={lot}
          id={id}
          isVisible={isVisible}
          screen={screen}
          toggle={toggleModal}
          rerender={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};
type Icon = Pick<ButtonStyledProps, 'icon'>;
type UserLotBtnsProps = {
  handleConfirm: () => void;
  titleFirst: string;
  titleSecond: string;
  id: string;
  toggleModal: () => void;
  isVisible: boolean;
  screen: string;
  iconLeft?: Icon;
  iconRight?: Icon;
  lot: LotCardProps;
  isCompleted: boolean;
};
