import React, { useRef } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const VimeoPlayer = ({ videoUrl, height = 200 }) => {
  const webviewRef = useRef(null);
  const lastTap = useRef(null);

  // JS injected into WebView for double-click + fullscreen detection
  const injectedJS = `
    // Simulate a double click on body
    window.simulateDoubleClick = function() {
      const evt = new MouseEvent('dblclick', { bubbles: true, cancelable: true, view: window });
      document.body.dispatchEvent(evt);
    };

    // Pause video when exiting fullscreen
    document.addEventListener('fullscreenchange', function() {
      const video = document.querySelector('video');
      if (video && !document.fullscreenElement) {
        video.pause();
      }
    });

    true; // Important for Android
  `;

  // Detect double tap
  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
      // Double-tap detected
      if (webviewRef.current) {
        webviewRef.current.injectJavaScript(`window.simulateDoubleClick(); true;`);
      }
    } else {
      lastTap.current = now;
    }
  };

  return (
    <View style={[styles.container, { height }]}>
      <TouchableWithoutFeedback onPress={handleTap}>
        <View style={{ flex: 1 }}>
          <WebView
            ref={webviewRef}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsFullscreenVideo={true}
            allowsInlineMediaPlayback={true}
            setSupportMultipleWindows={false}
            androidLayerType="hardware"
            mediaPlaybackRequiresUserAction={false}
            originWhitelist={['*']}
            mixedContentMode="always"
            allowFileAccess={true}
            allowUniversalAccessFromFileURLs={true}
            injectedJavaScript={injectedJS}
            source={{ uri: videoUrl }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
});

export default VimeoPlayer;
