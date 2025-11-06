import type { ReactNode } from 'react';
import React from 'react';

import { SuperWorkflowLayout } from './shared';
import {
  Input,
  ServiceSuspendComponent,
  // ServiceSuspendComponent, 
} from './web';
import _ from 'lodash';
import { SearchServiceComponent } from './web/components/SearchService';
import { NewSiteComponent } from './web/components/NewSite';
import { SpacerComponent } from './web/components/Spacer';
import { LineComponent } from './web/components/Line';
import { TextComponent } from './web/components/Text';
import { NewEmployeeComponent } from './web/components/NewEmployee';
 import CatalogComponent from './web/components/Catalog/CatalogComponent';
import { USAddress } from './web/components/USAddress';
import { InputDate } from './web/components/InputDate';
 import { ServiceUpgradeInfo } from './web/components/ServiceUpgradeInfo';
import { CreditCard } from './web/components/CreditCard';
import { ServiceInfoComponent } from './web/components/ServiceInfo';
import { AdvanceText } from './web/components/AdvanceText';



class WorkflowLayout extends SuperWorkflowLayout {
  public renderComponent(type: string, props: any): ReactNode | null {
    switch (type) {
      case 'Text':
      return (<div className="my-2" >
        <TextComponent {...props} />
      </div>)
      case 'email':
      case 'InputBox':
      case 'Textarea':
      return (<div className="my-2" > <Input {...props} /></div>)
      case 'ServiceSuspend':
      return (<div className="my-2" > <ServiceSuspendComponent {...props} /></div>)
      case 'ServiceInfo':
      return (<div className="my-2" > <ServiceInfoComponent {...props} /></div>)
      case 'SearchService':
      return (<div className="my-2" > <SearchServiceComponent {...props} /></div>)
      // case 'SearchEmployee':
      // return (<div className="my-2" > <SearchEmployeeComponent {...props} /></div>)
      case 'NewEmployee':
      return (<div className="my-2" > <NewEmployeeComponent {...props} /></div>)
      case 'NewSite':
      return (<div className="my-2" > <NewSiteComponent {...props} /></div>)
      case 'USAddress':
      return (<div className="my-2" > <USAddress {...props} /></div>)
      case 'spacer':
      return (<div className="my-2" > <SpacerComponent {...props} /></div>)
      case 'Line':
      return (<div className="my-2" > <LineComponent {...props} /></div>)
      case 'AccessoryCatalog':
      return (<div className="my-2" > <CatalogComponent {...props} /></div>)
      case 'InputDate':
      return (<div className="my-2" > <InputDate {...props} /></div>)
      case 'AdvanceText':
      return (<div className="my-2" > <AdvanceText {...props} /></div>)
      case 'CreditCard':
      return (<div className="my-2" > <CreditCard {...props} /></div>)
      case 'ServiceUpgradeInfo':
      return (<div className="my-2" > <ServiceUpgradeInfo {...props} /></div>)
      // case 'Dropdown':
      // return (<div className="my-2" > <DropdownComponent {...props} /></div>)
      default:
      return null;
  }
  }

  render(): ReactNode {
    // eslint-disable-next-line react-native/no-inline-styles
    return <div style={{ overflowY: 'scroll' }}>{this.renderAllComponent()}</div>;
  }
}

export default WorkflowLayout;
