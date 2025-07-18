import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';

const ConfirmPayScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.scannerContainer}>
        <Image style={styles.scanner} source={require('../../Assets/scanner.png')} />
      </View>

      <View style={styles.success}>
        <GradiantButton
          title="SUCCESS"
          height="40"
          width="30%"
          fontSize={16}
          gradientType="green"
          borderRadius={5}
          onPress={() => navigation.navigate('PaymentSuccess')}
        />
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
  scannerContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
  },
  scanner: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  success: {
    marginTop: 50,
    alignItems: 'center',
  },
});

export default ConfirmPayScreen;
