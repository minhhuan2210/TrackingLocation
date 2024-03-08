import Geolocation from '@react-native-community/geolocation';
import {Error, Position} from 'types';

class LocationController {
  public requestAuthorization(
    successCallback?: () => void,
    errorCallback?: () => void,
  ): void {
    Geolocation.requestAuthorization(
      (success: any) => {
        console.log('success', success);
        if (successCallback) successCallback();
      },
      (error: Error) => {
        console.log('error happened', JSON.stringify(error, null, 2));
        if (error.PERMISSION_DENIED === 1) {
          if (errorCallback) errorCallback();
        }
      },
    );
  }

  public getCurrentLocation(
    successCallback: ({coords}: Position) => void,
    errorCallback?: () => void,
  ) {
    Geolocation.getCurrentPosition(
      (position: Position) => {
        successCallback(position);
      },
      (error: Error) => {
        console.log('error happened', JSON.stringify(error, null, 2));
        if (errorCallback) errorCallback();
      },
      {
        timeout: 15000,
        maximumAge: 10000,
        enableHighAccuracy: true,
      },
    );
  }
}

export const LocationService = new LocationController();
