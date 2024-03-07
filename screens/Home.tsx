import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {IconMap} from '../assets';
import {useTrackingConfig} from '../hooks/useTrackingConfig';
import {TrackLocationButton} from '../modules/track-location';
import {NotificationService} from '../services/NotificationService';

type LocationInfo = {
  latitude: number;
  longitude: number;
};

type Position = {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
};

type Error = {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
};

const HomeScreen = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [data, setData] = useState<LocationInfo[]>([]);

  const sentNotification = useRef<boolean>(false);
  const id = useRef<NodeJS.Timeout | number>(0);

  const {trackingConfig} = useTrackingConfig();

  const requestLocationPermission = () => {
    Geolocation.requestAuthorization(
      (success: any) => {
        console.log('success', success);
      },
      (error: Error) => {
        console.log('error happened', JSON.stringify(error, null, 2));
        if (error.PERMISSION_DENIED === 1) setIsDisabled(true);
      },
    );
  };

  useEffect(() => {
    if (data.length > 1) {
      const currentLocation = data[data.length - 1];
      const lastLocation = data[data.length - 2];

      if (
        currentLocation.latitude !== lastLocation.latitude ||
        currentLocation.longitude !== lastLocation.longitude
      ) {
        clearTimeout(id.current);
        return;
      }

      if (
        id.current ||
        sentNotification.current ||
        !trackingConfig.isEnabledNotification
      ) {
        return;
      }

      id.current = setTimeout(() => {
        sendNotification();
      }, 10 * 1000);
    }
  }, [data.length]);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position: Position) => {
        const {latitude, longitude} = position.coords;
        setData(prev => [{latitude, longitude}, ...prev]);
      },
      (error: Error) => {
        console.log('error happened', JSON.stringify(error, null, 2));
      },
      {
        timeout: 15000,
        maximumAge: 10000,
        enableHighAccuracy: true,
      },
    );
  };

  const openGoogleMap = (item: LocationInfo) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`;
    Linking.openURL(url);
  };

  const renderItem = ({item}: {item: LocationInfo}) => {
    return (
      <View style={styles.itemContainer} key={'item.id'}>
        <View style={styles.info}>
          <View>
            <Text style={styles.itemText}>latitude: {item.latitude}</Text>
            <Text style={styles.itemText}>longitude: {item.longitude}</Text>
          </View>
          <Pressable hitSlop={40} onPress={() => openGoogleMap(item)}>
            <Image style={styles.image} source={IconMap}></Image>
          </Pressable>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionItem} hitSlop={40}>
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} hitSlop={40}>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} hitSlop={40}>
            <Text style={[styles.actionText,{color: 'red'}]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const sendNotification = () => {
    PushNotification.localNotification({
      title: 'Stop Moving Detected',
      message:
        "Hey, it's seems that you're stop moving. \n" +
        'Please tap here to stop sharing your location with the app.',
    });
    sentNotification.current = true;
  };

  console.log('first');

  const activeTrackingLocation = () => {
    requestLocationPermission();

    if (!isDisabled) {
      // const id = setInterval(() => {
        getCurrentLocation();
      // }, trackingConfig.timeFrequency);

      // NotificationService.saveIntervalId(id);
    }
  };

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <>
          <TrackLocationButton
            onPress={activeTrackingLocation}
            text={'Start tracking location'}
            disabled={isDisabled}
          />
          {isDisabled && (
            <Text
              style={
                styles.errorText
              }>{`Accessing to location services has been denied \nplease allow to use it on in Settings`}</Text>
          )}
        </>
      ) : (
        <FlatList data={data} renderItem={renderItem} />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b4bbb4',
  },
  itemContainer: {
    borderWidth: 2,
    borderColor: '#fa8825',
    borderRadius: 8,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: '#4d5461',
  },
  itemText: {
    fontSize: 20,
    color: '#ffffff',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 20,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 30,
  },
  actionItem: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  actionText: {
    fontWeight: 'bold',
    color: '#fa8825'
  },
  errorText: {
    position: 'absolute',
    bottom: 100,
    left: 30,
  },
});
