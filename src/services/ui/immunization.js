export const getImmunizationGridConfig = {
  gridName: 'Имунизацијаа',
  headers: [
    {text: 'Измерена температура', value: 'measuredTemperature'},
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

export const getImmunizationFormConfig = {
  createName: 'Креирај нова имунизација',
  editName: 'Измени податоци за имунаизацијата',
  createButtonName: 'Креирај',
  editButtonName: 'Измени',
  columns: {
    'measuredTemperature': {
      type: 'number',
      label: 'Измерена температура',
      required: true,
      rules: [
        (v) => !!v || 'Измерена температура е задолжителнa',
      ]
    },
  }
};