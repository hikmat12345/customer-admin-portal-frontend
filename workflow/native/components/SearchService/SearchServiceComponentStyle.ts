import { StyleSheet } from 'react-native';

import { Colors } from '../../../shared';
import { moderateScale, scale, windowWidth } from '../../theme';

export default StyleSheet.create({
  container: { flexGrow: 1, flexShrink: 1, zIndex: 10000 },
  dropdown: {
    width: windowWidth / 2 - moderateScale(50),
    borderColor: Colors.lightGray,
    borderWidth: 0.5,
    height: scale(50),
    paddingHorizontal: scale(8),
    backgroundColor: Colors.lightGray,
    paddingBottom: scale(5)
  },
  inputContainerStyle: { backgroundColor: Colors.lightGray },
  placeholderStyle: {
    fontSize: moderateScale(15)
  },
  selectedTextStyle: {
    fontSize: moderateScale(15)
  },
  iconStyle: {
    height: scale(20),
    width: scale(20)
  },
  inputSearchStyle: {
    borderRadius: scale(6),
    fontSize: moderateScale(14),
    height: scale(40)
  },
  containerStyle: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
    paddingBottom: scale(7),
    borderColor: Colors.white
  },
  focusStyle: {
    borderTopRightRadius: scale(8),
    borderTopLeftRadius: scale(8)
  },
  inputTextStyle: {
    borderRadius: scale(8)
  },
  closeIconStyle: { height: moderateScale(10), width: moderateScale(10) },
  searchSiteContainer: { width: windowWidth / 2 },
  searchSiteText: { padding: moderateScale(10) }
});
