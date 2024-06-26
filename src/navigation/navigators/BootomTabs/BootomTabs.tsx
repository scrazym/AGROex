import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {
  faCircleUser,
  faGavel,
  faHouse,
  faSquarePlus,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect} from 'react';

import {Colors} from '../../../constants/Colors';
import UserBetStack from '../Stacks/BettingStack/BettingStack';
import HomeStack from '../Stacks/HomeStack/HomeStack';
import {NewAddStack} from '../Stacks/NewAddStack/NewAddStack';
import OrderStack from '../Stacks/OrderStack/OrderStack';
import UserStack from '../Stacks/UserStack/UserStack';

const Tab = createBottomTabNavigator();

const BootomTabs: FC = () => {
  const {authStatus} = useAuthenticator();
  const navigation = useNavigation();
  useEffect(() => {
    if (authStatus === 'authenticated') {
      navigation.navigate('Home');
    }
  }, [authStatus]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused}) => (
            <FontAwesomeIcon
              icon={faHouse}
              size={size}
              color={focused ? Colors.TURQUOISE_PRIMARY : Colors.BLACK_PRIMARY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Betting"
        component={UserBetStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused}) => (
            <FontAwesomeIcon
              icon={faGavel}
              size={size}
              color={focused ? Colors.TURQUOISE_PRIMARY : Colors.BLACK_PRIMARY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={NewAddStack}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused}) => (
            <FontAwesomeIcon
              icon={faSquarePlus}
              size={size}
              color={focused ? Colors.TURQUOISE_PRIMARY : Colors.BLACK_PRIMARY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused}) => (
            <FontAwesomeIcon
              icon={faTruck}
              size={size}
              color={focused ? Colors.TURQUOISE_PRIMARY : Colors.BLACK_PRIMARY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="USER"
        component={UserStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused}) => (
            <FontAwesomeIcon
              icon={faCircleUser}
              size={size}
              color={focused ? Colors.TURQUOISE_PRIMARY : Colors.BLACK_PRIMARY}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BootomTabs;
