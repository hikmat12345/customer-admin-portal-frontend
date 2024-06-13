export enum ServiceType {
  BILLING = 14,
  C_CAAS = 15,
  FIXED_VOICE = 1,
  MOBILE = 2,
  FIXED_DATA = 3,
  DATA_CIRCUIT = 4,
  PBX = 5,
  CONFERENCING = 6,
  U_CAAS = 16,
  UNKNOWN = 7,
  SUB_ACCOUNT = 8,
  PUBLIC_CLOUD = 9,
  SERVICE_MANAGEMENT = 10,
  MICROSOFT365 = 11,
  DATA_CENTRE = 12,
  OTHER = 13,
  VIRTUAL_FAX = 17,
  CABLE_TV = 18,
}

export const getServiceType = (id: ServiceType): string => {
  switch (id) {
    case ServiceType.BILLING:
      return 'Billing';
    case ServiceType.C_CAAS:
      return 'CCaaS';
    case ServiceType.FIXED_VOICE:
      return 'Voice';
    case ServiceType.MOBILE:
      return 'Mobile';
    case ServiceType.FIXED_DATA:
      return 'Fixed Data - Deprecated';
    case ServiceType.DATA_CIRCUIT:
      return 'Data Circuit';
    case ServiceType.PBX:
      return 'PBX Voice';
    case ServiceType.CONFERENCING:
      return 'Conferencing';
    case ServiceType.U_CAAS:
      return 'UCaaS';
    case ServiceType.UNKNOWN:
      return 'Unknown';
    case ServiceType.SUB_ACCOUNT:
      return 'Sub Account';
    case ServiceType.PUBLIC_CLOUD:
      return 'Public Cloud';
    case ServiceType.SERVICE_MANAGEMENT:
      return 'Service Management';
    case ServiceType.MICROSOFT365:
      return 'Microsoft 365 Services';
    case ServiceType.DATA_CENTRE:
      return 'Data Center';
    case ServiceType.OTHER:
      return 'Other';
    case ServiceType.VIRTUAL_FAX:
      return 'Virtual Fax';
    case ServiceType.CABLE_TV:
      return 'Cable TV';
    default:
      return '';
  }
};
