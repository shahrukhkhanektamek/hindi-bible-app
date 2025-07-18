import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import VideoItem from './VideoItem';
import AudioItem from './AudioItem';
import ImageItem from './ImageItem';
import PdfItem from './PdfItem';
import LinkItem from './LinkItem';

const MediaDownload = ({ type, title, source, size }) => {
  return (
    <View style={styles.messageContainer}>
      <View style={styles.mediaRow}>
        {type === 'video' && <VideoItem title={title} source={source} size={size} />}
        {type === 'audio' && <AudioItem title={title} size={size} />}
        {type === 'image' && <ImageItem title={title} source={source} size={size} />}
        {type === 'pdf' && <PdfItem title={title} size={size} />}
        {type === 'link' && <LinkItem title={title} source={source} />}
      </View>
    </View>
  );
};

export default MediaDownload;
