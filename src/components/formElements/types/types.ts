export type DropdownProps = {
  name: string;
  placeholder: string;
  isDisable: boolean;
  dataDefault: string;
};
export type DropdownFieldProps = DropdownProps & {
  data: DataForLotFormProps[];
};

export type DropdownServerProps = DropdownProps & {
  data: DataTypesProps[] | string[];
};

export type DropdownWithReqProps = DropdownFieldProps & {
  request: (value: string) => void;
};

export type DataForLotFormProps = {
  id: number;
  name: string;
};

export type DataTypesProps = {
  id: string;
  categoryName: string;
  parentCategory: string;
  varieties: string[];
};

export type LotFormPropsChecked = {
  dataCategories: DataForLotFormProps[];
  idLot: string;
};

export type PswInputProps = {
  onChangeText: (value: string) => void;
  label: string;
  value?: string;
  error?: string;
};
