import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useField} from 'formik';
import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {MMKV} from 'react-native-mmkv';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {Colors} from '../../../constants/Colors';
import {AppText} from '../..';
import {textColorStyles, textTypographyStyles} from '../../AppText/styles';
import {CustomMultipleSelectProps} from '../types';
import {multipleSelect} from './MultipleSelectStyle';

const checkboxStorage = new MMKV();

const CustomMultipleSelect: FC<CustomMultipleSelectProps> = ({
  items,
  placeholder,
  name,
  selectedCheckboxValues,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [field, , helpers] = useField(name);
  const [selectedValues, setSelectedValue] = useState<string[]>([]);
  const openAnimation = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const storedValues = checkboxStorage.getString('selectedValues');
    if (storedValues) {
      setSelectedValue(JSON.parse(storedValues));
    }
  }, []);

  useEffect(() => {
    if (selectedCheckboxValues && selectedCheckboxValues?.length > 0) {
      setSelectedValue(prevSelectedValues => [
        ...prevSelectedValues,
        ...selectedCheckboxValues.filter(
          value => !prevSelectedValues.includes(value),
        ),
      ]);
      checkboxStorage.set(
        'selectedValues',
        JSON.stringify(selectedCheckboxValues),
      );
    }
  }, [selectedCheckboxValues]);

  const selectedItems = useMemo(
    () =>
      Array.isArray(field.value)
        ? field.value.filter(item => !selectedValues?.includes(item))
        : [],
    [field, selectedValues],
  );

  const toggleDropdown = () => {
    setOpen(prevState => !prevState);
    openAnimation.value = withTiming(open ? 0 : 1, {duration: 300});
  };

  const handleSelectItem = (item: string) => {
    const index = selectedItems.findIndex(
      selectedItem => selectedItem === item,
    );
    if (index === -1) {
      const updatedItems = [...selectedItems, item];
      helpers.setValue(updatedItems);
    } else {
      const updatedItems = selectedItems.filter(
        selectedItem => selectedItem !== item,
      );
      helpers.setValue(updatedItems);
    }
  };

  const isSelectedItem = (item: string) => {
    return selectedItems.includes(item);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: openAnimation.value,
      height: openAnimation.value * (items.length * 40),
    };
  });

  return (
    <View>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={multipleSelect.selectContainer}>
        <View>
          <AppText
            style={[
              textTypographyStyles.label16_400,
              textColorStyles[Colors.BLACK_PRIMARY],
            ]}>
            {selectedItems.length > 0 ? selectedItems.join(', ') : placeholder}
          </AppText>
        </View>
        <View style={multipleSelect.iconStyle}>
          <FontAwesomeIcon
            icon={open ? faChevronUp : faChevronDown}
            color={Colors.GRAY_PRIMARY}
          />
        </View>
      </TouchableOpacity>
      <Animated.View style={[multipleSelect.selectArea, animatedStyles]}>
        <ScrollView ref={scrollViewRef} nestedScrollEnabled={true}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectItem(item)}
              style={{
                padding: 10,
                backgroundColor: isSelectedItem(item)
                  ? Colors.TURQUOISE_PRIMARY
                  : 'transparent',
              }}>
              <AppText
                variant="label16_500"
                style={{
                  color: isSelectedItem(item)
                    ? Colors.WHITE_PRIMARY
                    : Colors.BLACK_PRIMARY,
                }}>
                {item}
              </AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default CustomMultipleSelect;
