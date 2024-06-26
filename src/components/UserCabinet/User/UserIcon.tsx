import {FC} from 'react';
import {Image} from 'react-native';

import {AppText} from '../../AppText/AppText';
import {textColorStyles} from '../../AppText/styles';
import {UserCabStyles} from './style';

export const UserIcon: FC<UserIconProp> = ({user, userIcon}) => {
  return userIcon ? (
    <Image style={UserCabStyles.userIcon} source={{uri: userIcon}} />
  ) : (
    <AppText variant="label20_500" style={textColorStyles['#FFFFFF']}>
      {user.split(' ').map(item => item.slice(0, 1))}
    </AppText>
  );
};

type UserIconProp = {
  user: string;
  userIcon?: string;
};
