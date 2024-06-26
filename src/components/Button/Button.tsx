import React from 'react';
import {View} from 'react-native';

import {ButtonStyled} from '../btns/BtnWithIcon';
import {stylesDetailBtn} from './styles';

const BottomButtons = () => {
  return (
    <View style={stylesDetailBtn.container}>
      <View style={stylesDetailBtn.buttonContainer}>
        <ButtonStyled style="transparent" title="Place a bet" icon="bet" />
        <ButtonStyled style="fill" title="Buy now" icon="bucket" />
      </View>
    </View>
  );
};

export default BottomButtons;
