import React, {FC, useEffect, useState} from 'react';
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
  SubcategoriesScreenProps,
} from '../../../navigation/navigators/Stacks/HomeStack/types';
import api from '../../../services/api';
import {styles} from './styles';

export type Subcategory = {
  id: string;
  categoryName: string;
};

const SubcategoryList: FC<SubcategoriesScreenProps> = ({navigation, route}) => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>();
  const {category} = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubCategories = async () => {
    const response = await api.getDataWithoutUser(
      `subcategories?parent=${name.split(' ').join('_').toUpperCase()}`,
    );
    setSubcategories(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchSubCategories();
  }, []);

  if (!category) {
    navigation.goBack();
    return null;
  }
  const {name} = category;

  const handleSubcategorySelect = (
    subcategory: string,
    subcategoryID: string,
  ) => {
    navigation.navigate(HOME_STACK_ROUTE.LOT_LIST, {
      subcategory,
      subcategoryID,
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <CustomHeader onPress={() => navigation.goBack()} text={name} />
      <FlatList
        data={subcategories}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleSubcategorySelect(item.categoryName, item.id)}>
            <View>
              <AppText
                style={[
                  textTypographyStyles.label18_400,
                  textColorStyles[Colors.BLACK_PRIMARY],
                  styles.text,
                ]}>
                {item.categoryName}
              </AppText>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SubcategoryList;
