import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import Button from '../../Components/Button/Button.js';

const BibleSubjectScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>
      <View style={styles.buttonTop}>
        <GradiantButton
          title="Home"
          height="30"
          width="20%"
          gradientType="yellow"
          borderRadius={5}
          fontSize={15}
          onPress={() => navigation.navigate('Home')}
        />
        <GradiantButton
          title="Menu"
          height="30"
          width="20%"
          gradientType="blue"
          borderRadius={5}
          fontSize={15}
          onPress={() => navigation.navigate('Main')}
        />
        <GradiantButton
          title="Log Out"
          height="30"
          width="20%"
          gradientType="red"
          borderRadius={5}
          fontSize={15}
        />
        <GradiantButton
          title="Back"
          height="30"
          width="20%"
          fontSize={15}
          gradientType="purple"
          borderRadius={5}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Bible Subjects"
          height="35"
          width="35%"
          fontSize={15}
          backgroundColor={BACKGROUND_COLORS.green}
          borderRadius={5}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <GradiantButton
            title="Apologetics"
            height="35"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={13}
            fontWeight="500"
          />
          <GradiantButton
            title="Church History"
            height="35"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={13}
            fontWeight="500"
          />
          <GradiantButton
            title="Bible Ke Saboot"
            height="35"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={13}
            fontWeight="500"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="35"
            width="30%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
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
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
  },
  buttonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 10,
    marginBottom: 16,
    marginHorizontal: 10,
  },
});

export default BibleSubjectScreen;
