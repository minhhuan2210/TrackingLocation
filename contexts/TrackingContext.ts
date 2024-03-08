import {createContext} from 'react';

export type TrackingConfig = {
  isEnabledNotification: boolean;
  timeFrequency: number;
  maxStopMovingTime: number;
};

type Context = {
  trackingConfig: TrackingConfig;
  setTrackingConfig: React.Dispatch<
    React.SetStateAction<TrackingConfig>
  >;
};

export const TrackingContext = createContext<Context | undefined>(undefined);
