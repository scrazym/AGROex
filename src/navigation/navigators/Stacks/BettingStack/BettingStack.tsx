import 'react-native-gesture-handler';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {UserBetListScreen} from '../../../../screens/Betting/UserBetListScreen/UserBetListScreen';
import LotDetails from '../../../../screens/HomeScreens/LotDetails/LotDetails';
import {USER_BET_STACK_ROUTE, UserBetStackParamList} from './types';

const Stack = createNativeStackNavigator<UserBetStackParamList>();

const UserBetStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={USER_BET_STACK_ROUTE.USER_BET_LIST}
        component={UserBetListScreen}
      />
      <Stack.Screen
        name={USER_BET_STACK_ROUTE.USER_BET_LOT_DETAILS}
        component={LotDetails}
      />
    </Stack.Navigator>
  );
};

export default UserBetStack;
