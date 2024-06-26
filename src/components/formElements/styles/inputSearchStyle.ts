import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

export const inputSearchStyle = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    height: 40,
    borderColor: Colors.GRAY_PRIMARY,
    borderRadius: 4,
    paddingLeft: 40,
    flex: 1,
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 18,
    color: Colors.GRAY_PRIMARY,
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
  indicator: {
    position: 'absolute',
    right: 10,
  },
  list: {
    position: 'absolute',
    top: '120%',
    width: '113%',
    zIndex: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: Colors.WHITE_PRIMARY,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.WHITE_MONO,
  },
  renderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.WHITE_MONO,
    marginTop: 5,
    paddingVertical: 7,
  },
  renderItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  imageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'fill',
  },
});
