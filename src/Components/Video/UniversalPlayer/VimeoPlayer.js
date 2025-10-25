import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';

const VimeoPlayer = ({ videoUrl, thumbnail }) => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ loader state
  const webviewRef = useRef(null);

  const handlePlay = () => {
    setPlaying(true);
    setLoading(true);
    handleWebViewLoadEnd()
  };

  const handleWebViewLoadEnd = () => {
    setLoading(false); // hide loader when WebView finishes loading
    if (webviewRef.current) {
      webviewRef.current.postMessage('triggerButton'); // trigger play in HTML
    }
  };

  return (
    <View style={styles.container}>
   

        <WebView
        ref={webviewRef}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
        source={{
            uri: videoUrl,
        }}
        originWhitelist={['*']}
        mediaPlaybackRequiresUserAction={false}
        // onLoadEnd={handleWebViewLoadEnd}
        />

 

      {!playing && (
        <TouchableOpacity style={styles.overlay} onPress={handlePlay}>
          <Image
            source={{ uri: thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <Icon name="play-circle" size={60} color="white" style={styles.playIcon} />
        </TouchableOpacity>
      )}

      {/* Loader overlay */}
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
    resizeMode:'contain'
  },
  webview: {
    flex: 1,
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playIcon: {
    position: 'absolute',
  },
  loaderOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default VimeoPlayer;
