import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {FC, useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';

import {Colors} from '../../../constants/Colors';
import {UserDataStyles} from '../../../screens/PersonalAcc/User_data/styles';
import {AppText, ErrorText} from '../..';
import {TextInputStyle} from '../styles/InputTextStyle';
import {PswInputProps} from '../types/types';

export const PswInput: FC<PswInputProps> = ({
  onChangeText,
  label,
  value,
  error,
}) => {
  const [pswVisible, setPswVisible] = useState(false);
  const togglePswVisible = () => {
    setPswVisible(!pswVisible);
  };
  return (
    <View>
      <View>
        <TextInput
          value={value}
          autoCapitalize="none"
          secureTextEntry={!pswVisible}
          onChangeText={e => onChangeText(e)}
          style={UserDataStyles.input}
        />

        <TouchableOpacity
          onPress={togglePswVisible}
          style={TextInputStyle.pswInputIcon}>
          {pswVisible ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </TouchableOpacity>

        <AppText
          variant="label12_400"
          color={Colors.GRAY_PRIMARY}
          style={UserDataStyles.label}>
          {label}
        </AppText>
      </View>
      {error && <ErrorText error={error} />}
    </View>
  );
};
