import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {Alert, Platform, SafeAreaView, ScrollView, View} from 'react-native';

import {
  ButtonStyled,
  HeaderBack,
  Loading,
  ManageModal,
} from '../../../components';
import {stylesDetailBtn} from '../../../components/Button/styles';
import {LotCardProps} from '../../../components/Lot_List/types/types';
import LotInfo from '../../../components/LotInfo/LotInfo';
import LotSlider from '../../../components/LotSlider/LotSlider';
import Map from '../../../components/Map/Map';
import {ConfirmDealModal} from '../../../components/modals/ConfirmDealModal';
import {getPricePerQuant} from '../../../helpers/getPricePerQuant';
import {
  USER_STACK_ROUTE,
  UserLotDetailsProps,
} from '../../../navigation/navigators/Stacks/UserStack/types';
import api from '../../../services/api';
import {handleSellOutLot} from '../../../services/handleSellOut';
import {LotDetailsStyle} from '../../HomeScreens/LotDetails/styles';
import {currencyStorage} from '../ChangeCurrencyScreen/ChangeCurrencyScreen';

export const UserLotDetails: FC<UserLotDetailsProps> = ({
  navigation,
  route,
}) => {
  const {id} = route.params;
  const [lot, setLot] = useState<LotCardProps>({} as LotCardProps);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isConfirmVisible, setConfirmVisibele] = useState(false);

  const toggleConfirmModal = () => {
    setConfirmVisibele(!isConfirmVisible);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const deleteLot = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigation.goBack();
    }, 1000);
  };

  const {
    images,
    title,
    latestBet,
    variety,
    quantity,
    quantityUnits,
    sizeLower,
    sizeUpper,
    sizeUnits,
    packaging,
    country,
    region,
    creationDate,
    description,
    status,
    calculatedPrice,
    lotType,
    author,
  } = lot;

  const fetchLotDetails = async (value: string) => {
    setIsLoading(true);
    const response = await api.getData(`lots/${id}?currency=${value}`);
    setLot(response.data);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      const storedCurrency = currencyStorage.getString('selectedCurrency');
      fetchLotDetails(storedCurrency || 'USD');
    }, [id]),
  );
  const handleSellOutPress = (id: string) => {
    setIsLoading(true);
    handleSellOutLot(id);
    navigation.goBack();
    setIsLoading(false);
    Alert.alert('Lot sold successfully!');
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={LotDetailsStyle.scrollContainerIOS}>
      <HeaderBack
        onPress={() => navigation.navigate(USER_STACK_ROUTE.USER_ADVERTISMENT)}
        text={title ? title : 'Go back'}
      />
      <SafeAreaView style={LotDetailsStyle.safeArea}>
        <View
          style={
            Platform.OS === 'ios'
              ? LotDetailsStyle.scrollContainerIOS
              : LotDetailsStyle.scrollContainerAndroid
          }>
          <ScrollView style={LotDetailsStyle.scrollContainerIOS}>
            <LotSlider url={images ? images : []} />
            <LotInfo
              calculated={calculatedPrice}
              status={status}
              description={description}
              id={id}
              title={title}
              latestBet={latestBet}
              price={Math.round(calculatedPrice)}
              weight={getPricePerQuant(
                calculatedPrice,
                quantity,
                quantityUnits,
              )}
              author={author}
              lotType={lotType}
              variety={variety}
              quantity={`${quantity} ${quantityUnits}`}
              sizeLower={`${sizeLower}${sizeUnits} - ${sizeUpper}${sizeUnits}`}
              packaging={packaging}
              country={`${country}, ${region}`}
              creationDate={creationDate}
            />
            <Map country={country} city={region} />

            <View style={stylesDetailBtn.buttonContainer}>
              {latestBet && status !== 'COMPLETED' && (
                <ButtonStyled
                  onPress={toggleConfirmModal}
                  style="fillConfirm"
                  title="Confirm deal"
                  icon="confirm"
                />
              )}
              {status !== 'COMPLETED' && (
                <ButtonStyled
                  onPress={toggleModal}
                  style="transparent"
                  title="Manage"
                  icon="manage"
                />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <ConfirmDealModal
        title="Are you sure to sell lot for this price?"
        visible={isConfirmVisible}
        toggle={toggleConfirmModal}
        confirmDeal={() => handleSellOutPress(lot.id)}
      />
      <View>
        <ManageModal
          lot={lot}
          id={id}
          screen={USER_STACK_ROUTE.USER_LOT_MANAGE}
          isVisible={modalVisible}
          toggle={toggleModal}
          status={status}
          rerender={deleteLot}
        />
      </View>
    </View>
  );
};
