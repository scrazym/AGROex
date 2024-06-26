import {FC} from 'react';
import {Image, View} from 'react-native';
import Swiper from 'react-native-swiper';

import {storage} from '../../../App';
import {AppText, ButtonStyled} from '../../components';
import {onBoardingData} from '../../constants/data/onboardingData';
import {onboardingStyles} from './style';

type Props = {
  setEnt: () => void;
};
export const OnboardingScreen: FC<Props> = ({setEnt}) => {
  const handleSetEnter = () => {
    storage.set('firstEnter', 'true');
    setEnt();
  };

  return (
    <View style={onboardingStyles.wrapper}>
      <Swiper loop={false}>
        {onBoardingData.map(item => (
          <View key={item.id} style={onboardingStyles.wrapperItem}>
            <Image source={{uri: item.uri}} style={onboardingStyles.image} />
            <View style={onboardingStyles.textWrapper}>
              <AppText variant="label20_500">{item.title}</AppText>
              <AppText style={onboardingStyles.text} variant="label16_400">
                {item.decr}
              </AppText>
            </View>
            <View style={onboardingStyles.btnWrapper}>
              <ButtonStyled
                variant="label16_400"
                onPress={() => handleSetEnter()}
                style="borderNone"
                title={item.btnText}
              />
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};
