import { StyleSheet } from 'react-native';

import { Colors } from '../../../shared';
import { moderateScale, scale, verticalScale } from '../../theme';

export default StyleSheet.create({
  valueText: {
    height: verticalScale(21)
  },
  upArrow: {
    transform: [{ rotate: '180deg' }]
  },
  container: {
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.borderGray,
    borderRadius: moderateScale(14),
    borderWidth: moderateScale(1),
    marginTop: verticalScale(14),
    overflow: 'hidden'
  },
  mainContainer: {
    backgroundColor: Colors.white,
    overflow: 'hidden',
    paddingVertical: verticalScale(10)
  },
  icon: {
    height: scale(7),
    resizeMode: 'contain',
    width: scale(7)
  },
  showCollapseStyle: {
    borderTopColor: Colors.borderGray,
    borderTopWidth: 1
  },
  imageStyle: {
    width: scale(142),
    height: scale(142),
    resizeMode: 'cover'
  },
  statusView: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5)
  }
});
