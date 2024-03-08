declare module 'types' {
  export type Error = {
    code: number;
    message: string;
    PERMISSION_DENIED: number;
    POSITION_UNAVAILABLE: number;
    TIMEOUT: number;
  };

  export type LocationInfo = {
    latitude: number;
    longitude: number;
  };

  export type Position = {
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

  export type Notification = {
    title: string,
    message: string,
  }
}
