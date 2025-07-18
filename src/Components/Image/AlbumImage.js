// AlbumViewerScreen.js
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';

const { width, height } = Dimensions.get('window');

const AlbumImage = ({ route }) => {
  const { images, initialIndex } = route.params;
  const [index, setIndex] = useState(initialIndex);

  const goPrev = () => {
    const newIndex = index === 0 ? images.length - 1 : index - 1;
    setIndex(newIndex);
  };

  const goNext = () => {
    const newIndex = index === images.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <Image source={images[index].image} style={styles.image} />
      <Text style={styles.title}>{images[index].title}</Text>

      <View style={styles.navigation}>
        <TouchableOpacity onPress={goPrev} disabled={index === 0}>
          <Icon
            name="arrow-left"
            size={25}
            color={index === 0 ? 'gray' : 'white'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={goNext} disabled={index === images.length - 1}>
          <Icon
            name="arrow-right"
            size={25}
            color={index === images.length - 1 ? 'gray' : 'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.7,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    top: 320,
  },
});

export default AlbumImage;
