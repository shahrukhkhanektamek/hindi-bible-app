/* eslint-disable comma-dangle */
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';

const PayNowScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.button}>
        <GradiantButton
          title="BACK"
          height="30"
          width="25%"
          fontSize={16}
          gradientType="yellow"
          borderRadius={5}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.moneyContainer}>
          <Text style={styles.text}>CONFIRM PAY</Text>
          <Text style={styles.text}>Rs. 1/-</Text>
        </View>
        <View style={styles.buttonContainer}>
          <GradiantButton
            title="Confirm Pay"
            height="60"
            width="40%"
            fontSize={14}
            fontWeight={500}
            gradientType="vibrantGreen"
            borderRadius={5}
            onPress={() => navigation.navigate('ConfirmPay')}
          />
          <GradiantButton
            title="Cancel"
            height="60"
            width="40%"
            fontSize={14}
            fontWeight={500}
            gradientType="vibrantRed"
            borderRadius={5}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.primary,
  },
  topBar: {
    marginTop: 25,
  },
  button: {
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: BACKGROUND_COLORS.warmTan,
    marginTop: 20,
  },
  moneyContainer: {
    backgroundColor: BACKGROUND_COLORS.deepBrown,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    marginTop: 40,
    marginHorizontal: 50,
    justifyContent: 'center',
    height: 250,
  },
  text: {
    color: COLORS.white,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 20,
    marginBottom: 30,
    marginTop: 20,
    marginHorizontal: 50,
  }
});

export default PayNowScreen;
