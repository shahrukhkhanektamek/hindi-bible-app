import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import axios from 'axios';

const GumletPlayer = ({ videoId, gumletToken, paused, setPaused }) => {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGumlet = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://api.gumlet.com/v1/videos/${videoId}`, {
          headers: { Authorization: `Bearer ${gumletToken}` },
        });
        setUrl(res.data?.data?.url_hls);
      } catch (e) { console.warn(e); }
      finally { setLoading(false); }
    };
    fetchGumlet();
  }, [videoId]);

  if (loading) return <ActivityIndicator size="large" color="#fff" />;

  return <Video source={{ uri: url }} style={{ width: '100%', height: 220 }} paused={paused} onEnd={() => setPaused(true)} />;
};

export default GumletPlayer;
