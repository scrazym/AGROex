import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';

import {
  AdvertismentTabsList,
  HeaderBack,
  ListStub,
  Loading,
} from '../../../components';
import {LotCardProps} from '../../../components/Lot_List/types/types';
import {dataForTabs} from '../../../components/UserCabinet/Advertisment/dataAdvert';
import {UserCardSeparator} from '../../../components/UserCabinet/Advertisment/UserCardSeparator';
import {UserLotCard} from '../../../components/UserCabinet/Advertisment/UserLotCard';
import {
  USER_STACK_ROUTE,
  UserAdvertScreenProps,
} from '../../../navigation/navigators/Stacks/UserStack/types';
import api from '../../../services/api';
import {currencyStorage} from '../ChangeCurrencyScreen/ChangeCurrencyScreen';
import {userAdvertStyles} from './styles';

export const UserAdvertScreen: FC<UserAdvertScreenProps> = ({navigation}) => {
  const [isDelete, setIsDelete] = useState(false);

  const [lot, setLots] = useState<LotCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lotStatus, setLotStatus] = useState('ACTIVE');
  const [tabChoose, setTabChoose] = useState(0);
  const {user} = useAuthenticator(context => [context.user]);
  const handleChangeLotStatus = (status: string, tab: number) => {
    setLotStatus(status);
    setTabChoose(tab);
  };
  const fetchLots = async (status: string, value: string) => {
    setIsLoading(true);
    const response = await api.getData(
      `users/${user.userId}/lots?currency=${value}`,
    );
    setLots(
      response.data.filter((lotItem: LotCardProps) =>
        status === 'ON_MODERATION'
          ? lotItem.status === 'ON_MODERATION' || lotItem.status === 'REJECTED'
          : lotItem.status === status,
      ),
    );
    setIsLoading(false);
  };
  const handelLotListSelect = (id: string) => {
    navigation.navigate(USER_STACK_ROUTE.USER_LOT_DETAILS, {
      id,
    });
  };
  const handleDelete = (status: string, tab: number) => {
    setIsDelete(!isDelete);
    setLotStatus(status);
    setTabChoose(tab);
  };
  useFocusEffect(
    useCallback(() => {
      const storedCurrency = currencyStorage.getString('selectedCurrency');
      fetchLots(lotStatus, storedCurrency || 'USD');
      return () => {};
    }, [isDelete, lotStatus]),
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={userAdvertStyles.mainScreenContainer}>
      <HeaderBack
        text="My advertisment"
        onPress={() => navigation.navigate(USER_STACK_ROUTE.USER_CABINET)}
      />
      <AdvertismentTabsList
        tabChoose={tabChoose}
        setInactive={handleChangeLotStatus}
        data={dataForTabs}
      />
      <View style={userAdvertStyles.listWrapper}>
        <FlatList
          ListEmptyComponent={<ListStub />}
          data={lot}
          ItemSeparatorComponent={UserCardSeparator}
          renderItem={({item}) => (
            <UserLotCard
              key={item.id}
              lotItem={item}
              isDelete={isDelete}
              setDelete={handleDelete}
              onPress={() => handelLotListSelect(item.id)}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
