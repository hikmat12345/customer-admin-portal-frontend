import { StyleSheet } from 'react-native';

import { Colors } from '../../../shared';
import { scale } from '../../theme';

export default StyleSheet.create({
  textAreaStyle: {
    color: Colors.black,
    fontSize: scale(14),
    backgroundColor: Colors.lightGray,
    borderColor: Colors.lightGray,
    borderRadius: scale(8)
  }
});
