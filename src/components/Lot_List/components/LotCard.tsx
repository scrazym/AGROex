import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC, useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import {Colors} from '../../../constants/Colors';
import {getPricePerQuant} from '../../../helpers/getPricePerQuant';
import {USER_STACK_ROUTE} from '../../../navigation/navigators/Stacks/UserStack/types';
import {currencyStorage} from '../../../screens/PersonalAcc/ChangeCurrencyScreen/ChangeCurrencyScreen';
import {AppText} from '../../AppText/AppText';
import {textColorStyles} from '../../AppText/styles';
import {ManageTouchIcon} from '../../Button/ManageTouchIcon';
import {EmptyImg} from '../../newAd/components/Img/EmptyImg';
import {LotStatusBar} from '../../notificationsForUser/LotStatusBar';
import {styles} from '../styles';
import {NewLotCardProps} from '../types/types';
import {Bet} from './IsBets';

export const Separator = () => <View style={styles.separator} />;

export const LotCard: FC<NewLotCardProps> = ({
  lot,
  setDelete,
  onPress,
  isBetting,
}) => {
  const [manageModalVisisble, setManageModalVisisble] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const {user} = useAuthenticator(context => [context.user]);
  const [imageUrl, setImageUrl] = useState('');
  const toggleEditModal = () => {
    setManageModalVisisble(!manageModalVisisble);
  };
  const currencyIcon = JSON.parse(
    currencyStorage.getString('selectedCurrencyIcon') || '',
  );
  const currentPrice =
    lot.status !== 'COMPLETED'
      ? lot.calculatedPrice.toFixed(2)
      : lot.latestBet
        ? lot.latestBet.amount.toFixed(2)
        : lot.calculatedPrice.toFixed(2);
  const finishPriceColor =
    lot.status !== 'COMPLETED' ? Colors.BLACK_PRIMARY : Colors.GREEN_PRIMARY;
  useEffect(() => {
    if (lot.images.length > 0) {
      setImageUrl(lot.images[0].imageUrl);
    }
    user.userId === lot.author ? setIsAuthor(true) : setIsAuthor(false);
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.ListLotContainer}>
          <View style={styles.ImageContainer}>
            {imageUrl ? (
              <Image source={{uri: imageUrl}} style={styles.image} />
            ) : (
              <EmptyImg />
            )}
          </View>
          <View style={styles.lotDescr}>
            {isAuthor && (
              <ManageTouchIcon
                lot={lot}
                id={lot.id}
                isVisible={manageModalVisisble}
                screen={USER_STACK_ROUTE.USER_LOT_MANAGE}
                toggleModal={toggleEditModal}
                rerender={setDelete}
              />
            )}
            <View style={styles.titleContainer}>
              <AppText
                ellipsizeMode="tail"
                numberOfLines={1}
                variant="label16_400"
                text={lot.title}
                color={Colors.BLACK_PRIMARY}
              />
            </View>
            <View>
              {lot.status !== 'COMPLETED' && (
                <LotStatusBar status="ACTIVE" lotType={lot.lotType} />
              )}
              {lot.expiresAt && (
                <AppText
                  style={textColorStyles['#368ACE']}
                  variant="label12_400">
                  Auction finish at: {lot.expiresAt}
                </AppText>
              )}
              <View style={styles.bet}>
                {lot.status !== 'COMPLETED' && (
                  <Bet
                    lotType={lot.lotType}
                    isBetting={isBetting}
                    author={lot.author}
                    variant="label18_400"
                    bet={lot.latestBet}
                  />
                )}
              </View>
              <View style={{padding: 5}}>
                {lot.status === 'COMPLETED' && (
                  <LotStatusBar status={lot.status} />
                )}
              </View>
              <View style={styles.price}>
                <AppText variant="label16_400" color={finishPriceColor}>
                  <View>
                    <FontAwesomeIcon
                      color={finishPriceColor}
                      icon={currencyIcon}
                      size={15}
                    />
                  </View>
                  {currentPrice}
                </AppText>
                <AppText variant="label10_500" color={Colors.GRAY_PRIMARY}>
                  {getPricePerQuant(
                    currentPrice,
                    lot.quantity,
                    lot.quantityUnits,
                  )}
                </AppText>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
