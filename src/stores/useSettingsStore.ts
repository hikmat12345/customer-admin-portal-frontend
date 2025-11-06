import { create } from 'zustand';

type CompanyNetworkData = {
  id?: number | undefined;
  networkId: number;
  companyNetworkId: number;
  isChecked: boolean;
};

interface SettingsState {
  companyNetworks: CompanyNetworkData[];
  dbPreferences: any[];
  addCompanyNetwork: (companyNetworkId: number, networkId: number, isChecked: boolean, id: number | undefined) => void;
  removeCompanyNetwork: (companyNetworkId: number) => void;
  updateCompanyNetworksBulk: (companyNetworksArg: CompanyNetworkData[]) => void;
  removeCompanyNetworksBulk: (companyNetworksArg: CompanyNetworkData[]) => void;
  hydratePreferences: (preferences: any) => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
  companyNetworks: [],
  dbPreferences: [],
  addCompanyNetwork: (companyNetworkId: number, networkId: number, isChecked: boolean, id?: number) =>
    set((state) => {
      const isFound = state.companyNetworks.find((item) => item.companyNetworkId === companyNetworkId);
      const updatedItems = isFound
        ? state.companyNetworks.map((item) => (item.companyNetworkId === companyNetworkId ? { ...item, isChecked } : item))
        : [...state.companyNetworks, { networkId, companyNetworkId, isChecked: true, id }];
      return { companyNetworks: updatedItems };
    }),

  removeCompanyNetwork: (companyNetworkId: number) =>
    set((state) => ({
      companyNetworks: state.companyNetworks.map((item) =>
        item.companyNetworkId === companyNetworkId ? { ...item, isChecked: false } : item,
      ),
    })),

  updateCompanyNetworksBulk: (companyNetworksArg: CompanyNetworkData[]) =>
    set((state) => ({ companyNetworks: [...state.companyNetworks, ...companyNetworksArg] })),

  removeCompanyNetworksBulk: (companyNetworksArg: CompanyNetworkData[]) =>
    set((state) => {
      const networkIdsToRemove = new Set(companyNetworksArg.map((item) => item.networkId));
      return {
        companyNetworks: state.companyNetworks.filter(({ networkId }) => !networkIdsToRemove.has(networkId)),
      };
    }),

  hydratePreferences: (preferences: any) => set((state) => ({ dbPreferences: preferences })),
}));

export default useSettingsStore;
