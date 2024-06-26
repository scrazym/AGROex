import React, {FC, useState} from 'react';
import {ScrollView, View} from 'react-native';

import {
  AppText,
  ButtonStyled,
  HeaderBack,
  Loading,
  PswInput,
} from '../../../components';
import {passwordRules} from '../../../constants/regex';
import {handleUpdatePassword} from '../../../helpers';
import {UserPassScreenProps} from '../../../navigation/navigators/Stacks/UserStack/types';
import {UserDataStyles} from '../User_data/styles';

export const ChangePasswordScreen: FC<UserPassScreenProps> = ({navigation}) => {
  const [oldPsw, setOlldPsw] = useState('');
  const [newPsw, setNewPsw] = useState('');
  const [confPsw, setConfPsw] = useState('');
  const [error, setError] = useState('');
  const [isChages, setIsChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChangePsw = (type: string, value: string) => {
    switch (type) {
      case 'old':
        return setOlldPsw(value), setIsChange(true);
      case 'new':
        return setNewPsw(value);
      case 'confirm':
        return setConfPsw(value);
    }
  };
  const handleValidate = async () => {
    if (newPsw !== confPsw) {
      setError('Must match');
    } else if (newPsw.match(passwordRules) || confPsw.match(passwordRules)) {
      setError('Must be at least 1 UpperCase, 1 special character, 1 number');
    } else {
      setError('');
      setIsLoading(true);
      const result = await handleUpdatePassword({
        oldPassword: oldPsw,
        newPassword: newPsw,
      });
      setNewPsw('');
      setConfPsw('');
      setOlldPsw('');
      setIsLoading(false);
      navigation.goBack();
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={UserDataStyles.mainWrapper}>
      <HeaderBack text="Change password" onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={UserDataStyles.passwordWrapper}>
          <PswInput
            label="Current password"
            onChangeText={e => handleChangePsw('old', e)}
            value={oldPsw}
          />
          <AppText> Enter your new password</AppText>
          <PswInput
            label="New password"
            onChangeText={e => handleChangePsw('new', e)}
            value={newPsw}
          />
          <PswInput
            error={error}
            label="Confirm password"
            onChangeText={e => handleChangePsw('confirm', e)}
            value={confPsw}
          />
          <View style={{marginTop: 50}}>
            <ButtonStyled
              disabled={!isChages}
              title="Change password"
              onPress={() => handleValidate()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
