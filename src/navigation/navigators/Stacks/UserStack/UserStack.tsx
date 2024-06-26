import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {AuthScreen} from '../../../../screens/Authorization/AuthorizationScreen';
import {UserCabinet} from '../../../../screens/PersonalAcc/AccScreen';
import ChangeCurrencyScreen from '../../../../screens/PersonalAcc/ChangeCurrencyScreen/ChangeCurrencyScreen';
import {ChangePasswordScreen} from '../../../../screens/PersonalAcc/ChangePasswordScreen/ChangePswScreen';
import {ManageLot} from '../../../../screens/PersonalAcc/ManageLotScreen/ManageLotScreen';
import {UserDataScreen} from '../../../../screens/PersonalAcc/User_data/UserData';
import {UserAdvertScreen} from '../../../../screens/PersonalAcc/UserAdvert/UserAdvertScreen';
import {UserLotDetails} from '../../../../screens/PersonalAcc/UserLotDetailsScreen/UserLotDetails';
import {PreviewScreen} from '../../../../screens/previewScreen/Preview';
import {DoneScreen} from '../../../../screens/SucsessScreen/Success';
import {
  USER_STACK_ROUTE,
  UserStackNavigationProps,
  UserStackParamList,
} from './types';

const Stack = createNativeStackNavigator<UserStackParamList>();

const UserStack = ({
  navigation,
}: UserStackNavigationProps<keyof UserStackParamList>) => {
  return (
    <Stack.Navigator
      initialRouteName={USER_STACK_ROUTE.USER_CABINET}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={USER_STACK_ROUTE.USER_CABINET}
        component={UserCabinet}
      />
      <Stack.Screen
        name={USER_STACK_ROUTE.USER_ADVERTISMENT}
        component={UserAdvertScreen}
      />
      <Stack.Screen
        name={USER_STACK_ROUTE.USER_LOT_DETAILS}
        component={UserLotDetails}
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

      <Stack.Screen
        name={USER_STACK_ROUTE.USER_DATA}
        component={UserDataScreen}
      />
      <Stack.Screen
        name={USER_STACK_ROUTE.USER_CHANGE_PASSWORD}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name={USER_STACK_ROUTE.USER_CHANGE_CURRENCY}
        component={ChangeCurrencyScreen}
      />
      <Stack.Screen name={USER_STACK_ROUTE.USER_ENTER} component={AuthScreen} />
    </Stack.Navigator>
  );
};

export default UserStack;
