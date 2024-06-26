import {Image, View} from 'react-native';

import {Colors} from '../../../constants/Colors';
import {AppText} from '../..';
import {ListStubStyle} from './styles/listStubStyles';

export const ListStub = () => {
  return (
    <View style={ListStubStyle.mainWrapper}>
      <AppText
        variant="label24_400"
        style={ListStubStyle.text}
        color={Colors.TURQUOISE_PRIMARY}>
        Sorry, there are no lots for your request...
      </AppText>
      <View>
        <Image
          style={ListStubStyle.img}
          source={{
            uri: 'https://tenor.com/ru/view/samuel-run-leave-me-alone-bichicho-correndo-gif-19839676.gif',
          }}
        />
      </View>
    </View>
  );
};
