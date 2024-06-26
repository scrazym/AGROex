import React, {FC, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';

import {Colors} from '../../constants/Colors';
import {EmptyImg} from '../newAd/components/Img/EmptyImg';
import {stylesSlider} from './styles';

interface LotSliderProps {
  url: {
    id: string;
    imageUrl: string;
    title: boolean;
    fileName: string;
    uri: string;
  }[];
}

const LotSlider: FC<LotSliderProps> = ({url}) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (url && url.length > 0) {
      setImageUrl(url[0].imageUrl || url[0].uri);
    } else {
      setImageUrl('');
    }
  }, [url]);

  return (
    <View style={stylesSlider.container}>
      {!imageUrl ? (
        <EmptyImg />
      ) : url.length === 1 ? (
        <Image source={{uri: imageUrl}} style={stylesSlider.image} />
      ) : (
        <LotSwiper url={url} />
      )}
    </View>
  );
};

const LotSwiper: FC<LotSliderProps> = ({url}) => {
  return (
    <Swiper
      dotColor={Colors.WHITE_PRIMARY}
      activeDot={<View style={stylesSlider.activeDot} />}
      style={stylesSlider.wrapper}
      showsButtons={true}
      nextButton={<Text style={stylesSlider.buttonText}>›</Text>}
      prevButton={<Text style={stylesSlider.buttonText}>‹</Text>}>
      {url.map(item => (
        <View key={item.id}>
          <Image
            source={{uri: item.imageUrl || item.uri}}
            style={stylesSlider.image}
          />
        </View>
      ))}
    </Swiper>
  );
};

export default LotSlider;
