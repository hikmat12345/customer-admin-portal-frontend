import React, { FC } from 'react';
import { RenderCatalogItemType } from 'src/native/components/Catalog/CatalogTypes';
import { Strings } from '../../../shared';



const RenderCatalogItem: FC<RenderCatalogItemType> = ({ item, index, selectedValue, onCheckUncheckCatalog }) => {
  return (
    <div
      onClick={() => {
        onCheckUncheckCatalog(Number(item?.id));
      }}
      key={index}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{  alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F8F8'}}>
          <img style={{  width: 142, height: 142, objectFit: 'contain'}} src={item?.image} alt={item?.name} />
        </div>

        <div style={{  alignItems: 'center', justifyContent: 'center' }}>
          <input
            type="checkbox"
            checked={selectedValue.includes(item?.id.toString())}
            style={{ width: 20, height: 20 }}
            onChange={() => {
              onCheckUncheckCatalog(Number(item?.id));
            }}
          />
        </div>

        <div style={{ width: 150 }}>
          <p style={{  fontWeight: '700' }}>
            {`${item?.name},${item?.memory ? ' ' + item?.memory + ',' : ''} ${
              item?.colour ? item?.colour + ',' : ''
            } ${item?.price} ${item?.currency}`}
          </p>
          {item?.outOfStock && (
            <p style={{ fontSize: 16 }}>{Strings.outOfStock}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderCatalogItem;
