import {useField} from 'formik';
import React, {type FC} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {Colors} from '../../../constants/Colors';
import {AppText} from '../..';
import {textColorStyles, textTypographyStyles} from '../../AppText/styles';
import {RadioButtonProps} from '../types';
import {backgroundColors} from './BgColorRadio';
import {styles} from './style';

const RadioButton: FC<RadioButtonProps> = ({name, options, defaultValue}) => {
  const [field, , helpers] = useField<string>(name);

  const handleOptionChange = (value: string) => {
    if (value !== defaultValue) {
      helpers.setValue(value);
    } else {
      helpers.setValue('');
    }
  };

  return (
    <View>
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioButton}
          onPress={() => handleOptionChange(option.value)}>
          <View
            style={[
              styles.radioButtonCircle,
              {
                backgroundColor: backgroundColors(
                  field.value,
                  option.value,
                  defaultValue,
                ),
              },
            ]}
          />
          <AppText
            style={[
              textTypographyStyles.label16_400,
              textColorStyles[Colors.BLACK_PRIMARY],
              styles.radioButtonLabel,
            ]}>
            {option.label}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;
