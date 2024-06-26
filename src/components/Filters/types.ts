export interface FormValues {
  variety: string[];
  sizeLower: string;
  sizeUpper: string;
  sizeUnits: string;
  packaging: string[];
  region: string[];
  minQuantity: string;
  maxQuantity: string;
  quantityUnits: string;
  minPrice: string;
  maxPrice: string;
  priceUnits: string;
  lotType: string;
  author: string;
  title: string;
}

export interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onFiltersChange: (encodedFilters: string) => void;
  varieties: Variety[];
}

export interface Filter {
  fieldName: string;
  operator: string;
  value: string;
}

export interface FieldMapping {
  [key: string]: {fieldName: string; operator: string};
}

export interface CustomCheckboxProps {
  name: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
}

export interface MultipleSelectListComponentProps {
  name: string;
  data: {name: string; value: string}[];
  placeholder: string;
  dataDefault: string[] | undefined;
  onSelect: (selectedValues: string[]) => void;
}

export interface CustomMultipleSelectProps {
  items: string[];
  placeholder: string;
  name: string;
  selectedCheckboxValues?: string[];
}

export type Variety = {
  id: string;
  value: string;
};

type RadioButtonOption = {
  value: string;
  label: string;
};

export interface RadioButtonProps {
  name: string;
  options: RadioButtonOption[];
  defaultValue: string;
}
