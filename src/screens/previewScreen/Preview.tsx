import React, {FC} from 'react';
import {View, ScrollView} from 'react-native';
import {HeaderBack} from '../../components/customHeaderBar/HeaderBack';
import {useNavigation} from '@react-navigation/native';
import {ButtonStyled} from '../../components/btns/BtnWithIcon';
import LotSlider from '../../components/LotSlider/LotSlider';
import Map from '../../components/Map/Map';
import LotInfo from '../../components/LotInfo/LotInfo';
import {LotFormProps} from '../../components/types';
import {PreviewStyles} from './previewScreenStyle';
import {PreviewScreenProps} from '../../navigation/navigators/Stacks/NewAddStack/types';

export const PreviewScreen: FC<PreviewScreenProps> = ({
  route: {
    name,
    params: {
      values: {category, image, ...values},
    },
  },
}: {
  route: {params: {values: LotFormProps}; name: string};
}) => {
  const navigation = useNavigation();
  const handleGoBack = () => navigation.goBack();
  return (
    <View style={PreviewStyles.containerPreview}>
      <HeaderBack onPress={handleGoBack} text={name} />
      <View style={PreviewStyles.containerPreview}>
        <ScrollView style={PreviewStyles.scrollView}>
          <LotSlider url={image} />
          <LotInfo
            description={values.description}
            id={`${category ? category.categoryName : ''} ${
              category ? category.categoryName : 'No data'
            }`}
            title={`${values.title ? values.title : 'Add Title'}`}
            time={'21-12-2015'}
            bet={''}
            price={` ${values.price}`}
            weight={`${(Number(values.price) / Number(values.quantity)).toFixed(
              2,
            )}/${values.quantityUnits}`}
            variety={category.categoryName}
            quantity={`${values.quantity} ${values.quantityUnits}`}
            sizeLower={`${values.sizeLower}${values.sizeUnits} - ${values.sizeUpper}${values.sizeUnits}`}
            packaging={values.packaging}
            country={`${values.country}, ${values.region}`}
            creationDate={new Date().toLocaleDateString()}
          />
          <Map country={values.country} city={values.region} />
        </ScrollView>
      </View>
      <View style={PreviewStyles.previewBtnWrap}>
        <ButtonStyled
          style="transparent"
          icon="arrowBack"
          title="GO Back"
          onPress={handleGoBack}
        />
      </View>
    </View>
  );
};
