/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';

const LoginSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.button}>
        <GradiantButton
          title="Home"
          height="35"
          width="30%"
          fontSize={16}
          gradientType="yellow"
          borderRadius={5}
          onPress={() => navigation.navigate('Home')}
        />
      </View>

      <View style={styles.messageContainer}>
        <Text style={[styles.text, { marginBottom: 50 }]}>YOUR FREE TRIAL WILL EXPIRE BY <Text style={{ color: COLORS.goldenYellow }}>20:41</Text> TOMORROW</Text>
        <Text style={styles.text}>आपका फ्री ट्रायल कल <Text style={{ color: COLORS.goldenYellow }}>20:41</Text> को समाप्त हो जाएगा</Text>
      </View>

      <View style={styles.button}>
        <GradiantButton
          title="OK"
          height="35"
          width="30%"
          fontSize={16}
          gradientType="orange"
          borderRadius={5}
          onPress={() => navigation.navigate('Main')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.primary,
  },
  topBar: {
    marginTop: 25,
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
  },
  messageContainer: {
    backgroundColor: BACKGROUND_COLORS.skyBlue,
    borderWidth: 1,
    borderColor: COLORS.black,
    paddingHorizontal: 16,
    paddingVertical: 50,
    marginVertical: 25,
    marginHorizontal: 30,
  },
  text: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LoginSuccessScreen;
