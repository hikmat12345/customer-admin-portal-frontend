interface Country {
  id: number;
  name: string;
}

interface Network {
  id: number;
  name: string;
  country: Country;
}

interface VendorAccount {
  id: number;
  accountNumber: number;
  status: string;
  network: Network;
}

interface InitialGroupedData {
  [countryName: string]: VendorAccount[];
}

interface FinalGroupedData {
  [countryName: string]: {
    [networkName: string]: VendorAccount[];
  };
}

export { Country, Network, VendorAccount, InitialGroupedData, FinalGroupedData };
