import _ from 'lodash';
import type { ReactNode } from 'react';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import {
  CatalogComponent,
  DateTimeComponent,
  DropdownSearch,
  HtmlComponent,
  InputComponent,
  LineComponent,
  NewEmployeeComponent,
  NewSiteComponent,
  ParagraphComponent,
  SearchServiceComponent,
  ServiceInfoComponent,
  SpacerComponent,
  TextAreaComponent,
  USAddress,
  workflowStyle
} from './native';
import { ComponentType, Strings, SuperWorkflowLayout } from './shared';

class WorkflowLayout extends SuperWorkflowLayout {
  public renderComponent(parentType: string, props: any): ReactNode | null {
    switch (_.toLower(parentType)) {
      case ComponentType.inputDate:
        return <DateTimeComponent mode="date" {...props} />;
      case ComponentType.timeInput:
        return <DateTimeComponent mode="time" {...props} />;
      case ComponentType.text:
        return <ParagraphComponent {...props} />;
      case ComponentType.email:
      case ComponentType.inputBox:
        return <InputComponent {...props} />;
      case ComponentType.dropdown:
      case ComponentType.dynamicDropdown:
        return <DropdownSearch {...props} />;
      case ComponentType.catalog:
        return <CatalogComponent {...props} />;
      case ComponentType.spacer:
        return <SpacerComponent {...props} />;
      case ComponentType.USAddress:
        return <USAddress {...props} />;
      case ComponentType.textArea:
        return <TextAreaComponent {...props} />;
      case ComponentType.line:
        return <LineComponent {...props} />;
      case ComponentType.serviceInfo:
        return <ServiceInfoComponent {...props} />;
      case ComponentType.html:
        return <HtmlComponent {...props} />;
      case ComponentType.searchService:
        return <SearchServiceComponent {...props} />;
      case ComponentType.newSite:
        return <NewSiteComponent {...props} />;
      case ComponentType.newEmployee:
        return <NewEmployeeComponent {...props} />;
      default:
        return null;
    }
  }

  render(): ReactNode {
    const { groupKeys, groupIndex } = this.state;
    const isGroupFirstItem: boolean = groupIndex === 0;
    const isGroupLastItem: boolean = groupIndex === groupKeys.length - 1;

    return (
      <>
        {this.renderAllComponent()}
        {groupIndex !== -1 && (
          <View style={workflowStyle.buttonContainer}>
            {!isGroupFirstItem && (
              <TouchableOpacity style={workflowStyle.buttonView} onPress={this.handlePrevious}>
                <Text style={workflowStyle.submitText}>{Strings.previous}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[workflowStyle.buttonView, !isGroupFirstItem && workflowStyle.buttonContainerMargin]}
              onPress={this.handleNext}
            >
              <Text style={workflowStyle.submitText}>{isGroupLastItem ? Strings.submit : Strings.next}</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }
}

export default WorkflowLayout;
