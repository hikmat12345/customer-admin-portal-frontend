const useGetPageToggleOptions = () => {
  const pageToggleOptions = [
    {
      id: undefined,
      pageId: 1,
      pageLink: '/',
      status: 0,
      title: 'Home Dashboard',
      helpText: 'This month, Last month KPIs will be affected',
      isDisabled: false,
    },
    {
      id: undefined,
      pageId: 2,
      pageLink: '/accounts/invoices',
      status: 0,
      title: 'View Invoices',
      helpText: 'This month, Last month, Total Invoices processed KPIs will be affected',
      isDisabled: false,
    },
    {
      id: undefined,
      pageId: 3,
      pageLink: '/inventory',
      status: 0,
      title: 'Services',
      helpText: 'Live Services, Disconnected Services, New Services will be affected',
      isDisabled: false,
    },
    {
      id: undefined,
      pageId: 4,
      pageLink: '/employees',
      status: 0,
      title: 'Employee Summary',
      helpText: '',
      isDisabled: false,
    },
  ];

  return { pageToggleOptions };
};

export default useGetPageToggleOptions;
