import { StyleSheet } from 'react-native';

import { Colors } from '../../../../shared';
import { moderateScale, scale } from '../../../theme';

export default StyleSheet.create({
  mainView: {
    borderColor: Colors.borderGray,
    borderRadius: moderateScale(18),
    borderWidth: moderateScale(1),
    height: scale(200),
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyDataImage: {
    width: scale(55),
    height: scale(60),
    resizeMode: 'cover'
  }
});
