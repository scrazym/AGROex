import 'react-native-gesture-handler';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import LotDetails from '../../../../screens/HomeScreens/LotDetails/LotDetails';
import {OrderList} from '../../../../screens/Oredrs/OredrListScreen';
import {
  ORDER_STACK_ROUTE,
  OrderStackNavigationProps,
  OrderStackParamList,
} from './types';

const Stack = createNativeStackNavigator<OrderStackParamList>();

const OrderStack = ({
  navigation,
  route,
}: OrderStackNavigationProps<keyof OrderStackParamList>) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ORDER_STACK_ROUTE.ORDER_LIST} component={OrderList} />
      <Stack.Screen
        name={ORDER_STACK_ROUTE.ORDER_LOT_DETAILS}
        component={LotDetails}
      />
    </Stack.Navigator>
  );
};

export default OrderStack;
