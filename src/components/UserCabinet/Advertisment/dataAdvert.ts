import {TabsProps} from '../../Lot_List/types/types';

export const dataForTabs: Array<TabsProps> = [
  {
    id: 'first',
    title: 'Active',
    request: 'ACTIVE',
  },
  {
    id: 'second',
    title: 'Pending',
    request: 'ON_MODERATION',
  },
  {
    id: 'third',
    title: 'Inactive',
    request: 'INACTIVE',
  },
  {
    id: 'fourth',
    title: 'Completed',
    request: 'COMPLETED',
  },
];

export const dataForBettingTabs = [
  {
    id: 'first',
    title: 'My bets',
    request: 'MY_BET',
  },
  {
    id: 'second',
    title: 'Outbided',
    request: 'OUTBIDED',
  },
];

export const dataForOrder = [
  {
    id: 'first',
    title: 'My orders',
    request: 'MY_ORDERS',
  },
];
