import {getCurrentUser} from '@aws-amplify/auth';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Formik} from 'formik';
import React, {FC, useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import {Colors} from '../../constants/Colors';
import {storage} from '../../screens/HomeScreens/LotList';
import api from '../../services/api';
import {AppText, ButtonStyled} from '..';
import {textColorStyles, textTypographyStyles} from '../AppText/styles';
import {MyTextInput} from '../formElements/components/TextInput';
import {DataForLotFormProps} from '../formElements/types/types';
import {ModalStyles} from '../modals/style';
import {dataPackaging} from '../newAd/data';
import CustomCheckbox from './Checkbox/CustomCheckbox';
import CustomMultipleSelect from './MultipleSelect/CustomMultipleSelect';
import RadioButton from './RadioButton/RadioButton';
import {
  FieldMapping,
  Filter,
  FilterModalProps,
  FormValues,
  Variety,
} from './types';

const FilterModal: FC<FilterModalProps> = ({
  isVisible,
  onClose,
  onFiltersChange,
  varieties,
}) => {
  const [regions, setRegions] = useState([] as DataForLotFormProps[]);
  const [variety, setVariety] = useState<Variety[]>([]);
  const [title, setTitle] = useState('');
  const [storedFilters, setStoredFilters] = useState<FormValues>({
    maxPrice: '',
    minPrice: '',
    maxQuantity: '',
    minQuantity: '',
    packaging: [],
    priceUnits: '',
    quantityUnits: '',
    region: [],
    sizeLower: '',
    sizeUpper: '',
    sizeUnits: '',
    variety: [],
    lotType: '',
    author: '',
    title: title,
  });
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [quantitydUnit, setQuantitydUnit] = useState<string>('');
  const [userData, setUserData] = useState<string | ''>('');
  const [selectedCheckboxValues, setSelectedCheckboxValues] = useState<
    string[]
  >([]);

  const getUserData = async () => {
    try {
      const {userId} = await getCurrentUser();
      setUserData(userId);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleCheckboxChange = (value: string) => {
    if (selectedCheckboxValues.includes(value)) {
      setSelectedCheckboxValues(prevValues =>
        prevValues.filter(val => val !== value),
      );
    } else {
      setSelectedCheckboxValues(prevValues => [...prevValues, value]);
    }
  };

  const getRegion = async () => {
    try {
      const response = await api.getData('lots/regions');
      if (response.data && response.data.length > 0) {
        setRegions(response.data[0].regions);
      } else {
        console.log('empty response', response);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const remainingRegions = regions
    .slice(5)
    .filter(region => {
      return !regions
        .slice(0, 5)
        .some(regionItem => regionItem.name === region.name);
    })
    .map(region => region.name);

  const handleUnitChange = (unit: string) => {
    setSelectedUnit(unit);
  };
  const handelQuantityChange = (quantity: string) => {
    setQuantitydUnit(quantity);
  };

  const handleFormSubmit = (values: FormValues) => {
    const cleanNumericValue = (value: string | undefined | null) => {
      return value ? value.replace(/\D/g, '') : '';
    };

    const fieldMapping: FieldMapping = {
      title: {fieldName: 'title', operator: 'eq'},
      minQuantity: {fieldName: 'quantity', operator: 'gte'},
      maxQuantity: {fieldName: 'quantity', operator: 'lte'},
      sizeLower: {fieldName: 'sizeLower', operator: 'gte'},
      sizeUpper: {fieldName: 'sizeUpper', operator: 'lte'},
      minPrice: {fieldName: 'price', operator: 'gte'},
      maxPrice: {fieldName: 'price', operator: 'lte'},
    };
    const sizeUnits = values.sizeLower && values.sizeUpper ? selectedUnit : '';
    const quantityUnits =
      values.minQuantity && values.maxQuantity ? quantitydUnit : '';
    const updatedValues = {
      ...values,
      sizeUnits,
      quantityUnits,
      minQuantity: cleanNumericValue(values.minQuantity),
      maxQuantity: cleanNumericValue(values.maxQuantity),
      sizeLower: cleanNumericValue(values.sizeLower),
      sizeUpper: cleanNumericValue(values.sizeUpper),
      minPrice: cleanNumericValue(values.minPrice),
      maxPrice: cleanNumericValue(values.maxPrice),
    };

    const formattedFilters: Filter[] = [];

    Object.entries(updatedValues).forEach(([fieldName, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        if (Array.isArray(value)) {
          value.forEach(val => {
            const {fieldName: apiFieldName, operator} =
              fieldMapping[fieldName] || {};
            formattedFilters.push({
              fieldName: apiFieldName || fieldName,
              operator: operator || 'eq',
              value: val,
            });
          });
        } else {
          const {fieldName: apiFieldName, operator} =
            fieldMapping[fieldName] || {};
          formattedFilters.push({
            fieldName: apiFieldName || fieldName,
            operator: operator || 'eq',
            value,
          });
        }
      }
    });

    storage.set('selectedFilters', JSON.stringify(updatedValues));
    const filterString = JSON.stringify(formattedFilters);
    const encodedFilters = encodeURIComponent(filterString);
    onFiltersChange(encodedFilters);
    onClose();
  };

  const handleClearFilters = () => {
    storage.delete('selectedFilters');
    setStoredFilters({
      maxPrice: '',
      minPrice: '',
      maxQuantity: '',
      minQuantity: '',
      packaging: [],
      priceUnits: '',
      quantityUnits: '',
      region: [],
      sizeLower: '',
      sizeUpper: '',
      sizeUnits: '',
      variety: [],
      lotType: '',
      author: '',
      title: '',
    });
    onFiltersChange('');
    onClose();
  };
  useEffect(() => {
    getRegion();
  }, []);
  useEffect(() => {
    if (varieties && varieties.length > 0) {
      setVariety(varieties);
    }
  }, [varieties]);

  useEffect(() => {
    const storedFiltersFromMMKV = storage.getString('selectedFilters');
    if (
      storedFiltersFromMMKV &&
      JSON.parse(storedFiltersFromMMKV).fieldName == 'title'
    ) {
      setTitle(JSON.parse(storedFiltersFromMMKV).value);
    } else if (
      storedFiltersFromMMKV &&
      JSON.parse(storedFiltersFromMMKV).title
    ) {
      setTitle(JSON.parse(storedFiltersFromMMKV).title);
    } else {
      setTitle('');
    }

    const storedFilters = storedFiltersFromMMKV
      ? JSON.parse(storedFiltersFromMMKV)
      : {};
    setStoredFilters(storedFilters);

    setSelectedUnit(storedFilters.sizeUnits || 'cm');
    setQuantitydUnit(storedFilters.quantityUnits || 'kg');
  }, []);
  return (
    <View>
      <Modal isVisible={isVisible} onBackButtonPress={onClose}>
        <View style={ModalStyles.modalContainer}>
          <Pressable onPress={onClose}>
            <View style={ModalStyles.closeBtn}>
              <FontAwesomeIcon size={25} icon={faXmark} />
            </View>
          </Pressable>
          <ScrollView>
            <Formik
              initialValues={{
                variety: storedFilters?.variety || [],
                sizeLower: storedFilters?.sizeLower || '',
                sizeUpper: storedFilters?.sizeUpper || '',
                sizeUnits: storedFilters?.sizeUnits || '',
                packaging: storedFilters?.packaging || [],
                region: storedFilters?.region || [],
                minQuantity: storedFilters?.minQuantity || '',
                maxQuantity: storedFilters?.maxQuantity || '',
                quantityUnits: storedFilters?.quantityUnits || '',
                minPrice: storedFilters?.minPrice || '',
                maxPrice: storedFilters?.maxPrice || '',
                lotType: storedFilters?.lotType || '',
                author: storedFilters?.author || '',
                priceUnits: '',
                title: title || '',
              }}
              onSubmit={handleFormSubmit}>
              {({handleChange, handleSubmit, values, setFieldTouched}) => (
                <View>
                  <View>
                    <View>
                      <ButtonStyled
                        style="transparent"
                        customStyle={ModalStyles.btnClear}
                        title="Clear filters"
                        onPress={handleClearFilters}
                      />
                    </View>
                    <View style={ModalStyles.varietyText}>
                      <AppText variant="label18_500">Variety</AppText>
                    </View>
                    {variety.slice(0, 5).map(varietyItem => (
                      <View style={ModalStyles.varietyChecbox}>
                        <CustomCheckbox
                          key={varietyItem.id}
                          name="variety"
                          value={varietyItem.value}
                          label={varietyItem.value}
                          onChange={handleCheckboxChange}
                        />
                      </View>
                    ))}
                    <View style={ModalStyles.varietyDropdown}>
                      <CustomMultipleSelect
                        items={variety.slice(5).map(val => val.value)}
                        placeholder="Select Variety"
                        name="variety"
                        selectedCheckboxValues={selectedCheckboxValues}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={ModalStyles.sizeText}>
                      <View>
                        <AppText
                          style={[
                            textTypographyStyles.label18_500,
                            textColorStyles[Colors.BLACK_PRIMARY],
                          ]}>
                          Size, {selectedUnit}
                        </AppText>
                      </View>
                      <View style={ModalStyles.sizeChange}>
                        <View>
                          <Pressable onPress={() => handleUnitChange('mm')}>
                            <AppText
                              style={[
                                textTypographyStyles.label18_400,
                                textColorStyles[Colors.GRAY_PRIMARY],
                                selectedUnit === 'mm' &&
                                  ModalStyles.selectedUnitText,
                              ]}>
                              mm
                            </AppText>
                          </Pressable>
                        </View>
                        <View>
                          <Pressable onPress={() => handleUnitChange('cm')}>
                            <AppText
                              style={[
                                textTypographyStyles.label18_400,
                                textColorStyles[Colors.GRAY_PRIMARY],
                                selectedUnit === 'cm' &&
                                  ModalStyles.selectedUnitText,
                              ]}>
                              cm
                            </AppText>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                    <View style={ModalStyles.sizeContainer}>
                      <View style={ModalStyles.inputContainer}>
                        <MyTextInput
                          onChangeText={handleChange('sizeLower')}
                          value={values.sizeLower}
                          name="sizeLower"
                          multiline={false}
                          placeholder="min"
                          onBlur={() => setFieldTouched('sizeLower')}
                        />
                      </View>
                      <View style={ModalStyles.inputContainer}>
                        <MyTextInput
                          onChangeText={handleChange('sizeUpper')}
                          value={values.sizeUpper}
                          name="sizeUpper"
                          placeholder="max"
                          multiline={false}
                          onBlur={() => setFieldTouched('sizeUpper')}
                        />
                      </View>
                    </View>
                  </View>
                  <View>
                    <View style={ModalStyles.varietyText}>
                      <AppText variant="label18_500">Packaging</AppText>
                    </View>
                    {dataPackaging.map(packageItem => (
                      <View style={ModalStyles.varietyChecbox}>
                        <CustomCheckbox
                          key={packageItem.id}
                          name="packaging"
                          value={packageItem.name}
                          label={packageItem.name}
                          onChange={handleCheckboxChange}
                        />
                      </View>
                    ))}
                  </View>
                  <View>
                    <View style={ModalStyles.varietyText}>
                      <AppText variant="label18_500">Location</AppText>
                    </View>
                    {regions.slice(0, 5).map(regionItem => (
                      <View style={ModalStyles.varietyChecbox}>
                        <CustomCheckbox
                          key={regionItem.id}
                          name="region"
                          value={regionItem.name}
                          label={regionItem.name}
                          onChange={handleCheckboxChange}
                        />
                      </View>
                    ))}
                    <View style={ModalStyles.varietyDropdown}>
                      <CustomMultipleSelect
                        items={remainingRegions}
                        placeholder="Select Region"
                        name="region"
                        selectedCheckboxValues={selectedCheckboxValues}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={ModalStyles.sizeText}>
                      <View>
                        <AppText
                          style={[
                            textTypographyStyles.label18_500,
                            textColorStyles[Colors.BLACK_PRIMARY],
                          ]}>
                          Quantity, {quantitydUnit}
                        </AppText>
                      </View>
                      <View style={ModalStyles.sizeChange}>
                        <View>
                          <Pressable
                            onPress={() => handelQuantityChange('ton')}>
                            <AppText
                              style={[
                                textTypographyStyles.label18_400,
                                textColorStyles[Colors.GRAY_PRIMARY],
                                quantitydUnit === 'ton' &&
                                  ModalStyles.selectedUnitText,
                              ]}>
                              ton
                            </AppText>
                          </Pressable>
                        </View>
                        <View>
                          <Pressable onPress={() => handelQuantityChange('kg')}>
                            <AppText
                              style={[
                                textTypographyStyles.label18_400,
                                textColorStyles[Colors.GRAY_PRIMARY],
                                quantitydUnit === 'kg' &&
                                  ModalStyles.selectedUnitText,
                              ]}>
                              kg
                            </AppText>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                    <View style={ModalStyles.sizeContainer}>
                      <View style={ModalStyles.inputContainer}>
                        <MyTextInput
                          onChangeText={handleChange('minQuantity')}
                          value={values.minQuantity}
                          name="quantity"
                          multiline={false}
                          placeholder="min"
                          onBlur={() => setFieldTouched('minQuantity')}
                        />
                      </View>
                      <View style={ModalStyles.inputContainer}>
                        <MyTextInput
                          onChangeText={handleChange('maxQuantity')}
                          value={values.maxQuantity}
                          name="quantity"
                          placeholder="max"
                          onBlur={() => setFieldTouched('maxQuantity')}
                          multiline={false}
                        />
                      </View>
                    </View>
                  </View>
                  <View>
                    <View style={ModalStyles.sizeText}>
                      <View>
                        <AppText
                          style={[
                            textTypographyStyles.label18_500,
                            textColorStyles[Colors.BLACK_PRIMARY],
                          ]}>
                          Price
                        </AppText>
                      </View>
                    </View>
                    <View style={ModalStyles.sizeContainer}>
                      <View style={ModalStyles.inputContainer}>
                        <MyTextInput
                          onChangeText={handleChange('minPrice')}
                          value={values.minPrice}
                          name="price"
                          multiline={false}
                          placeholder="min"
                          onBlur={() => setFieldTouched('minPrice')}
                        />
                      </View>
                      <View style={ModalStyles.inputContainer}>
                        <MyTextInput
                          onChangeText={handleChange('maxPrice')}
                          value={values.maxPrice}
                          name="price"
                          placeholder="max"
                          onBlur={() => setFieldTouched('maxPrice')}
                          multiline={false}
                        />
                      </View>
                    </View>
                  </View>
                  <View>
                    <View style={ModalStyles.sizeText}>
                      <AppText
                        style={[
                          textTypographyStyles.label18_500,
                          textColorStyles[Colors.BLACK_PRIMARY],
                        ]}>
                        Filter by Lot Type
                      </AppText>
                    </View>
                    <View style={ModalStyles.varietyChecbox}>
                      <RadioButton
                        name="lotType"
                        defaultValue="all"
                        options={[
                          {value: 'AUCTIONED', label: 'Auction'},
                          {value: 'NOT_AUCTIONED', label: 'Non-Auction '},
                          {value: 'all', label: 'All Lots'},
                        ]}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={ModalStyles.sizeText}>
                      <AppText
                        style={[
                          textTypographyStyles.label18_500,
                          textColorStyles[Colors.BLACK_PRIMARY],
                        ]}>
                        Filter by Owner
                      </AppText>
                    </View>
                    <View style={ModalStyles.varietyChecbox}>
                      <RadioButton
                        name="author"
                        defaultValue="all"
                        options={[
                          {value: userData, label: 'Only my Lots'},
                          {value: 'all', label: 'All Lots'},
                        ]}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={ModalStyles.btn}>
                      <ButtonStyled
                        style="fill"
                        customStyle={ModalStyles.btnApply}
                        title="Apply filter"
                        onPress={handleSubmit}
                      />
                    </View>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;
