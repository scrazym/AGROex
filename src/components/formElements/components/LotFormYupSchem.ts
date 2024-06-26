import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Enter a Title')
    .min(3, 'must be at least 3 characters')
    .max(40, 'must be less than 40 characters'),
  description: Yup.string()
    .min(10, 'must be at least 10 characters')
    .max(150, 'must be less then 150 characters'),
  category: Yup.object().required('Choose one of options'),
  parent: Yup.string().required('Choose one of options'),
  sizeLower: Yup.number()

    .typeError('The value must be a number')
    .integer('The value must be integer')
    .moreThan(0, 'Value must be between 0 and 1000')
    .max(1000, 'Value must be between 0 and 1000')
    .positive()
    .required('Add size'),
  sizeUpper: Yup.number()
    .positive()
    .moreThan(Yup.ref('sizeLower'), 'Must be more than size From')
    .typeError('The value must be a number')
    .integer('The value must be integer')
    .max(1000, 'Value must be between 0 and 1000')
    .required('Add size'),
  sizeUnits: Yup.string().required('Choose one of options'),
  packaging: Yup.string().required('Choose one of options'),
  quantity: Yup.number()
    .typeError('The value must be a number')
    .min(1, 'Value must be between 1 and 1000')
    .max(1000, 'Value must be between 0 and 1000')
    .integer('The value must be integer')
    .required('Add quantity'),
  quantityUnits: Yup.string().required('Choose one of options'),
  price: Yup.number()
    .typeError('The value must be a number')
    .min(1, 'Value must be between 1 and 1000')
    .max(10000, 'Value must be between 0 and 1000')
    .required('Add price'),
  currency: Yup.string().required('Choose one of options'),
  country: Yup.string().required('Choose one of options'),
  region: Yup.string().required('Choose one of options'),
  lotType: Yup.string().required('Choose one of options'),
  image: Yup.array().min(1, 'Must be at least 1 image'),
  minimalPrice: Yup.number().test(
    'minimalPrice',
    'Add minimal price, must be more 50%',
    function (value) {
      const lotType = this.resolve(Yup.ref('lotType'));
      if (lotType === 'AUCTIONED') {
        const price = this.resolve(Yup.ref('price'));
        return (
          value !== undefined &&
          value !== null &&
          value !== '' &&
          value >= Number(price) / 2
        );
      }
      return true;
    },
  ),
});
