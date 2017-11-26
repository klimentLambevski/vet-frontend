export const getPatientGridConfig = {
  gridName: 'Пациенти',
  headers: [
    {text: 'Име', value: 'name'},
    {text: 'Тип на животно', value: 'type.name'},
    {text: 'Дата на раѓање', value: 'birthDate', type: 'date'},
    {text: 'Микрочип', value: 'microchip'},
    {text: 'Раса', value: 'race'},
    {text: 'МБР', value: 'mbr'},
    {text: 'Пол', value: 'gender'},

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


export const getPatientFormConfig = {
  createName: 'Креирај нов пациент',
  editName: 'Измени податоци за пациентот',
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
    'type' : {
      type: 'dropdown',
      label: 'Tip pacient',
      required: true,
      values: {}
    },
    'birthDate': {
      type: 'date',
      required: true,
      label: 'Дата на раѓање',
    },
    'microchip': {
      type: 'text',
      label: 'Микрочип',
    },
    'race': {
      type: 'text',
      label: 'Раса',
    },
    'mbr': {
      type: 'text',
      label: 'МБР',
    },
    'gender': {
      type: 'radio',
      label: 'Пол',
      required: true,
      values: [
        {
          name: 'Машко',
          value: 'male'
        },
        {
          name: 'Женско',
          value: 'female'
        },
      ]

    },
  }

};