import { getStatusOptions } from '@/utils/enums/assetStatus.enum';
import { getAssetTypeOptions } from '@/utils/enums/assetType.enum';

const useGetMenuOptions = () => {
  const menuOptions = [
    {
      name: 'Asset Type',
      value: 'assetType',
      options: getAssetTypeOptions(),
      paramName: 'assetType',
      placeholder: 'Search asset type...',
    },
    {
      name: 'Status',
      value: 'status',
      options: getStatusOptions(),
      paramName: 'status',
      placeholder: 'Search status...',
    },
  ];

  return menuOptions;
};

export default useGetMenuOptions;
