import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {Colors} from '../../constants/Colors';
import {loadingStyles} from './style';

export const Loading = () => {
  return (
    <View style={loadingStyles.container}>
      <ActivityIndicator size="large" color={Colors.GREEN_PRIMARY} />
      <Text style={loadingStyles.text}>Loading...</Text>
    </View>
  );
};
