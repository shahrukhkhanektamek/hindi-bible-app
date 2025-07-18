/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import { Text } from '@react-navigation/elements';
import COLORS from '../../Constants/Colors.js';

const PayScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={[styles.button, { marginBottom: 30 }]}>
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

      <View style={styles.buttonContainer}>
        <View style={styles.textContainer}>
          <View style={styles.textBox1}>
            <Text style={[styles.textStyle, { color: COLORS.darkRed, fontWeight: '700' }]}>Rs. 1200 ($14.00)</Text>
            <Text style={[styles.textStyle, { color: COLORS.black }]}>ONE YEAR FEES</Text>
            <Text style={[styles.textStyle, { color: COLORS.black }]}>एक वर्ष की फीस</Text>
          </View>
          <View style={styles.textBox2}>
            <Text style={[styles.textStyle, { color: COLORS.goldenYellow }]}>YOUR PACKAGE PERIOD</Text>
            <Text style={styles.textStyle}>24-02-2025 - 23-02-2026</Text>
          </View>
        </View>
        <View style={styles.button}>
          <GradiantButton
            title="Pay"
            height="35"
            width="32%"
            fontSize={16}
            gradientType="orange"
            borderRadius={5}
            onPress={() => navigation.navigate('PaymentGateway')}
          />
        </View>
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
  buttonContainer: {
    rowGap: 40,
  },
  textContainer: {
    padding: 20,
    marginHorizontal: 10,
    rowGap: 20,
    backgroundColor: BACKGROUND_COLORS.lightGreen,
  },
  textBox1: {
    backgroundColor: BACKGROUND_COLORS.paleYellow,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 16,
  },
  textBox2: {
    backgroundColor: BACKGROUND_COLORS.darkRed,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 16,
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
    color: COLORS.white,
  },
});

export default PayScreen;
