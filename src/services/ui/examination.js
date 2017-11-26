export const getExaminationGridConfig = {
  gridName: 'Прегледи',
  headers: [
    {text: 'Измерена температура', value: 'measuredTemperature'},
    {text: 'Надворешен преглед', value: 'outerExamination'},
    {text: 'Лабораторија', value: 'laboratory'},
    {text: 'Дијагноза', value: 'diagnose'},
    {text: 'Терапија', value: 'therapy'},
    {text: 'Операција', value: 'surgery'},
    {text: 'Дата', value: 'createdAt'},
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
    'immunization': {
      type: 'text',
      label: 'Имунизација',
    },
    'notes': {
      type: 'text',
      label: 'Забелешки',
    },
  }
};