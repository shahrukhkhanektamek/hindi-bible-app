import React from 'react';
import { View, ImageBackground, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const frameSize = width * 0.8;

const Video = ({ thumbnail, frameSource, onPress }) => {

  return (
    <View style={styles.frameContainer}>
      <ImageBackground source={frameSource} style={styles.imageFrame} resizeMode="cover">
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.imageWrapper} onPress={onPress}>
            <Image source={thumbnail} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
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
  imageFrame: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '93%',
    height: '88%',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Video;
