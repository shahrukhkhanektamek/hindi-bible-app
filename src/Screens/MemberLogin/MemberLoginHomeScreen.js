import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import GradientButton from '../../Components/Button/GradientButton.js';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import COLORS from '../../Constants/Colors.js';

const MemberLoginHomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>
      <View style={styles.button}>
        <GradientButton
          title="Edit Profile"
          height="45"
          width="35%"
          gradientType="orange"
          borderRadius={5}
          fontSize={16}
          fontWeight="500"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <GradientButton
          title="Log In"
          height="45"
          width="35%"
          gradientType="orange"
          borderRadius={5}
          fontSize={16}
          fontWeight="500"
          onPress={() => navigation.navigate('MemberLogin')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.primary,
    padding: 10,
  },
  topBar: {
    marginTop: 12,
    marginBottom: 30,
  },
  heading: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.deepMossGreen,
    textShadowColor: COLORS.shadowColor,
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 35,
    marginTop: 30,
  },
});

export default MemberLoginHomeScreen;
