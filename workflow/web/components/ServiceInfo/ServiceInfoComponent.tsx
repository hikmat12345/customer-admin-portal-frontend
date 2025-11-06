import React from 'react';
import RenderStatusAndTextComponent from './Components/RenderStatusAndTextComponent';
import RenderTextComponent from './Components/RenderTextComponent';
import { workFlowSubscribe } from 'workflow/web/service/workflow/workflow';
import { SuperServiceInfo, WorkflowDataType } from 'workflow/shared';
import VImage from 'workflow/web/ui/image';
class ServiceInfoComponent extends SuperServiceInfo<WorkflowDataType> {

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
      await this.refreshOn({ itemId: event.detail.id, value: event.detail.value });
    });
  }

  handleToggle = () => {
    const { showServiceDetail, serviceInfoData }: any = this.state;
    if (Object.keys(serviceInfoData).length > 0) {
      this.setState({ showServiceDetail: !showServiceDetail });
    }
  };

  render() {
    const { showServiceDetail, serviceInfoData: serviceInfoDataRes } = this.state;
    const serviceInfoData = serviceInfoDataRes[this.props.id] ?? {}
    const { title }: any = this.props;
    return (
      <div style={{ padding: '30px 50px' }} className="w-full  h-auto relative bg-white rounded-lg border border-slate-300 p-6">
        {title && <div className="text-[#222222] text-xl font-semibold  mb-4  ">{title}</div>
}
        <div className="flex justify-between mt-4">
          <div style={{ width: '70%' }}>
            <div className="row flex flex-wrap">
            {/* {Object.keys(serviceInfoData).length > 0 && showServiceDetail && ( */}
              <div className="w-5/12 flex-1"  style={{ width: '40%', minHeight: '148px', padding: '24px 5px 24px 24px', border: '1px solid #D6D6D6' }}>
               {/* <RenderTextComponent title="Service Status" value={serviceInfoData?.live} />  */}
               <RenderTextComponent title="Vendor" value={serviceInfoData?.vendor} isMargin={true} />

              </div>
              <div className="w-1/4  flex-1" style={{ width: '30%', minHeight: '148px', padding: '24px 5px 24px 24px', border: '1px solid #D6D6D6' }}>
                  {/* <RenderTextComponent title="Contract End Date" value={serviceInfoData?.contractEndDate} isMargin={true} />  */}
                  <RenderTextComponent title="Tariff and Plan" value={serviceInfoData?.tariff} />

              </div>
              <div className="w-1/4  flex-1" style={{ width: '30%', minHeight: '148px', padding: '24px 5px 24px 24px', border: '1px solid #D6D6D6' }}>
                  <RenderStatusAndTextComponent title="Service Status" value={serviceInfoData?.live} />
                   {/* title="Eligible for Upgrade" value={serviceInfoData?.upgradeEligible} isMargin={true} /> */}
              </div>
            </div>
           
            <div className='row flex flex-wrap'>
              <div className="w-1/2 flex-1" style={{ width: '40%', minHeight: '148px', padding: '24px 5px 24px 24px', border: '1px solid #D6D6D6' }}>
                <RenderTextComponent title="Device Manufacturer" value={serviceInfoData?.deviceManufacturer} />
              </div>
              <div className="w-1/2 flex-1" style={{ width: '30%', minHeight: '148px', padding: '24px 5px 24px 24px', border: '1px solid #D6D6D6' }}>
                <RenderTextComponent title="Device" value={serviceInfoData?.device} isMargin={true} />
              </div>
              <div className="w-1/2 flex-1" style={{ width: '30%', minHeight: '148px', padding: '24px 5px 24px 24px', border: '1px solid #D6D6D6' }}>
              <RenderTextComponent title="Serial Number/IMEI Number" value={serviceInfoData?.serialORIMEINumber} isMargin={true} />

                {/* <RenderTextComponent title="Vendor" value={serviceInfoData?.vendor} isMargin={true} /> */}
                </div>
           </div>
           <div className="row flex flex-wrap">
              <div className="w-1/2 flex-1" style={{ width: '40%', minHeight: '148px', padding: '24px 5px 24px 24px', border: '1px solid #D6D6D6' }}>
                <RenderTextComponent title="Employee" value={serviceInfoData?.employeeInfo?.firstName && serviceInfoData?.employeeInfo?.firstName+' '+serviceInfoData?.employeeInfo?.lastName && serviceInfoData?.employeeInfo?.lastName+ " - "+serviceInfoData?.employeeInfo?.email && serviceInfoData?.employeeInfo?.email} />
              </div>
              <div className="w-1/2 flex-1" style={{ width: '30%', minHeight: '148px', padding: '24px 5px 24px 24px', border: '1px solid #D6D6D6' }}>
                <RenderTextComponent title="Employee ID" value={serviceInfoData?.employeeInfo?.id} isMargin={true} />
              </div>
              <div className="w-1/2 flex-1" style={{ width: '30%', minHeight: '148px', padding: '24px 5px 24px 24px', border: '1px solid #D6D6D6' }}>
                 <RenderStatusAndTextComponent title="Employee Status" value={serviceInfoData?.employeeInfo?.live} /> 
              </div>
           </div>
           {/* done  */}
           <div className="row flex flex-wrap">
              <div className="w-1/2 flex-1" style={{ width: '40%', minHeight: '148px', padding: '24px 5px 24px 24px', border: '1px solid #D6D6D6' }}>
                <RenderTextComponent title="Approver" value={"-"} />
              </div>
              <div className="w-1/2 flex-1" style={{ width: '30%', minHeight: '148px', padding: '24px 5px 24px 24px', border: '1px solid #D6D6D6' }}>
                <RenderTextComponent title="Job Title" value={serviceInfoData?.employeeInfo?.jobTitle} isMargin={true} />
              </div>
              <div className="w-1/2 flex-1" style={{ width: '30%', minHeight: '148px', padding: '24px 5px 24px 24px', border: '1px solid #D6D6D6' }}>
                 <RenderTextComponent title="VIP" value={serviceInfoData?.employeeInfo?.vip ? "Yes" : "No"} />
              </div>
           </div>

          </div>
          <div style={{ width: '30%', border: '1px solid #D6D6D6', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '148px' }}>
             <VImage
                src={serviceInfoData?.image || ''} alt="Service" 
                width={211}
                height={276}
                className="m-auto block h-[12.375rem] w-[10.5rem] object-contain"
              />
          </div>
        </div>
        {/* <div style={{ color: '#1175be' }} className=" text-base font-normal  underline leading-[14px] pt-8 pb-8">View complete details of service</div> */}
        {/* <div className=" h-[0px] border border-[#d5d5d5] mb-2"></div> */}
        {/* <div className="text-[#222222] text-xl font-semibold  mt-12">Open Tickets</div>
        <div className="flex justify-between mt-8">
          <div className=" flex flex-wrap justify-between items-start gap-8 w-full" >
            <div className="">
              <div className="text-black text-base font-medium">Veroxos REF</div>
              <div className="text-[#1175be] text-base font-normal underline">SUP167371</div>
            </div>
            <div className="">
              <div className="text-black text-base font-medium">Request Type</div>
              <div className="text-black text-base font-normal">Service Upgrade</div>
            </div>
            <div className="">
              <div className="text-black text-base font-medium">Status</div>
              <div className="text-[#1d46f3] text-base font-normal">Open</div>
            </div>
            <div className="">
              <div className="text-black text-base font-medium">Updated</div>
              <div className="text-[#575757] text-lg font-normal">Mar 12, 2024 15:03 PM</div>
            </div>
            <div className="">
              <div className="text-black text-base font-medium">Priority</div>
              <div className="bg-[#219653] rounded-full p-2 flex justify-center items-center">
                <div className="text-white text-base">P3</div>
              </div>
            </div>
          </div>
        </div> */}
       </div>

    );
  }
}

export default ServiceInfoComponent;
