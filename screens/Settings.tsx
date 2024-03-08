import {
  Keyboard,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useTrackingConfig} from '../hooks/useTrackingConfig';
import {DEFAULT_TIME_FREQUENCY, MAX_TRACKING_TIME} from '../utils/constant';
import {SectionSeparator} from '../modules/common-components';

export const SettingsScreen = () => {
  const [timeFrequency, setTimeFrequency] = useState(DEFAULT_TIME_FREQUENCY);
  const [maxStopMovingTime, setMaxStopMovingTime] = useState(MAX_TRACKING_TIME);

  const [disabledApplyButton, setDisabledApplyButton] = useState(false);
  const [
    disabledApplyMaxStopMovingButton,
    setDisabledApplyMaxStopMovingButton,
  ] = useState(false);

  const {trackingConfig, setTrackingConfig} = useTrackingConfig();

  const toggleNotiSwitch = () => {
    setTrackingConfig(prev => ({
      ...prev,
      isEnabledNotification: !prev.isEnabledNotification,
    }));
  };

  const onChangeTimeFrequency = (input: string) => {
    const number = Number(input);
    setTimeFrequency(number);

    if (isNaN(number) || number > MAX_TRACKING_TIME || number < 1000 || number > maxStopMovingTime) {
      setDisabledApplyButton(true);
      return;
    }
    setDisabledApplyButton(false);
  };

  const onChangeMaximumStopMovingTime = (input: string) => {
    const number = Number(input);
    setMaxStopMovingTime(number);

    if (isNaN(number) || number < 1000 || number < timeFrequency ) {
      setDisabledApplyMaxStopMovingButton(true);
      return;
    }
    setDisabledApplyMaxStopMovingButton(false);
  };

  const applyTimeFrequency = () => {
    setTrackingConfig(prev => ({
      ...prev,
      timeFrequency,
    }));
    setDisabledApplyButton(true);
    Keyboard.dismiss();
  };
  
  const applyMaxStopMovingTime = () => {
    setTrackingConfig(prev => ({
      ...prev,
      maxStopMovingTime,
    }));
    setDisabledApplyMaxStopMovingButton(true);
    Keyboard.dismiss();
  };

  const resetToDefault = () => {
    setTimeFrequency(DEFAULT_TIME_FREQUENCY);
    setMaxStopMovingTime(MAX_TRACKING_TIME);
    setTrackingConfig({
      isEnabledNotification: true,
      timeFrequency: DEFAULT_TIME_FREQUENCY,
      maxStopMovingTime: MAX_TRACKING_TIME,
    });
    setDisabledApplyButton(false);
    setDisabledApplyMaxStopMovingButton(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={[styles.settingTile, styles.toggleSettingContainer]}>
          <Text>Toggle Notification</Text>
          <Switch
            trackColor={{false: '#767577', true: '#fa8825'}}
            thumbColor={
              trackingConfig.isEnabledNotification ? '#fff' : '#fa8825'
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNotiSwitch}
            value={trackingConfig.isEnabledNotification}
          />
        </View>
        <SectionSeparator />
        <View style={styles.settingTile}>
          <Text>{'Time frequency \n(in ms)'}</Text>
          <View style={styles.updatingTimeContainer}>
            <TextInput
              style={styles.timeInput}
              keyboardType="number-pad"
              textAlign="center"
              onChangeText={onChangeTimeFrequency}
              value={timeFrequency.toString()}></TextInput>
            <TouchableOpacity
              style={[
                styles.applyTimeButton,
                {
                  backgroundColor: disabledApplyButton ? '#c0a171' : '#fa8825',
                },
              ]}
              onPress={applyTimeFrequency}
              disabled={disabledApplyButton}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SectionSeparator />
        <View style={styles.settingTile}>
          <Text>{'Maximum stop \nmoving time (in ms)'}</Text>
          <View style={styles.updatingTimeContainer}>
            <TextInput
              style={styles.timeInput}
              keyboardType="number-pad"
              textAlign="center"
              onChangeText={onChangeMaximumStopMovingTime}
              value={maxStopMovingTime.toString()}></TextInput>
            <TouchableOpacity
              style={[
                styles.applyTimeButton,
                {
                  backgroundColor: disabledApplyMaxStopMovingButton
                    ? '#c0a171'
                    : '#fa8825',
                },
              ]}
              onPress={applyMaxStopMovingTime}
              disabled={disabledApplyMaxStopMovingButton}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SectionSeparator />
        <View style={[styles.settingTile, {justifyContent: 'center'}]}>
          <TouchableOpacity style={styles.resetButton} onPress={resetToDefault}>
            <Text style={styles.resetText}>Reset to default settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#b4bbb4',
  },
  settingTile: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  toggleSettingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInput: {
    height: 40,
    width: 100,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  resetButton: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fa8825',
  },
  resetText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  updatingTimeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  applyTimeButton: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 80,
  },
  applyText: {
    fontSize: 15,
    color: '#ffffff',
  },
});
