/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import formatTime from '../../Helper/formatTime';

const VideoItem = ({ title, source, size }) => {
  const [duration, setDuration] = useState(0);

  const handleDownload = () => {
    console.log(`Downloading: ${title}`);
  };

  return (
    <>
      <View>
        <Video
          source={source}
          style={{ width: 140, height: 80, borderRadius: 10 }}
          resizeMode="cover"
          onLoad={(data) => setDuration(data.duration)}
          paused
        />
        <Text style={styles.mediaInfo}>{formatTime(duration)}</Text>
      </View>
      <View style={styles.mediaDetails}>
        <Text style={styles.mediaTitle}>{title}</Text>
        <Text style={styles.mediaInfo}>{size}</Text>
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Icon name="file-download" size={20} color="white" />
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default VideoItem;
