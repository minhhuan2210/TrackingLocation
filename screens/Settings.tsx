import {StyleSheet, Switch, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

export const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={[styles.settingTile, styles.toggleSettingContainer]}>
        <Text>Toggle Notification</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.settingTile}>
        <Text>Change tracking time frequeny</Text>
        <TextInput
          style={styles.timeInput}
          placeholder="please input your config time here..."
          keyboardType="numeric"></TextInput>
      </View>
      <View style={[styles.settingTile, styles.toggleSettingContainer]}>
        <Text>Dark Mode</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.settingTile}>
        <Text style={styles.resetText}>Reset to default settings</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  settingTile: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleSettingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  timeInput: {
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  resetText: {
    fontSize: 30,
    color: 'red',
  },
});
