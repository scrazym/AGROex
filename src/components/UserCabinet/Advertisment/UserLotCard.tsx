import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import {Colors} from '../../../constants/Colors';
import {getPricePerQuant} from '../../../helpers/getPricePerQuant';
import {USER_STACK_ROUTE} from '../../../navigation/navigators/Stacks/UserStack/types';
import {currencyStorage} from '../../../screens/PersonalAcc/ChangeCurrencyScreen/ChangeCurrencyScreen';
import {handleSellOutLot} from '../../../services/handleSellOut';
import {AppText, ButtonStyled, ManageModal} from '../..';
import {textColorStyles, textTypographyStyles} from '../../AppText/styles';
import {stylesDetailBtn} from '../../Button/styles';
import {Bet} from '../../Lot_List/components/IsBets';
import {LotProps} from '../../Lot_List/types/types';
import {ConfirmDealModal} from '../../modals/ConfirmDealModal';
import {EmptyImg} from '../../newAd/components/Img/EmptyImg';
import {LotStatusBar} from '../../notificationsForUser/LotStatusBar';
import {RejectedMessage} from '../../notificationsForUser/RejectionMsg';
import {AdverComponentsStyles} from './styles';

export const UserLotCard: FC<UserLotCardProps> = ({
  onPress,
  lotItem,
  setDelete,
}) => {
  const {user} = useAuthenticator(context => [context.user]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isConfirmVisible, setConfirmVisibele] = useState(false);

  const [currencyIcon, setCurrencyIcon] = useState(
    JSON.parse(currencyStorage.getString('selectedCurrencyIcon') || ''),
  );
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleConfirmModal = () => {
    setConfirmVisibele(!isConfirmVisible);
  };
  const handleSellOutPress = (id: string) => {
    handleSellOutLot(id);
    setDelete('', 0);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={AdverComponentsStyles.userCardImg}>
        {lotItem.images.length ? (
          <Image
            style={AdverComponentsStyles.userCardImg}
            source={{
              uri: lotItem.images[0].imageUrl,
            }}
          />
        ) : (
          <EmptyImg />
        )}
      </View>
      <View style={AdverComponentsStyles.rowWrapper}>
        <View>
          <AppText ellipsizeMode="tail" numberOfLines={1} variant="label18_500">
            {lotItem.title}
          </AppText>
        </View>
      </View>
      <View style={AdverComponentsStyles.barWrapper}>
        {(lotItem.status === 'ON_MODERATION' ||
          lotItem.status === 'REJECTED' ||
          lotItem.status === 'COMPLETED') && (
          <LotStatusBar status={lotItem.status} />
        )}
      </View>
      <AppText variant="label12_400">{`Create: ${lotItem.creationDate}`}</AppText>
      {lotItem.status === 'REJECTED' && (
        <RejectedMessage message={lotItem.rejectionReason || ''} />
      )}
      <View style={AdverComponentsStyles.userCardMoney}>
        <View style={AdverComponentsStyles.userCardMoneyWrap}>
          {lotItem.latestBet && (
            <Bet
              lotType={lotItem.lotType}
              isPlaceBet={false}
              author={lotItem.author}
              variant="label24_500"
              bet={lotItem.latestBet}
            />
          )}

          {lotItem.latestBet && (
            <AppText
              style={[
                textTypographyStyles.label12_400,
                textColorStyles[Colors.GRAY_PRIMARY],
              ]}>
              {getPricePerQuant(10, lotItem.quantity, lotItem.quantityUnits)}
            </AppText>
          )}
        </View>
        <View style={AdverComponentsStyles.userCardMoneyWrap}>
          <AppText
            style={[
              textTypographyStyles.label24_500,
              textColorStyles[Colors.BLACK_PRIMARY],
            ]}>
            <View>
              <FontAwesomeIcon icon={currencyIcon} size={20} />
            </View>
            {Math.round(lotItem.calculatedPrice)}
          </AppText>
          <View style={AdverComponentsStyles.lotWeight}>
            <AppText
              style={[
                textTypographyStyles.label12_400,
                textColorStyles[Colors.GRAY_PRIMARY],
              ]}>
              <View>
                <FontAwesomeIcon
                  icon={currencyIcon}
                  size={9}
                  color={Colors.GRAY_PRIMARY}
                />
              </View>
              {getPricePerQuant(
                lotItem.calculatedPrice,
                lotItem.quantity,
                lotItem.quantityUnits,
              )}
            </AppText>
          </View>
        </View>
      </View>

      {user.userId === lotItem.author && lotItem.status !== 'COMPLETED' && (
        <View style={stylesDetailBtn.buttonContainerWoutHorM}>
          {lotItem.latestBet && (
            <ButtonStyled
              onPress={toggleConfirmModal}
              style="fillConfirm"
              title="Confirm deal"
              icon="confirm"
            />
          )}
          <ButtonStyled
            onPress={toggleModal}
            style="transparent"
            title="Manage"
            icon="manage"
          />
        </View>
      )}
      <ConfirmDealModal
        visible={isConfirmVisible}
        toggle={toggleConfirmModal}
        confirmDeal={() => handleSellOutPress(lotItem.id)}
      />
      <View>
        <ManageModal
          lot={lotItem}
          id={lotItem.id}
          screen={USER_STACK_ROUTE.USER_LOT_MANAGE}
          isVisible={isModalVisible}
          toggle={toggleModal}
          status={lotItem.status}
          rerender={setDelete}
        />
      </View>
    </TouchableOpacity>
  );
};

type UserLotCardProps = {
  lotItem: LotProps;
  isDelete?: boolean;
  setDelete?: (status: string, tab: number) => void;
  onPress: (e: string) => void;
};
