import React, {FC, useState} from 'react';
import {View} from 'react-native';

import {Colors} from '../../../constants/Colors';
import {dataForTabs} from './dataAdvert';
import {LotsTab} from './LotTab';
import {AdverComponentsStyles} from './styles';
import {TabsDataProps} from './types';

export type TabsProps = {
  setInactive: (e: string, num: number) => void;
  tabChoose: number;
  data: TabsDataProps[];
};
export const AdvertismentTabsList: FC<TabsProps> = ({
  setInactive,
  tabChoose,
  data,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    dataForTabs[tabChoose].id,
  );
  const borderColor = (i: number) => {
    return dataForTabs[i].id === selectedId
      ? Colors.TURQUOISE_PRIMARY
      : Colors.GRAY_LIGHT;
  };
  const handleChangeTab = (item: TabsDataProps, i: number) => {
    setSelectedId(item.id);
    setInactive(item.request || '', i);
  };
  return (
    <View style={AdverComponentsStyles.tabsContainer}>
      {data.map((item, i) => {
        return (
          <LotsTab
            key={item.id}
            item={item}
            onPress={() => handleChangeTab(item, i)}
            textColor="black"
            borderBottomColor={borderColor(i)}
          />
        );
      })}
    </View>
  );
};
