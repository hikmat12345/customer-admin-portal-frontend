import React, { FC } from 'react';
import { Strings } from '../../../shared';

const NoCatalogFound: FC = () => {
  return (
    <div>
      <img src="/path/to/no-data-available-image.png" alt="No Data Available"  />
      <p>{Strings.noCatalog}</p>
    </div>  
  );
};

export default NoCatalogFound;
