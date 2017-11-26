export const getPatientTypeGridConfig = {
  gridName: 'Типови пациенти',
  headers: [
    {text: 'Име', value: 'name'},
  ],
  pagination: {
    sortBy: 'name'
  },
  actions: {
    'edit': {
      'label': 'Измени',
    }
  }
};