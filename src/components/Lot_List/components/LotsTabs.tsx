import React, {FC, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {Colors} from '../../../constants/Colors';
import {TabsDataProps} from '../../UserCabinet/Advertisment/types';
import {dataForTabs} from '../data';
import {styles} from '../styles';
import {TabItemsProps} from '../types/types';

const LotsTab = ({
  item,
  onPress,
  backgroundColor,
  textColor,
}: TabItemsProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.tab, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);
type TabsListProps = {
  toogleSort: (e: string) => void;
  sort: string;
};
export const LotsTabsList: FC<TabsListProps> = ({toogleSort, sort}) => {
  const getIndex = () => {
    sort === 'creationDate,desc'
      ? setSelectedId('first')
      : sort === 'price,asc'
        ? setSelectedId('second')
        : setSelectedId('third');
  };
  const [selectedId, setSelectedId] = useState<string>(dataForTabs[0].id);

  const backgroundColor = (item: any) => {
    return item.id === selectedId
      ? Colors.TURQUOISE_PRIMARY
      : Colors.GRAY_LIGHT;
  };
  const color = (item: any) => {
    return item.id === selectedId ? Colors.WHITE_PRIMARY : Colors.BLACK_PRIMARY;
  };
  const handleChangeTab = (item: TabsDataProps, i: number) => {
    setSelectedId(item.id);
    toogleSort(item.request || '');
  };
  useEffect(() => {
    getIndex();
  });
  return (
    <View style={styles.tabHideContainer}>
      <View style={styles.tabsContainer}>
        {dataForTabs.map((item, i) => {
          return (
            <LotsTab
              key={item.id}
              item={item}
              onPress={() => handleChangeTab(item, i)}
              backgroundColor={backgroundColor(item)}
              textColor={color(item)}
            />
          );
        })}
      </View>
    </View>
  );
};
