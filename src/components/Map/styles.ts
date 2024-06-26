import {StyleSheet} from 'react-native';

import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    height: 221,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 25,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 1,
    width: 24,
    height: 49,
    marginHorizontal: 360,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  zoomButton: {
    marginLeft: 7,
    marginTop: 4,
  },
  btnZoomIn: {
    color: Colors.BLACK_PRIMARY,
    marginTop: 5,
    marginBottom: 6,
    paddingLeft: 4,
  },
  btnZoomOut: {
    color: Colors.BLACK_PRIMARY,
  },
  textBlock: {
    marginLeft: 19,
    flexDirection: 'row',
  },
  icon: {
    color: Colors.GRAY_PRIMARY,
    marginRight: 6,
  },
});
