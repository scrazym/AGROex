import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {FlatList, RefreshControl, SafeAreaView, View} from 'react-native';
import {MMKV} from 'react-native-mmkv';

import {
  ButtonStyled,
  ListStub,
  Loading,
  LotCard,
  LotListFooterPagin,
} from '../../components';
import CustomHeader from '../../components/customHeaderBar/CustomHeader';
import FilterModal from '../../components/Filters/FilterModal';
import {Variety} from '../../components/Filters/types';
import {FilterStub} from '../../components/Lot_List/components/FilterStub';
import {LotsTabsList} from '../../components/Lot_List/components/LotsTabs';
import {styles} from '../../components/Lot_List/styles';
import {LotCardProps} from '../../components/Lot_List/types/types';
import {Colors} from '../../constants/Colors';
import {
  HOME_STACK_ROUTE,
  LotListScreenProps,
} from '../../navigation/navigators/Stacks/HomeStack/types';
import api from '../../services/api';
import {currencyStorage} from '../PersonalAcc/ChangeCurrencyScreen/ChangeCurrencyScreen';

export const storage = new MMKV();

export const LotList: FC<LotListScreenProps> = ({navigation, route}) => {
  const [lot, setLots] = useState<LotCardProps[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [size, setSize] = useState(10);
  const {subcategory, subcategoryID} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isVisiblePages, setIsVisiblePages] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sort, setSort] = useState('creationDate,desc');
  const [isSizeVisible, setSizeVisible] = useState(false);
  const [total, setTotal] = useState<{totalElements: number} | null>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [title, setTitle] = useState('');
  const [encodedFilters, setEncodedFilters] = useState(
    storage.getString('selectedFilters'),
  );
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleFiltersChange = (encodedFilters: string) => {
    setEncodedFilters(encodedFilters);
    setPage(0);
    setSize(10);
    setIsFilterSelected(encodedFilters !== '' && encodedFilters !== '%5B%5D');
  };

  const fetchLots = async (value: string) => {
    setIsLoading(true);

    const filtersQueryParam = encodedFilters
      ? `&filters=${encodedFilters}`
      : '';
    const response = await api.getData(
      `subcategories/${subcategoryID}/lots?page=${page}&size=${size}&sort=${sort}&${filtersQueryParam}&currency=${value}`,
    );
    const lotsData = response.data.contentList;
    setLots(lotsData);

    if (lotsData.length > 0) {
      const varieties = lotsData[0].category?.varieties || [];
      const formattedVarieties = varieties.map((variety: LotCardProps) => ({
        id: variety,
        value: variety,
      }));
      setVarieties(formattedVarieties);

      const pages = response.data.page;
      setTotal(pages);
      setTotalPages([...Array(pages.totalPages).keys()].map(i => i + 1));
    } else {
      setVarieties([]);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handelLotListSelect = (
    lotId: string,
    lotTitle: string,
    func: (encodedFilters: string) => void,
  ) => {
    navigation.navigate(HOME_STACK_ROUTE.LOT_DETAILS, {
      lotId,
      lotTitle,
      func,
    });
  };

  const handleChangePage = () => {
    setPage(prev => prev + 1);
    setSizeVisible(false);
    setIsVisiblePages(false);
  };

  const handleChangeSort = (e: string) => {
    setSort(e);
    setPage(0);
  };
  const handleChangeCountItems = (count: number) => {
    setSize(count);
    setSizeVisible(!isSizeVisible);
    setPage(0);
  };
  const toggleSizeWindow = () => {
    setSizeVisible(!isSizeVisible);
    setIsVisiblePages(false);
  };
  const handlePickPage = (item: number) => {
    setPage(item - 1);
    setIsVisiblePages(!isVisiblePages);
  };
  const togglePickPage = () => {
    setIsVisiblePages(!isVisiblePages);
    setSizeVisible(false);
  };
  const handleDelete = (encodedFilters: string) => {
    setIsDelete(!isDelete);
    handleChangeSort('creationDate,desc');
    setEncodedFilters(encodedFilters);
  };
  const handleGoBack = () => {
    navigation.goBack();
    storage.delete('selectedFilters');
  };
  const {user} = useAuthenticator(context => [context.user]);

  const isCanNext = page > totalPages.length - 2;
  const listFooter = total
    ? total.totalElements > 10 && (
        <LotListFooterPagin
          isCanNext={isCanNext}
          isSizeVisible={isSizeVisible}
          handleChangeCountItems={handleChangeCountItems}
          toggleSizeWindow={toggleSizeWindow}
          size={size}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
          isVisible={isVisiblePages}
          handlePickPage={handlePickPage}
          togglePickPage={togglePickPage}
          page={page}
        />
      )
    : null;

  useFocusEffect(
    useCallback(() => {
      const storedCurrency = currencyStorage.getString('selectedCurrency');
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
      fetchLots(storedCurrency || 'USD');
    }, [subcategory, sort, page, size, isDelete, encodedFilters]),
  );
  if (isLoading) {
    return <Loading />;
  }
  const ItemSeparator = () =>
    !isLoading ? <View style={styles.separator} /> : <View />;

  return (
    <View style={styles.container}>
      <CustomHeader
        text={subcategory}
        onPress={() => handleGoBack()}
        onSearch={handleFiltersChange}
      />

      <View style={styles.containerMain}>
        <SafeAreaView style={styles.container}>
          {title && <FilterStub title={title} onClose={handleDelete} />}

          <LotsTabsList sort={sort} toogleSort={handleChangeSort} />

          <FlatList
            ListEmptyComponent={<ListStub />}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => setIsDelete(!isDelete)}
              />
            }
            data={lot}
            ItemSeparatorComponent={ItemSeparator}
            ListFooterComponent={listFooter}
            renderItem={({item}) => (
              <LotCard
                isBetting={!!item.bets.find(bet => bet.better === user.userId)}
                lot={item}
                setDelete={handleDelete}
                onPress={() =>
                  handelLotListSelect(item.id, item.title ?? '', handleDelete)
                }
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
          <ButtonStyled
            customStyle={[
              styles.btn,
              isFilterSelected && {
                backgroundColor: Colors.ORANGE_PRIMARY,
                borderColor: Colors.ORANGE_PRIMARY,
              },
            ]}
            icon="filter"
            onPress={toggleModal}
          />
          <FilterModal
            isVisible={isOpenModal}
            onClose={toggleModal}
            onFiltersChange={handleFiltersChange}
            varieties={varieties}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export type Data = Array<LotCardProps>;
