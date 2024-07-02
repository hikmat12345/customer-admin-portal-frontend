const useGetMenuOptions = () => {
  const menuOptions = [
    {
      name: 'Status',
      value: 'status',
      options: [
        {
          label: 'Live',
          value: 1,
        },
        {
          label: 'Terminated',
          value: 0,
        },
      ],
      paramName: 'status',
      placeholder: 'Search...',
    },
  ];

  return menuOptions;
};

export default useGetMenuOptions;
