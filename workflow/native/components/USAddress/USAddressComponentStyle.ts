import { StyleSheet } from 'react-native';

import { Colors } from '../../../shared';
import { scale } from '../../theme';

export default StyleSheet.create({
  inputStyle: {
    color: Colors.black,
    fontSize: scale(14),
    backgroundColor: Colors.lightGray,
    borderColor: Colors.lightGray,
    borderRadius: scale(8),
    height: scale(45)
  },
  searchInputStyle: {
    borderWidth: 1,
    borderColor: Colors.lightGray
  },
  inputContainerStyle: { backgroundColor: Colors.lightGray },
  autoCompleteMainView: { zIndex: 10000 }
});
