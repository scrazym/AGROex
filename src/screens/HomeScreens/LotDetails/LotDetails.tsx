import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import {AppText, ButtonStyled, Loading} from '../../../components';
import {textColorStyles} from '../../../components/AppText/styles';
import {stylesDetailBtn} from '../../../components/Button/styles';
import {UserLotBtns} from '../../../components/Button/UserLotByns';
import CustomHeader from '../../../components/customHeaderBar/CustomHeader';
import {LotCardProps} from '../../../components/Lot_List/types/types';
import LotInfo from '../../../components/LotInfo/LotInfo';
import LotSlider from '../../../components/LotSlider/LotSlider';
import Map from '../../../components/Map/Map';
import {ConfirmDealModal} from '../../../components/modals/ConfirmDealModal';
import {ModalStyles} from '../../../components/modals/style';
import {Colors} from '../../../constants/Colors';
import {onDisplayNotification} from '../../../helpers/onDisplayNotification';
import {LotDetailsScreenProps} from '../../../navigation/navigators/Stacks/HomeStack/types';
import {USER_STACK_ROUTE} from '../../../navigation/navigators/Stacks/UserStack/types';
import api from '../../../services/api';
import {currencyStorage} from '../../PersonalAcc/ChangeCurrencyScreen/ChangeCurrencyScreen';
import {LotDetailsStyle} from './styles';

