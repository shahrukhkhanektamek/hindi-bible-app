import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, BackHandler } from 'react-native';
import WebView from 'react-native-webview';

const YoutubePlayerComponent = ({ videoUrl, height = 200 }) => {
  const webviewRef = useRef(null);
  const lastTap = useRef(null);

  // ✅ Injected JS for handling double-click inside WebView
  const injectedJS = `
    window.simulateDoubleClick = function() {
      const evt = new MouseEvent('dblclick', { bubbles: true, cancelable: true, view: window });
      document.body.dispatchEvent(evt);
    };

    // ✅ Detect fullscreen exit and pause video
    document.addEventListener('fullscreenchange', function() {
      const iframe = document.querySelector('iframe');
      if (!document.fullscreenElement && iframe) {
        // Pause YouTube
        if (iframe.src.includes('youtube.com')) {
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
        // Pause Vimeo
        if (iframe.src.includes('vimeo.com')) {
          try {
            new Vimeo.Player(iframe).pause();
          } catch (e) {}
        }
      }
    });

    true; // Required for Android
  `;

  // ✅ Handle double tap detection
  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      if (webviewRef.current) {
        webviewRef.current.injectJavaScript(`window.simulateDoubleClick(); true;`);
      }
    } else {
      lastTap.current = now;
    }
  };

  // ✅ Optional: Android hardware back press exits fullscreen
  useEffect(() => {
    const backAction = () => {
      if (webviewRef.current) {
        // Send pause event to stop video when back pressed
        webviewRef.current.injectJavaScript(`
          const iframe = document.querySelector('iframe');
          if (iframe && iframe.src.includes('youtube.com')) {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          }
          if (iframe && iframe.src.includes('vimeo.com')) {
            try { new Vimeo.Player(iframe).pause(); } catch(e){}
          }
          true;
        `);
      }
      return false; // Let back handler continue
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

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

export default YoutubePlayerComponent;
