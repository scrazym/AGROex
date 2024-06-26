import {faCirclePlus} from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import {ImgStyles} from './ImgStyles';
import {ImgProps} from './types';

export const AddNewImg = ({onPress}: ImgProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={ImgStyles.newImg}>
      <FontAwesomeIcon icon={faCirclePlus} style={ImgStyles.emptyIcon} />
    </TouchableOpacity>
  );
};
