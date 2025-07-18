import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import COLORS from '../../Constants/Colors';

const TopBarPrimary = () => {
  return (
    <View style={styles.topSection}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={require('../../Assets/cross-icon.png')} />
      </View>
      <View>
        <Text style={styles.heading}>THE GOOD CROSS</Text>
        <Text style={styles.subHeading}>ministry</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    marginBottom: 10,
  },
  icon: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  heading: {
    color: COLORS.goldenBrown,
    fontWeight: '500',
    fontSize: 24,
  },
  subHeading: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.deepMossGreen,
  },
});

export default TopBarPrimary;
