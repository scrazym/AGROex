import React from 'react';
import {Pressable} from 'react-native';

import {AppText} from '../../AppText/AppText';
import {submitBtnStyles} from '../styles/submitStyles';

export const Submit = ({isDisable, onPress, text}: SubmitProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={false}
      style={isDisable ? submitBtnStyles.disable : submitBtnStyles.submit}>
      <AppText
        variant="label18_500"
        style={
          isDisable ? submitBtnStyles.disableText : submitBtnStyles.submitText
        }>
        {text}
      </AppText>
    </Pressable>
  );
};

export type SubmitProps = {
  isDisable?: boolean;
  text: string;
  onPress: () => void;
};
