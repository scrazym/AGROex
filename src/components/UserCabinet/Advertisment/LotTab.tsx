import {Text, TouchableOpacity} from 'react-native';

import {AdverComponentsStyles} from './styles';
import {TabItemsProps} from './types';

export const LotsTab = ({
  item,
  onPress,
  borderBottomColor,
  textColor,
}: TabItemsProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[AdverComponentsStyles.tab, {borderBottomColor}]}>
    <Text style={[AdverComponentsStyles.title, {color: textColor}]}>
      {item.title}
    </Text>
  </TouchableOpacity>
);
