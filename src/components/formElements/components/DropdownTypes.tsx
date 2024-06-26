import {useField} from 'formik';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import {Colors} from '../../../constants/Colors';
import {dropdownStyles} from '../styles/dropdownStyle';
import {DataTypesProps, DropdownServerProps} from '../types/types';

export const DropdownTypes = ({
  name,
  data,
  placeholder,
  isDisable,
  dataDefault,
  request,
}: DropdownServerProps) => {
  const [value, meta, helpers] = useField(name);
  const [isFocus, setIsFocus] = useState(false);
  const [isPick, setIsPick] = useState(false);
  const handleChange = (new_value: DataTypesProps) => {
    helpers.setValue({
      categoryName: new_value.categoryName,
      id: new_value.id,
      parentCategory: new_value.parentCategory,
    });
    request(new_value.categoryName);
  };

  useEffect(() => {
    if (dataDefault) {
      setIsPick(true);
    }
  }, []);
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
        labelField="categoryName"
        valueField="categoryName"
        placeholder={placeholder}
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
