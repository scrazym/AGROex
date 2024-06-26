import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';

export const filterStubStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.BLUE_SECONDARY,
    borderRadius: 10,
    backgroundColor: Colors.BLUE_EXTRA_LIGHT,
    maxWidth: '25%',
    marginLeft: 16,
    marginBottom: 5,
  },
  textWrapper: {width: '80%'},
});
