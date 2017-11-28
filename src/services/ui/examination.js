export const getExaminationGridConfig = {
  gridName: 'Прегледи',
  headers: [
    {text: 'Измерена температура', value: 'measuredTemperature'},
    {text: 'Надворешен преглед', value: 'outerExamination'},
    {text: 'Лабораторија', value: 'laboratory'},
    {text: 'Дијагноза', value: 'diagnose'},
    {text: 'Терапија', value: 'therapy'},
    {text: 'Операција', value: 'surgery'},
    {text: 'Имунизација', value: 'immunization.name'},
    {text: 'Дата', value: 'createdAt', type: 'date'},
    {text: 'Забелешки', value: 'notes'},
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

export const getExaminationFormConfig = {
  createName: 'Креирај нов преглед',
  editName: 'Измени податоци за прегледот',
  createButtonName: 'Креирај',
  editButtonName: 'Измени',
  showCancelButton: true,
  cancelButtonName: 'Откажи',
  columns: {
    'measuredTemperature': {
      type: 'number',
      label: 'Измерена температура',
      required: true,
      rules: [
        (v) => !!v || 'Измерена температура е задолжителнa',
      ]
    },
    'outerExamination': {
      type: 'textarea',
      label: 'Надворешен преглед',
      required: true,
      rules: [
        (v) => !!v || 'Надворешен прегледа е задолжителен',
      ]
    },
    'diagnose': {
      type: 'textarea',
      label: 'Дијагноза',
      required: true,
      rules: [
        (v) => !!v || 'Дијагнозата е задолжителна',
      ]
    },
    'therapy': {
      type: 'textarea',
      label: 'Терапија',
      required: true,
      rules: [
        (v) => !!v || 'Терапијата е задолжителна',
      ]
    },
    'surgery': {
      type: 'text',
      label: 'Операција',
    },
    'laboratory': {
      type: 'text',
      label: 'Лабораторија',
    },
    'immunizationId': {
      type: 'dropdown',
      label: 'Имунизација',
      value: 'id',
      values: {}
    },
    'notes': {
      type: 'text',
      label: 'Забелешки',
    },
  }
};