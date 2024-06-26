import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';

import {ListStub, Loading, LotCard} from '../../../components';
import CustomHeader from '../../../components/customHeaderBar/CustomHeader';
import {Separator} from '../../../components/Lot_List/components/LotCard';
import {styles} from '../../../components/Lot_List/styles';
import {LotCardProps, LotProps} from '../../../components/Lot_List/types/types';
import {
  AdvertismentTabsList,
  TabsProps,
} from '../../../components/UserCabinet/Advertisment/AdvertismentTabs';
import {dataForBettingTabs} from '../../../components/UserCabinet/Advertisment/dataAdvert';
import {USER_BET_STACK_ROUTE} from '../../../navigation/navigators/Stacks/BettingStack/types';
import api from '../../../services/api';
import {currencyStorage} from '../../PersonalAcc/ChangeCurrencyScreen/ChangeCurrencyScreen';
import {userAdvertStyles} from '../../PersonalAcc/UserAdvert/styles';

export const UserBetListScreen: FC<TabsProps> = ({navigation}) => {
  const {user} = useAuthenticator(context => [context.user]);

  const [isLoading, setIsLoading] = useState(false);
  const [tabChoose, setTabChoose] = useState(0);
  const [lotStatus, setLotStatus] = useState('MY_BET');
  const [lot, setLots] = useState<LotCardProps[]>([]);
  const handleChangeLotStatus = (status: string, tab: number) => {
    setLotStatus(status);
    setTabChoose(tab);
  };
  const handelLotListSelect = (lotId: string, lotTitle: string) => {
    navigation.navigate(USER_BET_STACK_ROUTE.USER_BET_LOT_DETAILS, {
      lotId,
      lotTitle,
    });
  };
  const fetchLots = async (value: string) => {
    setIsLoading(true);
    const response = await api.getData(`lots/betting?currency=${value}`);
    setLots(
      response.data.filter((item: LotProps) =>
        lotStatus === 'MY_BET'
          ? item.latestBet.better === user.userId
          : item.latestBet.better !== user.userId,
      ),
    );
    setIsLoading(false);
  };
  useFocusEffect(
    useCallback(() => {
      const savedSelectedCurrency =
        currencyStorage.getString('selectedCurrency');
      fetchLots(savedSelectedCurrency);
    }, [lotStatus]),
  );
  const handleRefresh = () => {
    const savedSelectedCurrency = currencyStorage.getString('selectedCurrency');
    setIsLoading(true);
    fetchLots(savedSelectedCurrency || 'USD');
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.containerMain}>
      <SafeAreaView style={styles.container}>
        <CustomHeader
          image={require('../../../assets/images/agroex_logo.png')}
        />
        <AdvertismentTabsList
          tabChoose={tabChoose}
          setInactive={handleChangeLotStatus}
          data={dataForBettingTabs}
        />
        <View style={userAdvertStyles.listBetWrapper}>
          <FlatList
            ListEmptyComponent={<ListStub />}
            refreshing={isLoading}
            onRefresh={handleRefresh}
            data={lot}
            ItemSeparatorComponent={!isLoading && Separator}
            renderItem={({item}) => (
              <LotCard
                isBetting={true}
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
