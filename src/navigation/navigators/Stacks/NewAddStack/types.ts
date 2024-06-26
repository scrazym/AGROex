import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {LotFormProps} from '../../../../components/types';
import {USER_STACK_ROUTE, UserStackNavigationProps} from '../UserStack/types';

export enum NEW_ADD_ROUTE {
  NEW_AD = 'NewAdd',
  COMPLETE_SCREEN = 'CompleteScreen',
  PREVIEW = 'Preview',
}

export type NewAddStackParamList = {
  [NEW_ADD_ROUTE.NEW_AD]: undefined;
  [NEW_ADD_ROUTE.COMPLETE_SCREEN]: undefined;
  [NEW_ADD_ROUTE.PREVIEW]: {name: string; values: LotFormProps};
};

export type NewAddStackNavigationProps<
  RouteName extends keyof NewAddStackParamList,
> = NativeStackScreenProps<NewAddStackParamList, RouteName>;

export type NewAddScreenProps =
  NewAddStackNavigationProps<NEW_ADD_ROUTE.NEW_AD>;

export type CompleteScreenProps =
  NewAddStackNavigationProps<NEW_ADD_ROUTE.COMPLETE_SCREEN>;

export type PreviewScreenProps =
  | NewAddStackNavigationProps<NEW_ADD_ROUTE.PREVIEW>
  | UserStackNavigationProps<USER_STACK_ROUTE.PREVIEW>;
