import React, { useRef } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import AudioPlayer from '../../Audio/AudioPlayer';

const CustomPlayer = ({ type, source, paused, setPaused, thumbnail, rate, setRate, onEnd, id, title, artist, description, setPlayingId, playingId }) => {
  if(type === 'audio') {
    return <AudioPlayer id={id} source={{ uri: source }} setPlayingId={setPlayingId} playingId={playingId} title={title} artist={artist} description={description} onEnd={onEnd} />;
  }

  const videoRef = useRef(null);

  return (
    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Video
        ref={videoRef}
        source={{ uri: source }}
        style={{ width: '100%', height: 220, borderRadius: 10, backgroundColor: '#000' }}
        paused={paused}
        resizeMode="contain"
        rate={rate}
        onEnd={() => { setPaused(true); onEnd && onEnd(); }}
      />

      {thumbnail && paused && (
        <TouchableOpacity
          onPress={() => setPaused(false)}
          activeOpacity={0.8}
          style={{ position: 'absolute', width: '100%', height: 220, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image source={{ uri: thumbnail }} style={{ width: '100%', height: 220, borderRadius: 10 }} resizeMode="cover" />
          <Icon name="play-circle" size={60} color="white" style={{ position: 'absolute' }} />
        </TouchableOpacity>
      )}

      {/* Controls */}
      {type !== 'audio' && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#0008', paddingVertical: 8, width: '100%' }}>
          <TouchableOpacity onPress={() => { if(paused && videoRef.current) videoRef.current.seek(0); setPaused(!paused); }}>
            <Icon name={paused ? 'play' : 'pause'} size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setRate(rate === 1 ? 2 : 1)}>
            <Text style={{ color: '#fff' }}>{rate}x</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CustomPlayer;
