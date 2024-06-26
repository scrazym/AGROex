import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppStack} from './src/navigation';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import SplashScreen from 'react-native-splash-screen';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Authenticator} from '@aws-amplify/ui-react-native';
import {useNavigationContainerRef} from '@react-navigation/native';
import {useFlipper} from '@react-navigation/devtools';
import {MMKV} from 'react-native-mmkv';

AppRegistry.registerComponent(appName, () => App);
import notifee, {AuthorizationStatus} from '@notifee/react-native';

export const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: 'hunter2',
});

AppRegistry.registerComponent(appName, () => App);

function App(): React.JSX.Element {
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);
  const isDarkMode = useColorScheme() === 'dark';
  async function requestUserPermission() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
    } else {
      console.log('User declined permissions');
    }
  }
  useEffect(() => {
    SplashScreen.hide();
    requestUserPermission();
  }, []);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };
  return (
    <Authenticator.Provider>
      <NavigationContainer ref={navigationRef}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
          </SafeAreaView>
          {<AppStack />}
        </GestureHandlerRootView>
      </NavigationContainer>
    </Authenticator.Provider>
  );
}

export default App;
