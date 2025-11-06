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
    height: moderateScale(5),
    backgroundColor: Colors.indicatorColor,
    width: moderateScale(40),
    justifyContent: 'center'
  },
  modalContent: { flex: 1 },
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
  scrollViewStyle: { height: 80 }, // 80% not working
  bottomModalStyle: { flex: 1, marginTop: moderateScale(80) },
  footerStyle: { marginTop: moderateScale(20) }
});
