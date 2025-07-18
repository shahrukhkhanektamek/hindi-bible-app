/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import Button from '../../Components/Button/Button.js';

const OldTestamentScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>
      <View style={styles.buttonTop}>
        <GradiantButton
          title="Menu"
          height="30"
          width="25%"
          gradientType="blue"
          borderRadius={5}
          onPress={() => navigation.navigate('Main')}
        />
        <GradiantButton
          title="Home"
          height="30"
          width="25%"
          gradientType="yellow"
          borderRadius={5}
          onPress={() => navigation.navigate('Home')}
        />
        <GradiantButton
          title="Log Out"
          height="30"
          width="25%"
          gradientType="red"
          borderRadius={5}
        />
        <GradiantButton
          title="Back"
          height="30"
          width="20%"
          fontSize={16}
          gradientType="purple"
          borderRadius={5}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{ alignItems: 'center' }}>
        <Button
          title="Old Testament"
          height="30"
          width="35%"
          backgroundColor={BACKGROUND_COLORS.green}
          borderRadius={5}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <GradiantButton
            title="Genesis"
            height="30"
            width="20%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
            onPress={() => navigation.navigate('Genesis')}
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="20%"
            gradientType="lightBlue"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
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
    padding: 16,
    paddingVertical: 0,
  },
  topBar: {
    marginTop: 25,
    marginBottom: 5,
  },
  buttonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default OldTestamentScreen;
