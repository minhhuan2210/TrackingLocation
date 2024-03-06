import {
  FlatList,
  Image,
  Linking,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {IconMap} from '../assets';
import Geolocation from '@react-native-community/geolocation';
import PushNotification from 'react-native-push-notification';

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

type PositionOptions = {
  timeout?: number;
  maximumAge?: number;
  enableHighAccuracy?: boolean;
};

const HomeScreen = () => {
  const [data, setData] = useState<LocationInfo[]>([]);
  const [currentLocation, setCurrentLocation] = useState<LocationInfo>({
    latitude: 0,
    longitude: 0,
  });

  const requestLocationPermission = () => {
    // try {
    //   const isGranted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     {
    //       title: 'Location Permission',
    //       message: 'this app needs access to your location',
    //       buttonPositive: 'Ok',
    //       buttonNegative: 'Cancel',
    //       buttonNeutral: 'Ask me later',
    //     },
    //   );

    //   if (isGranted === PermissionsAndroid.RESULTS.GRANTED) {
    //     console.log('success');
    //   } else {
    //     console.log('permission denied');
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    Geolocation.requestAuthorization(
      (success: any) => {
        console.log('success', success);
      },
      (error: Error) => {
        console.log('permission denied', JSON.stringify(error, null, 2));
      },
    );
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position: Position) => {
        const {latitude, longitude} = position.coords;
        setData(prev => [...prev, {latitude, longitude}]);
        setCurrentLocation({latitude, longitude});
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

  const openGoogleMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${currentLocation.latitude},${currentLocation.longitude}`;
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
          <Pressable hitSlop={40} onPress={openGoogleMap}>
            <Image style={styles.image} source={IconMap}></Image>
          </Pressable>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.actionItem}>
            <Text>A</Text>
          </Pressable>
          <Pressable style={styles.actionItem}>
            <Text>B</Text>
          </Pressable>
          <Pressable style={styles.actionItem}>
            <Text>C</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const sendNotification = () => {
    PushNotification.localNotification({
      title: 'Stop Moving Detected',
      message:
        "Hey, it's seems that you're stop moving. \n" +
        'Please tap on this notification to stop sharing your location with the app.',
      autoCancel: false,
    });
  };

  const activeTrackingLocation = () => {
    requestLocationPermission();
    let timeout = 0;
    const maximumAge = 10 * 1000; // 10 mins

    const id = setInterval(() => {
      getCurrentLocation();
      timeout += 8000;
      console.log('timeout', timeout);
      if (timeout >= maximumAge) {
        sendNotification();
        clearInterval(id);
      }
    }, 8000);
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyCompContainer}>
        <Pressable
          style={styles.emptyActionButton}
          onPress={activeTrackingLocation}>
          <Text style={styles.emptyTextAction}>Start tracking location</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 16,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 20,
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
    justifyContent: 'space-around',
    marginTop: 30,
  },
  actionItem: {
    borderRadius: 8,
    height: 30,
    width: 50,
    borderWidth: 1,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCompContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyActionButton: {
    borderRadius: 16,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  emptyTextAction: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
