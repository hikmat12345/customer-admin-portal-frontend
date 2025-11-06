import { StyleSheet } from 'react-native';

import { Colors } from '../../../shared';
import { moderateScale, verticalScale } from '../../theme';
import { isIOS } from '../../utils';

export default StyleSheet.create({
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(10),
    height: verticalScale(isIOS ? 43 : 54)
  },
  submitText: {
    color: Colors.white,
    fontSize: moderateScale(15),
    fontWeight: '700',
    textAlign: 'center'
  }
});
