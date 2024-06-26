import {FC} from 'react';
import {View} from 'react-native';

import {Colors} from '../../../constants/Colors';
import {AppText} from '../..';

type ErrorTextProps = {
  error: string | number;
};
export const ErrorText: FC<ErrorTextProps> = ({error}) => {
  return (
    <View>
      <AppText variant="label16_400" color={Colors.RED_ERROR_SECONDARY}>
        {error}
      </AppText>
    </View>
  );
};
