const useGetMenuOptions = () => {
  const menuOptions = [
    {
      name: 'Account Group',
      value: 'accountGroup',
      options: [
        { value: 'All', label: 'All' },
        { value: 'Group 1', label: 'Group 1' },
        { value: 'Group 2', label: 'Group 2' },
        { value: 'Group 3', label: 'Group 3' },
        { value: 'Group 4', label: 'Group 4' },
        { value: 'Group 5', label: 'Group 5' },
      ],
      paramName: 'accountGroup',
      placeholder: 'Search account group...',
    },
    {
      name: 'Fiscal Year',
      value: 'fiscalYear',
      options: [
        { value: 'All', label: 'All' },
        { value: '2019', label: '2019' },
        { value: '2020', label: '2020' },
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
        { value: '2026', label: '2026' },
        { value: '2027', label: '2027' },
        { value: '2028', label: '2028' },
        { value: '2029', label: '2029' },
        { value: '2030', label: '2030' },
      ],
      paramName: 'fiscalYear',
      placeholder: 'Search fiscal year...',
    },
    {
      name: 'Fiscal Month',
      value: 'fiscalMonth',
      options: [
        { value: 'All', label: 'All' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' },
      ],
      paramName: 'fiscalMonth',
      placeholder: 'Search fiscal month...',
    },
  ];

  return menuOptions;
};

export default useGetMenuOptions;
