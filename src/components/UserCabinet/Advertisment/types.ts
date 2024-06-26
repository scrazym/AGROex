export interface TabsDataProps {
  id: string;
  title: string;
  request?: string;
}

export type TabItemsProps = {
  item: TabsDataProps;
  onPress: () => void;
  borderBottomColor: string;
  textColor: string;
};
