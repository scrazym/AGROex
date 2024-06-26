import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {FC, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {storage} from '../../../screens/HomeScreens/LotList';
import {AppText} from '../..';
import {FieldMapping} from '../../Filters/types';
import {filterStubStyles} from './styles/filterStubStyle';

export const FilterStub: FC<FilterStubProps> = ({title, onClose}) => {
  const [newtitle, setTitle] = useState({});
  const [change, setChange] = useState(false);
  const handleDelete = () => {
    const storedFiltersFromMMKV = storage.getString('selectedFilters');

    if (
      storedFiltersFromMMKV &&
      JSON.parse(storedFiltersFromMMKV).fieldName == 'title'
    ) {
      storage.set('selectedFilters', JSON.stringify({...newtitle, value: ''}));
      onClose('');
    } else if (
      storedFiltersFromMMKV &&
      JSON.parse(storedFiltersFromMMKV).title
    ) {
      storage.set('selectedFilters', JSON.stringify({...newtitle, title: ''}));
      const fieldMapping: FieldMapping = {
        title: {fieldName: 'title', operator: 'eq'},
        minQuantity: {fieldName: 'quantity', operator: 'gte'},
        maxQuantity: {fieldName: 'quantity', operator: 'lte'},
        sizeLower: {fieldName: 'sizeLower', operator: 'gte'},
        sizeUpper: {fieldName: 'sizeUpper', operator: 'lte'},
        minPrice: {fieldName: 'price', operator: 'gte'},
        maxPrice: {fieldName: 'price', operator: 'lte'},
      };
      const newArr = [] as Array<ObjFieldProps>;

      Object.entries(newtitle).forEach(([fieldName, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== '' &&
          !(Array.isArray(value) && value.length === 0) &&
          fieldName !== 'title'
        ) {
          if (Array.isArray(value)) {
            value.forEach(val => {
              const {fieldName: apiFieldName, operator} =
                fieldMapping[fieldName] || {};
              newArr.push({
                fieldName: apiFieldName || fieldName,
                operator: operator || 'eq',
                value: val,
              });
            });
          } else {
            const {fieldName: apiFieldName, operator} =
              fieldMapping[fieldName] || {};
            newArr.push({
              fieldName: apiFieldName || fieldName,
              operator: operator || 'eq',
              value,
            });
          }
        }
      });

      const stringNew = JSON.stringify(newArr);
      const encodedFilters = encodeURIComponent(stringNew);
      onClose(encodedFilters);
    }
    setChange(!change);
  };
  useEffect(() => {
    const storedFiltersFromMMKV = storage.getString('selectedFilters');
    storedFiltersFromMMKV && setTitle(JSON.parse(storedFiltersFromMMKV));
  }, [change]);
  return (
    <View style={filterStubStyles.wrapper}>
      <View style={filterStubStyles.textWrapper}>
        <AppText ellipsizeMode="tail" numberOfLines={1} variant="label16_400">
          {title}
        </AppText>
      </View>
      <TouchableOpacity onPress={() => handleDelete()}>
        <FontAwesomeIcon size={15} icon={faXmark} />
      </TouchableOpacity>
    </View>
  );
};

type FilterStubProps = {
  title: string;
  onClose: (e: string) => void;
};
type ObjFieldProps = {fieldName: string; operator: string; value: string};
