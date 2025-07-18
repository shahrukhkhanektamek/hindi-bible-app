import React from 'react';
import { View, Image, Text, Linking, StyleSheet } from 'react-native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';
import COLORS from '../../Constants/Colors';

const Article = ({ imageSource, description, title, links = [] }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={imageSource} />
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
        {links.map((link, idx) => (
          <Text
            key={idx}
            style={styles.link}
            onPress={() => Linking.openURL(link)}
          >
            {link}
          </Text>
        ))}
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

export default Article;
