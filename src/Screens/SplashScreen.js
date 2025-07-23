
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();

export function SplashScreen ({ navigation }) {

  return (
    <View style={styles.container}>
      <Image source={require('../Assets/cross-icon.png')} style={styles.logo} />      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Background color for splash
  },
  logo: {
    width: 150,
    height: 150, // Set the size of the logo
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
