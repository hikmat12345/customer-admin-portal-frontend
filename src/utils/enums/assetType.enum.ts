export enum AssetType {
  LAPTOP = 'Laptop',
  DESKTOP = 'Desktop',
  ROUTER = 'Router',
  MOBILE_PHONE = 'Mobile Phone',
  SERVER = 'Server',
  TABLET = 'Tablet',
  ETHERNET_SWITCH = 'Ethernet Switch',
  PBX = 'PBX',
}

interface AssetTypeOption {
  value: number;
  label: string;
}

export const getAssetTypeOptions = (): AssetTypeOption[] => {
  return [
    { value: 1, label: AssetType.LAPTOP },
    { value: 2, label: AssetType.DESKTOP },
    { value: 3, label: AssetType.ROUTER },
    { value: 4, label: AssetType.MOBILE_PHONE },
    { value: 5, label: AssetType.SERVER },
    { value: 6, label: AssetType.TABLET },
    { value: 7, label: AssetType.ETHERNET_SWITCH },
    { value: 8, label: AssetType.PBX },
  ];
};
