import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {LocationInfo, Position} from 'types';
import {Button} from '../common-components';
import {useTrackingConfig} from '../hooks/useTrackingConfig';
import {LocationItem} from '../modules/track-location';
import {LocationService} from '../services/LocationService';
import {NotificationService} from '../services/NotificationService';

const HomeScreen = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [data, setData] = useState<LocationInfo[]>([]);

  const sentNotification = useRef<boolean>(false);
  const timeoutId = useRef<NodeJS.Timeout | number>(0);

  const {trackingConfig} = useTrackingConfig();

  useEffect(() => {
    if (data.length > 1) {
      const currentLocation = data[data.length - 1];
      const lastLocation = data[data.length - 2];

      if (
        currentLocation.latitude !== lastLocation.latitude ||
        currentLocation.longitude !== lastLocation.longitude
      ) {
        clearTimeout(timeoutId.current);
        return;
      }

      if (
        timeoutId.current ||
        sentNotification.current ||
        !trackingConfig.isEnabledNotification
      ) {
        return;
      }

      timeoutId.current = setTimeout(() => {
        sendNotification();
      }, trackingConfig.maxStopMovingTime);
    }
  }, [data.length]);

  const getLocationSuccessCallback = (position: Position) => {
    const {latitude, longitude} = position.coords;
    setData(prev => [{latitude, longitude}, ...prev]);
  };

  const deleteItem = (index: number) => {
    const arr = [...data];
    arr.splice(index, 1);
    setData(arr);
  };

  const renderItem = ({item, index}: {item: LocationInfo; index: number}) => {
    return (
      <LocationItem item={item} deleteCallback={() => deleteItem(index)} />
    );
  };

  const sendNotification = () => {
    NotificationService.sendNotification({
      title: 'Stop Moving Detected',
      message:
        "Hey, it's seems that you're stop moving. \n" +
        'Please tap here to stop sharing your location with the app.',
    });
    sentNotification.current = true;
  };

  const activeTrackingLocation = () => {
    LocationService.requestAuthorization(...Array(1), () =>
      setIsDisabled(true),
    );

    if (!isDisabled) {
      LocationService.getCurrentLocation(getLocationSuccessCallback);

      const id = setInterval(() => {
        LocationService.getCurrentLocation(getLocationSuccessCallback);
      }, trackingConfig.timeFrequency);

      NotificationService.saveIntervalId(id);
    }
  };

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <>
          <Button
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
  errorText: {
    position: 'absolute',
    bottom: 100,
    left: 30,
  },
});
