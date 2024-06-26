import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';

import {AppText} from '..';
import {textColorStyles} from '../AppText/styles';
import {styles} from './styles';
import {BtnProps} from './types';

export const BtnWOutIcon: FC<BtnProps> = ({title, onPress}: BtnProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AppText
        variant="label18_500"
        text={title}
        style={textColorStyles['#38999B']}
      />
    </TouchableOpacity>
  );
};
