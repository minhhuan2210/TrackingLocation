import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';

import {Home, SettingsScreen} from './screens';
import {NavigationContainer} from '@react-navigation/native';
import {TrackingConfig, TrackingContext} from './contexts/TrackingContext';
import { DEFAULT_TIME_FREQUENCY } from './utils/constant';
import { NotificationService } from './services/NotificationService';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const height = Dimensions.get('window').height;

  useEffect(() => {
    NotificationService.init();
  }, []);

  const [trackingConfig, setTrackingConfig] = useState<TrackingConfig>({
    isEnabledNotification: true,
    timeFrequency: DEFAULT_TIME_FREQUENCY,
  });
  const value = {trackingConfig, setTrackingConfig};

  return (
    <SafeAreaView style={{height, backgroundColor: '#b4bbb4'}}>
      <TrackingContext.Provider value={value}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: 'orange',
              tabBarLabelStyle: {
                fontSize: 15,
              },
              tabBarLabelPosition: 'beside-icon',
              tabBarActiveBackgroundColor: '#4d5461',
              headerShown: false,
              unmountOnBlur: true,
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </TrackingContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
