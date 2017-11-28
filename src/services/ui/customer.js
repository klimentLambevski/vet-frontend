export const getCustomerFormConfig = {
  createName: 'Креирај нов корисник',
  editName: 'Измени податоци за корисникот',
  createButtonName: 'Креирај',
  editButtonName: 'Измени',
  showCancelButton: true,
  cancelButtonName: 'Откажи',
  columns: {
    'name': {
      type: 'text',
      label: 'Име',
      required: true,
      rules: [
        (v) => !!v || 'Името е задолжително',
      ]
    },
    'surname': {
      type: 'text',
      label: 'Презиме',
      required: true,
      rules: [
        (v) => !!v || 'Презимето е задолжително',
      ]
    },
    'phone': {
      type: 'text',
      label: 'Телефон'
    },
    'email': {
      type: 'text',
      label: 'Е-маил',
      rules: [
        (v) => {
          if(!v) {
            return true;
          }
          if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) {
            return  'Е-маилот мора да е валиден'
          } else {
            return true;
          }
        }
      ]
    },
  },
};

export const getCustomerGridConfig = {
  gridName: 'Корисници',
  headers: [
    {text: 'Име', value: 'user.name'},
    {text: 'Презиме', value: 'user.surname'},
    {text: 'Телефон', value: 'user.phone'},
    {text: 'Email', value: 'user.email'}
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