import {faAngleRight, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {Colors} from '../../../constants/Colors';
import {searchResultModify} from '../../../helpers/searchResModify';
import {
  HOME_STACK_ROUTE,
  SubcategoriesScreenProps,
} from '../../../navigation/navigators/Stacks/HomeStack/types';
import {storage} from '../../../screens/HomeScreens/LotList';
import {currencyStorage} from '../../../screens/PersonalAcc/ChangeCurrencyScreen/ChangeCurrencyScreen';
import api from '../../../services/api';
import {AppText} from '../..';
import {inputSearchStyle} from '../styles/inputSearchStyle';

export const InputSearch: FC<TextInputSearchProps> = ({opacity, onSearch}) => {
  const navigation = useNavigation<SubcategoriesScreenProps>();
  const [value, setValue] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useSharedValue(0);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    const storedCurrency = currencyStorage.getString('selectedCurrency');
    if (storedCurrency) {
      setSelectedCurrency(storedCurrency);
    }
  }, []);

  const fadeIn = () => {
    fadeAnim.value = withTiming(1, {
      duration: 1300,
      easing: Easing.bounce,
    });
  };

  const fadeOut = () => {
    fadeAnim.value = withTiming(0, {
      duration: 1500,
      easing: Easing.bounce,
    });
  };
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: 140,
      opacity: fadeAnim.value,
    };
  });
  const handleSearch = async (text: string) => {
    setValue(text);
    setTimeout(async () => {
      if (text.length > 0) {
        setIsLoading(true);
        const encoded = encodeURIComponent(
          JSON.stringify([{fieldName: 'title', operator: 'eq', value: text}]),
        );
        const res = await api.getData(
          `lots?filters=${encoded}&currency=${selectedCurrency}`,
        );
        setSearchRes(searchResultModify(res.data));
        setIsLoading(false);
      }
    }, 500);
  };
  const handlePressSearchRes: handleSearchProps = (
    subcategory,
    subcategoryID,
    text,
  ) => {
    storage.set(
      'selectedFilters',
      JSON.stringify({fieldName: 'title', operator: 'eq', value: text}),
    );
    navigation.navigate(HOME_STACK_ROUTE.LOT_LIST, {
      subcategory,
      subcategoryID,
    });
    onSearch &&
      onSearch(
        JSON.stringify({fieldName: 'title', operator: 'eq', value: text}),
      );
  };
  useEffect(() => {
    value ? fadeIn() : fadeOut();
  }, [value]);

  return (
    <Animated.View style={[inputSearchStyle.wrapper, {opacity: opacity}]}>
      <TextInput
        autoFocus={true}
        onChangeText={(e: string) => handleSearch(e)}
        keyboardType="default"
        style={inputSearchStyle.placeholder}
      />
      <FontAwesomeIcon
        icon={faSearch}
        size={20}
        color={Colors.GRAY_PRIMARY}
        style={inputSearchStyle.icon}
      />
      {isLoading && (
        <ActivityIndicator
          color={'purple'}
          style={inputSearchStyle.indicator}
        />
      )}
      <Animated.FlatList
        style={[inputSearchStyle.list, animatedStyles]}
        data={
          searchRes.length
            ? searchRes
            : [
                {
                  id: 1,
                  title: 'Sorry, there are no lots for your request',
                  count: 0,
                },
              ]
        }
        renderItem={({item}) =>
          searchRes.length ? (
            <TouchableOpacity
              onPress={() => handlePressSearchRes(item.title, item.id, value)}
              style={inputSearchStyle.renderItem}>
              <AppText variant="label16_400" text={item.title} />
              <View style={inputSearchStyle.renderItemWrapper}>
                <AppText variant="label16_400" text={item.count} />
                <FontAwesomeIcon size={12} icon={faAngleRight} />
              </View>
            </TouchableOpacity>
          ) : (
            <View style={inputSearchStyle.imageWrap}>
              <AppText variant="label16_500" text={item.title} />
              <Image
                style={inputSearchStyle.image}
                source={{
                  uri: 'https://tenor.com/ru/view/no-gif-19391442.gif',
                }}
              />
            </View>
          )
        }
      />
    </Animated.View>
  );
};
type handleSearchProps = (
  subcategory: string,
  subcategoryID: number,
  text: string,
) => void;

type TextInputSearchProps = {
  opacity: SharedValue<number>;
  onSearch?: (e: string) => void;
};
