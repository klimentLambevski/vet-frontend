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

export const getPatientTypeFormConfig = {
  createName: 'Креирај нов тип на пациент',
  editName: 'Измени податоци за типот на пациент',
  createButtonName: 'Креирај',
  editButtonName: 'Измени',
  columns: {
    'name': {
      type: 'text',
      label: 'Име',
      required: true,
      rules: [
        (v) => !!v || 'Името е задолжително',
      ]
    },
  }
};