import {
  faBitcoinSign,
  faDollarSign,
  faEuroSign,
  faRubleSign,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {MMKV} from 'react-native-mmkv';

import {AppText, HeaderBack} from '../../../components';
import {
  textColorStyles,
  textTypographyStyles,
} from '../../../components/AppText/styles';
import {Colors} from '../../../constants/Colors';
import {
  USER_STACK_ROUTE,
  UserChangeCurrencyScreenProps,
} from '../../../navigation/navigators/Stacks/UserStack/types';
import {styles} from './ChangeCurrencyStyle';

export const currencyStorage = new MMKV();

export const dataCurrency = [
  {id: 1, name: 'USD', icon: faDollarSign, desc: 'U.S. Dollar'},
  {id: 2, name: 'EUR', icon: faEuroSign, desc: 'Euro'},
  {id: 3, name: 'RUB', icon: faRubleSign, desc: 'Russian ruble'},
  {id: 4, name: 'BYN', icon: faBitcoinSign, desc: 'Belarusian ruble'},
];

const ChangeCurrencyScreen: FC<UserChangeCurrencyScreenProps> = ({
  navigation,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencyIcon, setCurrencyIcon] = useState(faDollarSign);

  const handleCurrencySelection = (
    currencyName: string,
    icon: IconDefinition,
  ) => {
    setSelectedCurrency(currencyName);
    currencyStorage.set('selectedCurrency', currencyName);
    currencyStorage.set('selectedCurrencyIcon', JSON.stringify(icon));
  };

  useFocusEffect(
    useCallback(() => {
      const savedSelectedCurrency =
        currencyStorage.getString('selectedCurrency');
      if (savedSelectedCurrency) {
        setSelectedCurrency(savedSelectedCurrency);
      }
      const savedSelectedCurrencyIcon = currencyStorage.getString(
        'selectedCurrencyIcon',
      );
      if (savedSelectedCurrencyIcon) {
        setCurrencyIcon(JSON.parse(savedSelectedCurrencyIcon));
      }
    }, []),
  );

  const navigateToUserCabinet = () => {
    navigation.navigate(USER_STACK_ROUTE.USER_CABINET);
  };

  return (
    <View style={styles.container}>
      <HeaderBack text="Currency" onPress={navigateToUserCabinet} />
      <View style={styles.itemContainer}>
        <FlatList
          data={dataCurrency}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.items,
                selectedCurrency === item.name && styles.selectedCurrency,
              ]}
              onPress={() => handleCurrencySelection(item.name, item.icon)}>
              <View style={styles.currencyContainer}>
                <View>
                  <AppText
                    style={[
                      textTypographyStyles.label18_400,
                      textColorStyles[Colors.BLACK_PRIMARY],
                    ]}>
                    {item.name},
                    <FontAwesomeIcon
                      icon={item.icon}
                      size={18}
                      color={Colors.BLACK_PRIMARY}
                      style={styles.icon}
                    />
                  </AppText>
                </View>
                <View>
                  <AppText
                    style={[
                      textTypographyStyles.label18_400,
                      textColorStyles[Colors.BLACK_PRIMARY],
                    ]}>
                    {item.desc}
                  </AppText>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default ChangeCurrencyScreen;
