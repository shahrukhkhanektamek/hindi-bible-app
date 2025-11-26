import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';
import ImmersiveMode from "react-native-immersive-mode";
import { useNavigation } from '@react-navigation/native';

const SingleImage = ({ route }) => {
  const navigation = useNavigation();
  const { image } = route.params;

  const [screenSize, setScreenSize] = useState(Dimensions.get('window'));

  useEffect(() => {
    StatusBar.setHidden(true, "slide");
    ImmersiveMode.fullLayout(true);
    ImmersiveMode.setBarMode("Full");

    const listener = Dimensions.addEventListener("change", ({ window }) => {
      setScreenSize(window);

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

  return (
    <View style={[styles.container, { width: screenSize.width, height: screenSize.height }]}>
      <Image
        source={{ uri: image }}
        style={{
          width: screenSize.width,
          height: screenSize.height,
          resizeMode: 'contain',
        }}
      />

      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.goBack()}
      >
        <Icon name="x" size={28} color="white" />
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
  closeBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    padding: 10,
    borderRadius: 50,
  },
});

export default SingleImage;
