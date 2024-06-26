import {faClock} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import React from 'react';
import {View} from 'react-native';

import {Colors} from '../../../constants/Colors';
import {AppText} from '../../AppText/AppText';
import {styles} from '../styles';

let now = moment().set({minutes: 1}).local().format('YYYY-MM-DD HH-mm');
export const Timer = ({id}: TimerProps) => {
  return (
    <View style={styles.timer}>
      <View style={styles.time}>
        <FontAwesomeIcon
          icon={faClock}
          style={{color: Colors.BLUE_PRIMARY}}
          size={12}
        />
        <AppText
          variant="label10_500"
          text={`${now}h`}
          color={Colors.BLUE_SECONDARY}
        />
      </View>
      <AppText variant="label10_400" text={id} color={Colors.GRAY_PRIMARY} />
    </View>
  );
};

type TimerProps = {
  time: string;
  id: string;
};
