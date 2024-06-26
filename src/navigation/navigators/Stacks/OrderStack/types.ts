import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum ORDER_STACK_ROUTE {
  ORDER_LIST = 'OrderList',
  ORDER_LOT_DETAILS = 'OrderLotDetails',
}

export type OrderStackParamList = {
  [ORDER_STACK_ROUTE.ORDER_LIST]: undefined;
  [ORDER_STACK_ROUTE.ORDER_LOT_DETAILS]: {
    lotId: string;
    lotTitle: string;
    func: (encodedFilters: string) => void;
  };
};

export type OrderStackNavigationProps<
  RouteName extends keyof OrderStackParamList,
> = NativeStackScreenProps<OrderStackParamList, RouteName>;

export type OrderListScreenProps =
  OrderStackNavigationProps<ORDER_STACK_ROUTE.ORDER_LIST>;

export type OrderDetailsScreenProps =
  OrderStackNavigationProps<ORDER_STACK_ROUTE.ORDER_LOT_DETAILS>;
