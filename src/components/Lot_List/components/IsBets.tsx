import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {Colors} from '../../../constants/Colors';
import {currencyStorage} from '../../../screens/PersonalAcc/ChangeCurrencyScreen/ChangeCurrencyScreen';
import {AppText} from '../..';
import {TEXT_VARIANT} from '../../AppText/types';

export const Bet = ({bet, variant, author, lotType, isBetting}: BetProps) => {
  const {user} = useAuthenticator(context => [context.user]);
  const [currencyIcon, setCurrencyIcon] = useState(
    JSON.parse(currencyStorage.getString('selectedCurrencyIcon') || ''),
  );
  const [betCurrent, setBet] = useState({id: ''});
  const betColor =
    user.userId === betCurrent.better
      ? Colors.BLUE_PRIMARY
      : !isBetting && user.userId !== author
        ? Colors.ORANGE_PRIMARY
        : isBetting && betCurrent.better !== user.userId
          ? Colors.RED_ERROR
          : Colors.GREEN_SUCCSES_PRIMARY;
  useEffect(() => {
    bet ? setBet(bet) : setBet({id: ''});
  }, []);
  return bet ? (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
      {isBetting && betCurrent.better !== user.userId && (
        <FontAwesomeIcon
          size={17}
          icon={faTriangleExclamation}
          color={Colors.RED_ERROR}
        />
      )}
      <View>
        <FontAwesomeIcon icon={currencyIcon} size={15} color={betColor} />
      </View>
      <AppText
        text={`${Math.floor(betCurrent.amount)}`}
        variant={variant}
        color={betColor}
      />
    </View>
  ) : lotType === 'AUCTIONED' ? (
    <AppText text={'No Bets'} variant={variant} color={Colors.GRAY_PRIMARY} />
  ) : null;
};

interface BetProps {
  bet: Bet;
  variant: `${TEXT_VARIANT}`;
  author?: string;
  isPlaceBet?: boolean;
  lotType: 'AUCTIONED' | 'NOT_AUCTIONED';
  isBetting?: boolean;
}

type Bet = {
  id: string;
  bet: string | number;
};
