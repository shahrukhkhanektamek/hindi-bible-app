import { StyleSheet, View, ScrollView, Text } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import COLORS from '../../Constants/Colors.js';

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.topText}>Thank You For Your Contribution To Our Ministry!</Text>
          <Text style={styles.topText}>हमारी सेवकाई में आपके योगदान के लिए धन्यवाद!</Text>
          <Text style={styles.topText}>RS. 1.00</Text>
          <Text style={styles.bottomText}>Your contribution status is success.</Text>
          <Text style={styles.bottomText}>Transaction id</Text>
          <Text style={styles.bottomText}>hgtt1234gft7890</Text>
          <View style={styles.homeButton}>
            <GradiantButton
              title="Home"
              height="35"
              width="40%"
              fontSize={14}
              fontWeight={500}
              gradientType="yellow"
              borderRadius={5}
              onPress={() => navigation.navigate('Home')}
            />
          </View>
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
  mainContainer: {
    backgroundColor: BACKGROUND_COLORS.warmTan,
    marginTop: 20,
  },
  infoContainer: {
    backgroundColor: BACKGROUND_COLORS.deepBrown,
    borderWidth: 1,
    borderRadius: 10,
    margin: 30,
    padding: 20,
    paddingHorizontal: 30,
  },
  topText: {
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  bottomText: {
    fontSize: 14,
    color: COLORS.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  homeButton: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
});

export default PaymentSuccessScreen;
