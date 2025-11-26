// AlbumViewerScreen.js
import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';
import { useNavigation } from '@react-navigation/native';
import ImmersiveMode from "react-native-immersive-mode";

const AlbumImage = ({ route }) => {
  const navigation = useNavigation();
  const { images, initialIndex } = route.params;
  const [index, setIndex] = useState(initialIndex);

  const [screenSize, setScreenSize] = useState(Dimensions.get('window'));
  const isLandscape = screenSize.width > screenSize.height;

  


  useEffect(() => {
    StatusBar.setHidden(true, "slide");

    ImmersiveMode.fullLayout(true);
    ImmersiveMode.setBarMode("Full");

    const listener = Dimensions.addEventListener("change", ({ window }) => {
      setScreenSize(window); // <--- Landscape detect fix

      StatusBar.setHidden(true);
      ImmersiveMode.fullLayout(true);
      ImmersiveMode.setBarMode("Full");
    });

    return () => {
      StatusBar.setHidden(false);
      ImmersiveMode.setBarMode("Normal");
      listener?.remove();
    };
  }, []);




  const goPrev = () => setIndex(index === 0 ? images.length - 1 : index - 1);
  const goNext = () => setIndex(index === images.length - 1 ? 0 : index + 1);

  return (
    <View style={styles.container}>

      <Image
        source={{ uri: images[index].image }}
        style={{
          width: isLandscape ? '100%' : '100%',
          height: isLandscape ? screenSize.height : screenSize.height * 1,
          resizeMode: 'contain',
          borderRadius: 10,
        }}
      />

      {isLandscape ? (
        <View style={styles.landscapeNav}>
          <TouchableOpacity style={styles.arrowButton} onPress={goPrev}>
            <Icon name="chevron-left" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowButton} onPress={goNext}>
            <Icon name="chevron-right" size={32} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.portraitNav}>
          <TouchableOpacity style={styles.arrowButton} onPress={goPrev}>
            <Icon name="chevron-left" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowButton} onPress={goNext}>
            <Icon name="chevron-right" size={28} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.title}>{images[index].title}</Text>

      <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
        <Icon name="x" size={25} color="white" />
      </TouchableOpacity>
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

  title: {
    color: '#fff',
    marginTop: 10,
    fontSize: 18,
  },

  // Portrait arrows below image
  portraitNav: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 30,
    position:'absolute',
    zIndex:1,
    bottom:30
  },

  // Landscape arrows left + right overlay centered
  landscapeNav: {
    position: 'absolute',
    width: '100%',
    top: '45%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  arrowButton: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    padding: 15,
    borderRadius: 50,
  },
 
  closeBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    padding: 10,
    borderRadius: 50,
  }
});

export default AlbumImage; 
