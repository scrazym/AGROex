import {useNavigation} from '@react-navigation/native';
import {fetchUserAttributes} from 'aws-amplify/auth';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import {maxTimeMinutes, minTimeMinutes} from '../../../constants/minMax';
import {getSeconds, timeConvert} from '../../../helpers/getSeconds';
import {
  NEW_ADD_ROUTE,
  NewAddScreenProps,
} from '../../../navigation/navigators/Stacks/NewAddStack/types';
import {USER_STACK_ROUTE} from '../../../navigation/navigators/Stacks/UserStack/types';
import {currencyStorage} from '../../../screens/PersonalAcc/ChangeCurrencyScreen/ChangeCurrencyScreen';
import api from '../../../services/api';
import {textColorStyles} from '../../AppText/styles';
import {
  AppText,
  ButtonStyled,
  DropdownComponent,
  DropdownTypes,
  DropdownWithRequest,
  ImagesSlider,
  Loading,
  MyTextInput,
} from '../../index';
import {ModalStyles} from '../../modals/style';
import {
  dataCountry,
  dataLotType,
  dataPackaging,
  dataQuantity,
  dataSize,
  dataValute,
} from '../../newAd/data';
import {LotFormProps} from '../../types';
import {FormStyles} from '../styles/formStyles';
import {DataForLotFormProps, LotFormPropsChecked} from '../types/types';
import {DropdownVariety} from './DropdownVarieties';
import {validationSchema} from './LotFormYupSchem';

