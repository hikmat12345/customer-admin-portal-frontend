import { StyleSheet } from 'react-native';

import { Colors } from '../../shared';
import { moderateScale, scale } from '../theme';

export default StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
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
  }
});
