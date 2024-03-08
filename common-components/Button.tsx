import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type ButtonProps = {
  disabled?: boolean;
  onPress: () => void;
  text: string;
  style?: Record<string, any>;
};

export default function Button(props: ButtonProps) {
  const {onPress, text, disabled, style} = props;

  const _onPress = () => {
    onPress();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: disabled ? '#c0a171' : '#fa8825'},
          style,
        ]}
        onPress={_onPress}
        disabled={disabled}
        hitSlop={40}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
