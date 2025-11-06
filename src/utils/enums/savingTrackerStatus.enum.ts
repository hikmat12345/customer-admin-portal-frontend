enum SavingTrackerStatus {
  IDENTIFIED = 1,
  ACHIEVED = 2,
  VENDOR_REJECTED = 3,
  CLIENT_REJECTED = 6,
  WAITING_CLIENT = 5,
  WAITING_VENDOR = 4,
}

export function getSavingTrackerByName(id: SavingTrackerStatus): string {
  let type = '';

  switch (id) {
    case SavingTrackerStatus.IDENTIFIED:
      type = 'Identified';
      break;
    case SavingTrackerStatus.ACHIEVED:
      type = 'Achieved';
      break;
    case SavingTrackerStatus.VENDOR_REJECTED:
      type = 'Vendor Rejected';
      break;
    case SavingTrackerStatus.CLIENT_REJECTED:
      type = 'Client Rejected';
      break;
    case SavingTrackerStatus.WAITING_CLIENT:
      type = 'Waiting Client';
      break;
    case SavingTrackerStatus.WAITING_VENDOR:
      type = 'Waiting Vendor';
      break;
    default:
      type = 'Awaiting Invoice';
      break;
  }

  return type;
}

export function getSavingTrackerColorByStatus(status: SavingTrackerStatus): string {
  let color = '';
  //TODO: will later move these colors to design system
  switch (status) {
    case SavingTrackerStatus.IDENTIFIED:
      color = 'bg-[#1175BE]';
      break;
    case SavingTrackerStatus.ACHIEVED:
      color = 'bg-[#219653]';
      break;
    case SavingTrackerStatus.VENDOR_REJECTED:
      color = 'bg-[#A40000]';
      break;
    case SavingTrackerStatus.CLIENT_REJECTED:
      color = 'bg-[#A40000]';
      break;
    case SavingTrackerStatus.WAITING_CLIENT:
      color = 'bg-[#F45E09]';
      break;
    case SavingTrackerStatus.WAITING_VENDOR:
      color = 'bg-[#F45E09]';
      break;
    default:
      color = 'bg-[#F45E09]';
      break;
  }

  return color;
}
