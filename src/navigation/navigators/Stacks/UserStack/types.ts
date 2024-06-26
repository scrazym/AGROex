import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {LotFormProps} from '../../../../components/types';

export enum USER_STACK_ROUTE {
  USER_CABINET = 'USER_CABINET',
  USER_ADVERTISMENT = 'USER_ADVERTISMENT',
  USER_LOT_MANAGE = 'USER_LOT_MANAGE',
  USER_LOT_MANAGE_SUCCESS = 'USER_LOT_MANAGE_SUCCESS',
  USER_LOT_DETAILS = 'USER_LOT_DETAILS',
  PREVIEW = 'PREVIEW',
  USER_DATA = 'USER_DATA',
  USER_ENTER = 'USER_ENTER',
  USER_CHANGE_PASSWORD = 'USER_CHANGE_PASSWORD',
  USER_CHANGE_CURRENCY = 'USER_CHANGE_CURRENCY',
}

export type UserStackParamList = {
  [USER_STACK_ROUTE.USER_CABINET]: undefined;
  [USER_STACK_ROUTE.USER_ADVERTISMENT]: undefined;
  [USER_STACK_ROUTE.USER_LOT_MANAGE]: {id: string};
  [USER_STACK_ROUTE.USER_LOT_DETAILS]: {id: string};
  [USER_STACK_ROUTE.PREVIEW]: {name: string; values: LotFormProps};
  [USER_STACK_ROUTE.USER_DATA]: {user: {name: string; secondName: string}};
  [USER_STACK_ROUTE.USER_ENTER]: undefined;
  [USER_STACK_ROUTE.USER_LOT_MANAGE_SUCCESS]: undefined;
  [USER_STACK_ROUTE.USER_CHANGE_PASSWORD]: undefined;
  [USER_STACK_ROUTE.USER_CHANGE_CURRENCY]: undefined;
};

export type UserStackNavigationProps<
  RouteName extends keyof UserStackParamList,
> = NativeStackScreenProps<UserStackParamList, RouteName>;

export type UserCabinetScreenProps =
  UserStackNavigationProps<USER_STACK_ROUTE.USER_CABINET>;

export type UserAdvertScreenProps =
  UserStackNavigationProps<USER_STACK_ROUTE.USER_ADVERTISMENT>;

export type UserLotManageProps = string;

export type UserLotDetailsProps =
  UserStackNavigationProps<USER_STACK_ROUTE.USER_LOT_DETAILS>;

export type UserDataScreenProps =
  UserStackNavigationProps<USER_STACK_ROUTE.USER_DATA>;

export type UserPassScreenProps =
  UserStackNavigationProps<USER_STACK_ROUTE.USER_CHANGE_PASSWORD>;

export type UserChangeCurrencyScreenProps =
  UserStackNavigationProps<USER_STACK_ROUTE.USER_CHANGE_CURRENCY>;
