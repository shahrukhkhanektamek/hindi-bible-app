import React from 'react';
import { View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const YoutubePlayerComponent = ({
  videoId,
  paused,
  setPaused,
  height = 170,
  width = '80%',
}) => {
  return (
    <View style={{ width: width, height: height, margin:'auto',flex:1, alignItems:'center' }}>
      <YoutubePlayer
        height={height}
        width={width}
        play={!paused}
        key={paused ? 'paused' : 'playing'}
        videoId={videoId}
        onChangeState={e => {
          if (e === 'ended') setPaused(true);
        }}
      />
    </View>
  );
};

export default YoutubePlayerComponent;
