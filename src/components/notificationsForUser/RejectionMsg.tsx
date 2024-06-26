import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {FC} from 'react';
import {View} from 'react-native';

import {Colors} from '../../constants/Colors';
import {AppText} from '..';
import {rejectedMsgStyle} from './styles/rejectedMsg';

export const RejectedMessage: FC<RejectedMessageProps> = ({message}) => {
  return (
    <View style={rejectedMsgStyle.wrapper}>
      <FontAwesomeIcon
        icon={faCircleExclamation}
        style={rejectedMsgStyle.icon}
      />
      <AppText color={Colors.RED_ERROR} variant="label12_400">
        {message}
      </AppText>
    </View>
  );
};

type RejectedMessageProps = {
  message: string;
};
