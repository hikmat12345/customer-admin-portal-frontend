import { StyleSheet } from 'react-native';

import { Colors } from '../../../../shared';
import { moderateScale, scale, verticalScale } from '../../../theme';
import { isIOS } from '../../../utils';

export default StyleSheet.create({
  textStyle: {
    fontWeight: '700'
  },
  indicatorView: { alignItems: 'center', marginBottom: moderateScale(10) },
  indicatorStyle: {
    borderRadius: moderateScale(10),
    height: 5,
    backgroundColor: Colors.indicatorColor,
    width: moderateScale(40),
    justifyContent: 'center'
  },
  modalContent: {
    flex: 1,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    justifyContent: 'flex-end'
  },
  modalStyle: {
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    justifyContent: 'flex-end'
  },
  bottomModal: { justifyContent: 'flex-end' },
  buttonView: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(10),
    height: verticalScale(isIOS ? 43 : 54),
    justifyContent: 'center',
    width: '48%'
  },
  cancelButtonView: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: moderateScale(10)
  },
  inputStyle: {
    color: Colors.black,
    fontSize: scale(14),
    backgroundColor: Colors.lightGray,
    borderColor: Colors.lightGray,
    borderRadius: scale(8),
    height: scale(45)
  },
  scrollViewStyle: { height: 90 }, // '90%' not working
  bottomModalStyle: {
    marginTop: moderateScale(80),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20)
  },
  footerStyle: { marginTop: moderateScale(30) },
  modalContentView: { marginBottom: moderateScale(10) }
});
