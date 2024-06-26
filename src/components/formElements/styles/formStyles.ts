import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

export const FormStyles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  container: {
    flexShrink: 1,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 24,
    paddingBottom: 55,
    backgroundColor: Colors.WHITE_PRIMARY,
  },
  containerInput: {
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
  },
  containerInput30: {
    marginTop: 5,
    marginBottom: 5,
    flex: 0.5,
  },
  containerMTB16: {
    marginTop: 16,
    marginBottom: 16,
  },
  container3Row: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  containerMt24: {
    marginTop: 24,
  },
  separator: {
    alignSelf: 'center',
  },

  containerPreview: {
    flex: 1,
    backgroundColor: Colors.TURQUOISE_PRIMARY,
  },
  previewBtnWrap: {
    paddingHorizontal: 16,
    paddingTop: 1,
    paddingBottom: 24,
    backgroundColor: Colors.WHITE_PRIMARY,
  },
});
