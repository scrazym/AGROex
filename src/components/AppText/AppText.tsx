import React, {FC} from 'react';
import {StyleProp, TextProps, TextStyle} from 'react-native';
import Animated from 'react-native-reanimated';

import {Colors} from '../../constants/Colors';
import {textColorStyles, textTypographyStyles} from './styles';
import {TEXT_COLOR_VARIANT, TEXT_VARIANT} from './types';

export type AppTextProps = TextProps & {
  style?: StyleProp<TextStyle>;
  variant?: `${TEXT_VARIANT}`;
  text?: string | number;
  color?: TEXT_COLOR_VARIANT;
  children?: React.ReactNode;
};

export const AppText: FC<AppTextProps> = ({
  style,
  children,
  text,
  numberOfLines,
  onPress,
  color = Colors.BLACK_PRIMARY,
  variant = TEXT_VARIANT.LABEL_20_500,
  ...props
}) => {
  if (
    (text === undefined || text === null) &&
    (children === undefined || children === null)
  ) {
    return null;
  }
  return (
    <Animated.Text
      {...props}
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[textTypographyStyles[variant], textColorStyles[color], style]}>
      {text ?? children ?? ''}
    </Animated.Text>
  );
};
