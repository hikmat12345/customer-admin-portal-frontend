export interface ISavingTrackerProps {
  id: number;
  title: string;
  imgSrc: string;
  value: number;
  valueColor: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface SavingTrackerUpdate {
  updated: string;
  comment: string;
  status: number;
}

export interface SavingTrackerData {
  id: number;
  comment: string;
  companyNetwork: {
    accountNumber: string;
    network: {
      name: string;
    };
  };
  created: string;
  country: {
    id: number;
    currencyCode: string;
    name: string;
  };
  savingAchievedRaw: string;
  serviceType: number;
  recurringMonths: number;
  savingRaw: string;
  status: number;
  savingTrackerUpdates: SavingTrackerUpdate[];
}

export interface FileAttachment {
  id: number;
  file: Buffer;
  fileName: string;
}
