/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const ImageItem = ({ title, source, size }) => {
  const handleDownload = () => {
    console.log(`Downloading: ${title}`);
  };

  return (
    <>
      <Image source={source} style={{ width: 100, height: 80, borderRadius: 10, resizeMode: 'contain' }} />
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

export default ImageItem;
