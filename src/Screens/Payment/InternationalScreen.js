/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import { Text } from '@react-navigation/elements';
import COLORS from '../../Constants/Colors.js';

const InternationalScreen = () => {
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
          <Text style={{ color: 'yellow', fontSize: 16, textAlign: 'center' }}>Aap 1 ya 1 se zyaada saal select kar sakte hai.</Text>
          <Text style={{ color: COLORS.white, fontSize: 16, textAlign: 'center' }}>Yoc can select 1 or more years.</Text>
        </View>
        <View style={styles.button}>
          <GradiantButton
            title="Select Years"
            height="40"
            width="40%"
            fontSize={16}
            gradientType="orange"
            borderRadius={5}
            onPress={() => navigation.navigate('Pay')}
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
    backgroundColor: BACKGROUND_COLORS.darkRed,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.black,
    marginHorizontal: 20,
    rowGap: 20,
  },
});

export default InternationalScreen;
