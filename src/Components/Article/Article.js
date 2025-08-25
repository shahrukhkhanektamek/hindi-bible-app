import React from 'react';
import { View, Image, Text, Linking, StyleSheet } from 'react-native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';
import COLORS from '../../Constants/Colors';
import { useWindowDimensions } from "react-native";

import RenderHTML from "react-native-render-html";

const Article = ({ imageSource, data=[] }) => {

  const { width } = useWindowDimensions();

  return (
    <View style={styles.wrapper}>
      
      <View style={styles.title}>
        <Text style={styles.titleText}>{data.name}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        
          <RenderHTML
            contentWidth={width}
            source={{ html: data.description }}
            baseStyle={styles.description}
            tagsStyles={tagsStyles}
          />
          
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: BACKGROUND_COLORS.deepBrown,
    padding: 20,
    paddingTop: 10,
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 5,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
  },
  title: {
    marginVertical: 16,
  },
  titleText: {
    color: COLORS.white,
    fontSize: 16,
  },
  descriptionContainer: {
    backgroundColor: BACKGROUND_COLORS.white,
    padding: 16,
    paddingTop: 10,
    borderRadius: 3,
  },
  description: {
    fontSize: 15,
    marginTop: 10,
    color: '#555',
  },
  link: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

const tagsStyles = {
    a: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
    h2: {
      fontSize:20,
      marginTop:10,

    },
  };

export default Article;