const LotDetails: FC<LotDetailsScreenProps> = ({navigation, route}) => {
  const {lotId, lotTitle, func} = route.params;
  const [lot, setLot] = useState<LotCardProps>({} as LotCardProps);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [manageModalVisisble, setManageModalVisisble] = useState(false);
  const [newBet, setBet] = useState('0');
  const [isAuthor, setIsAuthor] = useState(false);
  const [currency, setCurrency] = useState('');
  const [change, setChange] = useState(false);
  const [isPlacedBet, setIsPlacedBet] = useState(false);
  const {user} = useAuthenticator(context => [context.user]);
  const {
    bets,
    id,
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
    images,
    description,
    calculatedPrice,
    lotType,
    author,
    status,
    calculatedMinimalPrice,
    expiresAt,
  } = lot;

  const fetchLotDetails = async (value: string) => {
    setIsLoading(true);
    const response = await api.getData(`lots/${lotId}?currency=${value}`);
    setLot(response.data);
    setIsLoading(false);
    user.userId === response.data.author
      ? setIsAuthor(true)
      : setIsAuthor(false);
  };
  const handleBuyOut = async () => {
    setIsLoading(true);
    user.userId !== author
      ? await api.post(`purchase/lots/${lotId}/buyout?currency=${currency}`)
      : await api.post(`/purchase/lots/${id}/latest-bet`);
    setConfirmVisible(false);
    setIsLoading(false);
    navigation.goBack();
    user.userId !== author && navigation.navigate('Orders');
  };

  const toggleConfirmVisible = () => {
    setConfirmVisible(!confirmVisible);
  };
  const toggleBetModal = () => {
    setModalVisible(!modalVisible);
  };
  const [currencyIcon, setCurrencyIcon] = useState(
    JSON.parse(currencyStorage.getString('selectedCurrencyIcon') || ''),
  );

  useEffect(() => {
    const storedCurrency = currencyStorage.getString('selectedCurrency');

    const interval = setInterval(() => {
      if (isPlacedBet) {
        api.getData(`lots/${lotId}?currency=${storedCurrency}`).then(res => {
          if (res.status === 200 && res.data.latestBet.better !== user.userId) {
            onDisplayNotification(res.data.title, res.data.latestBet.amount);
            setIsPlacedBet(false);
            clearInterval(interval);
          }
        });
      }
    }, 10000);
  }, [isPlacedBet]);
  useEffect(() => {
    const storedCurrency = currencyStorage.getString('selectedCurrency');
    setCurrency(storedCurrency || 'USD');
    fetchLotDetails(storedCurrency || 'USD');
  }, [lotId, user.userId, change]);
  if (isLoading) {
    return <Loading />;
  }

  const handlePlaceBet = async (bet: string) => {
    setIsLoading(true);
    const result = await api.post(`purchase/lots/${lotId}/bets`, {
      id: lotId,
      currency: currency,
      amount: bet,
      better: user.userId,
    });
    if (result) {
      setIsPlacedBet(true);
    }
    setModalVisible(!modalVisible);
    setIsLoading(false);
    setBet('0');
    setChange(!change);
  };

  const isBetDisable =
    Math.round(calculatedMinimalPrice) > Number(newBet) ||
    (latestBet && latestBet.amount >= newBet);
  const toggleEditModal = () => {
    setManageModalVisisble(!manageModalVisisble);
  };
  const isPlaceBet = bets && bets.find(item => item.better === user.userId);

  return (
    <View style={LotDetailsStyle.scrollContainerIOS}>
      <CustomHeader
        text={lotTitle}
        onPress={() => navigation.goBack()}
        onSearch={func}
      />
      <SafeAreaView style={LotDetailsStyle.safeArea}>
        <View
          style={
            Platform.OS === 'ios'
              ? LotDetailsStyle.scrollContainerIOS
              : LotDetailsStyle.scrollContainerAndroid
          }>
          <ScrollView style={LotDetailsStyle.scrollContainerIOS}>
            <LotSlider url={images} />
            {expiresAt && (
              <View style={LotDetailsStyle.expiresWrapper}>
                <AppText
                  style={textColorStyles['#368ACE']}
                  variant="label12_400">
                  Auction finish at: {expiresAt}
                </AppText>
              </View>
            )}
            <LotInfo
              isPlaceBet={!!isPlaceBet}
              status={status}
              images={images}
              id={id}
              title={title}
              latestBet={latestBet}
              price={Math.round(calculatedPrice)}
              weight={`${(Number(calculatedPrice) / Number(quantity)).toFixed(
                2,
              )}/${quantityUnits}`}
              variety={variety}
              author={author}
              quantity={`${quantity} ${quantityUnits}`}
              sizeLower={`${sizeLower}${sizeUnits} - ${sizeUpper}${sizeUnits}`}
              packaging={packaging}
              country={`${country}, ${region}`}
              creationDate={creationDate}
              description={description}
              lotType={lotType}
            />
            <Map country={country} city={region} />
            {status !== 'COMPLETED' && !isAuthor ? (
              <View style={stylesDetailBtn.container}>
                <View style={stylesDetailBtn.buttonContainer}>
                  {lot.lotType === 'AUCTIONED' && (
                    <ButtonStyled
                      style="transparent"
                      title="Place a bet"
                      icon="bet"
                      onPress={toggleBetModal}
                    />
                  )}
                  <ButtonStyled
                    style="fill"
                    title="Buy now"
                    icon="bucket"
                    onPress={toggleConfirmVisible}
                  />
                </View>
              </View>
            ) : (
              status !== 'COMPLETED' && (
                <UserLotBtns
                  isCompleted={status !== 'COMPLETED' && latestBet}
                  lot={lot}
                  screen={USER_STACK_ROUTE.USER_LOT_MANAGE}
                  titleFirst="Confirm deal"
                  titleSecond="Manage"
                  id={id}
                  iconLeft="confirm"
                  iconRight="manage"
                  isVisible={manageModalVisisble}
                  toggleModal={toggleEditModal}
                  handleConfirm={toggleConfirmVisible}
                />
              )
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
      <ConfirmDealModal
        title="Confirm deal?"
        visible={confirmVisible}
        toggle={toggleConfirmVisible}
        confirmDeal={handleBuyOut}
      />
      <Modal
        onBackdropPress={toggleBetModal}
        isVisible={modalVisible}
        style={LotDetailsStyle.modal}>
        <KeyboardAvoidingView
          behavior="height"
          style={LotDetailsStyle.modalWrapper}>
          <View style={LotDetailsStyle.modalHeader}>
            {!latestBet ? (
              <AppText variant="label12_400">{`Minimal bet is: ${Math.round(
                calculatedMinimalPrice,
              )}`}</AppText>
            ) : (
              <AppText variant="label12_400">{`Minimal bet need more then:  ${
                latestBet && latestBet.amount
              }`}</AppText>
            )}

            <TouchableOpacity
              style={ModalStyles.manageClose}
              onPress={toggleBetModal}>
              <FontAwesomeIcon color={Colors.GRAY_PRIMARY} icon={faXmark} />
            </TouchableOpacity>
          </View>
          <View>
            <View style={LotDetailsStyle.modalInputIcon}>
              <FontAwesomeIcon
                color={Colors.GRAY_PRIMARY}
                icon={currencyIcon}
              />
            </View>
            <TextInput
              autoFocus
              keyboardType="numeric"
              value={newBet}
              onChangeText={text => setBet(text)}
              style={LotDetailsStyle.modalInput}
            />
          </View>
          <View style={LotDetailsStyle.modalBtnWrap}>
            <ButtonStyled
              disabled={isBetDisable}
              title={`Bet ${newBet}`}
              onPress={() => !isBetDisable && handlePlaceBet(newBet)}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default LotDetails;
