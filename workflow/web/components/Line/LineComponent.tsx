import React from 'react';
import { SuperLine, WorkflowDataType } from '../../../shared';

class LineComponent extends SuperLine<WorkflowDataType> {
  render() {
    const {
      render: { marginTop = 0, marginBelow = 0, width = 1, color = '#ccc', type }
    } = this.props;

    const style = {
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBelow}px`,
      borderWidth: `${width}px`,
      borderColor: color,
      borderStyle: type,
    };

    return (
      <div style={style}/>
    );
  }
}

export default LineComponent;
