export enum Status {
  ACTIVE = 'Active',
  DECOMMISSIONED = 'Decommissioned',
  BEING_PREPARED = 'Being Prepared',
  AWAITING_SERVICE = 'Awaiting Service',
  IN_TRANSIT_TO_USER = 'In Transit to User',
  IN_TRANSIT_FROM_USER = 'In Transit from User',
  LOST = 'Lost',
  UNKNOWN = 'Unknown',
}

export enum StatusColors {
  ACTIVE = 'bg-[#219653]',
  DECOMMISSIONED = 'bg-custom-deepRed',
  BEING_PREPARED = 'bg-custom-lightGreen',
  AWAITING_SERVICE = 'bg-custom-orange',
  IN_TRANSIT_TO_USER = 'bg-custom-lightGreen',
  IN_TRANSIT_FROM_USER = 'bg-custom-orange',
  LOST = 'bg-custom-red',
  UNKNOWN = 'bg-custom-orange',
}

export const statusColor = (status: string): string => {
  switch (status) {
    case Status.ACTIVE:
      return StatusColors.ACTIVE;
    case Status.DECOMMISSIONED:
      return StatusColors.DECOMMISSIONED;
    case Status.BEING_PREPARED:
      return StatusColors.BEING_PREPARED;
    case Status.AWAITING_SERVICE:
      return StatusColors.AWAITING_SERVICE;
    case Status.IN_TRANSIT_TO_USER:
      return StatusColors.IN_TRANSIT_TO_USER;
    case Status.IN_TRANSIT_FROM_USER:
      return StatusColors.IN_TRANSIT_FROM_USER;
    case Status.LOST:
      return StatusColors.LOST;
    case Status.UNKNOWN:
      return StatusColors.UNKNOWN;
    default:
      return '';
  }
};

interface StatusOption {
  value: number;
  label: string;
}

export const getStatusOptions = (): StatusOption[] => {
  return [
    { value: 1, label: Status.ACTIVE },
    { value: 2, label: Status.DECOMMISSIONED },
    { value: 4, label: Status.BEING_PREPARED },
    { value: 5, label: Status.AWAITING_SERVICE },
    { value: 6, label: Status.IN_TRANSIT_TO_USER },
    { value: 7, label: Status.IN_TRANSIT_FROM_USER },
    { value: 8, label: Status.LOST },
    { value: 9, label: Status.UNKNOWN },
  ];
};
