import React, {FC} from 'react';
import {Image, View} from 'react-native';
import {AppText} from '../../components/AppText/AppText';
import {Submit} from '../../components/formElements/components/Submit';
import {useNavigation} from '@react-navigation/native';
import {successStyles} from './sucsessStyle';
import {
  HOME_STACK_ROUTE,
  LotManageScreenProps,
} from '../../navigation/navigators/Stacks/HomeStack/types';
import {USER_STACK_ROUTE} from '../../navigation/navigators/Stacks/UserStack/types';

export const DoneScreen: FC<LotManageScreenProps> = ({navigation, route}) => {
  const {id} = route.params;

  const handleGoTest = () => {
    navigation.navigate('USER', {
      screen: USER_STACK_ROUTE.USER_LOT_DETAILS,
      params: {id: id},
      initial: false,
    });
  };
  return (
    <View style={successStyles.success}>
      <View>
        <Image
          style={successStyles.successIcon}
          source={require('../../assets/images/pic.png')}
        />
      </View>
      <View style={successStyles.successText}>
        <AppText variant="label20_500">Success!</AppText>
        <AppText variant="label16_400">Your ad has been published </AppText>
      </View>
      <Submit text="Okay" isDisable={false} onPress={handleGoTest} />
    </View>
  );
};
