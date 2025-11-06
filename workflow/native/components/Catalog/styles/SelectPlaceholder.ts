import { StyleSheet } from 'react-native';

import { Colors } from '../../../../shared';
import { moderateScale, scale, verticalScale } from '../../../theme';
import { isIOS } from '../../../utils';

export default StyleSheet.create({
  buttonView: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(10),
    height: verticalScale(isIOS ? 43 : 54),
    justifyContent: 'center',
    width: '48%'
  },

  selectPlaceholderView: {
    width: scale(145),
    height: scale(145),
    borderColor: Colors.silver,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: { height: scale(18), width: scale(18) }
});
