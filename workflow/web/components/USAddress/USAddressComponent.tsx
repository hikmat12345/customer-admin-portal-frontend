// import { Strings, SuperUSAddress, WorkflowDataType, addUsAddressFormSchema, fetchLocation } from '../../../shared';
// import React, { ReactNode } from 'react';
// import { USAddressInput, USAdressDropDown, USAddressAutoComplete } from "./Components";
// import Icons from "../common/icons";
// import DialogComponent from '../common/dialog';
// import { Form, Formik } from 'formik';
// import { ButtonComponent } from '../common/button';


// class USAddressComponent extends SuperUSAddress<WorkflowDataType> {
//   controllerRef: any;
//   constructor(props: WorkflowDataType) {
//     super(props);
//     this.controllerRef = React.createRef();

//   }
//   toggleModal = () => {
//     const { isOpen }: any = this.state;
//     this.setState({ isOpen: !isOpen });
//   };
//   handleChangeText(value: string, key: string): void {
//     this.setState((prevState) => ({
//       ...prevState,
//       [key]: value
//     }));
//   }

//   onClearUsAddress = () => {
//     this.setState({ streetLine1: '', streetLine2: '', city: '', zip: '', state: '' });
//   };

//   onChangeItem = (item: any) => {
//     this.setState({
//       streetLine1: item.streetLine1,
//       streetLine2: item.streetLine2,
//       city: item.city,
//       zip: item.zip,
//       state: item.state,
//     });
//   };
//   // it is just example 
//   // onChangeStreetLine1 = async (value: string) => {
//   //   const { id, workflowId, token } = this.props;
//   //   if (value.length > 3) {
//   //     this.setState({ loading: true });
//   //     if (this.controllerRef.current) {
//   //       this.setState({ loading: false });
//   //       this.controllerRef.current.abort();
//   //     }
//   //     this.controllerRef.current = new AbortController();


//   // fetchLocation(
//   //   token,
//   //   'POST',
//   //   { targetBlock: id, data: { [id]: value } },
//   //   workflowId,
//   //   this.controllerRef.current?.signal
//   // ).then((response: any) => {
//   //   let streetLine1Data: Array<USAddressItemType> = [];
//   //   if (response?.data?.suggestions) {
//   //     streetLine1Data = response?.data?.suggestions?.map((item: Record<string, string>, index: number) => {
//   //       return { ...item, id: index.toString() };
//   //     });
//   //   }
//   //   this.setState(
//   //     {
//   //       streetLine1Data: streetLine1Data ?? [],
//   //       value,
//   //       loading: false
//   //     },
//   //     () => this.forceUpdate()
//   //   );
//   //   this.controllerRef.current = null;
//   // });
//   //   } else {
//   //     this.setState({ value, streetLine1Data: [] });
//   //   }
//   // };

//   onChangeStreetLine1 = async (value: string) => {
//     const { id, workflowId, token } = this.props;
//     if (value.length > 3) {
//       this.setState({ loading: true });
//       if (this.controllerRef.current) {
//         this.setState({ loading: false });
//         this.controllerRef.current.abort();
//       }
//       this.controllerRef.current = new AbortController();

//       fetchLocation(
//         token,
//         'POST',
//         { targetBlock: id, data: { query: value } },
//         workflowId,
//         this.controllerRef.current?.signal
//       ).then((response: any) => {
//         let streetLine1Data: Array<any> = [];
//         if (response?.data[id]?.length) {
//           streetLine1Data = response?.data[id]?.map((item: any, index: number) => {
//             return { ...item, id: index.toString() };
//           });
//         }
//         this.setState(
//           {
//             streetLine1Data: streetLine1Data ?? [],
//             value,
//             loading: false
//           },
//           () => this.forceUpdate()
//         );
//         this.controllerRef.current = null;
//       });
//     } else {
//       this.setState({ value, streetLine1Data: [] });
//     }
//   };
 

//   render(): ReactNode {

//     const { render, title, mandatory } = this.props;
//     const {
//       city,
//       zip,
//       state,
//       stateError,
//       streetLine1,
//       streetLine2,
//       streetLine1Data,
//       isOpen
//     } = this.state;

//     const onFormSubmit = (values: any) => {
//       console.log('values234', values);
//       this.toggleModal(); 
//     }
//     return (
//       <div className='w-[100%]'>
//         <div className='flex justify-between w-[100%]'>
//           <h6 className='text-[1.125rem] font-[600] leading-[2.5rem] text-[##222222]'>
//             {title}
//           </h6>
          
