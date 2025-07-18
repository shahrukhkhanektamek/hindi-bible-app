import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import VideoPlayer from './VideoPlayer';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';
import COLORS from '../../Constants/Colors';
import Button from '../Button/Button';
import TopBarPrimary from '../TopBar/TopBarPrimary';
import GradiantButton from '../Button/GradientButton';

const SingleVideo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { videoSource, thumbnail, frameSource, buttonTitle, title, description, publishedOn } = route.params || {};

  return (
    <View style={styles.container}>
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
          title={buttonTitle}
          height="40"
          width="43%"
          fontSize={15}
          backgroundColor={BACKGROUND_COLORS.green}
          borderRadius={5}
        />
      </View>
      <View style={styles.videoWrapper}>
        <View style={styles.videoContainer}>
          <VideoPlayer
            videoSource={videoSource}
            thumbnail={thumbnail}
            frameSource={frameSource}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.publishedOn}>{publishedOn}</Text>
        <View style={styles.descriptionContainer}>
          <Button
            title="Video Description"
            height="30"
            width="55%"
            borderRadius={3}
            color={COLORS.white}
            backgroundColor="#068aca"
          />
          <Text style={styles.description}>{description}</Text>
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
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  buttonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  videoWrapper: {
    backgroundColor: BACKGROUND_COLORS.deepBrown,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 20,
  },
  videoContainer: {
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    marginTop: 10,
  },
  publishedOn: {
    color: '#ddd',
    fontSize: 13,
    marginTop: 5,
  },
  descriptionContainer: {
    backgroundColor: BACKGROUND_COLORS.white,
    padding: 16,
    paddingTop: 10,
    marginTop: 10,
    borderRadius: 3,
  },
  description: {
    fontSize: 15,
    marginTop: 10,
    color: '#555',
  },
});

export default SingleVideo;
