// AlbumViewerScreen.js
import React, { useState } from 'react';
import { View, Modal, Dimensions, StyleSheet } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';

const { width, height } = Dimensions.get('window'); 

const SingleImage = ({ route }) => {
  const { images, initialIndex } = route.params;
  const [index, setIndex] = useState(initialIndex);

  // Convert your image array into format required by ImageViewer
  const imageUrls = images.map(img => ({
    url: img.image, // full image url
    props: {},      // can add props if needed
  }));

  return ( 
    <View style={styles.container}>
      <ImageViewer
        imageUrls={imageUrls}
        index={index}
        enableSwipeDown={true}
        onChange={i => setIndex(i)}
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
