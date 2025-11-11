import React, { useRef, useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Image, 
  Text, 
  StyleSheet 
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import AudioPlayer from '../../Audio/AudioPlayer';

const CustomPlayer = ({
  type,
  source,
  paused,
  setPaused,
  thumbnail,
  rate,
  setRate,
  onEnd,
  id,
  title,
  artist,
  description,
  setPlayingId,
  playingId,
}) => {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  // Format time like 1:23
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (fullscreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setFullscreen(!fullscreen);
  };

  if (type === 'audio') {
    return (
      <AudioPlayer
        id={id}
        source={{ uri: source }}
        setPlayingId={setPlayingId}
        playingId={playingId}
        title={title}
        artist={artist}
        description={description}
        onEnd={onEnd}
      />
    );
  }

  return (
    <View style={[styles.container, fullscreen && styles.fullscreen]}>
      <Video
        ref={videoRef}
        source={{ uri: source }}
        style={[styles.video, fullscreen && styles.fullscreenVideo]}
        paused={paused}
        resizeMode="contain"
        rate={rate}
        onLoad={(data) => setDuration(data.duration)}
        onProgress={(data) => setCurrentTime(data.currentTime)}
        onEnd={() => {
          setPaused(true);
          onEnd && onEnd();
        }}
      />

      {/* Thumbnail overlay */}
      {thumbnail && paused && (
        <TouchableOpacity
          onPress={() => setPaused(false)}
          activeOpacity={0.8}
          style={styles.thumbnailOverlay}
        >
          <Image
            source={{ uri: thumbnail }}
            style={styles.thumbnail}
            resizeMode="contain"
          />
          <Icon name="play-circle" size={60} color="white" style={styles.playIcon} />
        </TouchableOpacity>
      )}

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => {
            if (paused && videoRef.current) videoRef.current.seek(0);
            setPaused(!paused);
          }}
        >
          <Icon name={paused ? 'play' : 'pause'} size={26} color="#fff" />
        </TouchableOpacity>

        {/* Slider */}
        <Slider
          style={{ flex: 1, marginHorizontal: 10 }}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          minimumTrackTintColor="#FFD700"
          maximumTrackTintColor="#fff"
          thumbTintColor="#FFD700"
          onSlidingComplete={(value) => {
            videoRef.current.seek(value);
            setCurrentTime(value);
          }}
        />

        {/* Time */}
        <Text style={styles.time}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>

        {/* Speed control */}
        <TouchableOpacity onPress={() => setRate(rate === 1 ? 1.5 : rate === 1.5 ? 2 : 1)}>
          <Text style={styles.rateText}>{rate}x</Text>
        </TouchableOpacity>

        {/* Fullscreen toggle */}
        <TouchableOpacity onPress={toggleFullscreen}>
          <Icon
            name={fullscreen ? 'contract' : 'expand'}
            size={22}
            color="#fff"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 999,
    backgroundColor: '#000',
  },
  fullscreenVideo: {
    height: '100%',
    width: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  thumbnailOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playIcon: {
    position: 'absolute',
  },
  time: {
    color: '#fff',
    fontSize: 12,
    marginHorizontal: 5,
  },
  rateText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CustomPlayer;
