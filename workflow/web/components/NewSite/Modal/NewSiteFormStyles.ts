import { StyleSheet } from 'react-native';
import { Colors } from '../../../../shared';

export default StyleSheet.create({
  textStyle: {
    fontWeight: '700'
  },
  indicatorView: { alignItems: 'center', marginBottom: 10 },
  indicatorStyle: {
    borderRadius: 10,
    height: 5,
    backgroundColor: Colors.indicatorColor,
    width: 40,
    justifyContent: 'center'
  },
  modalContent: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end'
  },
  modalStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end'
  },
  bottomModal: { justifyContent: 'flex-end' },
  buttonView: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    height:  54,
    justifyContent: 'center',
    width: '48%'
  },
  cancelButtonView: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10
  },
  inputStyle: {
    color: Colors.black,
    fontSize: 14,
    backgroundColor: Colors.lightGray,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    height: 45
  },
  scrollViewStyle: { height: 90 }, // '90%' not working
  bottomModalStyle: {
    marginTop: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  footerStyle: { marginTop: 30 },
  modalContentView: { marginBottom: 10 }
});
