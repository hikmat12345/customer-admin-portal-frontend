import _ from 'lodash';
import React, { ReactNode } from 'react';
import { Colors, getCatalogApiCall, SEARCH_SERVICE_DATA, Strings, SuperSearchService } from '../../../shared';
import type { WorkflowDataType } from '../../../shared';
import { workFlowStore } from '../../service/workflow/workflow';

class SearchServiceComponent extends SuperSearchService<WorkflowDataType> {
  controllerRef: any;
  constructor(props: WorkflowDataType) {
    super(props);
    this.controllerRef = React.createRef();
  }

  onClearUsAddress = () => {
    this.setState({ searchService: '', initialValue: '', searchValue: '' });
  };

  onChangeSearchService = async (value: string) => {
    const { id, workflowId, token } = this.props;
    const { searchService } = this.state;
    this.setState({ searchValue: value });
    if (value.length > 3) {
      if (this.controllerRef.current) {
        this.setState({ loading: false });
        this.controllerRef.current.abort();
      }
      this.setState({ loading: true });
      this.controllerRef.current = new AbortController();

      const bodyData = { targetBlock: id, data: { [id]: { query: value, searchType: searchService } } };
      getCatalogApiCall(bodyData, token, workflowId).then((response: any) => {
        const data = response.data[id];
        let searchServices = [];
        if (data?.suggestions && data?.suggestions.length > 0) {
          const { suggestions } = data;
          searchServices = suggestions.map((item: any, index: any) => {
            return {
              ...item,
              line1: item.value,
              value: item.data,
              data: item.value,
              id: index.toString()
            };
          });
        }
        this.setState({ filterSitesData: searchServices, loading: false, });
        this.controllerRef.current = null;
      }).catch(error => {
        console.log(error);
      });
    } else {
      this.setState({ loading: false, filterSitesData: [], });
    }
  };

  handleSelect = (item: any) => {
    this.setState({ value: item.value, searchValue: item.line1 });
    workFlowStore(this.props.id, this.props.title, item.data, item.value);
    this.setState({ filterSitesData: [] });
  }

  render(): ReactNode {
    const { title, mandatory } = this.props;
    const { searchService, isFocus, error, filterSitesData } = this.state;

    const containerStyle = {
      marginTop: '8px',
    };

    const titleStyle = {
      fontSize: '14px',
      fontWeight: '700',
      marginBottom: '2px',
    };

    const mandatoryStyle = {
      color: Colors.error,
    };

    const flexContainerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    };

    const dropdownStyle = {
      flex: 1,
      marginRight: '8px',
      ...isFocus ? { borderColor: Colors.secondary } : { borderColor: Colors.lightPrimary },
      // styles here
    };

    const inputSearchStyle = {
      // styles here
    };

    const searchSiteContainerStyle = {
      flex: 1,
      // styles here
    };

    const clearIconStyle = {
      cursor: 'pointer',
      // styles here
    };

    const inputContainerStyle = {
      // styles here
    };

    const searchSiteTextStyle = {
      // styles here
    };

    return (
      <div style={containerStyle} className=" py-4">
        <div style={titleStyle} className="flex items-center">
          {title}
          {mandatory && <span style={mandatoryStyle} className="ml-1">*</span>}
        </div>
        <div style={flexContainerStyle} className="mt-2 focus:border-secondary pl-3 py-1.5 pr-0 bg-white rounded-md border border-slate-300">
          <select
            style={{...dropdownStyle, maxWidth: '220px',}} 
            // border right only 
            className='outline-none text-[#8B8B8B] p-2'
            value={searchService}
            onFocus={() => this.setState({ isFocus: true })}
            onBlur={() => this.setState({ isFocus: false })}
            onChange={(e: any) => this.setState({ searchService: e.target.value })}
          >
            <option key={Strings.dropDownPlaceholder} value={""} className=' '>
              {Strings.dropDownPlaceholder}
            </option>
            {SEARCH_SERVICE_DATA.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <div className=' w-[2px] bg-slate-400'></div>
          <div style={searchSiteContainerStyle} className="relative flex-1">
            <input
              type="text"
              placeholder={Strings.search}
              value={this.state.searchValue}
              onBlur={() => this.setState({ isFocus: false })}
              onChange={(e: any) => this.onChangeSearchService(e.target.value)}
              style={inputSearchStyle}
              className="w-full h-full border-none border-0 p-1 focus:border-none outline-none"
            />
            {this.state.searchValue && (
              <span
                style={clearIconStyle}
                onClick={this.onClearUsAddress}
                className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
              >
                &#10005;
              </span>
            )}
            {/* hide when on click and selectd as well */}
            
            {filterSitesData.length > 0  &&  (
              <ul
              style={{maxHeight: '273px'}}
              className=" w-full rounded-md  z-10 shadow border border-slate-100 absolute bg-white p-2 max-h-10 overflow-y-scroll" >
                {filterSitesData.map((item, index) => (
                  <li
                  key={index}
                  className='p-2 cursor-pointer hover:bg-gray-100'
                    onClick={() => this.handleSelect(item)}
                    style={searchSiteTextStyle}
                   >
                    {item.line1}
                  </li>
                ))}
              </ul>
            ) }
            {filterSitesData.length === 0 && this.state.loading && (
              <ul
              style={{maxHeight: '100px'}}
              className=" w-full rounded-md  z-10 shadow border border-slate-100 absolute bg-white p-2 max-h-10 overflow-y-scroll" >
                <li className='p-2' >
                  Loading...
                </li>
                </ul>
            )} 
          </div>
        </div>
        {error && <div style={{ color: Colors.error }}>{error}</div>}
      </div>
    );
  }
}

export default SearchServiceComponent;
