import 'react-native-gesture-handler';

import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useLayoutEffect} from 'react';

import {LotList} from '../../../../components';
import CategoriesList from '../../../../screens/HomeScreens/CategoriesList/CategoriesList';
import LotDetails from '../../../../screens/HomeScreens/LotDetails/LotDetails';
import SubcategoryList from '../../../../screens/HomeScreens/SubcategoryList/SubcategoryList';
import {ManageLot} from '../../../../screens/PersonalAcc/ManageLotScreen/ManageLotScreen';
import {PreviewScreen} from '../../../../screens/previewScreen/Preview';
import {DoneScreen} from '../../../../screens/SucsessScreen/Success';
import {USER_STACK_ROUTE} from '../UserStack/types';
import {
  HOME_STACK_ROUTE,
  HomeStackNavigationProps,
  HomeStackParamList,
} from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = ({
  navigation,
  route,
}: HomeStackNavigationProps<keyof HomeStackParamList>) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    navigation.setOptions({
      tabBarStyle:
        routeName === HOME_STACK_ROUTE.LOT_DETAILS
          ? {display: 'flex'}
          : {display: 'flex'},
    });
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={HOME_STACK_ROUTE.CATEGORIES_LIST}
        component={CategoriesList}
      />
      <Stack.Screen
        name={HOME_STACK_ROUTE.SUBCATEGORY_LIST}
        component={SubcategoryList}
      />
      <Stack.Screen name={HOME_STACK_ROUTE.LOT_LIST} component={LotList} />
      <Stack.Screen
        name={HOME_STACK_ROUTE.LOT_DETAILS}
        component={LotDetails}
      />
      <Stack.Screen
        name={USER_STACK_ROUTE.USER_LOT_MANAGE}
        component={ManageLot}
      />
      <Stack.Screen name={USER_STACK_ROUTE.PREVIEW} component={PreviewScreen} />
      <Stack.Screen
        name={USER_STACK_ROUTE.USER_LOT_MANAGE_SUCCESS}
        component={DoneScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
