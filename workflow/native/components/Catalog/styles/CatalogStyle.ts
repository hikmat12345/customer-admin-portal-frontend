import { Platform, StyleSheet } from 'react-native';

import { Colors } from '../../../../shared';
import { moderateScale, scale, verticalScale } from '../../../theme';
import { isIOS } from '../../../utils';

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
  },
  columnWrapperStyle: { justifyContent: 'space-between' },
  ItemSeparatorComponentStyle: { backgroundColor: Colors.white, height: moderateScale(16) },
  contentContainerStyle: {
    backgroundColor: Colors.white
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
    width: scale(155),
    height: scale(150),
    borderRadius: moderateScale(8)
  },
  imageStyle: {
    width: scale(142),
    height: scale(142),
    resizeMode: 'contain'
  },
  checkboxView: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({ android: { paddingRight: moderateScale(10) } })
  },
  checkboxStyle: {
    width: moderateScale(20),
    height: moderateScale(20)
  },
  categoryTitleView: { flexDirection: 'row', flex: 1 },
  categoryTitleText: { flex: 0.3 },
  categoryMainView: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selectCategoryColor: {
    backgroundColor: Colors.gray
  },
  cancelButtonView: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: moderateScale(10)
  },
  buttonView: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(10),
    height: verticalScale(isIOS ? 43 : 54),
    justifyContent: 'center',
    width: '48%'
  },
  flatList: {
    justifyContent: 'center',
    height: isIOS ? '57%' : '54%'
  },
  selectPlaceholderView: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: moderateScale(10),
    backgroundColor: Colors.primaryBackground
  },
  textStyle: {
    fontWeight: '700'
  },
  cardMainView: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: moderateScale(16)
  },
  selectItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  scrollView: { flexDirection: 'row', flexWrap: 'wrap' },
  catalogContainer: {
    width: 100, //'50%', this is not working
    flexDirection: 'row'
  }
});
