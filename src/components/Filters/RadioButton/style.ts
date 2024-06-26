import {StyleSheet} from 'react-native';

import {Colors} from '../../../constants/Colors';

export const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.TURQUOISE_PRIMARY,
    marginRight: 10,
  },
  radioButtonLabel: {
    fontSize: 16,
  },
});
