export const getCustomerFormConfig = {
  createName: 'Креирај нов корисник',
  editName: 'Измени податоци за корисникот',
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
    'surname': {
      type: 'text',
      label: 'Презиме',
      rules: [
        (v) => !!v || 'Презимето е задолжително',
      ]
    },
    'email': {
      type: 'text',
      label: 'Е-маил',
      rules: [
        (v) => !!v || 'Е-маилот е задолжителен',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Е-маилот мора да е валиден'
      ]
    },
  },
};

export const getCustomerGridConfig = {
  gridName: 'Корисници',
  headers: [
    {text: 'Email', value: 'user.email'},
    {text: 'Name', value: 'user.name'},
    {text: 'Surname', value: 'user.surname'},
  ],
  pagination: {
    sortBy: 'name'
  },
  actions: {
    'edit' : {
      'label' : 'Измени',
    }
  }
};