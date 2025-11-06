const useGetMenuOptions = () => {
  const menuOptions = [
    {
      name: 'Frequency',
      value: 'frequency',
      options: [
        { value: 0, label: 'One Off' },
        { value: 1, label: 'Weekly' },
        { value: 2, label: 'Monthly' },
      ],
    },
    {
      name: 'Status',
      value: 'status',
      options: [
        {
          value: 0,
          label: 'All',
        },
        {
          value: 1,
          label: 'Active',
        },
      ],
    },
  ];

  return menuOptions;
};

export default useGetMenuOptions;
