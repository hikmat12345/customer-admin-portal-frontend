import { StyleSheet } from 'react-native';

import { Colors } from '../../../shared';

export default StyleSheet.create({
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    height:  54
  },
  submitText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center'
  }
});
