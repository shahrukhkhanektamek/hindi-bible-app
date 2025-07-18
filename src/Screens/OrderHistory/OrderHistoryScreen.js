import { View, ScrollView, StyleSheet, Text, SafeAreaView } from 'react-native';
import React from 'react';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';
import Button from '../../Components/Button/Button';
import GradiantButton from '../../Components/Button/GradientButton';
import { useNavigation } from '@react-navigation/native';

const OrderHistoryScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.heading}>
            <View style={styles.headingItem}>
              <Button
                title="PURCHASE"
                height="35"
                width="100%"
                fontSize={14}
                backgroundColor={BACKGROUND_COLORS.darkRed}
                borderRadius={0}
                borderColor="#000"
                borderWidth={1}
              />
            </View>
            <View style={styles.headingItem}>
              <Button
                title="EXPIRY"
                height="35"
                width="100%"
                fontSize={14}
                backgroundColor={BACKGROUND_COLORS.darkRed}
                borderRadius={0}
                borderColor="#000"
                borderWidth={1}
              />
            </View>
            <View style={styles.headingItem}>
              <Button
                title="AMOUNT"
                height="35"
                width="100%"
                fontSize={14}
                backgroundColor={BACKGROUND_COLORS.darkRed}
                borderRadius={0}
                borderColor="#000"
                borderWidth={1}
              />
            </View>
          </View>

          {[1].map((_, index) => (
            <View style={styles.content} key={index}>
              <View style={styles.contentItem}>
                <Text style={styles.contentText}>26/04/2025</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.contentText}>26/04/2026</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.contentText}>Rs. 300</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title="Close"
            height="45"
            width="90%"
            gradientType="green"
            borderRadius={5}
            fontSize={16}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    borderWidth: 5,
    borderColor: BACKGROUND_COLORS.darkRed,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  headingItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  contentItem: {
    flex: 1,
    alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default OrderHistoryScreen;
