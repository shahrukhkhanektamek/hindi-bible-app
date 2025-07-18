/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import Button from '../../Components/Button/Button.js';

const BibleReadingOldTestamentScreen = () => {
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
          width="20%"
          gradientType="blue"
          borderRadius={5}
          onPress={() => navigation.navigate('Main')}
        />
        <GradiantButton
          title="Home"
          height="30"
          width="20%"
          gradientType="yellow"
          borderRadius={5}
          onPress={() => navigation.navigate('Home')}
        />
        <GradiantButton
          title="Log Out"
          height="30"
          width="20%"
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
            width="22%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
            onPress={() => navigation.navigate('BibleReadingGenesis')}
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
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
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
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
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
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
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
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
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
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
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
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
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
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
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
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
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
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
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="30"
            width="22%"
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
  },
  topBar: {
    marginTop: 25,
    marginBottom: 5,
  },
  buttonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 10,
    marginBottom: 16,
    marginHorizontal: 15,
  },
});

export default BibleReadingOldTestamentScreen;
