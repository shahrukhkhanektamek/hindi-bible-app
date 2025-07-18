import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import Button from '../../Components/Button/Button.js';

const TopicPlaylistScreen = () => {
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
          title="Videos"
          height="40"
          width="25%"
          fontSize={15}
          backgroundColor={BACKGROUND_COLORS.green}
          borderRadius={5}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <GradiantButton
            title="Salvation"
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title="Tongues"
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title="Healing"
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <GradiantButton
            title="Holy Spirit"
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title="Rapture"
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title="Marriage"
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title="Resurrection"
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title="Crucifixtion"
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title="Baptism"
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title="Stree"
            title2="Prachark"
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title="Shaitan"
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title="Gifts Of"
            title2="Holy Spirit"
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          />
          <GradiantButton
            title=""
            height="45"
            width="30%"
            gradientType="orange"
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
    marginHorizontal: 16,
  },
});

export default TopicPlaylistScreen;
