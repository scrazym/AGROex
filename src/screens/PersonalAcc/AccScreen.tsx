import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {
  faArrowRightToBracket,
  faChevronRight,
  faDollarSign,
  faSeedling,
  faUnlockKeyhole,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useFocusEffect} from '@react-navigation/native';
import {fetchUserAttributes} from 'aws-amplify/auth';
import React, {FC, useCallback, useState} from 'react';
import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';

import {AppText, Loading, UserIcon} from '../../components';
import {
  textColorStyles,
  textTypographyStyles,
} from '../../components/AppText/styles';
import {Colors} from '../../constants/Colors';
import {
  USER_STACK_ROUTE,
  UserCabinetScreenProps,
} from '../../navigation/navigators/Stacks/UserStack/types';
import api from '../../services/api';
import {currencyStorage} from './ChangeCurrencyScreen/ChangeCurrencyScreen';
import {userAccStyles} from './style';

export const UserCabinet: FC<UserCabinetScreenProps> = ({navigation}) => {
  const {signOut} = useAuthenticator(context => [context.user]);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userSecondName, setUserSecondName] = useState('');
  const [lot, setLots] = useState();
  const [currencyIcon, setCurrencyIcon] = useState(faDollarSign);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [userIcon, setUserIcon] = useState('');

  const {user} = useAuthenticator(context => [context.user]);
  const fetchLots = async (value: string) => {
    setIsLoading(true);
    const response = await api.getData(
      `users/${user.userId}/lots?currency=${value}`,
    );
    setLots(response.data.length);
    const res = await api.getData(`users/${user.userId}`);
    setUserIcon(res.data.avatarUrl);
    setIsLoading(false);
  };
  async function handleFetchUserAttributes() {
    try {
      const userAttributes = await fetchUserAttributes();
      setUserSecondName(userAttributes.family_name || '');
      setUserName(userAttributes.given_name || '');
      setIsLoading(true);
    } catch (error: unknown) {
      if (typeof error === 'string') {
        Alert.alert(error);
      } else if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
    setIsLoading(false);
  }
  const handleNavigateUserPasw = () => {
    navigation.navigate(USER_STACK_ROUTE.USER_CHANGE_PASSWORD);
  };
  useFocusEffect(
    useCallback(() => {
      const savedSelectedCurrencyIcon = currencyStorage.getString(
        'selectedCurrencyIcon',
      );
      if (savedSelectedCurrencyIcon) {
        setCurrencyIcon(JSON.parse(savedSelectedCurrencyIcon));
      }
      const savedSelectedCurrency =
        currencyStorage.getString('selectedCurrency');
      if (savedSelectedCurrency) {
        setSelectedCurrency(savedSelectedCurrency);
      }
      fetchLots(savedSelectedCurrency || 'USD');
      handleFetchUserAttributes();
    }, []),
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={userAccStyles.screenWrapper}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(USER_STACK_ROUTE.USER_DATA, {
            user: {name: userName, secondName: userSecondName},
          })
        }
        style={userAccStyles.userFieldWrapper}>
        <View style={userAccStyles.userField}>
          <View style={userAccStyles.userIconWrapper}>
            <UserIcon
              userIcon={userIcon}
              user={`${userName} ${userSecondName}`}
            />
          </View>
          <AppText variant="label20_500" style={textColorStyles['#131314']}>
            {`${userName} ${userSecondName}`}
          </AppText>
        </View>
        <FontAwesomeIcon icon={faChevronRight} />
      </TouchableOpacity>
      <ScrollView>
        <View style={userAccStyles.notificationsWrap}>
          <View style={userAccStyles.userFieldNotification}>
            <TouchableOpacity
              style={userAccStyles.notificationField}
              onPress={() =>
                navigation.navigate(USER_STACK_ROUTE.USER_ADVERTISMENT)
              }>
              <FontAwesomeIcon icon={faSeedling} style={userAccStyles.icons} />
              <AppText variant="label18_400">My advertisements</AppText>
            </TouchableOpacity>

            <AppText variant="label18_400" style={textColorStyles['#51ACAE']}>
              {lot}
            </AppText>
          </View>
        </View>
        <View style={userAccStyles.notificationsWrap}>
          <View style={userAccStyles.userFieldNotification}>
            <TouchableOpacity
              style={userAccStyles.notificationField}
              onPress={() =>
                navigation.navigate(USER_STACK_ROUTE.USER_CHANGE_CURRENCY)
              }>
              <FontAwesomeIcon
                icon={faDollarSign}
                style={userAccStyles.icons}
              />
              <AppText variant="label18_400">Currency</AppText>
            </TouchableOpacity>
            <AppText
              style={[
                textTypographyStyles.label18_400,
                textColorStyles[Colors.TURQUOISE_PRIMARY],
              ]}>
              {selectedCurrency},
              <View>
                <FontAwesomeIcon
                  icon={currencyIcon}
                  style={userAccStyles.currencyIcons}
                />
              </View>
            </AppText>
          </View>
        </View>
        <View style={userAccStyles.notificationsWrap}>
          <View style={userAccStyles.userFieldNotification}>
            <TouchableOpacity
              style={userAccStyles.notificationField}
              onPress={() => handleNavigateUserPasw()}>
              <FontAwesomeIcon
                icon={faUnlockKeyhole}
                style={userAccStyles.icons}
              />
              <AppText variant="label18_400">Change password</AppText>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={signOut} style={userAccStyles.logOut}>
          <FontAwesomeIcon
            icon={faArrowRightToBracket}
            style={userAccStyles.icons}
          />
          <AppText variant="label18_400">Log out</AppText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
