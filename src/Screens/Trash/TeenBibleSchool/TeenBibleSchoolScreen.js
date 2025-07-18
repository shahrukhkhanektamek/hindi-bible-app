import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import Button from '../../Components/Button/Button.js';
import MediaDownload from '../../Components/MediaDownload/index.js';
import SearchInput from '../../Components/Search/SearchInput.js';

const TeenBibleScreen = () => {
  const navigation = useNavigation();
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
          title="Teen Bible School (TBS)"
          height="40"
          width="55%"
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
      <View style={styles.mediaContainer}>
        <MediaDownload
          title="Sample Video"
          type="video"
          source={require('../../Assets/myvideo.mp4')}
          size="20MB"
        />

        <MediaDownload
          title="Sample Audio"
          type="audio"
          source={require('../../Assets/myaudio.mp3')}
          size="5MB"
        />

        <MediaDownload
          title="Sample Image"
          type="image"
          source={require('../../Assets/videoThumbnail.jpeg')}
          size="3MB"
        />

        <MediaDownload
          title="Sample Pdf"
          type="pdf"
          source={require('../../Assets/mypdf.pdf')}
          size="2MB"
        />

        <MediaDownload
          type="link"
          title="Visit Google"
          source={{ uri: 'https://www.google.com' }}
        />
      </View>
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
    marginBottom: 5,
  },
  buttonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    marginTop: 50,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginBottom: 22,
  },
  mediaContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default TeenBibleScreen;
