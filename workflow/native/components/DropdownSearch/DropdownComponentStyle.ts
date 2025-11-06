import { StyleSheet } from 'react-native';

import { Colors } from '../../../shared';
import { moderateScale, scale } from '../../theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: scale(16)
  },
  containerStyle: {
    backgroundColor: Colors.white,
    paddingBottom: scale(7),
    borderColor: Colors.white
  },
  dropdown: {
    width: '100%',
    borderColor: Colors.lightGray,
    borderWidth: 0.5,
    height: scale(50),
    paddingHorizontal: scale(8),
    backgroundColor: Colors.lightGray,
    paddingBottom: scale(5)
  },
  focusStyle: {
    borderTopRightRadius: scale(8),
    borderTopLeftRadius: scale(8)
  },
  icon: {
    marginRight: scale(5)
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
  inputTextStyle: {
    borderRadius: scale(8)
  },
  placeholderStyle: {
    fontSize: moderateScale(15)
  },
  selectedTextStyle: {
    fontSize: moderateScale(15)
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(14),
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    marginTop: moderateScale(8),
    marginRight: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  textSelectedStyle: {
    marginRight: moderateScale(5),
    fontSize: moderateScale(16)
  }
});
