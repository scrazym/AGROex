import {
  faChevronLeft,
  faMagnifyingGlass,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC, useState} from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

import {Colors} from '../../constants/Colors';
import {InputSearch} from '..';
import {AppText} from '../AppText/AppText';
import {styles} from './style';

interface CustomHeaderProps {
  image?: ImageSourcePropType;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  text?: string;
  onSearch?: (encodedFilters: string) => void;
}

const CustomHeader: FC<CustomHeaderProps> = ({
  image,
  onPress,
  text,
  onSearch,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const fadeTitle = useSharedValue(1);

  const fadeAnim = useSharedValue(0);
  const fadeIn = () => {
    fadeAnim.value = withTiming(fadeAnim.value + 1, {
      duration: 1700,
    });
    fadeTitle.value = withTiming(fadeTitle.value - 1, {
      duration: 900,
    });
  };

  const fadeOut = () => {
    fadeAnim.value = withTiming(fadeAnim.value - 1, {
      duration: 900,
    });
    fadeTitle.value = withTiming(fadeTitle.value + 1, {
      duration: 1500,
    });
  };

  const handleToggle = () => {
    setTimeout(() => {
      setIsClicked(!isClicked);
    }, 500);
    !isClicked ? fadeIn() : fadeOut();
  };
  return (
    <View style={styles.container}>
      {!isClicked ? (
        <Animated.View style={[styles.content, {opacity: fadeTitle}]}>
          {image ? (
            <Image source={image} />
          ) : (
            <TouchableOpacity onPress={onPress}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                size={20}
                color={Colors.GRAY_PRIMARY}
              />
            </TouchableOpacity>
          )}
          <AppText ellipsizeMode="tail" numberOfLines={1}>
            {text}
          </AppText>
        </Animated.View>
      ) : (
        <InputSearch opacity={fadeAnim} onSearch={onSearch} />
      )}
      <TouchableOpacity onPress={() => handleToggle()}>
        <FontAwesomeIcon
          icon={!isClicked ? faMagnifyingGlass : faXmark}
          size={24}
          color={Colors.GRAY_PRIMARY}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
