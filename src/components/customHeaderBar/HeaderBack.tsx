import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, View} from 'react-native';

import {AppText} from '../AppText/AppText';
import {SubmitProps} from '../formElements/components/Submit';
import {CustomHeaderStyles} from './style';

export const HeaderBack = ({onPress, text}: SubmitProps) => {
  return (
    <View style={CustomHeaderStyles.barBack}>
      <Pressable style={CustomHeaderStyles.button} onPress={onPress}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <AppText ellipsizeMode="tail" numberOfLines={1}>
          {text}
        </AppText>
      </Pressable>
    </View>
  );
};
