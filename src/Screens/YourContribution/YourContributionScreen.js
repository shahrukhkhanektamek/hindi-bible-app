import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';

const YourContributionScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.button}>
        <GradiantButton
          title="Back"
          height="35"
          width="30%"
          fontSize={16}
          gradientType="purple"
          borderRadius={5}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.payDirectContainer}>
        <Text style={[styles.text, { color: COLORS.burntSienna }]}>डायरेक्ट हमारे बैंक में पैसे भेजने के लिए PAY DIRECT दबाइए</Text>
        <Text style={[styles.text, { color: COLORS.burntSienna }]}>TO SEND MONEY TO OUR BANK DIRECTLY CLICK PAY DIRECT</Text>
      </View>

      <View style={styles.button}>
        <GradiantButton
          title="Pay Direct"
          height="40"
          width="40%"
          fontSize={16}
          gradientType="green"
          borderRadius={5}
          onPress={() => navigation.navigate('PayDirect')}
        />
      </View>

      <View style={[styles.payDirectContainer, { backgroundColor: BACKGROUND_COLORS.darkGold }]}>
        <Text style={styles.text}>APP के ज़रिये पैसे भेजने के लिए PAY THRU APP दबाइए</Text>
        <Text style={styles.text}>TO SEND MONEY TO THRUOUGH APP CLICK PAY THRU APP</Text>
      </View>

      <View style={styles.button}>
        <GradiantButton
          title="Pay Thru App"
          height="40"
          width="40%"
          fontSize={16}
          gradientType="yellow"
          borderRadius={5}
          onPress={() => navigation.navigate('PayThruApp')}
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
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
  },
  payDirectContainer: {
    backgroundColor: BACKGROUND_COLORS.softYellow,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 20,
    marginTop: 30,
    rowGap: 20,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default YourContributionScreen;
