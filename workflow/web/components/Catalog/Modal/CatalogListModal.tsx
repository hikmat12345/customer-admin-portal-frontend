import React, { useState, useCallback, FC } from 'react';
import NoCatalogFound from '../NoCatalogFound';
import RenderCatalogItem from '../RenderCatalogItem';
import { CatalogCategoryType, CatalogListModalType, CatalogListType } from 'src/native/components/Catalog/CatalogTypes';
import { Strings } from '../../../../shared';

interface RenderCatalogCategoryItemProps {
  name: string;
  selectedValue: string;
  keyOfSelectValue: string;
  onSelectAndUnSelectValue: (selectedValue: string, name: string, keyOfSelectValue: string) => void;
  index: number;
}

const RenderCatalogCategoryItem: React.FC<RenderCatalogCategoryItemProps> = ({
  name,
  selectedValue,
  keyOfSelectValue,
  onSelectAndUnSelectValue,
  index,
}) => (
  <div
    key={index}
    style={{
      display: 'flex',
      justifyContent: 'center',
      borderWidth: '1px',
      height: '30px',
      marginRight: '6px',
      borderRadius: '8px',
      borderColor: '#dcdcdc',
      backgroundColor: selectedValue === name ? '#cce5ff' : '#dcdcdc',
      padding: '0 16px',
      cursor: 'pointer',
    }}
    onClick={() => {
      onSelectAndUnSelectValue(selectedValue, name, keyOfSelectValue);
    }}
  >
    <span>{name}</span>
  </div>
);

interface RenderCategoryListProps {
  data: string[];
  selectedValue: string;
  keyOfSelectValue: string;
  onSelectAndUnSelectValue: (selectedValue: string, name: string, keyOfSelectValue: string) => void;
}

const RenderCategoryList: React.FC<RenderCategoryListProps> = ({
  data,
  selectedValue,
  keyOfSelectValue,
  onSelectAndUnSelectValue,
}) => {
  return (
    <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
      {data.map((item, index) => (
        <li key={index}>
          <RenderCatalogCategoryItem
            index={index}
            onSelectAndUnSelectValue={onSelectAndUnSelectValue}
            name={item}
            selectedValue={selectedValue}
            keyOfSelectValue={keyOfSelectValue}
          />
        </li>
      ))}
    </ul>
  );
};

interface RenderCatalogCategoryProps {
  title: string;
  data: string[];
  selectedValue: string;
  keyOfSelectValue: string;
  onSelectAndUnSelectValue: (selectedValue: string, name: string, keyOfSelectValue: string) => void;
}

const RenderCatalogCategory: React.FC<RenderCatalogCategoryProps> = ({
  title,
  data,
  selectedValue,
  keyOfSelectValue,
  onSelectAndUnSelectValue,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '42px', marginBottom: '10px' }}>
      <span style={{ paddingRight: '16px', fontWeight: 'bold' }}>{title}</span>
      <RenderCategoryList
        data={data}
        selectedValue={selectedValue}
        keyOfSelectValue={keyOfSelectValue}
        onSelectAndUnSelectValue={onSelectAndUnSelectValue}
      />
    </div>
  );
};



const CatalogCategory: FC<CatalogCategoryType> = ({
  colorCategories,
  selectedColor,
  onSelectAndUnSelectValue,
  manufacturerCategories,
  selectManufacturer,
  memoryCategories,
  selectMemory,
  selectType,

}) => (
  <div
    style={{
      borderRadius: '8px',
      borderColor: '#dcdcdc',
      borderWidth: '1px',
      backgroundColor: '#f8f9fa',
      marginBottom: '8px',
      padding: '16px',
    }}
  >
    <RenderCatalogCategory
      title="Color"
      data={colorCategories ?? []}
      selectedValue={selectedColor}
      keyOfSelectValue="selectedColor"
      onSelectAndUnSelectValue={onSelectAndUnSelectValue}
    />
    <hr />
    <RenderCatalogCategory
      title="Brand"
      data={manufacturerCategories ?? []}
      selectedValue={selectManufacturer}
      keyOfSelectValue="selectManufacturer"
      onSelectAndUnSelectValue={onSelectAndUnSelectValue}
    />
    <hr />
    <RenderCatalogCategory
      title="Size"
      data={memoryCategories ?? []}
      selectedValue={selectMemory}
      keyOfSelectValue="selectMemory"
      onSelectAndUnSelectValue={onSelectAndUnSelectValue}
    />
    <hr />
    <RenderCatalogCategory
      title="Type"
      data={['All Devices', 'Selected Devices']}
      selectedValue={selectType}
      keyOfSelectValue="selectType"
      onSelectAndUnSelectValue={onSelectAndUnSelectValue}
    />
  </div>
);



const CatalogList: FC<CatalogListType> = ({ catalogData, selectedValue, onCheckUncheckCatalog }: CatalogListType) => (

  <div style={{ marginTop: '16px' }}>
    {catalogData.length ? (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {catalogData.map((item, index) => (
          <div key={item.id}>
            {/* RenderCatalogItem should be a React component */}
            <RenderCatalogItem
              item={item}
              index={index}
              selectedValue={selectedValue}
              onCheckUncheckCatalog={(id) => onCheckUncheckCatalog(id)}
            />
          </div>
        ))}
      </div>
    ) : (
      <div style={{ margin: '20px 0' }}>
        {/* NoCatalogFound should be a React component */}
        <NoCatalogFound />
      </div>
    )}
  </div>
);



export const CatalogListModal: React.FC<CatalogListModalType> = ({
  isOpen,
  catalogData,
  selectedValue,
  manufacturerCategories,
  colorCategories,
  memoryCategories,
  selectManufacturer,
  selectMemory,
  selectedColor,
  onSelectAndUnSelectValue,
  onCancel,
  title,
  selectType,
  allowMultiple,
  onSubmit,
}) => {
  const [selectedCatalog, setSelectedCatalog] = useState<string[]>([...selectedValue]);

  const selectUnselectCatalog = useCallback(
    (id: number) => {
      if (id && selectedCatalog.includes(id.toString())) {
        const selectedValues = selectedCatalog.filter((item) => item !== id.toString());
        setSelectedCatalog([...selectedValues]);
      } else {
        if (allowMultiple) {
          selectedCatalog.push(id.toString());
          setSelectedCatalog([...selectedCatalog]);
        } else {
          setSelectedCatalog([id.toString()]);
        }
      }
    },
    [allowMultiple, selectedCatalog]
  );

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: '80%',
          maxHeight: '90%',
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '16px',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>{title}</span>
        </div>
        <CatalogCategory
          onSelectAndUnSelectValue={onSelectAndUnSelectValue}
          colorCategories={colorCategories ?? []}
          selectedColor={selectedColor}
          manufacturerCategories={manufacturerCategories ?? []}
          selectManufacturer={selectManufacturer}
          memoryCategories={memoryCategories ?? []}
          selectMemory={selectMemory}
          selectType={selectType}
            typeCategory={[Strings.allDevices, Strings.selectedDevices]}
        />
        <CatalogList
          catalogData={catalogData}
          selectedValue={selectedCatalog}
          onCheckUncheckCatalog={(id) => selectUnselectCatalog(id)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={() => onSubmit(selectedCatalog)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
