import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type TrackLocationButtonProps = {
  disabled?: boolean;
  onPress: () => void;
  text: string;
};

export default function TrackLocationButton(props: TrackLocationButtonProps) {
  const {onPress, text, disabled} = props;

  return (
    <View style={styles.emptyCompContainer}>
      <TouchableOpacity
        style={[
          styles.emptyActionButton,
          {backgroundColor: disabled ? '#c0a171' : '#fa8825'},
        ]}
        onPress={onPress}
        disabled={disabled} hitSlop={40}>
        <Text style={styles.emptyTextAction}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyCompContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyActionButton: {
    borderRadius: 8,
    height: 40,
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
