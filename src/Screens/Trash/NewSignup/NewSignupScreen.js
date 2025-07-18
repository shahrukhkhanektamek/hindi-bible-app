import { StyleSheet, View } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';

const NewSignupScreen = () => {
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

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <GradiantButton
            title="INDIA"
            height="40"
            width="45%"
            fontSize={16}
            gradientType="green"
            borderRadius={5}
            onPress={() => navigation.navigate('India')}
          />
        </View>
        <View style={styles.button}>
          <GradiantButton
            title="INTERNATIONAL"
            height="40"
            width="45%"
            fontSize={16}
            gradientType="orange"
            borderRadius={5}
            onPress={() => navigation.navigate('International')}
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
    padding: 10,
  },
  topBar: {
    marginTop: 25,
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonContainer: {
    marginTop: 60,
  },
});

export default NewSignupScreen;
