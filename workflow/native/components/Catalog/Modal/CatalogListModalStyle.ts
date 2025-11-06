import { StyleSheet } from 'react-native';

import { Colors } from '../../../../shared';
import { moderateScale, verticalScale } from '../../../theme';
import { isIOS } from '../../../utils';

export default StyleSheet.create({
  textStyle: {
    fontWeight: '700'
  },
  indicatorView: { alignItems: 'center', marginBottom: moderateScale(8) },
  indicatorStyle: {
    borderRadius: moderateScale(10),
    height: 5,
    backgroundColor: Colors.indicatorColor,
    width: moderateScale(40),
    justifyContent: 'center'
  },
  modalContent: { flex: 1 },
  modalStyle: {
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
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
  flatList: {
    marginTop: moderateScale(10),
    justifyContent: 'center',
    paddingBottom: moderateScale(10),
    height: isIOS ? 100 : 90 //'57%' : '56%' not working
  },
  columnWrapperStyle: { justifyContent: 'space-between' },
  ItemSeparatorComponentStyle: { backgroundColor: Colors.white, height: moderateScale(16) },
  contentContainerStyle: {
    backgroundColor: Colors.white
  },
  footerContainer: { paddingHorizontal: 18, backgroundColor: Colors.white },
  footerMainView: { width: 100 } //'100%' not working
});
