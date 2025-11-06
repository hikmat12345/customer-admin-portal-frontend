import { Stack, Text } from 'native-base';
import type { ReactNode } from 'react';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import type { WorkflowDataType } from '../../../shared';
import { Colors, getCatalogApiCall, Strings, SuperNewEmployee } from '../../../shared';
import { moderateScale } from '../../theme';
import { NewEmployeeForm } from './Modal';
import styles from './NewEmployeeComponentStyles';
import type { NewEmployeeDataType } from './NewEmployeeComponentTypes';

class NewEmployeeComponent extends SuperNewEmployee<WorkflowDataType> {
  toggleModal = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  onSubmit = (values: NewEmployeeDataType) => {
    const { id, token, workflowId } = this.props;
    getCatalogApiCall({ targetBlock: id, data: { [id]: values } }, token, workflowId).then(() => {
      this.toggleModal();
    });
  };
  render(): ReactNode {
    const { title, render } = this.props;
    const { isOpen } = this.state;
    return (
      <Stack mt={2}>
        <Text fontWeight={600} color={Colors.black} fontSize={moderateScale(14)}>
          {title}
        </Text>
        <TouchableOpacity style={styles.buttonView} onPress={this.toggleModal}>
          <Text style={styles.submitText}>{Strings.createNewEmployee}</Text>
        </TouchableOpacity>
        <NewEmployeeForm
          render={render}
          isOpen={isOpen}
          title={title}
          onCancel={this.toggleModal}
          onSubmit={this.onSubmit}
        />
      </Stack>
    );
  }
}

export default NewEmployeeComponent;
