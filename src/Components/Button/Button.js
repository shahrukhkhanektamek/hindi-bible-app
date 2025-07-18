import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({
  title,
  onPress,
  backgroundColor = '#007BFF',
  color = '#fff',
  width = '100%',
  height = 40,
  borderColor = '#000',
  borderWidth = 0,
  borderRadius = 5,
  fontSize = 14,
  fontWeight = '500',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, width, height, borderColor, borderWidth, borderRadius },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color, fontSize, fontWeight }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;
