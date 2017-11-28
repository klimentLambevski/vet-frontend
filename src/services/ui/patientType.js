export const getPatientTypeGridConfig = {
  gridName: 'Типови пациенти',
  headers: [
    {text: 'Вид', value: 'name'},
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
  showCancelButton: true,
  cancelButtonName: 'Откажи',
  columns: {
    'name': {
      type: 'text',
      label: 'Вид',
      required: true,
      rules: [
        (v) => !!v || 'Името е задолжително',
      ]
    },
  }
};