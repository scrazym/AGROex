import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Category} from '../../../../screens/HomeScreens/CategoriesList/CategoriesList';
import {USER_STACK_ROUTE} from './../UserStack/types';

export enum HOME_STACK_ROUTE {
  CATEGORIES_LIST = 'CategoriesList',
  SUBCATEGORY_LIST = 'SubcategoryList',
  LOT_LIST = 'LotList',
  LOT_DETAILS = 'LotDetails',
  LOT_MANAGE = 'LotManage',
  LOT_MANAGE_PREVIEW = 'LotManagePreview',
}

export type HomeStackParamList = {
  [HOME_STACK_ROUTE.CATEGORIES_LIST]: undefined;
  [HOME_STACK_ROUTE.SUBCATEGORY_LIST]: {category: Category};
  [HOME_STACK_ROUTE.LOT_LIST]: {subcategory: string; subcategoryID: string};
  [HOME_STACK_ROUTE.LOT_DETAILS]: {
    lotId: string;
    lotTitle: string;
    func: (encodedFilters: string) => void;
  };
  [HOME_STACK_ROUTE.LOT_MANAGE]: {id: string};
  [HOME_STACK_ROUTE.LOT_MANAGE_PREVIEW]: undefined;
  [USER_STACK_ROUTE.USER_LOT_MANAGE_SUCCESS]: undefined;
};

export type HomeStackNavigationProps<
  RouteName extends keyof HomeStackParamList,
> = NativeStackScreenProps<HomeStackParamList, RouteName>;

export type SubcategoriesScreenProps =
  HomeStackNavigationProps<HOME_STACK_ROUTE.SUBCATEGORY_LIST>;

export type LotListScreenProps =
  HomeStackNavigationProps<HOME_STACK_ROUTE.LOT_LIST>;

export type LotDetailsScreenProps =
  HomeStackNavigationProps<HOME_STACK_ROUTE.LOT_DETAILS>;
export type LotManageScreenProps =
  HomeStackNavigationProps<HOME_STACK_ROUTE.LOT_MANAGE>;
