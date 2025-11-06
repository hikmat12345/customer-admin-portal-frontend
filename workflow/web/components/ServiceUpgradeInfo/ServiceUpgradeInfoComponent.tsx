import type { ReactNode } from 'react';
import { SuperServiceInfo, WorkflowDataType } from '../../../shared';
import React from 'react';
import { workFlowSubscribe } from '../../service/workflow/workflow';

class ServiceUpgradeInfoComponent extends SuperServiceInfo<WorkflowDataType> {


    constructor(props: any) {
        super(props);
        this.state = {
            showServiceDetail: false,
            serviceInfoData: {},
        };
    }
    componentDidMount(): void {
        workFlowSubscribe(async (event: any) => {
          
          if (!event.detail.id ||
            !event.detail.value) {
            return;
          }

        this.refreshOn({ itemId: event.detail.id, value: event.detail.value });
        }); 

    }
    render(): ReactNode {
        const { title }: any = this.props;
        const { upgradeDate, upgradeDateMessage }: any = this.state.serviceInfoData[this.props.id] ?? {};
        console.log(this.state, upgradeDateMessage, 'serviceInfoData');
        return (
            <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                 {title && <p className="text-14 font-700 mb-2"
          style={{ fontSize: '18px', fontWeight: '700', marginBottom: '2px' }}>{title} </p>}
                 
                <div>
                 Upgrade Status: {
                    upgradeDateMessage && (upgradeDateMessage === "Unknown" ?
                        <div> {upgradeDateMessage} </div> :
                        upgradeDateMessage ?
                            <span> 
                                You are eligible for a device upgrade 
                            </span>
                            : <span>
                                 You are not currently eligible for an upgrade 
                            </span>)
                 } </div>
                {upgradeDate && <p>Date Eligible for Upgrade: {upgradeDate}</p>}
            </div>
        ); 
    }
}

export default ServiceUpgradeInfoComponent;
