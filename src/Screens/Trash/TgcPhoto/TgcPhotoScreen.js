/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import { ScrollView, StyleSheet, Text, View, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';
import { useNavigation } from '@react-navigation/native';
import GradiantButton from '../../Components/Button/GradientButton';
import Button from '../../Components/Button/Button';
import SearchInput from '../../Components/Search/SearchInput';

const TgcPhotoScreen = () => {
  const navigation = useNavigation();

  const imageFiles = [
    {
      title: 'ODISHA TRIP',
      image: require('../../Assets/videoThumbnail.jpeg'),
    },
    {
      title: 'CONFERENCE',
      image: require('../../Assets/videoThumbnail.jpeg'),
    },
  ];

  const albumImages = [
    {
      title: 'CONFERENCE',
      image: require('../../Assets/videoThumbnail.jpeg'),
    },
    {
      title: 'MEETING',
      image: require('../../Assets/videoThumbnail.jpeg'),
    },
    {
      title: 'PLAYING',
      image: require('../../Assets/videoThumbnail.jpeg'),
    },
  ];

  const [search, setSearch] = useState('');

  const handleSearch = () => {
    Alert.alert('Search Submitted', `You searched for: "${search}"`);
  };

  return (
    <ScrollView style={styles.container}>
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
          title="TGC Photo"
          height="40"
          width="30%"
          fontSize={15}
          backgroundColor={BACKGROUND_COLORS.green}
          borderRadius={5}
        />
      </View>

      <SearchInput
        value={search}
        onChangeText={setSearch}
        onSearch={handleSearch}
      />

      <View style={styles.imageWrapper}>
        {imageFiles.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={image.image} style={styles.image} />
            <View style={styles.imageTitleWrapper}>
              <Text style={styles.imageTitle}>{image.title}</Text>
            </View>
          </View>
        ))}
      </View>

      {[{ title: 'Album Title', images: albumImages }].map((album, i) => (
        <View key={i} style={styles.imageWrapper}>
          <View style={styles.imageContainer}>
            <Image source={album.images[0].image} style={styles.image} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={styles.imageTitleWrapper}>
                <Text style={styles.imageTitle}>{album.title}</Text>
              </View>
              <GradiantButton
                title="Album"
                height="31"
                width="25%"
                gradientType="orange"
                borderRadius={5}
                fontSize={15}
                onPress={() =>
                  navigation.navigate('AlbumImage', {
                    images: album.images,
                    initialIndex: 0,
                  })
                }
              />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.primary,
  },
  topBar: {
    marginTop: 25,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 8,
  },
  buttonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  imageWrapper: {
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  imageContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  imageTitleWrapper: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  imageTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },
});

export default TgcPhotoScreen;
