import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

const GDrivePlayer = ({ videoId, paused, setPaused, thumbnail }) => {
  const url = `https://drive.google.com/uc?export=download&id=${videoId}`;

  return (
    <View style={{ position: 'relative', width: '100%', height: 220 }}>
      <Video source={{ uri: url }} style={{ width: '100%', height: 220 }} paused={paused} onEnd={() => setPaused(true)} />

      {thumbnail && paused && (
        <TouchableOpacity
          onPress={() => setPaused(false)}
          style={{ position: 'absolute', width: '100%', height: 220, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image source={{ uri: thumbnail }} style={{ width: '100%', height: 220, borderRadius: 10 }} resizeMode="cover" />
          <Icon name="play-circle" size={60} color="white" style={{ position: 'absolute' }} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GDrivePlayer;
