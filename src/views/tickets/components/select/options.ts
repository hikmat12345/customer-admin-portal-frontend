import { useGetVendors } from '@/hooks/useTickets';
import { VendorAccount } from '@/types/tickets/types';

const useGetMenuOptions = () => {
  const { data: vendorAccounts } = useGetVendors();

  const filterVendorAccounts = vendorAccounts?.map((item: VendorAccount) => ({
    value: item?.account_no,
    label: item?.displayName,
  }));

  const menuOptions = [
    {
      name: 'Vendor Account',
      value: 'vendorAccount',
      options: filterVendorAccounts,
    },
    {
      name: 'Priority',
      value: 'priority',
      options: [
        { value: 1, label: 'P1' },
        { value: 2, label: 'P2' },
        { value: 3, label: 'P3' },
        { value: 4, label: 'P4' },
      ],
    },

    {
      name: 'Ticket Status',
      value: 'ticketStatus',
      options: [
        {
          value: 1,
          label: 'Open',
        },
        { value: 2, label: 'Closed' },
        {
          value: 3,
          label: 'Awaiting Client',
        },
        {
          value: 4,
          label: 'Awaiting Vendor',
        },
        {
          value: 5,
          label: 'Awaiting Reminder',
        },
        {
          value: 6,
          label: 'Awaiting Invoice',
        },
        {
          value: 7,
          label: 'Awaiting Approval',
        },
        {
          value: 8,
          label: 'Awaiting Shipping',
        },
      ],
    },
  ];

  return menuOptions;
};

export default useGetMenuOptions;
