import {CategoryProps} from '../../types';

export interface LotCardProps {
  id: string;
  title?: string;
  description?: string;
  time?: string;
  latestBet: any;
  price: number;
  calculatedPrice: number;
  weight?: number | string;
  url?: string[];
  lotType: 'AUCTIONED' | 'NOT_AUCTIONED';
  variety?: string;
  quantity?: number | string;
  quantityUnits?: string;
  sizeLower?: number | string;
  sizeUpper?: number;
  packaging?: string;
  sizeUnits?: string;
  country?: string;
  region?: string;
  status?: string;
  isDelete?: boolean;
  setDelete?: (status: string, tab: number) => void;
  creationDate?: string;
  onPress?: () => void;
  images: any;
  author?: string;
  onPressEdit?: () => void;
  rejectionReason?: string;
  isPlaceBet?: boolean;
}

export type NewLotCardProps = {
  lot: LotProps;
  isDelete?: boolean;
  isBetting?: boolean;
  setDelete?: (status: string, tab: number) => void;
  onPress?: () => void;
  onPressEdit?: () => void;
};
export type LotProps = {
  id: string;
  creationDate?: string;
  title?: string;
  category: CategoryProps | string;
  variety?: string;
  country?: string;
  region?: string;
  lotType?: 'AUCTIONED' | 'NOT_AUCTIONED';
  status?: 'ON_MODERATION' | 'REJECTED' | 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
  description?: string;
  currency: string;
  calculatedPrice: number;
  quantity?: number | string;
  quantityUnits?: string;
  price: number;
  sizeLower?: number | string;
  sizeUpper?: number;
  sizeUnits?: string;
  packaging?: string;
  rejectionReason?: string;
  author?: string;
  images: image[];

  expiresAt: null;
  lifetimePeriod: null;
  minimalPrice: null;
  latestBet: null;
};
type image = {
  id: string;
  imageUrl: string;
  title: string;
};

export interface TabsProps {
  id: string;
  title: string;
  request?: string;
}

export type TabItemsProps = {
  item: TabsProps;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

export type RenderBottomBtnsProps = {
  isSizeVisible: boolean;
  handleChangeCountItems: (item: number) => void;
  toggleSizeWindow: () => void;
  handleChangePage: () => void;
  togglePickPage: () => void;
  handlePickPage: (item: number) => void;
  size: number;
  page: number;
  totalPages: number[];
  isCanNext: boolean;
  isVisible: boolean;
};
