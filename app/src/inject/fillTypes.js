function getFillTypes(settings) {
  return [
    {
      name: 'Default',
      users: { Towers: true, University_Store_on_5th: true },
      actions: [
        { name: 'Case Origin', element: 'cas11', value: 'Walk-In' },
        { name: 'Service Type', element: 'cas5', value: 'Problem' },
        { name: 'Service Area', element: '00N4100000c7Bby', value: 'End-Point Computing'},
        { name: 'Desk Location', element: '00N4100000c7KJH' , value: settings.location },
      ],
    },
    {
      name: 'Default',
      users: { 'Help Desk': true },
      actions: [
        { name: 'Case Origin', element: 'cas11', value: 'Phone'},
      ],
    },
    {
      name: 'New Computer Setup',
      users: { Towers: true, University_Store_on_5th: true },
      actions: [
        { name: 'Case Origin', element: 'cas11', value: 'Walk-In' },
        { name: 'Service Type', element: 'cas5', value: 'Request' },
        { name: 'Service Area', element: '00N4100000c7Bby', value: 'End-Point Computing' },
        { name: 'Desk Location', element: '00N4100000c7KJH', value: settings.location },
        { name: 'Subject', element: 'cas14', value: 'New Computer Setup' },
        { name: 'Description Box', element: 'cas15', value: 'New Computer Setup' },
        { name: 'Supported App', element: 'CF00N4100000cutap', value: 'Microsoft Office 365 Suite' },
        { name: 'Service', element: '00N4100000c7Bbt', value: 'End-Point Support (Desktops, Mobile Devices, etc.)' },
        { name: 'Device Type', element: '00N4100000c7KI9', value: 'Laptop' },
      ],
    },
  ];
}
