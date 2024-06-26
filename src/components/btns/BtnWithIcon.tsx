import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC} from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';

import {Colors} from '../../constants/Colors';
import {AppText} from '..';
import {textColorStyles} from '../AppText/styles';
import {TEXT_VARIANT} from '../AppText/types';
import {getIcon} from './getIcon';
import {btnStyle, styles, textStyle} from './styles';
import {BtnIconProps} from './types';

export const ButtonStyled: FC<ButtonStyledProps> = ({
  title,
  onPress,
  icon,
  style = 'fill',
  disabled = false,
  isDisabled = false,
  customStyle,
  variant = 'label18_500',
}) => {
  const iconStyle =
    style === 'fill' || style === 'fillConfirm'
      ? styles.textWhite
      : styles.textTurq;
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[btnStyle(disabled, style), customStyle]}
      onPress={onPress}>
      <View style={styles.rowContainer}>
        {icon ? (
          <FontAwesomeIcon size={20} style={iconStyle} icon={getIcon(icon)} />
        ) : null}
        <AppText
          variant={variant}
          text={title}
          style={textStyle(disabled, style)}
        />
      </View>
    </TouchableOpacity>
  );
};

export type ButtonStyledProps = {
  style?: 'fill' | 'transparent' | 'fillConfirm' | 'borderNone';
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: 'confirm' | 'manage' | 'bet' | 'bucket' | 'arrowBack' | 'filter';
  customStyle?: ViewStyle;
  isDisabled?: boolean;
  variant?: TEXT_VARIANT;
};

export const BtnWithIcon: FC<BtnIconProps> = ({
  title,
  onPress,
  icon,
}: BtnIconProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.rowContainer}>
        <FontAwesomeIcon
          style={{color: Colors.TURQUOISE_PRIMARY}}
          icon={icon}
        />
        <AppText
          variant="label18_500"
          text={title}
          style={textColorStyles['#38999B']}
        />
      </View>
    </TouchableOpacity>
  );
};
