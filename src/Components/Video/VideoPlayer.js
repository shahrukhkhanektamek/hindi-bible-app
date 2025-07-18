import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const frameSize = width * 0.8;

const VideoPlayer = ({ videoSource, thumbnail, frameSource }) => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <View style={styles.frameContainer}>
      <ImageBackground source={frameSource} style={styles.videoFrame} resizeMode="cover">
        <View style={styles.videoContainer}>
          {!playVideo ? (
            <TouchableOpacity onPress={() => setPlayVideo(true)} style={styles.videoWrapper}>
              <Image source={thumbnail} style={styles.video} resizeMode="cover" />
              <View style={styles.playIconContainer}>
                <Icon name="play-circle" size={50} color="white" />
              </View>
            </TouchableOpacity>
          ) : (
            <Video source={videoSource} style={styles.video} resizeMode="cover" controls paused={false} />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  frameContainer: {
    width: frameSize,
    aspectRatio: 16 / 9,
  },
  videoFrame: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    width: '93%',
    height: '88%',
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default VideoPlayer;
