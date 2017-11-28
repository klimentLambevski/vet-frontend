export const getImmunizationGridConfig = {
  gridName: 'Имунизацијаа',
  headers: [
    {text: 'Име', value: 'name'},
    {text: 'Опис', value: 'description'},
    // {text: 'Период на имунизација', value: 'periods'},
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
    'name': {
      type: 'text',
      label: 'Име',
      required: true,
      rules: [
        (v) => !!v || 'Името е задолжително',
      ]
    },
    'description': {
      type: 'textarea',
      label: 'Опис',
      required: true,
      rules: [
        (v) => !!v || 'Описот е задолжителен',
      ]
    },
    'periods': {
      type: 'array',
      fieldType: 'number',
      key: 'month',
      label: 'Периоди на имунизација(месеци)',
      fieldLabel: 'Месец',
      required: true,
      rules: [
        (v) => !!v || 'Месецот е задолжителен',
      ]
    },
  }
};