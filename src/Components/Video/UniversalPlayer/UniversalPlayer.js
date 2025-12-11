import React, { useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { YoutubePlayerComponent, VimeoPlayer, GumletPlayer, GDrivePlayer, CustomPlayer } from './index.js';

const UniversalPlayer = ({ type, source, thumbnail, gumletToken, vimeoToken, id, title, artist, description, setPlayingId, playingId, onEnd, height=null }) => {
  const [paused, setPaused] = useState(true);

  if(!source) return <Text style={{ color:'#fff' }}>No source found</Text>;
  let type2 = '';
  if(type==1) type2 = 'default';
  if(type==2) type2 = 'vimeo';
  if(type==3) type2 = 'youtube';
  if(type==4) type2 = 'gumlet';
  if(type==5) type2 = 'gdrive';
 

  switch(type2) { 
    case 'youtube':
      return <YoutubePlayerComponent videoUrl={source} thumbnail={thumbnail} paused={paused} setPaused={setPaused} height={height} />;
    case 'vimeo':
      return <VimeoPlayer videoUrl={source} thumbnail={thumbnail} paused={paused} setPaused={setPaused} height={height} />;
    case 'gumlet':
      return <GumletPlayer videoId={source} gumletToken={gumletToken} paused={paused} setPaused={setPaused} height={height} />;
    case 'gdrive':
      return <GDrivePlayer videoId={source} thumbnail={thumbnail} paused={paused} setPaused={setPaused} height={height} />;
    default:
      return <CustomPlayer type={type} source={source} thumbnail={thumbnail} paused={paused} height={height} setPaused={setPaused} id={id} title={title} artist={artist} description={description} setPlayingId={setPlayingId} playingId={playingId} onEnd={onEnd} />;
  }
};

export default UniversalPlayer;
 