export const LotForm = ({dataCategories, idLot}: LotFormPropsChecked) => {
  const navigation = useNavigation<NewAddScreenProps['navigation']>();
  const [isLoading, setIsLoading] = useState(false);
  const [choose, setChoose] = useState(true);
  const [types, setTypes] = useState([]);
  const [lot, setLot] = useState<LotFormProps>({} as LotFormProps);
  const [authorInfo, setAuthorInfo] = useState('');
  const [regions, setRegions] = useState([] as DataForLotFormProps[]);
  const [varieties, setVarieties] = useState([] as string[]);

  const {
    id,
    title,
    region,
    category,
    packaging,
    country,
    price,
    currency,
    description,
    quantity,
    quantityUnits,
    author,
    sizeLower,
    sizeUnits,
    sizeUpper,
    creationDate,
    lotType,
    images,
    variety,
    minimalPrice,
  } = lot;
  const [time, setTime] = useState({
    minutes: 0,
    hours: 0,
    days: 0,
  });

  async function handleFetchUserAttributes() {
    try {
      const userAttributes = await fetchUserAttributes();
      setAuthorInfo(userAttributes.sub || '');
    } catch (error: any) {
      Alert.alert('Sorry, no connection with server, please try later again');
    }
  }

  const getSubCategories = async (parent: string) => {
    const type = await api.getDataWithoutUser(
      `subcategories?parent=${parent.split(' ').join('_').toUpperCase()}`,
    );
    setTypes(type.data);
    setChoose(false);
  };

  const handleFilterVarieties = (category: string) => {
    const chooseCategory = types.filter(item => item.categoryName === category);
    setVarieties(
      chooseCategory[0].varieties.map((item: string) => {
        return {
          id: item,
          varieties: item,
        };
      }),
    );
  };

  const getLot = async (value: string) => {
    const lotResult = await api.getData(`lots/${idLot}?currency=${value}`);
    if (lotResult.data) {
      setLot(lotResult.data);
      setTime(timeConvert(lotResult.data.lifetimePeriod));
    }
  };

  const handlePostLot = (id: string) => {
    setIsLoading(false);
    navigation.navigate('USER', {
      screen: USER_STACK_ROUTE.USER_LOT_MANAGE_SUCCESS,
      params: {id: id},
      initial: false,
    });
  };

  const handleGoPreview = (
    valid: boolean,
    func: () => void,
    values: LotFormProps,
  ) => {
    !valid
      ? func()
      : navigation.navigate(
          !idLot ? NEW_ADD_ROUTE.PREVIEW : USER_STACK_ROUTE.PREVIEW,
          {
            name: 'PREVIEW',
            values: values,
          },
        );
  };

  const handleConfirm = (
    func: () => void,
    values: LotFormProps,
    valid: boolean,
  ) => {
    if (idLot && valid) {
      updateLot(values, values.image);
    } else if (!idLot && valid) {
      postLot(values, values.image);
    }
    func();
  };

  const createFormData = (
    images: {
      id: string;
      fileName: string;
      uri: string;
      type: string;
      imageUrl: string;
    }[],
  ) => {
    const formData = new FormData();

    images.forEach(file => {
      if (!file.id) {
        formData.append('files', {
          name: file.fileName,
          type: file.type,
          uri:
            Platform.OS === 'android'
              ? file.uri
              : file.uri.replace('file://', ''),
        });
      } else {
        formData.append('files', {
          name: file.id,
          type: 'image/jpeg',
          uri: file.imageUrl,
        });
      }
    });
    return formData;
  };

  const postLot = async (datafor: LotFormProps, image: any[]) => {
    try {
      setIsLoading(true);
      const res = await api.post('lots', datafor);
      if (res.status === 200 || res.status === 201) {
        const {id} = res.data;

        const imageIndex = 0;
        const formData = createFormData(image);
        const result = await api.post(
          `lots/${id}/images?titleIndex=${imageIndex}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (result.status === 200 || result.status === 201) {
          handlePostLot(id);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        return null;
      }
    } catch (error) {
      console.error('Error posting lot:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const updateLot = async (dataUpdate: LotFormProps, image: any[]) => {
    try {
      setIsLoading(true);
      const res = await api.put(`lots/${idLot}`, dataUpdate);
      if (res.status === 200 || res.status === 201) {
        const {id} = res.data;

        const imageIndex = 0;
        const formData = createFormData(image);
        const result = await api.post(
          `lots/${id}/images?titleIndex=${imageIndex}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (result.status === 200 || result.status === 201) {
          handlePostLot(id);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        return null;
      }
    } catch (error) {
      console.error('Error updating lot:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const getRegion = async () => {
    const regions = await api.getData('lots/regions');
    setRegions(regions.data[0].regions);
  };
  const [timeError, setTimeErorr] = useState(false);
  useEffect(() => {
    getSeconds(time);
    getSeconds(time) > maxTimeMinutes || getSeconds(time) <= minTimeMinutes
      ? setTimeErorr(true)
      : setTimeErorr(false);
  }, [time]);

  useEffect(() => {
    handleFetchUserAttributes();
    const storedCurrency = currencyStorage.getString('selectedCurrency');
    if (idLot) {
      getLot(storedCurrency);
    }
    getRegion();
  }, []);

  return (
    <Formik
      initialValues={{
        title: title ? title : '',
        description: idLot ? description : '',
        parent: category
          ? (
              category.parentCategory.slice(0, 1) +
              category.parentCategory.slice(1).toLowerCase()
            ).trim()
          : '',
        category: category ? category : '',
        variety: variety ? variety : '',
        currency: currency ? currency : 'RUB',
        id: idLot ? id : '',
        creationDate: creationDate ? creationDate : '',
        country: idLot ? country : '',
        region: region ? region : '',
        quantity: quantity ? quantity.toString() : '',
        quantityUnits: idLot ? quantityUnits : '',
        price: price ? price.toString() : '',
        sizeLower: sizeLower ? sizeLower.toString() : '',
        sizeUpper: sizeUpper ? sizeUpper.toString() : '',
        sizeUnits: sizeUnits ? sizeUnits : '',
        packaging: idLot ? packaging : '',
        lotType: idLot ? lotType : 'NOT_AUCTIONED',
        author: idLot ? author : authorInfo,
        image: images ? images : [],
        status: 'ON_MODERATION',
        minimalPrice: minimalPrice ? minimalPrice : '',
      }}
      enableReinitialize={true}
      validateOnMount={true}
      validationSchema={validationSchema}
      onSubmit={() => console.log('Succses')}>
      {({
        handleChange,
        handleSubmit,
        values,
        isValid,
        errors,
        touched,
        setFieldTouched,
      }) => (
        <KeyboardAvoidingView style={FormStyles.container} behavior="height">
          <ScrollView>
            <AppText variant="label18_500">Title</AppText>
            <View style={FormStyles.containerInput}>
              <MyTextInput
                onChangeText={handleChange('title')}
                value={values.title}
                name="title"
                placeholder="Enter title"
                onBlur={() => setFieldTouched('title')}
                keyboard="default"
              />
              {errors.title && touched.title ? (
                <AppText
                  variant="label12_400"
                  style={textColorStyles['#D40000']}>
                  {errors.title}
                </AppText>
              ) : null}
            </View>
            <View style={FormStyles.containerInput}>
              <AppText variant="label18_500">Description</AppText>
              <View style={FormStyles.containerInput}>
                <MyTextInput
                  onChangeText={handleChange('description')}
                  value={values.description}
                  name="description"
                  placeholder="Description"
                  multiline={true}
                  keyboard="default"
                  onBlur={() => setFieldTouched('descritption')}
                />
                {errors.description && touched.description ? (
                  <AppText
                    variant="label12_400"
                    style={textColorStyles['#D40000']}>
                    {errors.description}
                  </AppText>
                ) : null}
              </View>
              <AppText variant="label18_500">Category</AppText>
              <AppText variant="label12_400" style={textColorStyles['#798787']}>
                Select the category in which you want to submit your product.
                Your ad must match the theme.
              </AppText>
              <View style={FormStyles.containerInput}>
                <DropdownWithRequest
                  name="parent"
                  data={dataCategories}
                  placeholder="Select a category"
                  isDisable={false}
                  dataDefault={values.parent}
                  request={getSubCategories}
                />
                {errors.category && touched.category ? (
                  <AppText
                    variant="label12_400"
                    style={textColorStyles['#D40000']}>
                    {errors.parent}
                  </AppText>
                ) : null}
              </View>
              <View style={FormStyles.containerInput}>
                <DropdownTypes
                  request={handleFilterVarieties}
                  name="category"
                  data={types.length ? types : [values.category]}
                  isDisable={choose}
                  placeholder="Select subcategory"
                  dataDefault={values.category}
                />
                {errors.category && touched.category ? (
                  <AppText
                    variant="label12_400"
                    style={textColorStyles['#D40000']}>
                    {errors.category}
                  </AppText>
                ) : null}
              </View>

              <View style={FormStyles.containerInput}>
                <DropdownVariety
                  name="variety"
                  data={
                    varieties.length
                      ? varieties
                      : [{id: 1, varieties: values.variety}]
                  }
                  isDisable={choose}
                  placeholder="Select variety"
                  dataDefault={
                    values.variety ? {id: 1, varieties: values.variety} : null
                  }
                />
                {errors.variety && touched.variety ? (
                  <AppText
                    variant="label12_400"
                    style={textColorStyles['#D40000']}>
                    {errors.variety}
                  </AppText>
                ) : null}
              </View>
              <View style={FormStyles.containerMt24}>
                <AppText variant="label18_500">Size</AppText>
                <View style={FormStyles.container3Row}>
                  <View style={FormStyles.containerInput}>
                    <MyTextInput
                      onChangeText={handleChange('sizeLower')}
                      value={values.sizeLower}
                      name="sizeLower"
                      multiline={false}
                      placeholder="Size from"
                      onBlur={() => setFieldTouched('sizeLower')}
                    />
                    {errors.sizeLower && touched.sizeLower ? (
                      <AppText
                        variant="label12_400"
                        style={textColorStyles['#D40000']}>
                        {errors.sizeLower}
                      </AppText>
                    ) : null}
                  </View>
                  <Text style={FormStyles.separator}>-</Text>
                  <View style={FormStyles.containerInput}>
                    <MyTextInput
                      onChangeText={handleChange('sizeUpper')}
                      value={values.sizeUpper}
                      name="sizeUpper"
                      placeholder="Size for"
                      onBlur={() => setFieldTouched('sizeUpper')}
                      multiline={false}
                    />
                    {errors.sizeUpper && touched.sizeUpper ? (
                      <AppText
                        variant="label12_400"
                        style={textColorStyles['#D40000']}>
                        {errors.sizeUpper}
                      </AppText>
                    ) : null}
                  </View>
                  <View style={FormStyles.containerInput}>
                    <DropdownComponent
                      name="sizeUnits"
                      data={dataSize}
                      isDisable={false}
                      placeholder="..."
                      dataDefault={values.sizeUnits}
                    />
                    {errors.sizeUnits && touched.sizeUnits ? (
                      <AppText
                        variant="label12_400"
                        style={textColorStyles['#D40000']}>
                        {errors.sizeUnits}
                      </AppText>
                    ) : null}
                  </View>
                </View>
              </View>
              <View style={FormStyles.containerMt24}>
                <AppText variant="label18_500">Packaging</AppText>
                <View style={FormStyles.containerInput}>
                  <DropdownComponent
                    name="packaging"
                    data={dataPackaging}
                    isDisable={false}
                    placeholder="Select packaging"
                    dataDefault={values.packaging}
                  />
                  {errors.packaging && touched.packaging ? (
                    <AppText
                      variant="label12_400"
                      style={textColorStyles['#D40000']}>
                      {errors.packaging}
                    </AppText>
                  ) : null}
                </View>
              </View>
              <View style={FormStyles.containerMt24}>
                <AppText variant="label18_500">Quantity</AppText>
                <View style={FormStyles.container3Row}>
                  <View style={FormStyles.containerInput}>
                    <MyTextInput
                      onChangeText={handleChange('quantity')}
                      value={values.quantity}
                      name="quantity"
                      placeholder="Quantity"
                      onBlur={() => setFieldTouched('quantity')}
                      multiline={false}
                    />
                    {errors.quantity && touched.quantity ? (
                      <AppText
                        variant="label12_400"
                        style={textColorStyles['#D40000']}>
                        {errors.quantity}
                      </AppText>
                    ) : null}
                  </View>
                  <View style={FormStyles.containerInput30}>
                    <DropdownComponent
                      name="quantityUnits"
                      data={dataQuantity}
                      isDisable={false}
                      placeholder="..."
                      dataDefault={values.quantityUnits}
                    />
                    {errors.quantityUnits && touched.quantityUnits ? (
                      <AppText
                        variant="label12_400"
                        style={textColorStyles['#D40000']}>
                        {errors.quantityUnits}
                      </AppText>
                    ) : null}
                  </View>
                </View>
              </View>
              <View style={FormStyles.containerMt24}>
                <AppText variant="label18_500">Price</AppText>
                <View style={FormStyles.container3Row}>
                  <View style={FormStyles.containerInput}>
                    <MyTextInput
                      onChangeText={handleChange('price')}
                      value={values.price}
                      name="price"
                      placeholder="Price"
                      onBlur={() => setFieldTouched('price')}
                      multiline={false}
                    />
                    {errors.price && touched.price ? (
                      <AppText
                        variant="label12_400"
                        style={textColorStyles['#D40000']}>
                        {errors.price}
                      </AppText>
                    ) : null}
                  </View>
                  <View style={FormStyles.containerInput30}>
                    <DropdownComponent
                      name="currency"
                      data={dataValute}
                      isDisable={false}
                      placeholder="..."
                      dataDefault={values.currency}
                    />
                    {errors.currency && touched.currency ? (
                      <AppText
                        variant="label12_400"
                        style={textColorStyles['#D40000']}>
                        {errors.currency}
                      </AppText>
                    ) : null}
                  </View>
                </View>
              </View>
              <View style={FormStyles.containerMt24}>
                <AppText variant="label18_500">Location</AppText>
                <View style={FormStyles.containerInput}>
                  <DropdownComponent
                    name="country"
                    data={dataCountry}
                    isDisable={false}
                    placeholder="Select country"
                    dataDefault={values.country}
                  />
                  {errors.country && touched.country ? (
                    <AppText
                      variant="label12_400"
                      style={textColorStyles['#D40000']}>
                      {errors.country}
                    </AppText>
                  ) : null}
                </View>
                <View style={FormStyles.containerInput}>
                  <DropdownComponent
                    name="region"
                    data={regions}
                    isDisable={false}
                    placeholder="Select region"
                    dataDefault={values.region}
                  />
                  {errors.region && touched.region ? (
                    <AppText
                      variant="label12_400"
                      style={textColorStyles['#D40000']}>
                      {errors.region}
                    </AppText>
                  ) : null}
                </View>
              </View>
              <View style={FormStyles.containerMt24}>
                <AppText variant="label18_500">Choose type</AppText>
                <View style={FormStyles.containerInput}>
                  <DropdownComponent
                    name="lotType"
                    data={dataLotType}
                    isDisable={false}
                    placeholder="Select a type"
                    dataDefault={values.lotType}
                  />
                  {values.lotType === 'AUCTIONED' && (
                    <View style={FormStyles.containerInput}>
                      <AppText variant="label18_500">
                        Enter time for betting and start bet
                      </AppText>
                      <View style={FormStyles.container3Row}>
                        <View style={FormStyles.containerInput}>
                          <MyTextInput
                            onChangeText={value => {
                              setTime({...time, minutes: Number(value)});
                            }}
                            value={time.minutes}
                            name="minutes"
                            multiline={false}
                            placeholder="MM"
                          />
                        </View>
                        <View style={FormStyles.containerInput}>
                          <MyTextInput
                            onChangeText={value => {
                              setTime({...time, hours: Number(value)});
                            }}
                            value={time.hours}
                            name="hours"
                            placeholder="HH"
                            multiline={false}
                          />
                        </View>
                        <View style={FormStyles.containerInput}>
                          <MyTextInput
                            onChangeText={value => {
                              setTime({...time, days: Number(value)});
                            }}
                            value={time.days}
                            name="days"
                            placeholder="DD"
                            multiline={false}
                          />
                        </View>
                        <View style={FormStyles.containerInput}>
                          <MyTextInput
                            onChangeText={handleChange('minimalPrice')}
                            value={values.minimalPrice.toString()}
                            name="minimalPrice"
                            placeholder="Start Bet"
                            multiline={false}
                          />
                          {errors.minimalPrice && touched.minimalPrice ? (
                            <AppText
                              variant="label12_400"
                              style={textColorStyles['#D40000']}>
                              {errors.minimalPrice}
                            </AppText>
                          ) : null}
                        </View>
                      </View>
                      {timeError ? (
                        <View>
                          <AppText
                            variant="label12_400"
                            style={textColorStyles['#D40000']}>
                            - Min time is 5 minutes, and Max time can be 7 days
                          </AppText>
                          <AppText
                            variant="label12_400"
                            style={textColorStyles['#D40000']}>
                            - Start bet must be min 60% from price
                          </AppText>
                        </View>
                      ) : null}
                    </View>
                  )}
                </View>
              </View>
              <AppText variant="label18_500">Product images</AppText>
              <AppText variant="label12_400" style={textColorStyles['#798787']}>
                Pictures work much better than the most talented text. The more
                photos, the better.
              </AppText>
            </View>
            <ImagesSlider name="image" dataImage={values.image} />
            {errors.image && touched.image ? (
              <AppText variant="label12_400" style={textColorStyles['#D40000']}>
                {errors.image}
              </AppText>
            ) : null}
            <View style={FormStyles.containerMt24}>
              <ButtonStyled
                title="Preview"
                style="transparent"
                disabled={!isValid}
                onPress={() => handleGoPreview(isValid, handleSubmit, values)}
              />
            </View>
            <View style={FormStyles.containerMTB16}>
              <AppText variant="label12_400" style={textColorStyles['#798787']}>
                This ad will be placed on the site after review by a moderator
                and will be valid for the next 30 days.
              </AppText>
            </View>
            <ButtonStyled
              style="fill"
              title="Confirm changes"
              disabled={
                !isValid || (timeError && values.lotType !== 'NOT_AUCTIONED')
              }
              onPress={() =>
                values.lotType === 'AUCTIONED'
                  ? handleConfirm(
                      handleSubmit,
                      {...values, lifetimePeriod: getSeconds(time)},
                      isValid,
                    )
                  : handleConfirm(
                      handleSubmit,
                      {...values, minimalPrice: values.price},
                      isValid,
                    )
              }
            />
          </ScrollView>
          <Modal isVisible={isLoading}>
            <View style={ModalStyles.modalLoading}>
              <Loading />
            </View>
          </Modal>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};
