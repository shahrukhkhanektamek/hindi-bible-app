/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import Button from '../../Components/Button/Button.js';
import AudioPlayer from '../../Components/Audio/AudioPlayer.js';

const BibleDramaScreen = () => {
  const navigation = useNavigation();
  const [playingId, setPlayingId] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>
      <View style={styles.buttonTop}>
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
          title="Home"
          height="30"
          width="20%"
          gradientType="yellow"
          borderRadius={5}
          fontSize={15}
          onPress={() => navigation.navigate('Home')}
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

      <View style={{ alignItems: 'center' }}>
        <Button
          title="Bible Drama"
          height="30"
          width="30%"
          backgroundColor={BACKGROUND_COLORS.green}
          borderRadius={5}
          fontSize={15}
        />
      </View>

      <View style={styles.audioContainer}>
        <AudioPlayer
          id="1"
          chapterTitle="BIBLE DRAMA-1"
          source={require('../../Assets/myaudio.mp3')}
          setPlayingId={setPlayingId}
          playingId={playingId}
        />
        <AudioPlayer
          id="2"
          chapterTitle="BIBLE DRAMA-2"
          source={require('../../Assets/myaudio.mp3')}
          setPlayingId={setPlayingId}
          playingId={playingId}
        />
        <AudioPlayer
          id="3"
          chapterTitle="BIBLE DRAMA-3"
          source={require('../../Assets/myaudio.mp3')}
          setPlayingId={setPlayingId}
          playingId={playingId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.primary,
  },
  topBar: {
    marginTop: 25,
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
  audioContainer: {
    backgroundColor: BACKGROUND_COLORS.skyBlue,
    margin: 16,
    padding: 20,
    rowGap: 20,
  },
});

export default BibleDramaScreen;
