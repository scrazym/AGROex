import {StyleSheet} from 'react-native';

import {Colors} from '../../constants/Colors';

export const onboardingStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.WHITE_PRIMARY,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  wrapperItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 50,
    paddingTop: 100,
    paddingBottom: 150,
  },
  image: {
    width: 300,
    height: 270,
    objectFit: 'fill',
  },
  textWrapper: {
    alignItems: 'center',
    gap: 10,
  },
  text: {
    textAlign: 'center',
  },
  btnWrapper: {
    height: 50,
    position: 'absolute',
    bottom: '12%',
    right: '2%',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});
