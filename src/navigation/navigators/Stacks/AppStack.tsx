import 'react-native-gesture-handler';

import {fetchAuthSession} from '@aws-amplify/core';
import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';

import {storage} from '../../../../App';
import {AuthScreen} from '../../../screens/Authorization/AuthorizationScreen';
import {AdminredirectScreen} from '../../../screens/HelpersScreen/AdminRedirectScreen';
import {OnboardingScreen} from '../../../screens/Onboarding/OnboardingScreen';
import BootomTabs from '../BootomTabs/BootomTabs';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  const {authStatus} = useAuthenticator(context => [context.user]);
  const [role, setRole] = useState('');
  const [enter, setEnter] = useState(true);
  const toggleEnter = () => {
    setEnter(!enter);
  };
  const currentSession = async () => {
    const {idToken} = (await fetchAuthSession()).tokens ?? {};
    setRole(idToken.payload['cognito:groups'][0]);
  };

  useEffect(() => {
    const isFirstEnter = storage.getString('firstEnter');
    // Need to show first run
    // storage.delete('firstEnter');
    isFirstEnter && setEnter(false);
    currentSession();
  });

  return enter ? (
    <OnboardingScreen setEnt={toggleEnter} />
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={
          authStatus === 'authenticated' && role === 'USER'
            ? BootomTabs
            : authStatus === 'authenticated' && role === 'ADMIN'
              ? AdminredirectScreen
              : AuthScreen
        }
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
