import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum USER_BET_STACK_ROUTE {
  USER_BET_LIST = 'UserBetList',
  USER_BET_LOT_DETAILS = 'LotDetails',
}

export type UserBetStackParamList = {
  [USER_BET_STACK_ROUTE.USER_BET_LIST]: undefined;
  [USER_BET_STACK_ROUTE.USER_BET_LOT_DETAILS]: {
    lotId: string;
    lotTitle: string;
    func: (encodedFilters: string) => void;
  };
};

export type UserBetStackNavigationProps<
  RouteName extends keyof UserBetStackParamList,
> = NativeStackScreenProps<UserBetStackParamList, RouteName>;

export type UserBetListScreenProps =
  UserBetStackNavigationProps<USER_BET_STACK_ROUTE.USER_BET_LIST>;

export type UserBetDetailsScreenProps =
  UserBetStackNavigationProps<USER_BET_STACK_ROUTE.USER_BET_LOT_DETAILS>;
