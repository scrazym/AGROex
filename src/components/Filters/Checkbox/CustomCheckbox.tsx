import {useField} from 'formik';
import React, {type FC} from 'react';
import {View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {Colors} from '../../../constants/Colors';
import {CustomCheckboxProps} from '../types';

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  name,
  value,
  label,
  onChange,
}) => {
  const [field, , helpers] = useField<string[]>(name);

  const handleCheckboxChange = () => {
    const newValues = field.value.includes(value)
      ? field.value.filter((val: string) => val !== value)
      : [...field.value, value];
    helpers.setValue(newValues);
    onChange(value);
  };

  return (
    <View>
      <BouncyCheckbox
        size={23}
        fillColor={Colors.GRAY_PRIMARY}
        unfillColor={Colors.WHITE_PRIMARY}
        text={label}
        iconStyle={{
          borderRadius: 4,
          marginBottom: 5,
          marginLeft: 5,
        }}
        textStyle={{
          textDecorationLine: 'none',
          color: Colors.BLACK_PRIMARY,
        }}
        innerIconStyle={{borderWidth: 2, borderRadius: 4}}
        isChecked={field.value.includes(value) || false}
        onPress={handleCheckboxChange}
      />
    </View>
  );
};

export default CustomCheckbox;
