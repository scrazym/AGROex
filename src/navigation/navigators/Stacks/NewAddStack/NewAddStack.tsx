import 'react-native-gesture-handler';

import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useLayoutEffect} from 'react';

import {NewAd} from '../../../../screens/CreateNewLotScreen/NewAd';
import {PreviewScreen} from '../../../../screens/previewScreen/Preview';
import {DoneScreen} from '../../../../screens/SucsessScreen/Success';
import {
  NEW_ADD_ROUTE,
  NewAddStackNavigationProps,
  NewAddStackParamList,
} from './types';

const Stack = createStackNavigator<NewAddStackParamList>();

export function NewAddStack({
  navigation,
  route,
}: NewAddStackNavigationProps<keyof NewAddStackParamList>) {
  const tabHidden = ['NEW_AD', 'COMPLETE_SCREEN', 'PREVIEW'];

  useLayoutEffect(() => {
    const focusedRouteName = getFocusedRouteNameFromRoute(route);
    if (focusedRouteName && tabHidden.includes(focusedRouteName)) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
  }, [navigation, route]);
  // TODO add stack

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NEW_ADD_ROUTE.NEW_AD}
        component={NewAd}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NEW_ADD_ROUTE.COMPLETE_SCREEN}
        component={DoneScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NEW_ADD_ROUTE.PREVIEW}
        component={PreviewScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
