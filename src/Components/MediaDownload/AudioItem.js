/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const AudioItem = ({ title, size }) => {
  const handleDownload = () => {
    console.log(`Downloading: ${title}`);
  };

  return (
    <>
      <Icon name="audiotrack" size={50} color="#0088cc" style={{ marginHorizontal: 8 }} />
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

export default AudioItem;
