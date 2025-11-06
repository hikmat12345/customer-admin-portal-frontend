import { StyleSheet } from 'react-native';

import { Colors } from '../../../shared';
import { scale } from '../../theme';

export default StyleSheet.create({
  viewStyle: {
    borderColor: Colors.gray,
    borderWidth: 1,
    marginVertical: scale(10)
  }
});
