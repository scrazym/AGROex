import {FC} from 'react';
import {View} from 'react-native';

import {Colors} from '../../constants/Colors';
import {AppText} from '..';
import {LotStatusBarStyle} from './styles/lotStatusBarStyle';

export const LotStatusBar: FC<LotStatusBarProps> = ({status, lotType}) => {
  const style =
    status === 'ON_MODERATION'
      ? LotStatusBarStyle.wrapperModeration
      : status === 'COMPLETED'
        ? LotStatusBarStyle.wrapperComlited
        : status === 'ACTIVE' && lotType === 'AUCTIONED'
          ? LotStatusBarStyle.wrapperAuction
          : status === 'ACTIVE' && lotType === 'NOT_AUCTIONED'
            ? LotStatusBarStyle.wrapperNonAuction
            : LotStatusBarStyle.wrapperRejected;
  const color =
    lotType === 'AUCTIONED'
      ? Colors.ORANGE_PRIMARY
      : status === 'COMPLETED'
        ? Colors.GREEN_SUCCSES_PRIMARY
        : lotType === 'NOT_AUCTIONED'
          ? Colors.GRAY_PRIMARY
          : status === 'ON_MODERATION'
            ? Colors.BLUE_PRIMARY
            : Colors.RED_ERROR;
  return (
    <View style={style}>
      <AppText variant="label12_400" color={color}>
        {getStatus(status)}
      </AppText>
      <AppText color={color} variant="label12_400">
        {getType(lotType || '')}
      </AppText>
    </View>
  );
};

type LotStatusBarProps = {
  status: 'ON_MODERATION' | 'REJECTED' | 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
  lotType?: 'AUCTIONED' | 'NOT_AUCTIONED';
};
const getType = (type: string) => {
  switch (type) {
    case 'AUCTIONED':
      return 'Auction lot';
    case 'NOT_AUCTIONED':
      return 'Clean order';
  }
};
const getStatus = (status: string) => {
  switch (status) {
    case 'ON_MODERATION':
      return 'On moderation';
    case 'REJECTED':
      return 'Rejected';
    case 'COMPLETED':
      return 'Order complete';
  }
};
