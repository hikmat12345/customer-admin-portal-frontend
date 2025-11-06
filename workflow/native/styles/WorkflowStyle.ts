import { StyleSheet } from 'react-native';

import { Colors } from '../../shared';
import { horizontalScale, moderateScale, verticalScale } from '../theme';
import { isIOS } from '../utils';

export default StyleSheet.create({
  scrollView: { paddingVertical: 20 },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10)
  },
  buttonContainerMargin: {
    marginLeft: horizontalScale(20)
  },
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
