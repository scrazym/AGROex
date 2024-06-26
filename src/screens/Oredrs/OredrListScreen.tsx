import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {FlatList, RefreshControl, SafeAreaView, View} from 'react-native';

import {AdvertismentTabsList, ListStub, Loading} from '../../components';
import CustomHeader from '../../components/customHeaderBar/CustomHeader';
import {LotCard, Separator} from '../../components/Lot_List/components/LotCard';
import {styles} from '../../components/Lot_List/styles';
import {LotCardProps, TabsProps} from '../../components/Lot_List/types/types';
import {dataForOrder} from '../../components/UserCabinet/Advertisment/dataAdvert';
import {ORDER_STACK_ROUTE} from '../../navigation/navigators/Stacks/OrderStack/types';
import api from '../../services/api';
import {currencyStorage} from '../PersonalAcc/ChangeCurrencyScreen/ChangeCurrencyScreen';
import {userAdvertStyles} from '../PersonalAcc/UserAdvert/styles';

export const OrderList: FC<TabsProps> = ({navigation}) => {
  const storedCurrency = currencyStorage.getString('selectedCurrency');
  const [isLoading, setIsLoading] = useState(false);
  const [tabChoose, setTabChoose] = useState(0);
  const [lotStatus, setLotStatus] = useState('OUTBIDED');
  const [lot, setLots] = useState<LotCardProps[]>([]);
  const handleChangeLotStatus = (status: string, tab: number) => {
    setLotStatus(status);
    setTabChoose(tab);
  };
  const handelLotListSelect = (lotId: string, lotTitle: string) => {
    navigation.navigate(ORDER_STACK_ROUTE.ORDER_LOT_DETAILS, {
      lotId,
      lotTitle,
    });
  };
  const fetchLots = async (value: string) => {
    setIsLoading(true);
    const response = await api.getData(`purchase/orders?currency=${value}`);
    setLots(response.data);
    setIsLoading(false);
  };
  useFocusEffect(
    useCallback(() => {
      const storedCurrency = currencyStorage.getString('selectedCurrency');

      fetchLots(storedCurrency || 'USD');
    }, []),
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.containerMain}>
      <SafeAreaView style={styles.container}>
        <CustomHeader image={require('../../assets/images/agroex_logo.png')} />

        <View style={userAdvertStyles.listBetWrapper}>
          <AdvertismentTabsList
            tabChoose={tabChoose}
            setInactive={handleChangeLotStatus}
            data={dataForOrder}
          />
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => fetchLots(storedCurrency)}
              />
            }
            style={userAdvertStyles.orderListWrapper}
            ListEmptyComponent={<ListStub />}
            data={lot}
            ItemSeparatorComponent={Separator}
            renderItem={({item}) => (
              <LotCard
                lot={item}
                onPress={() => handelLotListSelect(item.id, item.title ?? '')}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