//           <button className='font-[400] text-[0.875rem] leading-[1.085rem] text-[#575757]' onClick={this.toggleModal}>
//             <div className='flex items-center gap-1'>
//               <Icons.plusIcon className="h-5 w-5 text-[#1D46F3]" /> <p>{Strings.useAddress}</p>
//             </div>
//           </button>
//         </div>
//         {isOpen && (
//           <DialogComponent
//             open={isOpen}
//             content={
//               <div className='p-4 m-2'>
//                 <Formik
//                  validationSchema={addUsAddressFormSchema}
//                  initialValues={{}}
//                  onSubmit={(value: any)=>console.log('value333', value)}
//                 > 
//                 <Form>
//                   <div className=' gap-4' style={{ overflowY: 'auto', maxHeight: '60vh' }}> 
//                     <div style={{  marginTop: "5px", width: '100%', }} >
//                       <USAddressAutoComplete
//                         label={"Street Line 1"}
//                         listAddress={streetLine1Data}
//                         value={streetLine1}
//                         onChangeText={(data: any) => this.onChangeStreetLine1(data)}
//                         onSelectItem={(item: any) => this.onChangeItem(item)}
//                         onClear={this.onClearUsAddress}
//                         loading={false}
//                         debounce={1000}
//                         initialValue={streetLine1}
//                         suggestionsListMaxHeight={150}
//                         useFilter={false}
//                         textInputProps={{
//                           autoCorrect: false,
//                           autoCapitalize: 'none'
//                         }}
//                         ClearIconComponent={null}
//                         clearOnFocus={false}
//                         inputContainerStyle={{}}
//                         renderItem={(item: any) => <p>{item.value}</p>}
//                         inputHeight={50}
//                         showChevron={false}
//                         closeOnBlur={false}
//                         style={{  color: '#000', borderRadius: '4px', padding: '8px' }}
//                       />

//                       <USAddressInput
//                         label={"Street Line 2"}
//                         isMandatory={false}
//                         placeholder='Enter Street Line 2'
//                         value={streetLine2}
//                         style={{ color: '#000', borderRadius: '4px', padding: '8px' }}
//                         onChange={(event: any) => this.handleChangeText(event.target.value, 'streetLine2')}
//                       />
                    
//                       <USAddressInput
//                         label={"City"}
//                         placeholder='Enter City'
//                         isMandatory={mandatory}
//                         value={city}
//                         // style={{ width: '49%', color: '#000', borderRadius: '4px', padding: '8px' }}
//                         onChange={(event: any) => this.handleChangeText(event.target.value, 'city')}
//                       />
//                       <USAddressInput
//                         label={"ZIP"}
//                         placeholder='Enter ZIP'
//                         isMandatory={mandatory}
//                         value={zip}
//                         type="number"
//                         // style={{ width: '49%', color: '#000', borderRadius: '4px', padding: '8px' }}
//                         onChange={(event: any) => this.handleChangeText(event.target.value, 'zip')}
//                       />
                   
//                       <USAdressDropDown
//                         label={"State"}
//                         isMandatory={mandatory}
//                         value={state}
//                         onChange={(value: any) => this.handleChangeText(value, 'state')}
//                         // style={{ width: '50%', color: '#000', borderRadius: '4px', padding: '8px' }}
//                         render={render as any}
//                       />
//                     </div>
//                     {stateError !== '' && <p className="text-error">{stateError}</p>}
//                     <div className='w-[100%] flex flex-row justify-center pt-4 mt-4'>
//                     <ButtonComponent className='w-[9.375rem]' variant={'primary'} type='submit'>
//                             {Strings.submit}
//                     </ButtonComponent>
//                   </div>
//                   </div>
//                  </Form>   
//                 </Formik>
//               </div>
//             }
//             title={Strings.useAddress}
//             onClose={this.toggleModal}
//           />
//         )}
//       </div>
 
//     );
//   }
// }

//         export default USAddressComponent;





import { Strings, SuperUSAddress, WorkflowDataType, addUsAddressFormSchema, fetchLocation } from '../../../shared';
import React, { ReactNode } from 'react';
import { USAddressInput, USAdressDropDown, USAddressAutoComplete } from "./Components";
import Icons from "../common/icons";
import DialogComponent from '../common/dialog';
import { Form, Formik } from 'formik';
import { ButtonComponent } from '../common/button';

class USAddressComponent extends SuperUSAddress<WorkflowDataType> {
  controllerRef: any;

  constructor(props: WorkflowDataType) {
    super(props);
    this.controllerRef = React.createRef();
  }

