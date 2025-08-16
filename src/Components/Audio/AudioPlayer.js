/* eslint-disable no-extra-semi */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';
import Video from 'react-native-video';
import formatTime from '../../Helper/formatTime';

const AudioPlayer = ({
  id,
  playingId,
  setPlayingId,
  title = 'Unknown Title...',
  artist = 'Unknown Artist',
  chapterTitle,
  source,
  onEnd,
}) => {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const isPlaying = playingId === id;

  useEffect(() => {
    if (!isPlaying) {
      setCurrentTime(0);
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (isPlaying) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      // agar dubara same audio play kare to 0 se start ho
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.seek(0);
        }
      }, 100);
    }
  };

  return (
    <View style={styles.audioWrapper}>
      <View style={styles.topSection}>
        <Video
          key={isPlaying ? id + "-playing" : id + "-stopped"}  // 🔴 force remount
          ref={audioRef}
          source={source}
          audioOnly={true}
          paused={!isPlaying}
          onLoad={(data) => setDuration(data.duration)}
          onProgress={(data) => setCurrentTime(data.currentTime)}
          onError={(e) => console.log('Audio Error:', e)}
          onEnd={() => {
            console.log('Audio Finished:', id);
            if (onEnd) onEnd(id);
          }}
        />
        <TouchableOpacity style={styles.leftSection} onPress={togglePlayPause}>
          <Icon
            name={isPlaying ? 'pause-circle-filled' : 'play-circle-filled'}
            size={50}
            color="#71b5e8"
          />
        </TouchableOpacity>

        <View style={styles.middleSection}>
          <Text style={styles.audioTitle}>{title}</Text>
          <Text style={styles.artistName}>{artist}</Text>
          <Text style={styles.audioDuration}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.chapterTitle}>{chapterTitle}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(source.uri)}>
          <FontAwesome name="download" size={25} color="#555" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  audioWrapper: {
    backgroundColor: BACKGROUND_COLORS.white,
    padding: 5,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSection: {
    padding: 0,
  },
  middleSection: {
    flex: 1,
    marginLeft: 10,
  },
  rightSection: {
    padding: 10,
    paddingRight: 0,
  },
  bottomSection: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  audioTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4470bf',
  },
  artistName: {
    fontSize: 16,
    color: '#333',
  },
  audioDuration: {
    fontSize: 14,
    color: '#999',
  },
  chapterTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5d5cd7',
  },
});

export default AudioPlayer;
