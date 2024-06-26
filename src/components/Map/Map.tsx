import {
  faLocationDot,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import React, {FC, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';

import {Colors} from '../../constants/Colors';
import {AppText} from '..';
import {textColorStyles, textTypographyStyles} from '../AppText/styles';
import {styles} from './styles';

interface MapProps {
  country?: string;
  city?: string;
}

const Map: FC<MapProps> = ({country, city}) => {
  const [region, setRegion] = useState<Region>({
    latitude: 53.7098,
    longitude: 27.9534,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });
  const [markerCoordinate, setMarkerCoordinate] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 53.7098,
    longitude: 27.9534,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          `${country}, ${city}`,
        )}&key=${process.env.GOOGLE_API_KEY}&type=locality`;
        const response = await axios.get(geocodeUrl);
        const data = response.data;

        if (data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          });
          setMarkerCoordinate({
            latitude: location.lat,
            longitude: location.lng,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [country, city]);

  const handleZoomIn = () => {
    if (region) {
      const newRegion = {
        ...region,
        latitudeDelta: region.latitudeDelta / 2,
        longitudeDelta: region.longitudeDelta / 2,
      };
      setRegion(newRegion);
    }
  };

  const handleZoomOut = () => {
    if (region) {
      const newRegion = {
        ...region,
        latitudeDelta: region.latitudeDelta * 2,
        longitudeDelta: region.longitudeDelta * 2,
      };
      setRegion(newRegion);
    }
  };

  const handleMapPress = (event: any) => {
    const {coordinate} = event.nativeEvent;
    setMarkerCoordinate(coordinate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textBlock}>
        <FontAwesomeIcon icon={faLocationDot} style={styles.icon} />
        <AppText
          style={[
            textTypographyStyles.label12_400,
            textColorStyles[Colors.BLACK_PRIMARY],
          ]}>
          {`${country}, ${city}`}
        </AppText>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={region => setRegion(region)}
        onPress={handleMapPress}>
        {region && <Marker coordinate={markerCoordinate} />}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleZoomIn} style={styles.zoomButton}>
          <FontAwesomeIcon icon={faPlus} style={styles.btnZoomIn} size={12} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleZoomOut} style={styles.zoomButton}>
          <FontAwesomeIcon icon={faMinus} style={styles.btnZoomOut} size={12} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Map;
