import { StyleSheet, View } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import Button from '../../Components/Button/Button.js';
import Video from '../../Components/Video/Video.js';

const InterviewScreen = () => {
  const navigation = useNavigation();

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
          title="Interview"
          height="35"
          width="25%"
          fontSize={15}
          backgroundColor={BACKGROUND_COLORS.green}
          borderRadius={5}
        />
      </View>
      <View style={styles.videoContainer}>
        <Video
          thumbnail={require('../../Assets/videoThumbnail.jpeg')}
          frameSource={require('../../Assets/videoFrame.jpeg')}
          onPress={() =>
            navigation.navigate('SingleVideo', {
              videoSource: require('../../Assets/myvideo.mp4'),
              thumbnail: require('../../Assets/videoThumbnail.jpeg'),
              frameSource: require('../../Assets/videoFrame.jpeg'),
              buttonTitle: 'Interview',
              title: 'Video 1 - How to learn coding in simple and easy way...',
              publishedOn: '15 February 2025',
              description: 'Exploring the Wonders of Space: A Journey Beyond Earth, Mastering React Native: Build Your First Mobile App, The Secret Life of Ocean Creatures: Underwater Wonders,',
            })
          }
        />
        <Video
          thumbnail={require('../../Assets/videoThumbnail.jpeg')}
          frameSource={require('../../Assets/videoFrame.jpeg')}
          onPress={() =>
            navigation.navigate('SingleVideo', {
              videoSource: require('../../Assets/myvideo.mp4'),
              thumbnail: require('../../Assets/videoThumbnail.jpeg'),
              frameSource: require('../../Assets/videoFrame.jpeg'),
              buttonTitle: 'Interview',
              title: 'Video 2 - How to learn web development to learn web development...',
              publishedOn: '20 March 2025',
              description: 'Historys Greatest Inventions That Changed the World, and 10-Minute Home Workout for a Healthier Lifestyle are some fascinating video titles covering topics from technology to science and personal well-being.',
            })
          }
        />
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
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  videoContainer: {
    alignItems: 'center',
    rowGap: 20,
    marginTop: 20,
  },
});

export default InterviewScreen;
