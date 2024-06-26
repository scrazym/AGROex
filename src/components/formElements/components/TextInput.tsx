import React, {ChangeEvent} from 'react';
import {KeyboardTypeOptions, TextInput, View} from 'react-native';

import {Colors} from '../../../constants/Colors';
import {TextInputStyle} from '../styles/InputTextStyle';

export const MyTextInput = ({
  onChangeText,
  value,
  placeholder,
  onBlur,
  multiline = false,
  keyboard = 'numeric',
}: inputProps) => {
  return (
    <View>
      <TextInput
        placeholderTextColor={Colors.GRAY_DARK}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={TextInputStyle.input}
        value={value}
        keyboardType={keyboard}
        onBlur={onBlur}
        multiline={multiline}
        autoCapitalize="none"
      />
    </View>
  );
};

type inputProps = {
  onChangeText?: (e: string | ChangeEvent<any>) => void;
  value?: string | number;
  name?: string;
  placeholder?: string;
  onBlur?: () => void;
  multiline?: boolean;
  keyboard?: KeyboardTypeOptions;
};
