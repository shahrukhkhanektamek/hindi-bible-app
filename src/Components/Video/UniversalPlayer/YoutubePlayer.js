import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const YoutubePlayerComponent = ({
  videoId,
  height = 200,
  width = '100%',
}) => {
  const [playing, setPlaying] = useState(true); // start playing immediately

  return (
    <View style={[styles.container, { height, width }]}>
      <YoutubePlayer
        height={height}
        width={width}
        play={playing}
        videoId={videoId}
        onChangeState={(event) => {
          if (event === 'ended') setPlaying(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: '#000',
    overflow: 'hidden',
    borderRadius: 10,
  },
});

export default YoutubePlayerComponent;
