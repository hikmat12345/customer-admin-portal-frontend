import React from 'react';
import { FC } from 'react';
import { Colors, Strings } from '../../../shared';
import { selectPlaceholderStyle } from 'src/native/components/Catalog/styles';
import { SelectPlaceholderType } from 'src/native/components/Catalog/CatalogTypes';
import { Images } from 'src/native/assets';

const SelectPlaceholder: FC<SelectPlaceholderType> = ({ onClickSelectPlaceholder }: SelectPlaceholderType) => {
  return (
    <div 
      onClick={() => onClickSelectPlaceholder()} 
      style={selectPlaceholderStyle.selectPlaceholderView}
    >
      <img 
        src={Images.plus} 
        alt="Plus Icon" 
        style={selectPlaceholderStyle.imageStyle} 
      />
      <p style={{ fontWeight: 700, color: Colors.silver, fontSize: 12 }}>
        {Strings.selectPlaceholder}
      </p>
    </div>
  );
};

export default SelectPlaceholder;