  toggleModal = () => {
    const { isOpen }: any = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleChangeText(value: string, key: string): void {
    this.setState((prevState) => ({
      ...prevState,
      [key]: value
    }));
  }

  onClearUsAddress = () => {
    this.setState({ streetLine1: '', streetLine2: '', city: '', zip: '', state: '' });
  };

  onChangeItem = (item: any) => {
    this.setState({
      streetLine1: item.streetLine1,
      streetLine2: item.streetLine2,
      city: item.city,
      zip: item.zip,
      state: item.state,
    });
  };

  onChangeStreetLine1 = async (value: string) => {
    const { id, workflowId, token } = this.props;
    if (value.length > 3) {
      this.setState({ loading: true });
      if (this.controllerRef.current) {
        this.setState({ loading: false });
        this.controllerRef.current.abort();
      }
      this.controllerRef.current = new AbortController();

      fetchLocation(
        token,
        'POST',
        { targetBlock: id, data: { query: value } },
        workflowId,
        this.controllerRef.current?.signal
      ).then((response: any) => {
        let streetLine1Data: Array<any> = [];
        if (response?.data[id]?.length) {
          streetLine1Data = response?.data[id]?.map((item: any, index: number) => ({
            ...item,
            id: index.toString()
          }));
        }
        this.setState({
          streetLine1Data: streetLine1Data ?? [],
          value,
          loading: false
        });
        this.controllerRef.current = null;
      });
    } else {
      this.setState({ value, streetLine1Data: [] });
    }
  };

  render(): ReactNode {
    const { render, title, mandatory, id } = this.props;
    const {
      city,
      zip,
      state,
      stateError,
      streetLine1,
      streetLine2,
      streetLine1Data,
      isOpen
    } = this.state;

    const onFormSubmit = ( ) => {
       const { streetLine1, streetLine2, city, zip, state } = this.state;
      const value = `${streetLine1}^${streetLine2}^${city}^${zip}^${state}`;
      const displayValue = `${streetLine1}, ${streetLine2}, ${city}, ${zip}, ${state}`;
      sessionStorage.setItem(id, JSON.stringify({title, value, displayValue}));
      this.toggleModal();
    };

    return (
      <div className='w-[100%] mt-5'>
        <div className='flex gap-5 w-[100%]'>
          <h6 className='text-[1.125rem] font-[600] leading-[2.5rem] text-[#222222]'>
            {title}
          </h6>
          <button className='font-[400] flex pt-1 text-[0.875rem] leading-[1.085rem] text-[#575757]  pl-8 pr-6 h-11 p-2.5  gap-2.5  '
             onClick={this.toggleModal}>
            <div className='flex items-center gap-1'>
              <Icons.plusIcon className="h-5 w-5 text-[#1D46F3]" /> <p>{Strings.useAddress}</p>
            </div>
          </button>
        </div>
        {isOpen && (
          <DialogComponent
            open={isOpen}
            content={
              <div className='p-4 m-2'>
                <Formik
                  validationSchema={addUsAddressFormSchema}
                  initialValues={{
                    streetLine1: streetLine1 || '',
                    streetLine2: streetLine2 || '',
                    city: city || '',
                    zip: zip || '',
                    state: state || ''
                  }}
                  onSubmit={onFormSubmit}> 
                  <Form>
                    <div className='gap-4' style={{ overflowY: 'auto', maxHeight: '60vh' }}>
                      <USAddressAutoComplete
                        label={"Street Line 1"}
                        listAddress={streetLine1Data}
                        value={streetLine1}
                        onChangeText={(data: any) => this.onChangeStreetLine1(data)}
                        onSelectItem={this.onChangeItem}
                        onClear={this.onClearUsAddress}
                        loading={false}
                        debounce={1000}
                        initialValue={streetLine1}
                        suggestionsListMaxHeight={150}
                        useFilter={false}
                        textInputProps={{
                          autoCorrect: false,
                          autoCapitalize: 'none'
                        }}
                        ClearIconComponent={null}
                        clearOnFocus={false}
                        inputHeight={50}
                        showChevron={false}
                        closeOnBlur={false}
                        style={{ color: '#000', borderRadius: '4px', padding: '6px' }}
                      />
                      <USAddressInput
                        label={"Street Line 2"}
                        isMandatory={false}
                        placeholder='Enter Street Line 2'
                        value={streetLine2}
                        style={{ color: '#000', borderRadius: '4px', padding: '8px' }}
                        onChange={(event: any) => this.handleChangeText(event.target.value, 'streetLine2')}
                      />
                      <USAddressInput
                        label={"City"}
                        placeholder='Enter City'
                        isMandatory={mandatory}
                        value={city}
                        onChange={(event: any) => this.handleChangeText(event.target.value, 'city')}
                      />
                      <USAddressInput
                        label={"ZIP"}
                        placeholder='Enter ZIP'
                        isMandatory={mandatory}
                        value={zip}
                        type="number"
                        onChange={(event: any) => this.handleChangeText(event.target.value, 'zip')}
                      />
                      <USAdressDropDown
                        label={"State"}
                        isMandatory={mandatory}
                        value={state}
                        onChange={(value: any) => this.handleChangeText(value, 'state')}
                        render={render as any}
                      />
                    </div>
                    {stateError && <p className="text-error">{stateError}</p>}
                    <div className='w-[100%] flex flex-row justify-center pt-4 mt-4'>
                      <ButtonComponent className='w-[9.375rem]' variant={'primary'} type='submit' onClick={onFormSubmit}>
                        {Strings.submit}
                      </ButtonComponent>
                    </div>
                  </Form>
         
                </Formik>
              </div>
            }
            title={Strings.useAddress}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}

export default USAddressComponent;
