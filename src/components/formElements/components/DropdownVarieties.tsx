import {useField} from 'formik';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import {Colors} from '../../../constants/Colors';
import {dropdownStyles} from '../styles/dropdownStyle';
import {DropdownServerProps} from '../types/types';

export const DropdownVariety = ({
  name,
  data,
  placeholder,
  isDisable,
  dataDefault,
}: DropdownServerProps) => {
  const [value, meta, helpers] = useField(name);
  const [isFocus, setIsFocus] = useState(false);
  const [isPick, setIsPick] = useState(true);
  const handleChange = (new_value: string) => {
    helpers.setValue(new_value.varieties);
  };
  return (
    <View style={dropdownStyles.container}>
      <Dropdown
        style={[
          dropdownStyles.dropdown,
          isFocus && {borderColor: Colors.BLUE_PRIMARY},
          (isPick || isDisable) && {backgroundColor: Colors.GRAY_LIGHT},
        ]}
        placeholderStyle={dropdownStyles.placeholderStyle}
        selectedTextStyle={dropdownStyles.selectedTextStyle}
        inputSearchStyle={dropdownStyles.inputSearchStyle}
        iconStyle={dropdownStyles.iconStyle}
        data={data}
        maxHeight={200}
        labelField="varieties"
        valueField="varieties"
        placeholder={!isFocus ? placeholder : '...'}
        value={dataDefault}
        disable={isDisable}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setIsFocus(false);
          handleChange(item);
          setIsPick(true);
        }}
      />
    </View>
  );
};
