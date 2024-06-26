import {TabsProps} from './types/types';

export const dataForTabs: Array<TabsProps> = [
  {
    id: 'first',
    title: 'Newest',
    request: 'creationDate,desc',
  },
  {
    id: 'second',
    title: 'Price: ↓',
    request: 'price,asc',
  },
  {
    id: 'third',
    title: 'Price: ↑',
    request: 'price,desc',
  },
];
