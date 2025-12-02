import { View, StyleSheet, Text, ScrollView } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const OneDayFreeTrialScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.homeButton}>
        <GradiantButton
          title="Home"
          height="35"
          width="25%"
          gradientType="yellow"
          borderRadius={5}
          fontSize={16}
          onPress={() => navigation.navigate('Home')}
        />
      </View>

      <View style={styles.middleSection}>
        <View style={styles.section}>
          <Text style={styles.title}>Show Case</Text>
          <Text style={styles.text}>Sabhi years ka uploaded content dekhne ke liye neeche show case button par click kare.</Text>
          <Icon name="long-arrow-down" style={{textAlign:'center',marginTop:20}} size={40} color="yellow" />
        </View>
      </View>

      <View style={styles.bottomButton}>
        <GradiantButton
          title="Show Case"
          height="40"
          width="30%"
          gradientType="orange"
          borderRadius={5}
          fontSize={14}
          onPress={() => navigation.navigate('Language',{show_case:1})}
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
    marginBottom: 30,
  },
  homeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  middleSection: {
    backgroundColor: BACKGROUND_COLORS.darkRed,
    margin: 20,
    padding: 20,
    paddingBottom:0,
    borderRadius: 5,
  },
  section: {
    marginBottom: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.white,
  },
  title: {
    color: COLORS.goldenYellow,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  bottomButton: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OneDayFreeTrialScreen;
