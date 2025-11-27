import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext';   // ⬅️ Add
 
const GumletPlayer = ({ videoId, gumletToken, paused, setPaused }) => {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setIsMediaPlaying } = useContext(GlobalContext);     // ⬅️ Add

  useEffect(() => {
    const fetchGumlet = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://api.gumlet.com/v1/videos/${videoId}`, {
          headers: { Authorization: `Bearer ${gumletToken}` },
        });
        setUrl(res.data?.data?.url_hls);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };
    fetchGumlet();
  }, [videoId]);

  if (loading) return <ActivityIndicator size="large" color="#fff" />;

  const handlePlay = () => {
    setPaused(false);
    setIsMediaPlaying(true);           // ⬅️ Add
  };

  const handlePause = () => {
    setPaused(true);
    setIsMediaPlaying(false);          // ⬅️ Add
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={paused ? handlePlay : handlePause}>
      <Video
        source={{ uri: url }}
        style={{ width: '100%', height: 220 }}
        paused={paused}
        onEnd={() => {
          setPaused(true);
          setIsMediaPlaying(false);    // ⬅️ Add
        }}
        onPlay={handlePlay}            // ⬅️ Add
        onPause={handlePause}          // ⬅️ Add
      />
    </TouchableOpacity>
  );
};

export default GumletPlayer;
