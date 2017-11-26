export const getPatientGridConfig = {
  gridName: 'Пациенти',
  headers: [
    {text: 'Име', value: 'name'},
    {text: 'Тип на животно', value: 'type.name'},
    {text: 'Дата на раѓање', value: 'birthDate'},
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
      rules: [
        (v) => !!v || 'Името е задолжително',
      ]
    },
    'type' : {
      type: 'dropdown',
      label: 'Tip pacient',
      values: {}
    },
    'birthDate': {
      type: 'date',
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