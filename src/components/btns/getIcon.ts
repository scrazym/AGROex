import {
  faArrowLeftLong,
  faCartShopping,
  faCheck,
  faFilter,
  faGavel,
  faGear,
} from '@fortawesome/free-solid-svg-icons';

export const getIcon = (icon: string) => {
  switch (icon) {
    case 'manage':
      return faGear;
    case 'bucket':
      return faCartShopping;
    case 'bet':
      return faGavel;
    case 'arrowBack':
      return faArrowLeftLong;
    case 'confirm':
      return faCheck;
    default:
      return faFilter;
  }
};
