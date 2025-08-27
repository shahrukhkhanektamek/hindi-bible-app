// SingleImage.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';

const SingleImage = ({ route }) => {
  const { image } = route.params; // sirf ek image aayegi

  const imageUrls = [
    {
      url: image, // single url
      props: {},
    },
  ];

  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={imageUrls}
        enableSwipeDown={true}
        backgroundColor={BACKGROUND_COLORS.black}
        saveToLocalByLongPress={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.black,
  },
});

export default SingleImage;
