import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';

import {Home, SettingsScreen} from './screens';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const height = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{height}}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
