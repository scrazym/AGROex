import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

export const PreviewStyles = StyleSheet.create({
  containerPreview: {
    flex: 1,
    backgroundColor: Colors.WHITE_PRIMARY,
  },
  previewBtnWrap: {
    height: '10%',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
    backgroundColor: Colors.WHITE_PRIMARY,
  },
  scrollView: {
    flexGrow: 1,
  },
});
