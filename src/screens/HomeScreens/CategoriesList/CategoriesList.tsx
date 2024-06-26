import {faChevronRight, faSeedling} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';

import {AppText, Loading} from '../../../components';
import {
  textColorStyles,
  textTypographyStyles,
} from '../../../components/AppText/styles';
import CustomHeader from '../../../components/customHeaderBar/CustomHeader';
import {Colors} from '../../../constants/Colors';
import {
  HOME_STACK_ROUTE,
  HomeStackNavigationProps,
} from '../../../navigation/navigators/Stacks/HomeStack/types';
import api from '../../../services/api';
import {refreshCurrentSession} from '../../../services/token';
import {storage} from '../LotList';
import {styles} from './styles';

export type Category = {
  id: string;
  name: string;
  subcategories?: string[];
};

const CategoriesList: FC<
  HomeStackNavigationProps<HOME_STACK_ROUTE.CATEGORIES_LIST>
> = ({navigation}) => {
  const [category, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    const response = await api.getData('categories');
    if (response) {
      setCategories(response.data);
    }

    setIsLoading(false);
  };

  const refreshSessionPeriodically = () => {
    refreshCurrentSession();

    setInterval(async () => {
      await refreshCurrentSession();
    }, 600000);
  };

  useFocusEffect(
    useCallback(() => {
      refreshSessionPeriodically();
      fetchCategories();
      storage.set('selectedFilters', '');
    }, []),
  );

  const handleMainListSelect = (selectedCategory: Category) => {
    navigation.navigate(HOME_STACK_ROUTE.SUBCATEGORY_LIST, {
      category: selectedCategory,
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <CustomHeader image={require('../../../assets/images/agroex_logo.png')} />
      <AppText
        style={[
          textTypographyStyles.label24_400,
          textColorStyles[Colors.AGROEX_MAIN],
          styles.text,
        ]}>
        Categories
      </AppText>
      <FlatList
        data={category}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleMainListSelect(item)}>
            <View style={styles.listContainer}>
              <View style={styles.listWithIcon}>
                <FontAwesomeIcon
                  icon={faSeedling}
                  size={18}
                  style={styles.icon}
                />
                <AppText
                  style={[
                    textTypographyStyles.label18_500,
                    textColorStyles[Colors.BLACK_PRIMARY],
                  ]}>
                  {item.name}
                </AppText>
              </View>
              <View>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size={18}
                  style={styles.iconChevron}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoriesList;
