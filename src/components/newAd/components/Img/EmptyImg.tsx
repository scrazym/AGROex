import {faFileImage} from '@fortawesome/free-solid-svg-icons/faFileImage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View} from 'react-native';

import {ImgStyles} from './ImgStyles';

export const EmptyImg = () => {
  return (
    <View style={ImgStyles.emptyImg}>
      <FontAwesomeIcon icon={faFileImage} style={ImgStyles.emptyIcon} />
    </View>
  );
};
